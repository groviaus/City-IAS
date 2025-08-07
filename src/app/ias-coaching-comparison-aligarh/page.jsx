import { Metadata } from "next";

export const metadata = {
  title:
    "IAS Coaching Comparison Aligarh 2025 - City IAS vs Others | Best IAS Academy",
  description:
    "Compare top IAS coaching institutes in Aligarh: City IAS Academy, Pratistha IAS Academy, Katara Academy, JMD Academy. Find the best UPSC coaching with expert faculty and proven results.",
  keywords: [
    "IAS coaching comparison Aligarh",
    "Pratistha IAS Academy vs City IAS",
    "Katara Academy vs City IAS",
    "best IAS coaching Aligarh 2025",
    "IAS coaching fees comparison Aligarh",
    "UPSC coaching comparison Aligarh",
    "JMD Academy vs City IAS",
    "IAS coaching institutes Aligarh",
  ],
  openGraph: {
    title: "IAS Coaching Comparison Aligarh 2025 - Find the Best",
    description:
      "Compare top IAS coaching institutes in Aligarh. See why City IAS Academy leads with expert faculty and proven results.",
    url: "https://www.cityiasacademy.com/ias-coaching-comparison-aligarh",
    siteName: "City IAS Academy",
    images: [
      {
        url: "https://www.cityiasacademy.com/CityIASLOGO.png",
        width: 1200,
        height: 630,
        alt: "IAS Coaching Comparison Aligarh 2025",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cityiasacademy.com/ias-coaching-comparison-aligarh",
  },
};

export default function IASCoachingComparison() {
  const institutes = [
    {
      name: "City IAS Academy",
      rating: "4.9",
      reviews: "200+",
      location: "Kela Nagar",
      fees: "₹30,000",
      features: [
        "Expert Faculty",
        "Comprehensive Study Material",
        "24/7 Support",
        "Hostel Facility",
        "Personal Mentoring",
        "Mock Tests & Interviews",
      ],
      pros: [
        "Highest success rate in Aligarh",
        "Experienced faculty",
        "Comprehensive study material",
        "Personal attention",
        "Hostel facilities available",
      ],
      cons: ["Limited batch size"],
    },
    {
      name: "Pratistha IAS Academy",
      rating: "4.9",
      reviews: "649",
      location: "Near Meenakshi Flyover, Ramghat Rd",
      fees: "₹50,000+",
      features: [
        "Experienced Faculty",
        "Study Material",
        "Mock Tests",
        "Interview Preparation",
      ],
      pros: ["Good ratings", "Established brand", "Experienced faculty"],
      cons: ["Higher fees", "Large batch sizes", "Limited personal attention"],
    },
    {
      name: "Katara Academy",
      rating: "4.7",
      reviews: "671",
      location: "Ramghat Rd, Near Meenakshi Bridge",
      fees: "₹48,000+",
      features: ["Faculty", "Study Material", "Practice Tests"],
      pros: ["Good reviews", "Experienced staff"],
      cons: ["Large batches", "Less personal attention", "Higher fees"],
    },
    {
      name: "JMD Academy",
      rating: "4.9",
      reviews: "323",
      location: "GT Rd, Darshan Vihar Colony",
      fees: "₹42,000+",
      features: ["Faculty", "Study Material", "Mock Tests"],
      pros: ["Good ratings", "10+ years experience"],
      cons: ["Limited facilities", "Basic infrastructure"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IAS Coaching Comparison Aligarh 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Find the Best IAS Coaching Institute in Aligarh
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Complete Comparison of Top IAS Coaching Institutes
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Institute</th>
                    <th className="p-4 text-center">Rating</th>
                    <th className="p-4 text-center">Location</th>
                    <th className="p-4 text-center">Fees</th>
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
                            RECOMMENDED
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        ⭐ {institute.rating} ({institute.reviews})
                      </td>
                      <td className="p-4 text-center">{institute.location}</td>
                      <td className="p-4 text-center font-semibold">
                        {institute.fees}
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

      {/* Detailed Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why City IAS Academy Leads the Competition
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold mb-4 text-green-700">
                  Our Advantages
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Expert faculty with proven track record
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Comprehensive study material included
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Personal mentoring and attention
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Hostel facilities for outstation students
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    24/7 support and guidance
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Competitive fees with better value
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  Location Advantage
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Near AMU Campus - student-friendly area
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Easy accessibility from all parts of Aligarh
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Well-connected by public transport
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Safe and secure environment
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Hostel facilities available
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Success Metrics Comparison
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  200+
                </div>
                <div className="text-gray-600">Successful Students</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  4.9⭐
                </div>
                <div className="text-gray-600">Student Rating</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Choose the Best IAS Coaching in Aligarh
          </h2>
          <p className="text-xl mb-8">
            Join City IAS Academy and start your journey towards becoming an IAS
            officer
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Apply Now - Limited Seats Available
          </button>
        </div>
      </section>
    </div>
  );
}
