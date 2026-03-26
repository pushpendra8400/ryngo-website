export default function Business() {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-[#0B132B] mb-6">RynGO for Business</h1>
        <p className="text-xl text-gray-600">
          Streamline your company's travel. Manage employee rides, automate expenses, and provide a premium travel experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card hover-shadow-teal p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-300">
          <div className="w-16 h-16 bg-[#ECF4E8] rounded-2xl flex items-center justify-center mb-6 border border-white/60">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-bold text-[#0B132B] mb-3">Centralized Dashboard</h3>
          <p className="text-gray-600">Manage all employee rides and expenses from a single, intuitive interface.</p>
        </div>

        <div className="glass-card hover-shadow-teal p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-300">
          <div className="w-16 h-16 bg-[#ECF4E8] rounded-2xl flex items-center justify-center mb-6 border border-white/60">
            <span className="text-2xl">💼</span>
          </div>
          <h3 className="text-xl font-bold text-[#0B132B] mb-3">Automated Billing</h3>
          <p className="text-gray-600">Say goodbye to paper receipts. Enjoy consolidated monthly invoicing.</p>
        </div>

        <div className="glass-card hover-shadow-teal p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-300">
          <div className="w-16 h-16 bg-[#ECF4E8] rounded-2xl flex items-center justify-center mb-6 border border-white/60">
            <span className="text-2xl">⭐</span>
          </div>
          <h3 className="text-xl font-bold text-[#0B132B] mb-3">Premium Fleet</h3>
          <p className="text-gray-600">Ensure your employees and clients travel in the highest standard of comfort.</p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button className="bg-[#0B132B] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-black hover-shadow-teal transition-all duration-300 active:scale-95 border border-white/10">
          Get Started for Business
        </button>
      </div>
    </div>
  );
}
