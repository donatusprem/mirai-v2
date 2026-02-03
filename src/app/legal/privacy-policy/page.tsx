import LegalPageLayout from "@/components/layout/LegalPageLayout";

export default function PrivacyPolicyPage() {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="October 24, 2024">
            <p>At Mirai India, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or interact with our services.</p>

            <h3>1. Information We Collect</h3>
            <p>We may collect personal information such as your name, email address, phone number, and shipping address when you make a purchase, sign up for our newsletter, or contact our support team. We also collect non-personal data like browser type, IP address, and pages visited to improve our website experience.</p>

            <h3>2. How We Use Your Information</h3>
            <ul>
                <li>To process and fulfill your orders.</li>
                <li>To communicate with you regarding your purchase or inquiries.</li>
                <li>To send you updates, promotions, and newsletters (you can opt-out at any time).</li>
                <li>To analyze website usage and improve our services.</li>
            </ul>

            <h3>3. Data Security</h3>
            <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

            <h3>4. Third-Party Services</h3>
            <p>We may share your information with trusted third-party service providers (e.g., payment processors, shipping partners) solely for the purpose of fulfilling our services to you. We do not sell your data to third parties.</p>

            <h3>5. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at info@themiraiindia.com.</p>
        </LegalPageLayout>
    );
}
