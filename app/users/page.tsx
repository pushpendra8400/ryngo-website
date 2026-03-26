export default function Users() {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl font-bold text-[#0B132B] mb-8">Riders</h1>
      <p className="text-xl text-gray-600 mb-12 max-w-3xl">
        Experience the premium standard of ride booking. Whether you're commuting to work, heading to the airport, or going out for the night, RynGO is your reliable partner.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="glass-card hover-shadow-teal p-8 rounded-3xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4 text-[#0B132B]">Safety First</h2>
          <p className="text-gray-600 mb-6">
            Your safety is our top priority. All RynGO rides are tracked via GPS, and you can share your trip status with loved ones in real-time. Our drivers undergo rigorous background checks.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#0B4619] to-[#3D8C40]"></span>
              Verified Driver Profiles
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#0B4619] to-[#3D8C40]"></span>
              In-app Emergency Button
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#0B4619] to-[#3D8C40]"></span>
              24/7 Incident Support
            </li>
          </ul>
        </div>
        <div className="glass-card hover-shadow-teal p-8 rounded-3xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4 text-[#0B132B]">Transparent Pricing</h2>
          <p className="text-gray-600 mb-6">
            No hidden fees or unexpected surges. See the exact fare before you book. What you see is what you pay.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#0B4619] to-[#3D8C40]"></span>
              Upfront Estimates
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#0B4619] to-[#3D8C40]"></span>
              Multiple Payment Options
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#0B4619] to-[#3D8C40]"></span>
              Digital Receipts
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
