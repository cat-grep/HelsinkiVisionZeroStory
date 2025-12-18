import { useEffect, useRef, useState } from "react";
import { BookText } from "lucide-react";

export default function PolicySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cardRefs = useRef([]);
  const CARD_COUNT = 7;
  cardRefs.current = Array.from({ length: CARD_COUNT }, (_, i) => cardRefs.current[i] || null);

  // Scroll-based activeIndex: card closest to viewport center wins
  useEffect(() => {
    const handleScroll = () => {
      let closestIndex = 0;
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;

      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
    };

    // Run once on mount so the first card activates
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="relative z-50 bg-[#0e1117] py-24 px-6 md:px-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
              <BookText className="text-blue-500" size={40} />
              Policies That Delivered Results
            </h2>
          </div>
        </div>
      </div>
      <section className="relative bg-black text-white overflow-visible">
        {/* STICKY BACKGROUND VIEWPORT */}
        <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {/* BACKGROUND 0 */}
            <img
              src="bg0_SpeedLimit_2025.png"
              alt="Helsinki road network speed limits 2025"
              className={`absolute inset-0
                max-w-full max-h-full object-contain
                transition-opacity duration-700 ease-in-out
              ${activeIndex === 0 ? "opacity-100" : "opacity-0"}`}
            />

            {/* BACKGROUND 1 */}
            <img
              src="bg1_SpeedCamera_2025.png"
              alt="Helsinki road network speed camera 2025"
              className={`absolute inset-0
                max-w-full max-h-full object-contain
                transition-opacity duration-700 ease-in-out
              ${activeIndex === 1 ? "opacity-100" : "opacity-0"}`}
            />

            {/* BACKGROUND 2 */}
            <img
              src="bg2_EducationInstitution_2025.png"
              alt="Helsinki education institutions and school zones 2025"
              className={`absolute inset-0
                max-w-full max-h-full object-contain
                transition-opacity duration-700 ease-in-out
              ${activeIndex === 2 ? "opacity-100" : "opacity-0"}`}
            />

            {/* BACKGROUND 3 */}
            <img
              src="bg3_PedestrianSafety.png"
              alt="Helsinki pedestrian safety improvements 2025"
              className={`absolute inset-0
                max-w-full max-h-full object-contain
                transition-opacity duration-700 ease-in-out
              ${activeIndex === 3 ? "opacity-100" : "opacity-0"}`}
            />

            {/* BACKGROUND 4 */}
            <img
              src="bg4_BicycleLanes_2025.png"
              alt="Helsinki bike lanes 2025"
              className={`absolute inset-0
                max-w-full max-h-full object-contain
                transition-opacity duration-700 ease-in-out
              ${activeIndex === 4 ? "opacity-100" : "opacity-0"}`}
            />

            {/* BACKGROUND 5 */}
            <img
              src="bg5_PublicTransportation_2025.png"
              alt="Helsinki public transportation systems 2025"
              className={`absolute inset-0
                max-w-full max-h-full object-contain
                transition-opacity duration-700 ease-in-out
              ${activeIndex === 5 ? "opacity-100" : "opacity-0"}`}
            />

            {/* BACKGROUND 6 */}
            <img
              src="bg6_Enforcement_n_Fine.png"
              alt="Helsinki traffic enforcement and fine"
              className={`absolute inset-0
                max-w-full max-h-full object-contain
                transition-opacity duration-700 ease-in-out
              ${activeIndex === 6 ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>

        {/* FOREGROUND TRACK */}
        <div className="relative z-10 max-w-12xl mx-auto min-h-[80vh] px-4 md:px-12 pb-[100vh]">
          <div className="space-y-[70vh] mt-[20vh]">
            {/* FOREGROUND 1*/}
            <section
              data-index={0}
              ref={(el) => (cardRefs.current[0] = el)}
              className="min-h-[80vh] flex items-center"
            >
              <article
                className={`relative max-w-xl ml-auto rounded-2xl border p-8 backdrop-blur-md transition-all duration-300
                ${activeIndex === 0
                    ? "border-[#06d6a0] bg-black/85 shadow-2xl translate-y-1"
                    : "border-slate-700/70 bg-black/65 hover:border-slate-400/80"
                  }`}
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
                    01 / 08
                  </p>
                  <h3 className="text-2xl font-bold mb-3">Lower Urban Speed Limits</h3>
                  <p className="text-slate-100 text-sm md:text-base leading-relaxed mb-3">
                    Most residential streets in Helsinki now have <span className="text-[#06d6a0] font-bold text-m mx-1">30 km/h speed limits.</span>{" "}
                    Research consistently shows that lowering impact speed from 40 km/h to 30 km/h cuts a pedestrian’s fatality risk by roughly half.
                  </p>
                  <p className="text-slate-100 text-sm text-bold text-white md:text-base leading-relaxed mb-3">
                    The change works on:
                  </p>
                  <ul className="list-disc pl-6 text-left mx-auto text-sm text-slate-100 leading-relaxed font-light space-y-2">
                    <li>Significant improvements in overall road safety</li>
                    <li>Cost-effective citywide intervention</li>
                    <li>Lower crash-related costs</li>
                    <li>Reduced noise and air pollution</li>
                    <li>Increased perceived safety for walking and cycling</li>
                    <li>Negligible impact on travel time in dense urban areas</li>
                    <li>Little public resistance after implementation</li>
                    <li>Supplemental traffic-calming (speed bumps, narrowing, raised crossings) reinforces compliance</li>
                  </ul>
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-700/80 bg-black/60">
                  <img
                    src="1_30kmZones.jpg"
                    alt="30 km/h zones in Helsinki"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              </article>
            </section>

            {/* FOREGROUND 2 */}
            <section
              data-index={1}
              ref={(el) => (cardRefs.current[1] = el)}
              className="min-h-[80vh] flex items-center"
            >
              <article
                className={`relative max-w-xl ml-auto rounded-2xl border p-6 md:p-8 backdrop-blur-md transition-all duration-300
                ${activeIndex === 1
                    ? "border-[#06d6a0] bg-black/85 shadow-2xl translate-y-1"
                    : "border-slate-700/70 bg-black/65 hover:border-slate-400/80"
                  }`}
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
                    02 / 08
                  </p>
                  <h3 className="text-2xl font-bold mb-3">Automated Speed Enforcement</h3>
                  <p className="text-slate-100 text-sm md:text-base leading-relaxed mb-3">
                    Helsinki has progressively expanded its network of fixed automated speed cameras, paired with <span className="text-[#06d6a0] font-bold text-m mx-1">rigorous evaluation</span>{" "}
                    instead of blind deployment.
                  </p>
                  <p className="text-slate-100 text-sm text-bold text-white md:text-base leading-relaxed mb-3">
                    A <a href="https://cris.vtt.fi/en/publications/automaattisen-liikennevalvonnan-nopeusvaikutukset-helsingin-katuv/" target="_blank" className="underline text-blue-500 font-bold">2023 study</a> comparing speeds before (2019) and after (2022) installation found:
                  </p>
                  <ul className="list-disc pl-6 text-left mx-auto text-sm text-slate-100 leading-relaxed font-light space-y-2">
                    <li>Vehicles exceeding the limit by {">"}10 km/h dropped <strong className="text-white">56%</strong> (12% → 5%)</li>
                    <li>Overall speeding declined <strong className="text-white">16%</strong> (49% → 41%)</li>
                    <li>Mean speeds fell by 2.1 km/h in 40 km/h zones and 1.1 km/h in 50 km/h zones</li>
                  </ul>
                  <p className="text-slate-100 text-sm text-bold text-white md:text-base leading-relaxed mb-3">
                    A <a href="https://research.aalto.fi/en/publications/adaptation-of-road-users-to-fixed-location-speed-enforcement-came/" target="_blank" className="underline text-blue-500 font-bold">2025 follow-up study</a> revealed:
                  </p>
                  <ul className="list-disc pl-6 text-left mx-auto text-sm text-slate-100 leading-relaxed font-light space-y-2">
                    <li>Immediate reductions of ~10 km/h at camera sites</li>
                    <li>Spillover reductions ~5 km/h at nearby non-camera streets</li>
                    <li>Gradual behavioral adaptation over time</li>
                    <li>Long-term (8-year) reduction of ~5 km/h at camera locations</li>
                    <li>Mixed long-term effects at untreated sites</li>
                  </ul>
                  <p className="text-slate-100 text-sm md:text-base leading-relaxed mt-3">
                    Cameras work, but sustained gains require continuous monitoring and adaptive enforcement strategies.
                  </p>
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-700/80 bg-black/60">
                  <img
                    src="2_SpeedCamera.jpg"
                    alt="Speed camera in Helsinki"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              </article>
            </section>

            {/* FOREGROUND 3 */}
            <section
              data-index={2}
              ref={(el) => (cardRefs.current[2] = el)}
              className="min-h-[80vh] flex items-center"
            >
              <article
                className={`relative max-w-xl ml-auto rounded-2xl border p-6 md:p-8 backdrop-blur-md transition-all duration-300
                ${activeIndex === 2
                    ? "border-[#06d6a0] bg-black/85 shadow-2xl translate-y-1"
                    : "border-slate-700/70 bg-black/65 hover:border-slate-400/80"
                  }`}
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
                    03 / 08
                  </p>
                  <h3 className="text-2xl font-bold mb-3">Safer School Zones</h3>
                  <p className="text-slate-100 text-sm md:text-base leading-relaxed mb-3">
                    At the start of each school year,
                    Helsinki intensifies monitoring of pedestrian crossings near schools.{" "}
                    <a href="https://www.hel.fi/en/news/school-starting-parking-control-stepped-up-and-speed-limits-lowered" target="_blank" className="underline text-blue-500 font-bold">Policies</a> include:
                  </p>
                  <ul className="list-disc pl-6 text-left mx-auto text-sm text-slate-100 leading-relaxed font-light space-y-2">
                    <li>Targeted police and parking-control enforcement</li>
                    <li>Public campaigns explaining safe crossing rules</li>
                    <li>Speed limit reductions on 30+ adjacent streets</li>
                  </ul>
                  <p className="text-slate-100 text-sm text-bold text-white md:text-base leading-relaxed mb-3">
                    These measures protect children and reinforce safe behavior during high-risk periods.
                  </p>
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-700/80 bg-black/60">
                  <img
                    src="3_SchoolZoneSafety.jpg"
                    alt="School zone safety in Helsinki"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              </article>
            </section>

            {/* FOREGROUND 4 */}
            <section
              data-index={3}
              ref={(el) => (cardRefs.current[3] = el)}
              className="min-h-[80vh] flex items-center"
            >
              <article
                className={`relative max-w-xl ml-auto rounded-2xl border p-6 md:p-8 backdrop-blur-md transition-all duration-300
                ${activeIndex === 3
                    ? "border-[#06d6a0] bg-black/85 shadow-2xl translate-y-1"
                    : "border-slate-700/70 bg-black/65 hover:border-slate-400/80"
                  }`}
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
                    04 / 08
                  </p>
                  <h3 className="text-2xl font-bold mb-3">Eliminating Hazardous Pedestrian Crossings</h3>
                  <p className="text-slate-100 text-sm md:text-base leading-relaxed mb-3">
                    Helsinki conducted a comprehensive audit of all pedestrian crossings and redesigned or removed those that failed safety criteria.
                    Interventions included:
                  </p>
                  <ul className="list-disc pl-6 text-left mx-auto text-sm text-slate-100 leading-relaxed font-light space-y-2">
                    <li>Raised sidewalk, crossings and speed bumps</li>
                    <li>Narrowed roadway sections</li>
                    <li>Signalization changes</li>
                    <li><a href="https://www.hel.fi/en/news/helsinki-aims-to-get-rid-of-dangerous-pedestrian-crossings-first-unmarked-crossings-introduced" target="_blank" className="underline text-blue-500 font-bold">In some cases,</a>{" "}
                      converting unsafe crossings into <strong className="text-white">unmarked crossings,</strong> shifting right-of-way to vehicles but reducing misinterpretation risks</li>
                  </ul>
                  <p className="text-slate-100 text-sm text-bold text-white md:text-base leading-relaxed mb-3">
                    Safety benchmarks emphasize that crossings are only considered safe when <strong className="text-white">typical traffic speeds remain at or below 30 km/h.</strong>
                  </p>
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-700/80 bg-black/60">
                  <img
                    src="4_PedestrianSafety.png"
                    alt="Pedestrian safety in Helsinki"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              </article>
            </section>

            {/* FOREGROUND 5 */}
            <section
              data-index={4}
              ref={(el) => (cardRefs.current[4] = el)}
              className="min-h-[80vh] flex items-center"
            >
              <article
                className={`relative max-w-xl ml-auto rounded-2xl border p-6 md:p-8 backdrop-blur-md transition-all duration-300
                ${activeIndex === 4
                    ? "border-[#06d6a0] bg-black/85 shadow-2xl translate-y-1"
                    : "border-slate-700/70 bg-black/65 hover:border-slate-400/80"
                  }`}
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
                    05 / 08
                  </p>
                  <h3 className="text-2xl font-bold mb-3">High-Quality Cycling Infrastructure</h3>
                  <p className="text-slate-100 text-sm md:text-base leading-relaxed mb-3">
                    Helsinki continues to expand its network of <strong className="text-white">protected cycling lanes</strong>{" "}
                    and integrate them with efficient public transport. By reducing car dependence,
                    overall exposure to high-risk interactions declines.
                  </p>
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-700/80 bg-black/60">
                  <img
                    src="5_Bike.jpeg"
                    alt="Bike Lanes in Helsinki"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-700/80 bg-black/60">
                  <img
                    src="5_BikeSafety.jpg"
                    alt="Bike Lanes in Helsinki"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-700/80 bg-black/60">
                  <img
                    src="5_BikeProtect.jpg"
                    alt="Bike Lanes in Helsinki"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
              </article>
            </section>

            {/* FOREGROUND 6 */}
            <section
              data-index={5}
              ref={(el) => (cardRefs.current[5] = el)}
              className="min-h-[80vh] flex items-center"
            >
              <article
                className={`relative max-w-xl ml-auto rounded-2xl border p-6 md:p-8 backdrop-blur-md transition-all duration-300
                ${activeIndex === 5
                    ? "border-[#06d6a0] bg-black/85 shadow-2xl translate-y-1"
                    : "border-slate-700/70 bg-black/65 hover:border-slate-400/80"
                  }`}
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
                    06 / 08
                  </p>
                  <h3 className="text-2xl font-bold mb-3">Multimodal Transport System</h3>
                  <p className="text-slate-100 text-sm md:text-base leading-relaxed mb-3">
                    Helsinki’s public transport:
                    buses, trams/light rail, and metro, forms a tightly coordinated network.
                    Supporting research, such as the
                    <a href="https://www.nature.com/articles/s41597-020-0413-y" target="_blank" className="underline text-blue-500 font-bold">Helsinki Region Travel Time Matrix,</a>{" "}
                    provides:
                  </p>
                  <ul className="list-disc pl-6 text-left mx-auto text-sm text-slate-100 leading-relaxed font-light space-y-2">
                    <li>Multimodal travel times (walking, cycling, transit, car)</li>
                    <li>250 m grid-based accessibility comparisons</li>
                    <li>Time-series data for 2013, 2015, and 2018</li>
                    <li>Open-methodology, reproducible analyses</li>
                  </ul>
                  <p className="text-slate-100 text-sm text-bold text-white md:text-base leading-relaxed mb-3">
                    The dataset helps planners evaluate accessibility, refine transit service and design safer mobility choices.
                  </p>
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-700/80 bg-black/60">
                  <img
                    src="6_Metro.jpg"
                    alt="Metro of Helsinki"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-700/80 bg-black/60">
                  <a href="https://www.inat.fr/metro/helsinki/"
                    target="_blank">
                    <img
                      src="6_SubwayMap.png"
                      alt="Subway Map of Helsinki"
                      className="w-full max-h-128 object-cover"
                    />
                  </a>
                </div>
              </article>
            </section>

            {/* FOREGROUND 7 */}
            <section
              data-index={6}
              ref={(el) => (cardRefs.current[6] = el)}
              className="min-h-[80vh] flex items-center"
            >
              <article
                className={`relative max-w-xl ml-auto rounded-2xl border p-6 md:p-8 backdrop-blur-md transition-all duration-300
                ${activeIndex === 6
                    ? "border-[#06d6a0] bg-black/85 shadow-2xl translate-y-1"
                    : "border-slate-700/70 bg-black/65 hover:border-slate-400/80"
                  }`}
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
                    07 / 08
                  </p>
                  <h3 className="text-2xl font-bold mb-3">Income-Based Day-Fines</h3>
                  <p className="text-slate-100 text-sm md:text-base leading-relaxed mb-3">
                    Finland’s <a href="https://poliisi.fi/en/fine-counter" target="_blank" className="underline text-blue-500 font-bold">day-fine system,</a> in place since 1921, ensures that penalties for violations,
                    including speeding, are proportionate to income.
                    The goal is equal deterrence for low- and high-income drivers alike. <br />
                    Minimum fines:
                  </p>
                  <ul className="list-disc pl-6 text-left mx-auto text-sm text-slate-100 leading-relaxed font-light space-y-2">
                    <li>100 € for moped drivers</li>
                    <li>200 € for other motor vehicles</li>
                  </ul>
                  <p className="text-slate-100 text-sm text-bold text-white md:text-base leading-relaxed mb-3">
                    This system makes speeding financially consequential for everyone, reinforcing compliance.
                  </p>
                </div>

                <div className="mb-4 mt-36">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
                    08 / 08
                  </p>
                  <h3 className="text-2xl font-bold mb-3">Enforcement Against Impaired Driving</h3>
                  <p className="text-slate-100 text-sm md:text-base leading-relaxed mb-3">
                    Finland maintains a zero-tolerance policy for narcotics in traffic and conducts <a href="https://poliisi.fi/en/-/police-will-do-more-narcotics-testing-in-traffic" target="_blank" className="underline text-blue-500 font-bold">extensive roadside screenings:</a>
                  </p>
                  <ul className="list-disc pl-6 text-left mx-auto text-sm text-slate-100 leading-relaxed font-light space-y-2">
                    <li>Up to 17,000 narcotics tests annually</li>
                    <li>Alcohol and drug tests permitted without prior suspicion</li>
                    <li>Population-adjusted testing rates among the highest in Europe</li>
                  </ul>
                  <p className="text-slate-100 text-sm text-bold text-white md:text-base leading-relaxed mb-3">
                    High detection probability creates strong deterrence and prevents severe-injury crashes associated with impairment.
                  </p>
                </div>
              </article>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
