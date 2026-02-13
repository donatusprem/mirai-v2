import { put, del, list } from '@vercel/blob';

export async function uploadToBlob(file: File) {
    const blob = await put(file.name, file, {
        access: 'public',
    });
    return blob.url;
}

export async function deleteFromBlob(url: string) {
    await del(url);
}

export async function listBlobs() {
    const { blobs } = await list();
    return blobs;
}
