'use server';

import { saveProduct, deleteProduct, uploadFileObject, Product, getInventory, saveInventoryItem, InventoryItem } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOrUpdateProduct(formData: FormData) {
    try {
        const id = formData.get('id') ? Number(formData.get('id')) : undefined;
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const price = Number(formData.get('price'));
        const description = formData.get('description') as string;
        const stock = Number(formData.get('stock'));

        // Image handling
        const existingImagesJson = formData.get('existingImages') as string;
        let images: string[] = existingImagesJson ? JSON.parse(existingImagesJson) : [];

        // Handle new file uploads
        const files = formData.getAll('files') as File[];

        const warnings: string[] = [];

        if (files && files.length > 0) {
            // Upload files in parallel
            const uploadPromises = files
                .filter(file => file.size > 0)
                .map(async (file) => {
                    try {
                        const url = await uploadFileObject(file);
                        return { status: 'fulfilled' as const, url, name: file.name };
                    } catch (e: any) {
                        const errorMessage = e.message || 'Unknown upload error';
                        console.error(`[Wrapper] Upload failed for ${file.name}:`, errorMessage);
                        return { status: 'rejected' as const, reason: errorMessage, name: file.name };
                    }
                });

            const results = await Promise.all(uploadPromises);

            results.forEach(result => {
                if (result.status === 'fulfilled') {
                    images.push(result.url);
                } else {
                    console.error(`Failed to upload ${result.name}:`, result.reason);
                    warnings.push(`Failed to upload ${result.name}`);
                }
            });
        }

        // Just in case single file upload fallback (if 'files' is empty but 'file' exists?)
        // The form uses 'files' now.

        // Fallback for `imageUrl` input if not empty and not in existingImages
        const singleImageUrl = formData.get('imageUrl') as string;
        if (singleImageUrl && !images.includes(singleImageUrl)) {
            images.push(singleImageUrl);
        }

        // Preserve "Primary" image logic: the first one in the array is primary.
        const primaryImage = images.length > 0 ? images[0] : (formData.get('currentImage') as string);

        if (images.length === 0 && primaryImage) {
            images.push(primaryImage);
        }

        // Basic validation
        if (!name || !price) {
            return { error: 'Name and Price are required' };
        }

        const product: Product = {
            id: id || 0, // 0 triggers new ID generation in saveProduct
            name,
            category,
            price,
            description,
            image: primaryImage, // Maintain backward compat
            images: images,
            color: 'bg-neutral-200' // Default fallback, maybe add color picker later
        };

        const savedProduct = await saveProduct(product);

        // Update Inventory
        try {
            const inventory = await getInventory();
            const existingItem = inventory.find(i => i.productId === savedProduct.id);

            const inventoryItem: InventoryItem = {
                id: existingItem?.id || 0,
                productId: savedProduct.id,
                productName: savedProduct.name,
                quantity: isNaN(stock) ? 0 : stock,
                minStock: existingItem?.minStock || 5, // Default min stock
                lastUpdated: new Date().toISOString()
            };

            await saveInventoryItem(inventoryItem);
        } catch (invError) {
            console.error("Inventory update failed:", invError);
        }

        return { success: true, product: savedProduct, warnings: warnings.length > 0 ? warnings : undefined };

    } catch (error) {
        console.error("Failed to create/update product:", error);
        return { error: 'Failed to save product. Please try again.' };
    }
}

export async function removeProduct(id: number) {
    await deleteProduct(id);
    revalidatePath('/admin');
}
