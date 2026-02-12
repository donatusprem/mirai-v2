import { getProducts } from "@/lib/data";
import ShopClient from "./shop-client";

export const dynamic = 'force-dynamic'; // Ensure we get fresh data on refresh

export default async function ShopPage() {
    const products = await getProducts();

    return <ShopClient initialProducts={products} />;
}
