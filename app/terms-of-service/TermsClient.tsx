"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { contactInfo } from "@/lib/global_variables";
import { Shield, FileText, AlertTriangle, Mail, Phone } from "lucide-react";

export default function TermsOfService() {
  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Welcome to {contactInfo.websiteName}. By using our services, you agree to these terms. Please read them carefully.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-orange-600">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Last updated: <span className="font-medium ml-1">November 12, 2025</span>
          </div>
        </div>

        <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
          <CardContent className="space-y-8 p-8 text-gray-700 leading-relaxed">
            
            {/* Service Agreement */}
            <section className="border-b pb-6">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">1. Service Agreement</h2>
              </div>
              <p className="mb-3">
                By accessing or using {contactInfo.websiteName}'s travel booking services, website, or mobile applications, 
                you enter into a binding agreement with us and agree to be bound by these Terms of Service.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Important:</strong> If you disagree with any part of these terms, you may not access 
                  our travel booking platform or use our services.
                </p>
              </div>
            </section>

            {/* Service Usage */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Service Usage & Eligibility</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Eligibility Requirements:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>You must be at least 18 years old to book travel services</li>
                    <li>You must have legal capacity to enter into binding contracts</li>
                    <li>You must provide accurate and complete information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Permitted Use:</h3>
                  <p className="text-gray-600">
                    Our services may only be used for legitimate travel bookings and inquiries. 
                    Any fraudulent, abusive, or illegal activities are strictly prohibited.
                  </p>
                </div>
              </div>
            </section>

            {/* Account Terms */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Account Registration & Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Your Responsibilities:</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Maintain account credential confidentiality</li>
                    <li>• Notify us of unauthorized access immediately</li>
                    <li>• Ensure account information is current</li>
                    <li>• You're responsible for all account activities</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Our Rights:</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Suspend accounts violating our terms</li>
                    <li>• Verify user information when necessary</li>
                    <li>• Refuse service to anyone at our discretion</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Booking Terms */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Travel Booking Terms</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Booking Process:</h3>
                  <ul className="text-green-700 text-sm space-y-2">
                    <li>• Bookings are confirmed only after payment processing</li>
                    <li>• You'll receive email confirmation with booking details</li>
                    <li>• Review all booking information carefully</li>
                    <li>• Keep copies of all confirmation documents</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
                  <ul className="text-yellow-700 text-sm space-y-2">
                    <li>• We act as intermediaries between you and service providers</li>
                    <li>• All travel requirements (visas, insurance) are your responsibility</li>
                    <li>• Prices and availability may change until booking confirmation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Payments & Cancellations */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Payments, Refunds & Cancellations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Payment Terms:</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Full payment required for booking confirmation</li>
                    <li>• We accept major credit cards and digital payments</li>
                    <li>• Currency conversion fees may apply for international cards</li>
                    <li>• Receipts provided for all transactions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Cancellation Policy:</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• 7+ days before travel: Full refund</li>
                    <li>• 3-7 days before travel: 50% refund</li>
                    <li>• Less than 3 days: No refund</li>
                    <li>• No-shows: No refund</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Intellectual Property Rights</h2>
              <p className="mb-3">
                All content, including but not limited to text, graphics, logos, images, software, 
                and website design, is owned by {contactInfo.websiteName} or our licensors and protected by 
                intellectual property laws.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-700">
                  <strong>Restrictions:</strong> You may not copy, modify, distribute, or use our 
                  content without explicit written permission. This includes scraping, data mining, 
                  or any commercial use of our platform content.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Limitation of Liability</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  {contactInfo.websiteName} acts as an intermediary between you and travel service providers 
                  (hotels, airlines, tour operators). We are not liable for:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Service quality provided by third-party vendors</li>
                  <li>Travel delays, cancellations, or itinerary changes by service providers</li>
                  <li>Loss or damage to personal belongings during travel</li>
                  <li>Medical emergencies or health issues during travel</li>
                  <li>Natural disasters, political unrest, or force majeure events</li>
                </ul>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Maximum Liability:</strong> Our total liability shall not exceed the 
                    amount paid by you for the specific service giving rise to the claim.
                  </p>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. User Responsibilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Travel Documentation:</h3>
                  <ul className="text-blue-700 text-sm space-y-2">
                    <li>✓ Valid passport with sufficient validity</li>
                    <li>✓ Required visas and travel permits</li>
                    <li>✓ Travel insurance coverage</li>
                    <li>✓ Vaccination certificates if required</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Conduct & Compliance:</h3>
                  <ul className="text-orange-700 text-sm space-y-2">
                    <li>✓ Follow local laws and regulations</li>
                    <li>✓ Respect cultural norms and customs</li>
                    <li>✓ Maintain appropriate travel behavior</li>
                    <li>✓ Environmental responsibility</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Service Termination</h2>
              <p className="mb-3 text-gray-600">
                We reserve the right to suspend or terminate your access to our services 
                immediately, without prior notice, for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Violation of these Terms of Service</li>
                <li>Fraudulent or abusive activities</li>
                <li>Non-payment or payment disputes</li>
                <li>Legal or regulatory requirements</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Governing Law & Disputes</h2>
              <p className="text-gray-600">
                These Terms of Service shall be governed and construed in accordance with the laws 
                of India. Any disputes shall be subject to the exclusive jurisdiction of the courts 
                located in Jaipur, Rajasthan.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Changes to Terms</h2>
              <p className="text-gray-600">
                We may update these Terms of Service to reflect changes in our services, 
                legal requirements, or business practices. Continued use of our services 
                after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">12. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about these Terms of Service or our services, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Email Support</p>
                    <p className="text-blue-600">{contactInfo.emails[0]}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Phone Support</p>
                    <p className="text-gray-600">{contactInfo.phones[0]}</p>
                  </div>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
      <Footer/>
    </>
  );
}