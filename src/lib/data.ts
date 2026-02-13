'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';
import { uploadToBlob } from '@/lib/storage';

// --- PRODUCTS ---

export interface Product {
    id: number;
    name: string;
    category: string;
    color?: string;
    image?: string; // URL or path (Primary)
    images?: string[]; // Gallery
    price: number;
    description?: string;
    subcategory?: string; // Added to match schema
}

export async function getProducts(): Promise<Product[]> {
    try {
        const { rows } = await sql`
            SELECT id, name, category, subcategory, color, image, images, price, description 
            FROM products 
            ORDER BY id DESC
        `;
        return rows as Product[];
    } catch (error) {
        console.error("Error reading products:", error);
        return [];
    }
}

export async function saveProduct(product: Product) {
    try {
        if (product.id && product.id > 0) {
            // Update existing
            await sql`
                UPDATE products 
                SET name = ${product.name}, 
                    category = ${product.category}, 
                    subcategory = ${product.subcategory || ''},
                    color = ${product.color || 'bg-neutral-200'}, 
                    image = ${product.image || ''}, 
                    images = ${product.images || []}, 
                    price = ${product.price}, 
                    description = ${product.description || ''}
                WHERE id = ${product.id}
            `;
        } else {
            // Create new
            const { rows } = await sql`
                INSERT INTO products (name, category, subcategory, color, image, images, price, description)
                VALUES (${product.name}, ${product.category}, ${product.subcategory || ''}, ${product.color || 'bg-neutral-200'}, ${product.image || ''}, ${product.images || []}, ${product.price}, ${product.description || ''})
                RETURNING id
            `;
            product.id = rows[0].id;
        }

        revalidatePath('/collections');
        revalidatePath('/admin');
        revalidatePath('/');
        return product;
    } catch (error) {
        console.error("Error saving product:", error);
        throw error;
    }
}

export async function deleteProduct(id: number) {
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath('/collections');
        revalidatePath('/admin');
        revalidatePath('/');
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}


// --- IMAGES ---

export async function uploadFileObject(file: File): Promise<string> {
    if (!file) {
        throw new Error('No file uploaded');
    }
    return await uploadToBlob(file);
}

export async function uploadImage(formData: FormData): Promise<string> {
    const file = formData.get('file') as File;
    return uploadFileObject(file);
}

// --- GALLERY ---

export interface GalleryItem {
    id: number;
    title: string;
    description: string;
    image: string;
    size?: string;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
    try {
        const { rows } = await sql`SELECT * FROM gallery ORDER BY id DESC`;
        return rows as GalleryItem[];
    } catch (error) {
        console.error("Error reading gallery:", error);
        return [];
    }
}

export async function saveGalleryItem(item: GalleryItem) {
    try {
        if (item.id && item.id > 0) {
            await sql`
                UPDATE gallery 
                SET title = ${item.title}, 
                    description = ${item.description}, 
                    image = ${item.image}, 
                    size = ${item.size || ''}
                WHERE id = ${item.id}
            `;
        } else {
            await sql`
                INSERT INTO gallery (title, description, image, size)
                VALUES (${item.title}, ${item.description}, ${item.image}, ${item.size || ''})
            `;
        }
        revalidatePath('/gallery');
        revalidatePath('/admin/gallery');
    } catch (error) {
        console.error("Error saving gallery item:", error);
        throw error;
    }
}

export async function deleteGalleryItem(id: number) {
    try {
        await sql`DELETE FROM gallery WHERE id = ${id}`;
        revalidatePath('/gallery');
        revalidatePath('/admin/gallery');
    } catch (error) {
        console.error("Error deleting gallery item:", error);
        throw error;
    }
}


// --- INVENTORY ---

export interface InventoryItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    minStock: number;
    lastUpdated: string;
}

export async function getInventory(): Promise<InventoryItem[]> {
    try {
        const { rows } = await sql`
            SELECT i.id, i.product_id as "productId", p.name as "productName", i.quantity, i.min_stock as "minStock", i.last_updated as "lastUpdated"
            FROM inventory i
            LEFT JOIN products p ON i.product_id = p.id
            ORDER BY i.id ASC
        `;
        // Convert dates to string for serialization safety
        return rows.map(r => ({
            ...r,
            lastUpdated: new Date(r.lastUpdated).toISOString()
        })) as InventoryItem[];

    } catch (error) {
        console.error("Error reading inventory:", error);
        return [];
    }
}


export async function saveInventoryItem(item: InventoryItem) {
    try {
        const lastUpdated = new Date().toISOString();

        if (item.id && item.id > 0) {
            await sql`
                UPDATE inventory 
                SET product_id = ${item.productId}, 
                    quantity = ${item.quantity}, 
                    min_stock = ${item.minStock}, 
                    last_updated = ${lastUpdated}
                WHERE id = ${item.id}
            `;
        } else {
            await sql`
                INSERT INTO inventory (product_id, quantity, min_stock, last_updated)
                VALUES (${item.productId}, ${item.quantity}, ${item.minStock}, ${lastUpdated})
             `;
        }
        revalidatePath('/admin/inventory');
    } catch (error) {
        console.error("Error saving inventory:", error);
        throw error;
    }
}

export async function deleteInventoryItem(id: number) {
    try {
        await sql`DELETE FROM inventory WHERE id = ${id}`;
        revalidatePath('/admin/inventory');
    } catch (error) {
        console.error("Error deleting inventory:", error);
        throw error;
    }
}
