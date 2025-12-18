import { Lightbulb } from "lucide-react";

export default function CoreIdeaSection() {
  return (
    <div className="relative z-50 bg-[#0e1117] py-24 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Lightbulb className="text-blue-500" size={40} />
            The Core Idea: A Safe and Forgiving System
          </h2>
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light">
            Central to Finland’s Vision Zero policy is the <strong className="text-white">Safe System</strong> approach,
            often summarized as <strong className="text-white">Forgiving Street Principles.</strong>{" "}
            Mobility is essential to everyday life, but human error is inevitable.
            Therefore, streets and vehicles must be designed so that mistakes do not result in death or severe injury.
          </p>
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-bold mt-12 text-white">
            The Safe System framework emphasizes:
          </p>
          <ul className="max-w-5xl list-disc pl-6 text-left mx-auto text-lg md:text-xl text-slate-300 leading-relaxed font-light space-y-2 mb-12">
            <li>
              <strong className="text-white">Shared responsibility:</strong> Infrastructure designers, policymakers, enforcement agencies, vehicle manufacturers and road users each play a role.
            </li>
            <li>
              <strong className="text-white">Redundancy and compensation:</strong> If one part of the system fails, others absorb the impact.
            </li>
            <li>
              <strong className="text-white">Proactive risk reduction:</strong> Safety measures are implemented before crashes occur.
            </li>
            <li>
              <strong className="text-white">Human-centered design:</strong> Speeds, road geometry, crossings and enforcement align with human physical limits.
            </li>
          </ul>

          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light">
            This mindset guides Helsinki’s long-term strategy and directly supports the EU goal of reducing road fatalities to near zero by 2050.
          </p>
        </div>
      </div>
    </div>
  );
}
