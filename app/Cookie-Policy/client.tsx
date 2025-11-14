"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { contactInfo } from "@/lib/global_variables";
import { Cookie, Shield, Settings, Eye, Trash2, Clock } from "lucide-react";

export default function CookiePolicy() {
  return (
      <>
        <Header/>
         <div className="min-h-screen bg-gradient-to-br bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Cookie className="w-16 h-16 text-amber-600" />
              <Shield className="w-8 h-8 text-blue-600 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Cookie Policy</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            How {contactInfo.websiteName} uses cookies to enhance your travel booking experience
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-amber-600">
            <Clock className="w-4 h-4 mr-2" />
            Last updated: <span className="font-medium ml-1">November 12, 2025</span>
          </div>
        </div>

        <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardContent className="space-y-8 p-8">
            
            {/* Introduction */}
            <section className="text-center border-b pb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Understanding Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                At {contactInfo.websiteName}, we use cookies and similar technologies to provide you with 
                the best possible travel booking experience. This policy explains what cookies are, 
                how we use them, and how you can manage your preferences.
              </p>
            </section>

            {/* What are Cookies */}
            <section className="border-b pb-8">
              <div className="flex items-center mb-6">
                <Cookie className="w-8 h-8 text-amber-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">What Are Cookies?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                  <h3 className="font-semibold text-amber-800 mb-3">Small Text Files</h3>
                  <p className="text-amber-700 text-sm">
                    Cookies are small text files stored on your device when you visit websites. 
                    They help websites remember your preferences and improve your browsing experience.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3">Enhanced Experience</h3>
                  <p className="text-blue-700 text-sm">
                    Cookies make your interactions with {contactInfo.websiteName} faster, more secure, 
                    and personalized to your travel preferences and booking history.
                  </p>
                </div>
              </div>
            </section>

            {/* Types of Cookies We Use */}
            <section className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="text-xl font-semibold text-green-800">Essential Cookies</h3>
                  </div>
                  <p className="text-green-700 mb-3">
                    These cookies are necessary for the website to function and cannot be switched off.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Purpose:</h4>
                      <ul className="text-green-700 space-y-1">
                        <li>• Secure login and authentication</li>
                        <li>• Shopping cart functionality</li>
                        <li>• Payment processing security</li>
                        <li>• Website security features</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                      <ul className="text-green-700 space-y-1">
                        <li>• Session management</li>
                        <li>• Load balancing</li>
                        <li>• Fraud prevention</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center mb-3">
                    <Eye className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-xl font-semibold text-purple-800">Analytics & Performance Cookies</h3>
                  </div>
                  <p className="text-purple-700 mb-3">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">Purpose:</h4>
                      <ul className="text-purple-700 space-y-1">
                        <li>• Website traffic analysis</li>
                        <li>• User behavior tracking</li>
                        <li>• Service improvement</li>
                        <li>• Bug identification</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">Data Collected:</h4>
                      <ul className="text-purple-700 space-y-1">
                        <li>• Pages visited</li>
                        <li>• Time spent on site</li>
                        <li>• Error messages</li>
                        <li>• Booking funnel analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-3">
                    <Settings className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold text-blue-800">Preference & Functional Cookies</h3>
                  </div>
                  <p className="text-blue-700 mb-3">
                    These cookies remember your preferences and personalize your experience.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">Purpose:</h4>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Language preferences</li>
                        <li>• Currency selection</li>
                        <li>• Recently viewed tours</li>
                        <li>• Search history</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">Benefits:</h4>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Personalized content</li>
                        <li>• Location-based offers</li>
                        <li>• Faster booking process</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <div className="flex items-center mb-3">
                    <Eye className="w-6 h-6 text-orange-600 mr-2" />
                    <h3 className="text-xl font-semibold text-orange-800">Marketing & Targeting Cookies</h3>
                  </div>
                  <p className="text-orange-700 mb-3">
                    These cookies are used to deliver relevant advertisements and measure campaign performance.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">Purpose:</h4>
                      <ul className="text-orange-700 space-y-1">
                        <li>• Personalized travel offers</li>
                        <li>• Retargeting campaigns</li>
                        <li>• Social media integration</li>
                        <li>• Campaign performance</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">Examples:</h4>
                      <ul className="text-orange-700 space-y-1">
                        <li>• Facebook Pixel</li>
                        <li>• Google Analytics</li>
                        <li>• AdWords conversion tracking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Duration */}
            <section className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Cookie Duration</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                  <Clock className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Session Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Temporary cookies that expire when you close your browser
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                  <Clock className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Persistent Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Remain on your device for set periods (30 days to 2 years)
                  </p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                  <Settings className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">First-party Cookies</h3>
                  <p className="text-gray-600 text-sm">
                    Set by {contactInfo.websiteName} for our website functionality
                  </p>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Managing Your Cookie Preferences</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-3">Browser Settings</h3>
                  <p className="text-gray-600 mb-4">
                    You can control cookies through your web browser settings. Most browsers allow you to:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <ul className="text-gray-600 space-y-2">
                      <li>• View stored cookies</li>
                      <li>• Delete specific cookies</li>
                      <li>• Block third-party cookies</li>
                    </ul>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Clear all cookies on exit</li>
                      <li>• Set cookie preferences</li>
                      <li>• Enable/disable cookies</li>
                    </ul>
                  </div>
                </div>

                {/* <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                  <div className="flex items-center mb-3">
                    <Trash2 className="w-6 h-6 text-amber-600 mr-2" />
                    <h3 className="font-semibold text-amber-800">Opt-out Options</h3>
                  </div>
                  <p className="text-amber-700 mb-3">
                    You can opt-out of specific cookie types:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-amber-700">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Essential Cookies (Required)</span>
                    </div>
                    <div className="flex items-center text-amber-700">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Analytics Cookies</span>
                    </div>
                    <div className="flex items-center text-amber-700">
                      <input type="checkbox" className="mr-2" />
                      <span>Marketing Cookies</span>
                    </div>
                    <div className="flex items-center text-amber-700">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Preference Cookies</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="border-b pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Third-Party Cookies</h2>
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <p className="text-red-700 mb-4">
                  Some cookies on our website are set by third-party services we use to enhance 
                  your travel booking experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Service Providers:</h4>
                    <ul className="text-red-700 space-y-1">
                      <li>• Google Analytics</li>
                      <li>• Facebook Pixel</li>
                      <li>• Payment processors</li>
                      <li>• Social media platforms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Purpose:</h4>
                    <ul className="text-red-700 space-y-1">
                      <li>• Analytics and insights</li>
                      <li>• Social media integration</li>
                      <li>• Payment security</li>
                      <li>• Advertising effectiveness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Updates & Contact */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Updates & Contact</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-blue-800 mb-3">Policy Updates</h3>
                  <p className="text-blue-700">
                    We may update this Cookie Policy to reflect changes in technology, 
                    legislation, or our services. We encourage you to check this page 
                    periodically for the latest information.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-green-800 mb-3">Contact Information</h3>
                  <p className="text-green-700 mb-3">
                    If you have any questions about our use of cookies, please contact us:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-green-800">Email:</p>
                      <p className="text-green-700">{contactInfo.emails[0]}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">Phone:</p>
                      <p className="text-green-700">{contactInfo.phones[0]}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">Address:</p>
                      <p className="text-green-700">{contactInfo.location}</p>
                    </div>
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