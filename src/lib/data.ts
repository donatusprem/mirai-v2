"use server";

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const PRODUCT_DATA_FILE = path.join(process.cwd(), 'src/data/products.json');
const COLLECTION_DATA_FILE = path.join(process.cwd(), 'src/data/collections.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

export interface Product {
    id: number;
    name: string;
    category: string;
    color?: string;
    image?: string; // URL or path (Primary)
    images?: string[]; // Gallery

    price: number;
    description?: string;
}

export interface CollectionItem {
    id: number;
    name: string;
    category: string; // The subtitle shown on card
    image: string;
}

// Ensure upload directory exists
async function ensureUploadDir() {
    try {
        await fs.access(UPLOAD_DIR);
    } catch {
        await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }
}

// --- PRODUCTS ---

export async function getProducts(): Promise<Product[]> {
    try {
        const data = await fs.readFile(PRODUCT_DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading products:", error);
        return [];
    }
}

export async function saveProduct(product: Product) {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === product.id);

    if (index >= 0) {
        // Update existing
        products[index] = { ...products[index], ...product };
    } else {
        // Create new
        if (!product.id) {
            const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 100);
            product.id = maxId + 1;
        }
        products.push(product);
    }

    await fs.writeFile(PRODUCT_DATA_FILE, JSON.stringify(products, null, 2));
    revalidatePath('/collections');
    revalidatePath('/admin');
    return product;
}

export async function deleteProduct(id: number) {
    const products = await getProducts();
    const newProducts = products.filter(p => p.id !== id);
    await fs.writeFile(PRODUCT_DATA_FILE, JSON.stringify(newProducts, null, 2));
    revalidatePath('/collections');
    revalidatePath('/admin');
}

// --- IMAGES ---

export async function uploadFileObject(file: File): Promise<string> {
    if (!file) {
        throw new Error('No file uploaded');
    }

    await ensureUploadDir();

    const buffer = Buffer.from(await file.arrayBuffer());
    // Sanitize filename to prevent directory traversal or weird characters
    // Add randomness to handle duplicates
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-${safeName}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    await fs.writeFile(filePath, buffer);

    return `/uploads/${uniqueName}`;
}

export async function uploadImage(formData: FormData): Promise<string> {
    const file = formData.get('file') as File;
    return uploadFileObject(file);
}

// --- GALLERY ---

const GALLERY_DATA_FILE = path.join(process.cwd(), 'src/data/gallery.json');

export interface GalleryItem {
    id: number;
    title: string;
    description: string;
    image: string;
    size?: string; // e.g. "col-span-1", "col-span-2"
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
    try {
        const data = await fs.readFile(GALLERY_DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function saveGalleryItem(item: GalleryItem) {
    const items = await getGalleryItems();
    const index = items.findIndex(i => i.id === item.id);

    if (index >= 0) {
        items[index] = { ...items[index], ...item };
    } else {
        if (!item.id) {
            const maxId = items.reduce((max, i) => (i.id > max ? i.id : max), 0);
            item.id = maxId + 1;
        }
        items.push(item);
    }

    await fs.writeFile(GALLERY_DATA_FILE, JSON.stringify(items, null, 2));
    revalidatePath('/gallery');
    revalidatePath('/admin/gallery');
}

export async function deleteGalleryItem(id: number) {
    const items = await getGalleryItems();
    const newItems = items.filter(i => i.id !== id);
    await fs.writeFile(GALLERY_DATA_FILE, JSON.stringify(newItems, null, 2));
    revalidatePath('/gallery');
    revalidatePath('/admin/gallery');
}

// --- INVENTORY ---

const INVENTORY_DATA_FILE = path.join(process.cwd(), 'src/data/inventory.json');

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
        const data = await fs.readFile(INVENTORY_DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function saveInventoryItem(item: InventoryItem) {
    const items = await getInventory();
    const index = items.findIndex(i => i.id === item.id);

    item.lastUpdated = new Date().toISOString();

    if (index >= 0) {
        items[index] = { ...items[index], ...item };
    } else {
        if (!item.id) {
            const maxId = items.reduce((max, i) => (i.id > max ? i.id : max), 0);
            item.id = maxId + 1;
        }
        items.push(item);
    }

    await fs.writeFile(INVENTORY_DATA_FILE, JSON.stringify(items, null, 2));
    revalidatePath('/admin/inventory');
}

export async function deleteInventoryItem(id: number) {
    const items = await getInventory();
    const newItems = items.filter(i => i.id !== id);
    await fs.writeFile(INVENTORY_DATA_FILE, JSON.stringify(newItems, null, 2));
    revalidatePath('/admin/inventory');
}

