
import fs from 'fs';
import path from 'path';

const PRODUCT_DATA_FILE = path.join(process.cwd(), 'src/data/products.json');

interface Product {
    id: number;
    name: string;
    category: string;
    color?: string;
    image?: string;
    images?: string[];
    price?: number;
    description?: string;
    subcategory?: string;
}

const migrate = () => {
    try {
        const data = fs.readFileSync(PRODUCT_DATA_FILE, 'utf-8');
        const products: Product[] = JSON.parse(data);

        let updatedCount = 0;
        const updatedProducts = products.map(p => {
            if (p.image && (!p.images || p.images.length === 0)) {
                // Migration: image -> images[0]
                // We keep 'image' for backward compatibility for now, or we can just rely on 'images'.
                // Plan said: "migrate existing single image fields to an images array"
                // Let's keep 'image' populated as the "primary" for now to avoid breaking everything immediately,
                // but populate 'images' as well.
                const newProduct = {
                    ...p,
                    images: [p.image]
                };
                updatedCount++;
                return newProduct;
            } else if (!p.images) {
                return { ...p, images: [] };
            }
            return p;
        });

        fs.writeFileSync(PRODUCT_DATA_FILE, JSON.stringify(updatedProducts, null, 2));
        console.log(`Migrated ${updatedCount} products.`);

    } catch (error) {
        console.error("Migration failed:", error);
    }
};

migrate();
