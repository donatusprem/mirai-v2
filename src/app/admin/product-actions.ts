'use server';

import { saveProduct, deleteProduct, uploadImage, Product, getInventory, saveInventoryItem, InventoryItem } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOrUpdateProduct(formData: FormData) {
    const id = formData.get('id') ? Number(formData.get('id')) : undefined;
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const price = Number(formData.get('price'));
    const description = formData.get('description') as string;
    const stock = Number(formData.get('stock'));

    // Image handling
    const existingImagesJson = formData.get('existingImages') as string;
    let images: string[] = existingImagesJson ? JSON.parse(existingImagesJson) : [];

    // Handle new URL inputs (if any, though form might handle them via existingImages state ideally, but let's check input name)
    // In our form, if user types a URL and adds it, it goes into 'previews' which goes into 'existingImages'
    // BUT if the user is typing in the single input field `imageUrl` (fallback), we should catch it.
    // However, our new form pushes everything into `previews`.

    // Handle new file uploads
    const files = formData.getAll('files') as File[];

    if (files && files.length > 0) {
        // Upload each file
        for (const file of files) {
            if (file.size > 0) {
                try {
                    // We need to import uploadFileObject from '@/lib/data'
                    // Since I just added it, I need to make sure it's imported.
                    // But here I can only see the existing imports. I will assume I need to update imports too.
                    // For now, let's assume `uploadImage` can be used if I create a formData for each, OR rewrite this file to import `uploadFileObject`.
                    // I'll update the imports in a separate step or just use `uploadImage` wrapper by mocking FormData if I have to, but cleaner to import `uploadFileObject`.
                    const url = await import('@/lib/data').then(m => m.uploadFileObject(file));
                    images.push(url);
                } catch (e) {
                    console.error("Upload failed for file", file.name, e);
                }
            }
        }
    }

    // Just in case single file upload fallback (if 'files' is empty but 'file' exists?)
    // The form uses 'files' now.

    // Fallback for `imageUrl` input if not empty and not in existingImages
    const singleImageUrl = formData.get('imageUrl') as string;
    if (singleImageUrl && !images.includes(singleImageUrl)) {
        images.push(singleImageUrl);
    }

    // Ensure we have at least one image if possible, or maintain current behavior
    // Migration script populated `images` from `image`.

    // Preserve "Primary" image logic: the first one in the array is primary.
    // The form sends `existingImages` in order. New files are appended. 
    // If the user reordered them? The form UI I built doesn't support reordering yet, just removing. 
    // New files are added to end.

    const primaryImage = images.length > 0 ? images[0] : (formData.get('currentImage') as string);
    // If images array is empty, we try to keep the current one? 
    // If user explicitly removed all images, images array is empty. 

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

    redirect('/admin');
}

export async function removeProduct(id: number) {
    await deleteProduct(id);
    revalidatePath('/admin');
}
