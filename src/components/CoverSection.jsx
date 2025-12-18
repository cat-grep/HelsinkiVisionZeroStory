import { ChevronDown } from "lucide-react";
import { coverImageURL } from "../constants";

export default function CoverSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden z-50">
      <img
        src={coverImageURL}
        alt="Helsinki Cityscape"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0e1117]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-white/10 shadow-2xl">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 drop-shadow-2xl">
            Vision Zero
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-light tracking-wide uppercase">
            Helsinki&apos;s Journey to Zero Traffic Deaths
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <ChevronDown size={32} />
      </div>
    </div>
  );
}
