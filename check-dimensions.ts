import sizeOf from 'image-size';
import fs from 'fs';
import path from 'path';

const files = [
    'picture2-upscaled.webp',
    'mayon.webp',
    'gfg.webp',
    'gemini-generated-image-79h9uo79h9uo79h9-1.webp'
];

files.forEach(file => {
    const filePath = path.join(process.cwd(), 'public/uploads', file);
    try {
        if (fs.existsSync(filePath)) {
            const dimensions = sizeOf(filePath);
            console.log(`${file}: ${dimensions.width}x${dimensions.height}`);
        } else {
            console.log(`${file}: Not found`);
        }
    } catch (err) {
        console.error(`${file}: Error`, err.message);
    }
});
