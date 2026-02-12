import LegalPageLayout from "@/components/layout/LegalPageLayout";

export default function ShippingPolicyPage() {
    return (
        <LegalPageLayout title="Shipping Policy" lastUpdated="October 24, 2024">
            <h3>1. Order Processing</h3>
            <p>All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.</p>

            <h3>2. Shipping Rates & Delivery Estimates</h3>
            <p>Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur.</p>

            <h3>3. Shipment Confirmation & Order Tracking</h3>
            <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>

            <h3>4. Damages</h3>
            <p>Mirai India is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
        </LegalPageLayout>
    );
}
