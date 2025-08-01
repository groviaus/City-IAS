import { Metadata } from "next";

export const metadata = {
  title:
    "IAS Study Material Aligarh - City IAS Academy | Comprehensive UPSC Books",
  description:
    "City IAS Academy provides comprehensive IAS study material in Aligarh. Updated books, current affairs, mock tests, and digital resources for UPSC preparation. Get the best study material for IAS exam.",
  keywords: [
    "IAS study material Aligarh",
    "UPSC study material Aligarh",
    "IAS books Aligarh",
    "UPSC books Aligarh",
    "IAS study material with books",
    "UPSC study material with books",
    "IAS current affairs material",
    "UPSC current affairs material",
    "IAS mock test material",
    "UPSC mock test material",
    "RCA vs City IAS study material",
    "Residential Coaching Academy study material",
  ],
  openGraph: {
    title: "IAS Study Material Aligarh - City IAS Academy",
    description:
      "Comprehensive IAS study material in Aligarh with updated books and digital resources for UPSC preparation.",
    url: "https://www.cityiasacademy.com/ias-study-material",
    siteName: "City IAS Academy",
    images: [
      {
        url: "https://www.cityiasacademy.com/CityIASLOGO.png",
        width: 1200,
        height: 630,
        alt: "IAS Study Material Aligarh - City IAS Academy",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cityiasacademy.com/ias-study-material",
  },
};

export default function IASStudyMaterial() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IAS Study Material Aligarh
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Comprehensive Books • Updated Content • Digital Resources
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Study Material
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Download Sample
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Study Material Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Complete IAS Study Material
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                  Printed Books
                </h3>
                <ul className="space-y-3">
                  <li>• NCERT Books (Class 6-12)</li>
                  <li>• Standard Reference Books</li>
                  <li>• Previous Year Papers</li>
                  <li>• Subject-wise Study Guides</li>
                  <li>• Optional Subject Books</li>
                  <li>• Essay Writing Books</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-green-600">
                  Digital Resources
                </h3>
                <ul className="space-y-3">
                  <li>• E-books and PDFs</li>
                  <li>• Online Mock Tests</li>
                  <li>• Video Lectures</li>
                  <li>• Current Affairs Updates</li>
                  <li>• Mobile App Access</li>
                  <li>• Study Planner</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-purple-600">
                  Practice Material
                </h3>
                <ul className="space-y-3">
                  <li>• Mock Test Series</li>
                  <li>• Previous Year Questions</li>
                  <li>• Answer Writing Practice</li>
                  <li>• Essay Topics</li>
                  <li>• Interview Questions</li>
                  <li>• Performance Analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subject-wise Material */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Subject-wise Study Material
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  General Studies
                </h3>
                <ul className="space-y-2">
                  <li>• Indian Polity & Governance</li>
                  <li>• Indian Economy</li>
                  <li>• Geography of India</li>
                  <li>• Indian History</li>
                  <li>• Environment & Ecology</li>
                  <li>• Science & Technology</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-700">
                  Optional Subjects
                </h3>
                <ul className="space-y-2">
                  <li>• Public Administration</li>
                  <li>• Geography</li>
                  <li>• History</li>
                  <li>• Sociology</li>
                  <li>• Political Science</li>
                  <li>• Economics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Material Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Study Material Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200">
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  Basic Package
                </h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-blue-600">
                    ₹5,000
                  </span>
                  <span className="text-gray-500 ml-2">/year</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li>• NCERT Books Set</li>
                  <li>• Basic Reference Books</li>
                  <li>• Previous Year Papers</li>
                  <li>• Digital Access</li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Package
                </button>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  Complete Package
                </h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-blue-600">
                    ₹8,000
                  </span>
                  <span className="text-gray-500 ml-2">/year</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li>• All Basic Package Features</li>
                  <li>• Optional Subject Books</li>
                  <li>• Mock Test Series</li>
                  <li>• Current Affairs Updates</li>
                  <li>• Video Lectures</li>
                  <li>• Mobile App Access</li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Package
                </button>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200">
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  Premium Package
                </h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-blue-600">
                    ₹12,000
                  </span>
                  <span className="text-gray-500 ml-2">/year</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li>• All Complete Package Features</li>
                  <li>• Personal Study Plan</li>
                  <li>• One-on-One Guidance</li>
                  <li>• Performance Tracking</li>
                  <li>• Priority Support</li>
                  <li>• Success Guarantee</li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Your Study Material Today
          </h2>
          <p className="text-xl mb-8">
            Join the best IAS coaching institute in Aligarh with comprehensive
            study material
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Get Study Material - Limited Stock
          </button>
        </div>
      </section>
    </div>
  );
}
