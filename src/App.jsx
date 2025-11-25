import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skull, AlertTriangle, Activity, Navigation, ChevronUp, ChevronDown, MoveHorizontal, Globe, BookOpen} from 'lucide-react';

const coverImageURL = "https://a.cdn-hotels.com/gdcs/production30/d1949/f4ed2076-6fd9-4a30-9d99-f4ed71bdf7b5.jpg";
const trafficDataURL = '/Helsinki_Traffic_Records.json';
const policiesDataURL = '/Helsinki_Traffic_Policies.json';

// Helper to get images (Shared between Background and Gallery)
const getMapImage = (year) => {
    const mapFiles = {
        2014: '2014.png',
        2015: '2014.png', // Fallback
        2016: '2016.png',
        2017: '2017.png',
        2018: '2018.png',
        2019: '2019.png',
        2020: '2020.png',
        2021: '2021.png',
        2022: '2022.png',
        2023: '2022.png', // Fallback
        2024: '2024.png'
    };
    return mapFiles[year] || '2014.png';
};

// SUB-COMPONENT: Cover Section
const CoverSection = () => {
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
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">
           Vision Zero
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-light tracking-wide uppercase">
            Helsinki's Journey to Zero Traffic Deaths
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <ChevronDown size={32} />
      </div>
    </div>
  );
};

