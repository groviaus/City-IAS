import { Metadata } from "next";

export const metadata = {
  title:
    "Best UPSC Coaching in Aligarh - City IAS Academy | Expert Faculty & Proven Results",
  description:
    "City IAS Academy - Leading UPSC coaching institute in Aligarh with expert faculty, comprehensive study materials, and proven success rate. Located in Kela Nagar, near AMU campus. Join the top UPSC coaching in Aligarh.",
  keywords: [
    "UPSC coaching Aligarh",
    "best UPSC coaching in Aligarh",
    "UPSC preparation Aligarh",
    "UPSC Civil Services coaching Aligarh",
    "UPSC coaching near AMU",
    "UPSC coaching Kela Nagar",
    "UPSC coaching fees Aligarh",
    "UPSC coaching with hostel",
    "UPSC coaching with expert faculty",
    "RCA vs City IAS Academy",
    "Residential Coaching Academy vs City IAS",
    "UPSC coaching comparison Aligarh",
  ],
  openGraph: {
    title: "Best UPSC Coaching in Aligarh - City IAS Academy",
    description:
      "Leading UPSC coaching institute in Aligarh with expert faculty and proven results. Located in Kela Nagar, near AMU campus.",
    url: "https://www.cityiasacademy.com/upsc-coaching-aligarh",
    siteName: "City IAS Academy",
    images: [
      {
        url: "https://www.cityiasacademy.com/CityIASLOGO.png",
        width: 1200,
        height: 630,
        alt: "Best UPSC Coaching in Aligarh - City IAS Academy",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cityiasacademy.com/upsc-coaching-aligarh",
  },
};

export default function UPSCCoachingAligarh() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best UPSC Coaching in Aligarh
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Expert Faculty • Comprehensive Study Material • Proven Success
              Rate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Apply Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose City IAS Academy for UPSC?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Expert Faculty</h3>
                <p>
                  Learn from experienced IAS officers and subject matter experts
                  with proven track record in UPSC preparation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Comprehensive Study Material
                </h3>
                <p>
                  Get access to updated study materials, current affairs, and
                  practice tests specifically designed for UPSC.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Proven Success Rate
                </h3>
                <p>
                  Join the institute with highest success rate in Aligarh for
                  UPSC Civil Services preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPSC Stages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Complete UPSC Preparation
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                  Prelims Preparation
                </h3>
                <ul className="space-y-3">
                  <li>• General Studies Paper I & II</li>
                  <li>• Current Affairs Coverage</li>
                  <li>• Mock Tests & Practice</li>
                  <li>• Previous Year Papers</li>
                </ul>
              </div>
              <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-500">
                <h3 className="text-2xl font-semibold mb-4 text-green-700">
                  Mains Preparation
                </h3>
                <ul className="space-y-3">
                  <li>• Essay Writing Skills</li>
                  <li>• Optional Subject Coaching</li>
                  <li>• Answer Writing Practice</li>
                  <li>• Comprehensive Coverage</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-8 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-2xl font-semibold mb-4 text-purple-700">
                  Interview Preparation
                </h3>
                <ul className="space-y-3">
                  <li>• Personality Development</li>
                  <li>• Mock Interviews</li>
                  <li>• Current Affairs Discussion</li>
                  <li>• Confidence Building</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our UPSC Coaching Programs
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Complete UPSC Course
                </h3>
                <ul className="space-y-3 mb-6">
                  <li>• Prelims + Mains + Interview</li>
                  <li>• General Studies + Optional</li>
                  <li>• Current Affairs coverage</li>
                  <li>• Mock tests and interviews</li>
                  <li>• Study material included</li>
                </ul>
                <p className="text-2xl font-bold text-blue-600">₹30,000</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Prelims + Mains</h3>
                <ul className="space-y-3 mb-6">
                  <li>• Focused on exam stages</li>
                  <li>• Intensive practice sessions</li>
                  <li>• Previous year papers</li>
                  <li>• Performance tracking</li>
                  <li>• Current affairs updates</li>
                </ul>
                <p className="text-2xl font-bold text-blue-600">₹100 + ₹1000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your UPSC Journey Today
          </h2>
          <p className="text-xl mb-8">
            Join the best UPSC coaching institute in Aligarh and achieve your
            dreams
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Apply Now - Limited Seats Available
          </button>
        </div>
      </section>
    </div>
  );
}
