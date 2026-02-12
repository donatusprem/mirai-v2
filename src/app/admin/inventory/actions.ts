'use server';

import { saveInventoryItem, deleteInventoryItem, InventoryItem } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export async function updateInventory(formData: FormData) {
    const item: InventoryItem = {
        id: formData.get('id') ? Number(formData.get('id')) : 0,
        productId: Number(formData.get('productId')),
        productName: formData.get('productName') as string,
        quantity: Number(formData.get('quantity')),
        minStock: Number(formData.get('minStock')) || 5,
        lastUpdated: new Date().toISOString(),
    };

    await saveInventoryItem(item);
    revalidatePath('/admin/inventory');
}

export async function removeInventory(id: number) {
    await deleteInventoryItem(id);
    revalidatePath('/admin/inventory');
}
