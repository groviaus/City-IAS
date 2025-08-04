import { Metadata } from "next";

export const metadata = {
  title:
    "IAS Preparation Course Aligarh - City IAS Academy | Complete UPSC Preparation",
  description:
    "City IAS Academy offers comprehensive IAS preparation course in Aligarh. Expert faculty, complete study material, mock tests, and interview preparation. Join the best IAS preparation course in Aligarh.",
  keywords: [
    "IAS preparation course Aligarh",
    "UPSC preparation course Aligarh",
    "IAS coaching course Aligarh",
    "complete IAS preparation Aligarh",
    "IAS preparation with study material",
    "IAS preparation with mock tests",
    "IAS preparation with interview training",
    "IAS preparation course fees Aligarh",
    "RCA vs City IAS preparation course",
    "Residential Coaching Academy vs City IAS course",
  ],
  openGraph: {
    title: "IAS Preparation Course Aligarh - City IAS Academy",
    description:
      "Complete IAS preparation course in Aligarh with expert faculty and comprehensive study material. Located in Kela Nagar, near AMU campus.",
    url: "https://www.cityiasacademy.com/ias-preparation-course",
    siteName: "City IAS Academy",
    images: [
      {
        url: "https://www.cityiasacademy.com/CityIASLOGO.png",
        width: 1200,
        height: 630,
        alt: "IAS Preparation Course Aligarh - City IAS Academy",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cityiasacademy.com/ias-preparation-course",
  },
};

export default function IASPreparationCourse() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IAS Preparation Course Aligarh
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Complete UPSC Preparation • Expert Faculty • Proven Results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Enroll Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Complete IAS Preparation Course
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                  Course Highlights
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Expert faculty with IAS experience
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Comprehensive study material
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Daily current affairs updates
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Regular mock tests
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Interview preparation
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Personal mentoring
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                  Course Duration
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Foundation Course</h4>
                    <p className="text-gray-600">
                      12 months comprehensive preparation
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold">Prelims + Mains</h4>
                    <p className="text-gray-600">
                      8 months focused preparation
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold">Interview Training</h4>
                    <p className="text-gray-600">2 months intensive training</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Course Modules
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
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
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">
                  Specialized Training
                </h3>
                <ul className="space-y-2">
                  <li>• Essay Writing</li>
                  <li>• Answer Writing</li>
                  <li>• Current Affairs</li>
                  <li>• Mock Tests</li>
                  <li>• Interview Skills</li>
                  <li>• Personality Development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Fees */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Course Fees & Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200">
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  Basic Package
                </h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-blue-600">
                    ₹30,000
                  </span>
                  <span className="text-gray-500 ml-2">/year</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li>• General Studies Coaching</li>
                  <li>• Study Material</li>
                  <li>• Mock Tests</li>
                  <li>• Current Affairs</li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Enroll Now
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
                    ₹45,000
                  </span>
                  <span className="text-gray-500 ml-2">/year</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li>• Complete IAS Preparation</li>
                  <li>• Optional Subject Coaching</li>
                  <li>• Interview Training</li>
                  <li>• Personal Mentoring</li>
                  <li>• Hostel Facility</li>
                  <li>• 24/7 Support</li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Enroll Now
                </button>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200">
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  Premium Package
                </h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-blue-600">
                    ₹55,000
                  </span>
                  <span className="text-gray-500 ml-2">/year</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li>• All Complete Package Features</li>
                  <li>• One-on-One Mentoring</li>
                  <li>• Custom Study Plan</li>
                  <li>• Priority Support</li>
                  <li>• Extra Mock Tests</li>
                  <li>• Performance Analytics</li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Enroll Now
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
            Start Your IAS Preparation Today
          </h2>
          <p className="text-xl mb-8">
            Join the best IAS preparation course in Aligarh and achieve your
            dreams
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Enroll Now - Limited Seats Available
          </button>
        </div>
      </section>
    </div>
  );
}
