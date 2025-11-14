
"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Header/>
    <main className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        {/* Header */}
        <header className="mb-10 border-b pb-6">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mt-2">
            Last updated: <span className="font-medium">November 12, 2025</span>
          </p>
        </header>

        {/* Introduction */} 
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            We value your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and
            safeguard your data when you interact with our website and services.
          </p>
        </section>

        {/* Information Collection */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Personal details like name, email address, and phone number</li>
            <li>Account credentials and preferences</li>
            <li>Payment information for transactions</li>
            <li>Usage data such as IP address, browser type, and cookies</li>
          </ul>
        </section>

        {/* How We Use Data */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We use your data to provide a secure and personalized experience.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>To process and fulfill your orders</li>
            <li>To improve our website and services</li>
            <li>To send important notifications or promotional emails</li>
            <li>To comply with legal and regulatory requirements</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies to enhance your experience. Cookies help us analyze
            site traffic and understand user preferences. You may disable
            cookies in your browser settings, but some features may not work
            properly.
          </p>
        </section>

        {/* Data Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Sharing of Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell or rent your personal data. However, we may share
            information with trusted third-party providers (e.g., payment
            gateways, analytics, or logistics partners) strictly for service
            purposes.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement industry-standard security measures to protect your
            personal information from unauthorized access, disclosure, or
            misuse. However, no method of transmission over the Internet is 100%
            secure, so we cannot guarantee absolute security.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Access the personal information we hold about you</li>
            <li>Request corrections to your personal data</li>
            <li>Request deletion of your account or data</li>
            <li>Opt out of promotional communications</li>
          </ul>
        </section>

        {/* Changes */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. Updates will be
            posted on this page with a revised "Last Updated" date.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy,
            please{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
    <Footer/>
    </>
  );
}
