export default function IntroSection() {
  return (
    <div className="relative z-50 bg-[#0e1117] py-32 px-6 md:px-24 border-b border-slate-800">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            A Historic Milestone
          </h2>
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light">
            Between <strong className="text-white">July 2024</strong> and{" "}
            <strong className="text-white">July 2025</strong>, Helsinki recorded{" "}
            <span className="text-[#06d6a0] font-bold text-3xl mx-1">0</span>{" "}
            <strong className="text-white">traffic-related fatalities,</strong>{" "}
            marking a full year without a death on city streets. 
            Although a fatal crash occurred shortly afterward, 
            the uninterrupted 12-month period remains an exceptional safety achievement for a capital city.
          </p>
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light">
            City engineers, planners, and police describe this achievement as the result of{" "}
            <strong className="text-white">long-term, data-driven investment in road safety,</strong>{" "}
            anchored in Finland’s national <strong className="text-white">Vision Zero</strong> approach. 
            The philosophy is simple:{" "}
            <strong className="text-white">no loss of life is acceptable,</strong>{" "}
            and transportation systems must be designed to ensure that human mistakes do not become fatal ones.
            </p>
        </div>
      </div>
    </div>
  );
}
