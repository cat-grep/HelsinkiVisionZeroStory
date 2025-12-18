import { BookOpen, Github } from "lucide-react";

export default function CitationSection() {
  return (
    <div className="relative z-50 bg-[#050608] py-16 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto text-slate-500">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
          <BookOpen size={20} />
          <h3 className="text-lg font-bold uppercase tracking-widest text-slate-400">
            Data Sources & References
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm">

          {/* COLUMN 1: The Hard Data (Shapefiles, APIs) */}
          <div className="space-y-4">
            <h4 className="text-[#3b82f6] font-semibold mb-2 uppercase tracking-wide">
              Geospatial Data & Infrastructure
            </h4>
            <ul className="space-y-3 list-disc pl-4 marker:text-slate-700">
              <li>
                <a
                  href="https://hri.fi/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Helsinki Region Infoshare (HRI)
                </a>{" "}
                – Core city datasets:
                <ul className="pl-4 mt-1 space-y-1 text-xs text-slate-600 list-[square]">
                  <li>Traffic Accidents (2000–2024)</li>
                  <li>District Divisions & Speed Limits</li>
                  <li>Bicycle Network (Baana 2025)</li>
                </ul>
              </li>

              <li>
                <a
                  href="https://vayla.fi/vaylista/aineistot/digiroad"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Finnish Transport Agency (Digiroad)
                </a>{" "}
                – National road network geometry, speed limits, and traffic sign data (speed cameras).
              </li>

              <li>
                <a
                  href="https://stat.fi/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Statistics Finland
                </a>{" "}
                – Educational institution locations (WFS) and national accident statistics.
              </li>

              <li>
                <a
                  href="https://www.helsinki.fi/en/researchgroups/digital-geography-lab"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Digital Geography Lab (U. Helsinki)
                </a>{" "}
                – Helsinki Region Travel Time Matrix (Accessibility data).
              </li>
            </ul>
          </div>

          {/* COLUMN 2: The Context (News, Reports, Policy) */}
          <div className="space-y-4">
            <h4 className="text-[#06d6a0] font-semibold mb-2 uppercase tracking-wide">
              Policy, Research & Media
            </h4>
            <ul className="space-y-3 list-disc pl-4 marker:text-slate-700">
              <li>
                <span className="text-slate-400">Vision Zero Policy Documents</span>
                <ul className="pl-4 mt-1 space-y-1 text-xs text-slate-600 list-[square]">
                  <li>Helsinki Traffic Safety Development Programme</li>
                  <li>
                    <a href="https://poliisi.fi/en/automatic-traffic-surveillance" className="hover:text-[#06d6a0]">
                      Police of Finland: Automatic Surveillance
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <span className="text-slate-400">Selected Media Coverage</span>
                <ul className="pl-4 mt-1 space-y-1 text-xs text-slate-600 list-[square]">
                  <li>
                    <a href="https://www.theguardian.com/world/2020/mar/16/how-helsinki-and-oslo-cut-pedestrian-deaths-to-zero" target="_blank" rel="noreferrer" className="hover:text-[#06d6a0]">
                      The Guardian: How Helsinki cut deaths to zero
                    </a>
                  </li>
                  <li>
                    <a href="https://www.weforum.org/agenda/2018/06/in-finland-speeding-tickets-are-linked-to-your-income/" target="_blank" rel="noreferrer" className="hover:text-[#06d6a0]">
                      WEF: Income-linked speeding tickets
                    </a>
                  </li>
                  <li>
                    POLITICO & City of Helsinki Press Releases
                  </li>
                </ul>
              </li>

              <li>
                <a href="https://vizhub.healthdata.org/gbd-results/" target="_blank" rel="noreferrer" className="hover:text-[#06d6a0]">
                  Global Burden of Disease (VizHub)
                </a>{" "}
                – Comparative global death rate data.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">

          <p>© 2025 Vision Zero Visualization Project. Built with React, D3.js & Kepler.gl.</p>

          <a
            href="https://github.com/cat-grep/HelsinkiVisionZeroStory"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Github size={16} className="group-hover:text-white transition-colors" />
            <span>View Source on GitHub</span>
          </a>

        </div>
      </div>
    </div>
  );
}