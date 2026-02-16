import { put, del, list } from '@vercel/blob';

export async function uploadToBlob(file: File) {
    try {
        console.log(`[Storage] Starting upload for ${file.name} (${file.size} bytes) at ${new Date().toISOString()}`);
        const blob = await put(file.name, file, {
            access: 'public',
            addRandomSuffix: true // Prevent filename collisions
        });
        console.log(`[Storage] Upload successful for ${file.name}: ${blob.url}`);
        return blob.url;
    } catch (error: any) {
        console.error(`[Storage] Upload failed for ${file.name}:`, error);
        throw new Error(`Blob Upload Error: ${error.message || 'Unknown error'}`);
    }
}

export async function deleteFromBlob(url: string) {
    await del(url);
}

export async function listBlobs() {
    const { blobs } = await list();
    return blobs;
}
