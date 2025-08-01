import { Metadata } from "next";

export const metadata = {
  title:
    "IAS Coaching Fees Aligarh 2024 - City IAS Academy | Affordable UPSC Coaching",
  description:
    "City IAS Academy offers affordable IAS coaching fees in Aligarh. Compare fees with RCA, Pratistha IAS Academy, and other institutes. Best value for money with expert faculty and comprehensive study material.",
  keywords: [
    "IAS coaching fees Aligarh",
    "UPSC coaching fees Aligarh",
    "IAS coaching fees 2024",
    "IAS coaching fees comparison Aligarh",
    "affordable IAS coaching Aligarh",
    "IAS coaching fees with hostel",
    "RCA vs City IAS fees",
    "Residential Coaching Academy fees",
    "Pratistha IAS Academy fees",
    "Katara Academy fees",
    "IAS coaching fees near AMU",
    "IAS coaching fees Kela Nagar",
  ],
  openGraph: {
    title: "IAS Coaching Fees Aligarh 2024 - City IAS Academy",
    description:
      "Affordable IAS coaching fees in Aligarh with expert faculty and comprehensive study material. Compare with other institutes.",
    url: "https://www.cityiasacademy.com/ias-coaching-fees-aligarh",
    siteName: "City IAS Academy",
    images: [
      {
        url: "https://www.cityiasacademy.com/CityIASLOGO.png",
        width: 1200,
        height: 630,
        alt: "IAS Coaching Fees Aligarh 2024 - City IAS Academy",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cityiasacademy.com/ias-coaching-fees-aligarh",
  },
};

export default function IASCoachingFees() {
  const institutes = [
    {
      name: "City IAS Academy",
      basicFee: "₹30,000",
      completeFee: "₹100 + ₹1000",
      features: [
        "Expert Faculty",
        "Study Material Included",
        "Mock Tests",
        "Interview Training",
        "Hostel Facility",
        "24/7 Support",
      ],
      rating: "4.9",
      reviews: "200+",
    },
    {
      name: "RCA (Residential Coaching Academy)",
      basicFee: "₹40,000",
      completeFee: "₹50,000",
      features: [
        "Government Backed",
        "Selective Admission",
        "Basic Facilities",
        "Limited Seats",
      ],
      rating: "4.6",
      reviews: "133",
    },
    {
      name: "Pratistha IAS Academy",
      basicFee: "₹45,000",
      completeFee: "₹55,000",
      features: [
        "Experienced Faculty",
        "Study Material",
        "Mock Tests",
        "Large Batches",
      ],
      rating: "4.9",
      reviews: "649",
    },
    {
      name: "Katara Academy",
      basicFee: "₹42,000",
      completeFee: "₹52,000",
      features: [
        "Experienced Staff",
        "Study Material",
        "Practice Tests",
        "Good Reviews",
      ],
      rating: "4.7",
      reviews: "671",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IAS Coaching Fees Aligarh 2024
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Affordable • Transparent • Best Value for Money
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View Packages
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Download Fee Structure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              IAS Coaching Fees Comparison 2024
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Institute</th>
                    <th className="p-4 text-center">Basic Package</th>
                    <th className="p-4 text-center">Complete Package</th>
                    <th className="p-4 text-center">Rating</th>
                    <th className="p-4 text-center">Features</th>
                  </tr>
                </thead>
                <tbody>
                  {institutes.map((institute, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="p-4 font-semibold">
                        {institute.name}
                        {institute.name === "City IAS Academy" && (
                          <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                            BEST VALUE
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center font-semibold">
                        {institute.basicFee}
                      </td>
                      <td className="p-4 text-center font-semibold">
                        {institute.completeFee}
                      </td>
                      <td className="p-4 text-center">
                        ⭐ {institute.rating} ({institute.reviews})
                      </td>
                      <td className="p-4">
                        <ul className="space-y-1">
                          {institute.features.map((feature, fIndex) => (
                            <li key={fIndex} className="text-sm">
                              • {feature}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Our Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our IAS Coaching Packages
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
                  <span className="text-gray-500 ml-2">/10 months</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li>• General Studies Coaching</li>
                  <li>• Study Material Included</li>
                  <li>• Mock Tests</li>
                  <li>• Current Affairs</li>
                  <li>• Basic Support</li>
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
                    ₹100 + ₹1000
                  </span>
                  <span className="text-gray-500 ml-2">FREE Program</span>
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

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose City IAS Academy?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold mb-4 text-green-700">
                  Best Value for Money
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Lowest fees among top institutes
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Study material included in fees
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    No hidden charges
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Flexible payment options
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Scholarship available for deserving students
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  Quality Education
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Expert faculty with IAS experience
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Comprehensive study material
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Regular mock tests and assessments
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Personal mentoring and guidance
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Proven success rate
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your IAS Journey Today
          </h2>
          <p className="text-xl mb-8">
            Join the best IAS coaching institute in Aligarh at affordable fees
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Enroll Now - Limited Seats Available
          </button>
        </div>
      </section>
    </div>
  );
}
