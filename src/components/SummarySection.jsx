export default function SummarySection() {
  return (
    <div className="relative z-50 bg-[#0e1117] py-24 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Changed from 'space-y-6' to a grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Left Column: Image */}
          <div className="relative">
            <img
              src={"news_headline.png"}
              alt="News Headline: Helsinki Celebrates One Year Without Traffic Deaths"
              className="w-full h-auto rounded-lg shadow-2xl border border-slate-800/50"
            />
          </div>

          {/* Right Column: Text */}
          <div className="text-center md:text-left">
            <p className="text-xl md:text-3xl text-slate-300 leading-relaxed font-light">
              Helsinki’s success demonstrates that Vision Zero is not an
              abstract ideal but a measurable, achievable outcome when cities
              commit to evidence-based planning, disciplined enforcement and
              human-centered design. One year without traffic fatalities is
              both a milestone and a reminder:
              </p>
            <p className="text-xl md:text-3xl text-slate-300 leading-relaxed font-light">
              <span className="text-[#06d6a0] font-bold text-3xl mx-1">Safe streets are a deliberate choice, <br />NOT an accident.</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
