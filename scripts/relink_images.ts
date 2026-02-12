
import fs from 'fs';
import path from 'path';

const PRODUCTS_PATH = path.join(process.cwd(), 'src/data/products.json');
const CATALOG_PATH = path.join(process.cwd(), 'furniture renders/standardized-images/catalog.json');

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

async function relinkImages() {
    try {
        const productsRaw = fs.readFileSync(PRODUCTS_PATH, 'utf-8');
        const products = JSON.parse(productsRaw);

        const catalogRaw = fs.readFileSync(CATALOG_PATH, 'utf-8');
        const catalog = JSON.parse(catalogRaw);

        // Create a lookup map: category -> original_name -> new_path
        const catalogMap: Record<string, Record<string, string>> = {};

        for (const item of catalog) {
            if (!catalogMap[item.category]) {
                catalogMap[item.category] = {};
            }
            // decoding the URI component just in case, though usually simple names
            catalogMap[item.category][item.original_name] = item.path;
        }

        console.log("Catalog Categories:", Object.keys(catalogMap));

        let updatedCount = 0;
        let missingCount = 0;

        for (const product of products) {
            const oldImage = product.image;
            if (!oldImage || !oldImage.startsWith('/uploads/')) continue;

            const filenameWithTimestamp = oldImage.replace('/uploads/', '');
            // Extract original filename. usually timestamp-name.ext
            // But sometimes the name itself might have dashes. 
            // The timestamp looks like 13 digits.
            const match = filenameWithTimestamp.match(/^\d{13}-(.+)$/);

            let originalName = "";
            if (match) {
                originalName = match[1];
            } else {
                // heuristic fallback
                originalName = filenameWithTimestamp;
            }

            // Normalize subcategory to match catalog category
            // e.g. "1 seater sofa" -> "1-seater-sofa"
            let categorySlug = slugify(product.subcategory || product.category || "");

            if (product.id === 268) {
                console.log("DEBUG 268:", {
                    originalName,
                    categorySlug,
                    keysInCat: catalogMap[categorySlug] ? Object.keys(catalogMap[categorySlug]) : "CAT NOT FOUND"
                });
            }

            // Manual overrides for mismatched category naming if needed
            if (categorySlug === "centre-table") categorySlug = "centre-table"; // check if matches
            if (categorySlug === "dining-chair") categorySlug = "dining-chair";

            // The catalog categories seem to be: '1-seater-sofa', '2-seater-sofa', 'accent-lounge-chair', etc.
            // Let's try to find a match.

            let newPath = "";

            // Direct match
            if (catalogMap[categorySlug] && catalogMap[categorySlug][originalName]) {
                newPath = catalogMap[categorySlug][originalName];
            }
            // Fallback 1: Replace underscores with spaces
            else {
                const nameWithSpaces = originalName.replace(/_/g, ' ');
                if (catalogMap[categorySlug] && catalogMap[categorySlug][nameWithSpaces]) {
                    newPath = catalogMap[categorySlug][nameWithSpaces];
                }
                // Fallback 2: Check for known special cases (ma_ -> ma')
                else if (originalName === "ma_.png" && catalogMap[categorySlug] && catalogMap[categorySlug]["ma'.png"]) {
                    newPath = catalogMap[categorySlug]["ma'.png"];
                }
                // Fallback 3: try to find the name in ANY category (if unique)
                else {
                    for (const cat in catalogMap) {
                        if (catalogMap[cat][originalName]) {
                            newPath = catalogMap[cat][originalName];
                            break;
                        }
                        // try with spaces in other categories too
                        if (catalogMap[cat][nameWithSpaces]) {
                            newPath = catalogMap[cat][nameWithSpaces];
                            break;
                        }
                    }
                }
            }

            if (newPath) {
                product.image = `/uploads/${newPath}`;
                updatedCount++;
            } else {
                console.warn(`Could not find match for Product ID ${product.id}: ${originalName} (Category: ${categorySlug})`);
                // Check if maybe there's a space/dash mismatch in originalName
                missingCount++;
            }
        }

        fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2));
        console.log(`Updated ${updatedCount} products.`);
        console.log(`Failed to update ${missingCount} products.`);

    } catch (error) {
        console.error("Error matching images:", error);
    }
}

relinkImages();