// SUB-COMPONENT: Intro Text Section
const IntroSection = () => {
  return (
    <div className="relative z-50 bg-[#0e1117] py-32 px-6 md:px-24 border-b border-slate-800">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            A Historic Milestone
          </h2>
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light">
            Between <strong className="text-white">July 2024</strong> and <strong className="text-white">July 2025</strong>, Helsinki recorded <span className="text-[#06d6a0] font-bold text-3xl mx-1">0</span> traffic-related fatalities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 text-left mt-16">
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="text-blue-500" /> The Strategy
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Helsinki's success isn't accidental. It is the result of the systematic <strong>Vision Zero</strong> policy. By redesigning streets, improving fidelity, and critically, <strong>lowering speed limits</strong>, the city has squeezed the probability of fatal accidents down to zero.
            </p>
          </div>
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Navigation className="text-green-500" /> The Transformation
            </h3>
            <p className="text-slate-400 leading-relaxed">
              This visualization tracks the decade-long transformation of Helsinki's road network. Scroll down to witness how the city gradually reduced speed limits, turning high-speed zones into safety corridors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// SUB-COMPONENT: Background Images
const ImageBackground = ({ activeYear, trafficData = [] }) => {
    return (
        <div className="fixed inset-0 z-0 bg-[#0e1117]">
            {trafficData.map((data) => (
                <img
                    key={data.year}
                    src={getMapImage(data.year)}
                    alt={`Map of ${data.year}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activeYear === data.year ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ filter: 'contrast(1.1) brightness(0.9)' }}
                />
            ))}
            <div className="absolute inset-0 from-[#0e1117] via-transparent to-[#0e1117]/80 mix-blend-multiply" />
        </div>
    );
};

// Customized Dot - Now accepts a 'color' prop to match the line
const CustomizedDot = (props) => {
    const { cx, cy, payload, activeYear, stroke } = props; // 'stroke' comes from the Line component

    if (payload.year === activeYear) {
        return (
            <svg x={cx - 12} y={cy - 12} width={24} height={24} className="overflow-visible z-50">
                <circle cx="12" cy="12" r="4" fill={stroke} stroke="white" strokeWidth="2" />
                <circle cx="12" cy="12" r="10" fill="none" stroke={stroke} strokeWidth="2" opacity="0.6">
                    <animate attributeName="r" from="8" to="16" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
            </svg>
        );
    }
    // Default dot for non-active years
    return <circle cx={cx} cy={cy} r={2} fill="#555" stroke="none" />;
};

// SUB-COMPONENT: Simplified Map Gallery (Row only)
const MapGallery = ({ trafficData = [], onOpen }) => {
    const excludedYears = new Set([2015, 2023]);
    const items = trafficData.filter(d => !excludedYears.has(d.year));

    return (
        <div className="relative z-50 bg-[#0e1117] border-t border-slate-800 py-20 mt-[15vh]">
            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-6 no-scrollbar items-start">
                {items.map((data) => (
                    <div key={data.year} className="flex-shrink-0 flex flex-col items-center gap-4 group cursor-pointer" onClick={() => onOpen && onOpen(data.year)} role="button" tabIndex={0}>
                        <div className="w-80 sm:w-96 md:w-[28rem] aspect-video rounded-lg overflow-hidden border border-slate-800 transition-transform duration-300 group-hover:border-slate-500 group-hover:scale-110">
                            <img
                                src={getMapImage(data.year)}
                                alt={`Map ${data.year}`}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                        <span className="font-mono text-base md:text-lg text-slate-400 group-hover:text-white transition-colors">
                            {data.year}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// SUB-COMPONENT: Comparison Slider Component
const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMove = (event) => {
    if (!isDragging || !containerRef.current) return;
    
    const { left, width } = containerRef.current.getBoundingClientRect();
    // Support both mouse and touch events
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    
    let position = ((clientX - left) / width) * 100;
    position = Math.max(0, Math.min(100, position)); // Clamp between 0 and 100
    
    setSliderPosition(position);
  };

  // Handle "jump to click" functionality if user clicks anywhere on the bar
  const handleClick = (event) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = event.clientX;
    let position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
    setIsDragging(true); // Start dragging immediately on click
  };

  return (
    <div className="relative h-screen z-50 bg-[#0e1117] py-24 px-4 md:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">The Transformation</h2>
          <p className="text-slate-400">Swipe to compare the road network fidelity and limits between 2014 and 2024.</p>
        </div>

        {/* Comparison Container */}
        <div 
          ref={containerRef}
          className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-700 shadow-2xl cursor-ew-resize select-none group"
          onMouseDown={handleClick} // Initial click
          onMouseMove={handleMove}  // Dragging
          onMouseUp={handleMouseUp} // Release
          onMouseLeave={handleMouseUp} // Release if mouse leaves container
          onTouchStart={handleMouseDown}
          onTouchMove={handleMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Background Image (2024 - After) */}
          <img 
            src={getMapImage(2024)} 
            alt="2024 Map" 
            className="absolute inset-0 w-full h-full object-cover  pointer-events-none"
          />
          
          {/* Overlay Image (2014 - Before) - Clipped */}
          <div 
            className="absolute inset-0 overflow-hidden border-r-2 border-white/50  pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={getMapImage(2014)} 
              alt="2014 Map" 
              className="absolute inset-0 w-full max-w-none h-full object-cover"
              // We use max-w-none and w-[100vw] logic via CSS normally, 
              // but here we just ensure it matches the parent container's dimensions exactly
              // so it doesn't squish.
              style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
            />
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-white font-mono text-sm border border-red-500/30 text-red-400 pointer-events-none">
            2014
          </div>
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-white font-mono text-sm border border-green-500/30 text-green-400 pointer-events-none">
            2024
          </div>

          {/* Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
              <MoveHorizontal size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SUB-COMPONENT: Policy Section with Image Cards
const PolicySection = ({ policiesData = []}) => {
  return (
    <div className="relative z-50 bg-[#0e1117] py-24 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Comprehensive Safety Measures</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A holistic ecosystem of policies and engineering interventions drives Helsinki's safety record.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policiesData.map((item, index) => {
            return (
              <div key={index} className="group bg-slate-900/40 border border-slate-800 hover:border-[#3b82f6]/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer" onClick={() => window.open(item.source, '_blank')}>
                
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  
                  {/* Number badge */}
                  <div className="absolute top-4 right-4 text-slate-400/50 font-mono text-4xl font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#3b82f6] transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
                    {item.summary}
                  </p>
                  
                  {/* <div className="border-l-2 border-[#06d6a0] pl-3 mb-4">
                    <p className="text-white text-sm italic">
                      "{item.caption}"
                    </p>
                  </div> */}
                  
                  {/* <div className="pt-4 border-t border-slate-800">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate" title={item.source}>
                      Src: {item.source}
                    </p>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// SUB-COMPONENT: Gloabl Context
const GlobalContextSection = () => {
  return (
    <div className="relative z-50 bg-[#0e1117] py-24 px-6 md:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <div className="text-blue-500" size={40} /> Global Context
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            How road safety compares worldwide. Finland's consistent progress places it among the global leaders in traffic safety.
          </p>
        </div>
        
        <div className="w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
          <iframe 
            src="https://ourworldindata.org/grapher/death-rates-road-incidents?tab=map" 
            loading="lazy" 
            style={{ width: '100%', height: '600px', border: '0px none' }}
            allow="web-share; clipboard-write"
            title="Global Road Traffic Death Rates"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Citation
const CitationSection = () => {
  return (
    <div className="relative z-50 bg-[#050608] py-16 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto text-slate-500">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
          <BookOpen size={20} />
          <h3 className="text-lg font-bold uppercase tracking-widest text-slate-400">Data Sources & References</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm">
          <div className="space-y-4">
            <h4 className="text-[#3b82f6] font-semibold mb-2">Primary Datasets</h4>
            <ul className="space-y-3 list-disc pl-4">
              <li>
                <a href="https://hri.fi/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Helsinki Region Infoshare (HRI)
                </a> - Speed limit shapefiles (2014–2025).
              </li>
              <li>
                <a href="https://stat.fi/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Statistics Finland (Tilastokeskus)
                </a> - Annual road traffic accident statistics (1931–2024).
              </li>
              <li>
                <a href="https://ourworldindata.org/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Our World in Data
                </a> - Global road incident death rates.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[#06d6a0] font-semibold mb-2">Policy & Research</h4>
            <ul className="space-y-3 list-disc pl-4">
              <li>Helsinki Traffic Safety Development Programme 2022–2026.</li>
              <li>Kriuchkov, "Impact of Fixed Speed Cameras" - Journal of the Finnish Economic Association (2025).</li>
              <li>City of Helsinki Urban Environment Division Guidelines.</li>
              <li>Finnish National Police Traffic Safety Reports.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          <p>© 2025 Vision Zero Visualization Project. Built with React & Kepler.gl.</p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
    const [activeYear, setActiveYear] = useState(null);
    const [trafficData, setTrafficData] = useState([]);
    const [policiesData, setPoliciesData] = useState([]);
    const [isChartOpen, setIsChartOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModalYear, setSelectedModalYear] = useState(null);

    // Fetch traffic data from the public folder on mount
    useEffect(() => {
        fetch(trafficDataURL)
            .then((res) => res.json())
            .then((data) => {
                setTrafficData(data);
                // Initialize activeYear to first year in dataset (if not already set)
                if (data && data.length > 0) setActiveYear((prev) => prev || data[0].year);
            })
            .catch((err) => console.error('Failed to load traffic JSON:', err));
    }, []);

    // Scroll handler depends on loaded `trafficData`
    useEffect(() => {
        if (!trafficData || trafficData.length === 0) return;

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.body.scrollHeight - windowHeight;
            const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

            const yearsCount = trafficData.length;
            if (yearsCount > 0) {
                let index = Math.floor(scrollPercent * yearsCount);
                if (index < 0) index = 0;
                if (index >= yearsCount) index = yearsCount - 1;

                const year = trafficData[index].year;
                setActiveYear(year);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // run once to set initial active year based on current scroll
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [trafficData]);

    // Collapse chart on small screens by default; toggle via button
    useEffect(() => {
        const breakpoint = 768; // px
        const setDefaultOpen = () => setIsChartOpen(window.innerHeight >= breakpoint);
        setDefaultOpen();
        window.addEventListener('resize', setDefaultOpen);
        return () => window.removeEventListener('resize', setDefaultOpen);
    }, []);

    // Modal: close on Escape
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false);
                setSelectedModalYear(null);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isModalOpen]);

    // When modal is open, prevent background scrolling / touchmove
    useEffect(() => {
        if (!isModalOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const prevent = (e) => {
            e.preventDefault();
        };

        window.addEventListener('wheel', prevent, { passive: false });
        window.addEventListener('touchmove', prevent, { passive: false });

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('wheel', prevent);
            window.removeEventListener('touchmove', prevent);
        };
    }, [isModalOpen]);

    useEffect(() => {
        fetch(policiesDataURL)
            .then((res) => res.json())
            .then((data) => {
                setPoliciesData(data);
            })
            .catch((err) => console.error('Failed to load policy JSON:', err));
    }, []);

    const currentStats = (trafficData && trafficData.find && trafficData.find(d => d.year === activeYear)) || {};

    return (
        // Height accommodates scroll space + footer
        <div className="relative bg-[#0e1117] text-white font-sans">

            {/* COVER SECTION */}
            <CoverSection />
            <IntroSection />

            {/* SCROLL SPACE */}
            <div style={{ height: '450vh' }}></div>

            <ImageBackground activeYear={activeYear} trafficData={trafficData} />

            {/* HUD */}
            <div className="fixed top-8 right-8 z-20 w-72 pointer-events-none">
                <div className="bg-[#191c23]/90 backdrop-blur-md border-l-2 border-[#06d6a0] p-6 shadow-2xl rounded-r-lg pointer-events-auto">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h2 className="text-[#5d6575] text-[10px] font-bold tracking-widest uppercase mb-1">Year</h2>
                            <div className="text-6xl font-mono font-bold text-white tracking-tighter">
                                {activeYear}
                            </div>
                        </div>
                        <Navigation size={24} className="text-[#06d6a0] mb-2" />
                    </div>

                    <div className="space-y-4 font-mono text-sm">
                        <div className="flex items-center justify-between border-b border-[#29323c] pb-2">
                            <div className="flex items-center gap-2">
                                <Skull className="text-[#d90429]" size={16} />
                                <span className="text-[#a0a7b6]">Fatalities</span>
                            </div>
                            <span className="text-xl font-bold text-white">{currentStats.deaths}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-[#29323c] pb-2">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="text-[#3b82f6]" size={16} />
                                <span className="text-[#a0a7b6]">Injured</span>
                            </div>
                            <span className="text-xl font-bold text-white">{currentStats.injured}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM CHART (collapsible on small screens) */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0e1117] border-t border-[#29323c] px-4 md:px-12 pointer-events-none">
                <div className="w-full h-full relative pointer-events-auto">
                    <div
                        className="flex items-center justify-between py-3 cursor-pointer md:cursor-auto"
                        onClick={() => { if (window.innerHeight < 768) setIsChartOpen((s) => !s); }}
                    >
                        <div className="flex items-center gap-2 text-[#5d6575] text-[10px] font-bold uppercase tracking-widest">
                            <Activity size={12} /> Accident Statistics
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                aria-label={isChartOpen ? 'Collapse chart' : 'Expand chart'}
                                className="p-2 rounded bg-[#191c23]/60"
                                onClick={(e) => { e.stopPropagation(); setIsChartOpen((s) => !s); }}
                            >
                                {isChartOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className={`transition-[height,opacity] duration-300 overflow-hidden ${isChartOpen ? 'h-35 opacity-100' : 'h-0 opacity-100'}`}>
                        <div className="w-full h-full relative pt-2 pb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trafficData}>
                                    <CartesianGrid strokeDasharray="2 4" stroke="#29323c" vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        stroke="#5d6575"
                                        tick={{ fill: '#5d6575', fontSize: 10, fontFamily: 'monospace' }}
                                        axisLine={false}
                                        tickLine={false}
                                        padding={{ left: 30, right: 30 }}
                                        interval={0}
                                    />
                                    <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#191c23', borderColor: '#5d6575', color: '#fff', borderRadius: '0px', fontSize: '12px', fontFamily: 'monospace' }}
                                        itemStyle={{ color: '#06d6a0' }}
                                        cursor={{ stroke: '#5d6575', strokeWidth: 1 }}
                                    />

                                    {/* Injured Line - Blue Dot */}
                                    <Line
                                        type="monotone"
                                        dataKey="injured"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={<CustomizedDot activeYear={activeYear} />}
                                        activeDot={false}
                                        animationDuration={0}
                                    />

                                    {/* Deaths Line - Red Dot */}
                                    <Line
                                        type="monotone"
                                        dataKey="deaths"
                                        stroke="#d90429"
                                        strokeWidth={2}
                                        dot={<CustomizedDot activeYear={activeYear} />}
                                        activeDot={false}
                                        animationDuration={0}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* GALLERY SECTION (Normal Flow) */}
            {/* <MapGallery trafficData={trafficData} onOpen={(year) => { setSelectedModalYear(year); setIsModalOpen(true); }} /> */}
                
            <ComparisonSlider />

            {/* Modal preview for gallery images */}
            {/* {isModalOpen && selectedModalYear && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => { setIsModalOpen(false); setSelectedModalYear(null); }}>
                    <div className="relative max-w-5xl w-[95%] max-h-[95%] bg-[#0b0d10] rounded-md p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <button aria-label="Close preview" className="absolute right-3 top-3 p-2 rounded bg-[#111318]/70" onClick={() => { setIsModalOpen(false); setSelectedModalYear(null); }}>
                            <X size={18} />
                        </button>
                        <div className="w-full h-[80vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                            <img src={getMapImage(selectedModalYear) || ''} alt={`Map ${selectedModalYear}`} className="w-full h-full object-contain" />
                        </div>
                        <div className="mt-3 text-center font-mono text-sm text-slate-400">{selectedModalYear}</div>
                    </div>
                </div>
            )} */}

            <PolicySection policiesData={policiesData}/>

            <GlobalContextSection />

            <CitationSection />
            
        </div>
    );
}