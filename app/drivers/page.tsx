export default function Drivers() {
  return (
    <div className="py-20 md:py-32 bg-[#0B132B] text-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
            Drive with <span className="text-[#ECF4E8]">Ryngo</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Turn your miles into money. Enjoy flexible hours, competitive earnings, and the support of a premium network.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            <div className="border border-white/20 rounded-2xl p-6 bg-white/5 backdrop-blur-sm hover-shadow-teal transition-all duration-300">
              <h3 className="text-3xl font-bold text-white mb-2">0%</h3>
              <p className="text-gray-400 font-medium">Commission for first month</p>
            </div>
            <div className="border border-white/20 rounded-2xl p-6 bg-white/5 backdrop-blur-sm hover-shadow-teal transition-all duration-300">
              <h3 className="text-3xl font-bold text-white mb-2">₹55k+</h3>
              <p className="text-gray-400 font-medium">Avg monthly earnings</p>
            </div>
            <div className="border border-white/20 rounded-2xl p-6 bg-white/5 backdrop-blur-sm hover-shadow-teal transition-all duration-300">
              <h3 className="text-3xl font-bold text-white mb-2">24/7</h3>
              <p className="text-gray-400 font-medium">Partner support</p>
            </div>
          </div>

          <button className="bg-[#ECF4E8] text-[#0B132B] px-10 py-5 rounded-full text-xl font-bold hover-shadow-teal transition-all active:scale-[0.98] border border-white/20">
            Sign up to drive
          </button>
        </div>
      </div>
    </div>
  );
}
