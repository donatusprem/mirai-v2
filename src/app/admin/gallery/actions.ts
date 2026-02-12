'use server';

import { saveGalleryItem, deleteGalleryItem, uploadImage, GalleryItem } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateGalleryItem(formData: FormData) {
    const id = Number(formData.get('id'));
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const size = formData.get('size') as string;

    // Image handling
    let image = formData.get('currentImage') as string;
    const file = formData.get('file') as File;

    if (file && file.size > 0) {
        try {
            image = await uploadImage(formData);
        } catch (error) {
            console.error("Image upload failed:", error);
            return { error: "Image upload failed" };
        }
    }

    if (!image) {
        // Decide if image is required. For gallery, yes.
        // But if updating without changing image, currentImage is used.
        // If new item and no image, error.
        if (!id) return { error: "Image is required" };
    }

    const item: GalleryItem = {
        id,
        title,
        description,
        image,
        size
    };

    await saveGalleryItem(item);
    redirect('/admin/gallery');
}

export async function removeGalleryItem(id: number) {
    await deleteGalleryItem(id);
    revalidatePath('/admin/gallery');
}
