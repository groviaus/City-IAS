import { Metadata } from "next";

export const metadata = {
  title:
    "IAS Coaching in Kela Nagar Aligarh - City IAS Academy | Near AMU Campus",
  description:
    "City IAS Academy - Best IAS coaching institute in Kela Nagar, Aligarh. Located near AMU campus with expert faculty, comprehensive study materials, and hostel facilities. Join the top IAS coaching in Kela Nagar.",
  keywords: [
    "IAS coaching Kela Nagar Aligarh",
    "IAS coaching near Kela Nagar",
    "IAS coaching near AMU campus",
    "IAS coaching E-11 Aligarh",
    "IAS coaching Kela Nagar fees",
    "IAS coaching Kela Nagar location",
    "best IAS coaching Kela Nagar",
    "UPSC coaching Kela Nagar",
    "IAS coaching near AMU",
    "IAS coaching hostel Kela Nagar",
    "RCA vs City IAS Kela Nagar",
    "Residential Coaching Academy vs City IAS location",
  ],
  openGraph: {
    title: "IAS Coaching in Kela Nagar Aligarh - City IAS Academy",
    description:
      "Best IAS coaching institute in Kela Nagar, Aligarh. Located near AMU campus with expert faculty and hostel facilities.",
    url: "https://www.cityiasacademy.com/ias-coaching-kela-nagar",
    siteName: "City IAS Academy",
    images: [
      {
        url: "https://www.cityiasacademy.com/CityIASLOGO.png",
        width: 1200,
        height: 630,
        alt: "IAS Coaching in Kela Nagar Aligarh - City IAS Academy",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.cityiasacademy.com/ias-coaching-kela-nagar",
  },
};

export default function IASCoachingKelaNagar() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IAS Coaching in Kela Nagar Aligarh
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Located Near AMU Campus • Expert Faculty • Hostel Facilities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Apply Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Location
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Advantage */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Kela Nagar Location?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-600">
                  Perfect Location in Aligarh
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong>Near AMU Campus:</strong> Just 5 minutes from
                      Aligarh Muslim University
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong>Easy Accessibility:</strong> Well-connected by
                      public transport from all parts of Aligarh
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong>Student-Friendly Area:</strong> Safe and secure
                      environment for students
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong>Hostel Facilities:</strong> Accommodation
                      available for outstation students
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <div>
                      <strong>Market Access:</strong> Close to markets,
                      restaurants, and essential services
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-600">
                  Address & Contact
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      City IAS Academy
                    </h4>
                    <p className="text-gray-700">
                      Kela Nagar
                      <br />
                      Aligarh, Uttar Pradesh 202001
                      <br />
                      India
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Contact Information
                    </h4>
                    <p className="text-gray-700">
                      Phone: +91 86307 03335
                      <br />
                      Email: cityiasacademy.aligarh@gmail.com
                      <br />
                      Hours: Monday - Saturday, 11:00 AM - 7:00 PM
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">How to Reach</h4>
                    <p className="text-gray-700">
                      • From AMU Campus: 5 minutes walk
                      <br />
                      • From Railway Station: 15 minutes by auto
                      <br />• From Bus Stand: 10 minutes by auto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison with Other Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Kela Nagar is Better Than Other Locations
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">
                  vs Ramghat Road
                </h3>
                <ul className="space-y-2">
                  <li>✓ Closer to AMU campus</li>
                  <li>✓ Quieter study environment</li>
                  <li>✓ Better hostel facilities</li>
                  <li>✓ More affordable accommodation</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-700">
                  vs Marris Road
                </h3>
                <ul className="space-y-2">
                  <li>✓ Less traffic congestion</li>
                  <li>✓ Better air quality</li>
                  <li>✓ More peaceful atmosphere</li>
                  <li>✓ Easier parking</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">
                  vs GT Road
                </h3>
                <ul className="space-y-2">
                  <li>✓ More accessible location</li>
                  <li>✓ Better public transport</li>
                  <li>✓ Closer to university</li>
                  <li>✓ Student-friendly area</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Facilities at Kela Nagar Location
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-600">
                  Academic Facilities
                </h3>
                <ul className="space-y-3">
                  <li>• Modern classrooms with AC</li>
                  <li>• Digital learning equipment</li>
                  <li>• Library with study material</li>
                  <li>• Computer lab for online tests</li>
                  <li>• Conference room for group discussions</li>
                  <li>• Wi-Fi enabled campus</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-600">
                  Hostel & Accommodation
                </h3>
                <ul className="space-y-3">
                  <li>• Separate hostel for boys and girls</li>
                  <li>• Clean and hygienic rooms</li>
                  <li>• 24/7 security</li>
                  <li>• Mess facility with nutritious food</li>
                  <li>• Laundry service</li>
                  <li>• Medical assistance</li>
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
            Visit Our Kela Nagar Campus
          </h2>
          <p className="text-xl mb-8">
            Experience the best IAS coaching in Kela Nagar, Aligarh
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Schedule a Visit
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Get Directions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
