import { useEffect, useMemo, useState } from "react";
import { Globe, Activity, Loader } from "lucide-react";
import { geoPath, geoNaturalEarth1 } from "d3-geo";
import { countryBoundariesDataURL, worldWideDeathRateDataURL } from "../constants";

const NAME_MAPPING = {
    "United States of America": "United States of America",
    "United States": "United States of America",
    "Russian Federation": "Russia",
    "Democratic People's Republic of Korea": "North Korea",
    "Republic of Korea": "South Korea",
    "Iran (Islamic Republic of)": "Iran",
    "Syrian Arab Republic": "Syria",
    "Taiwan (Province of China)": "Taiwan",
    "Viet Nam": "Vietnam",
    "Lao People's Democratic Republic": "Laos",
    "Bolivia (Plurinational State of)": "Bolivia",
    "Venezuela (Bolivarian Republic of)": "Venezuela",
    "Tanzania": "United Republic of Tanzania",
    "Congo": "Republic of the Congo",
    "Democratic Republic of the Congo": "Democratic Republic of the Congo",
};

export default function WorldMapSection() {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredCountry, setHoveredCountry] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(countryBoundariesDataURL).then((r) => r.json()),
            fetch(worldWideDeathRateDataURL).then((r) => r.text()),
        ])
            .then(([geoData, csvText]) => {
                // 1. Parse CSV
                const rows = csvText
                    .split("\n")
                    .slice(1)
                    .filter((row) => row.trim().length > 0)
                    .map((row) => {
                        const cols = row.split(",");
                        const rawName = cols[1];
                        const name = NAME_MAPPING[rawName] || rawName;
                        const value = parseFloat(cols[3]);
                        return { name, value: isNaN(value) ? null : value };
                    });

                const dataMap = new Map(rows.map((d) => [d.name, d.value]));

                // 2. Augment GeoJSON
                const augmentedFeatures = geoData.features.map((f) => {
                    const name =
                        f.properties.NAME || f.properties.NAME_EN || f.properties.ADMIN;
                    const val = dataMap.get(name);
                    return {
                        ...f,
                        properties: { ...f.properties, deathRate: val, NAME_DISPLAY: name },
                    };
                });

                setFeatures(augmentedFeatures);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Map Data Load Error:", err);
                setLoading(false);
            });
    }, []);

    // Projection + path generator based on loaded features
    const pathGenerator = useMemo(() => {
        if (!features.length) return null;
        const projection = geoNaturalEarth1().fitSize(
            [800, 450],
            { type: "FeatureCollection", features }
        );
        return geoPath(projection);
    }, [features]);

    const getColor = (val) => {
        if (val === undefined || val === null) return "#636363"; // No data
        if (val < 5) return "#fcc5c0";
        if (val < 10) return "#f768a1";
        if (val < 20) return "#dd3497";
        if (val < 30) return "#ae017e";
        return "#7a0177";
    };

    return (
        <div className="relative z-50 bg-[#0e1117] py-24 px-6 md:px-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <Globe className="text-blue-500" size={40} />
                        Putting Helsinki in a Global Context
                    </h2>
                    <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light">
                        Globally, road crashes claim over a million lives each year.
                        According to 2023 estimates of road-injury death rates, Finland, at approximately{" "}
                        <span className="text-[#06d6a0] font-bold">4.97</span> <strong className="text-white">deaths per 100,000 people,</strong>{" "}
                        already ranks among the world’s safest countries.
                        Yet it is not the absolute lowest, and Helsinki, as a capital city with dense traffic,
                        complex mobility patterns, and seasonal challenges, faces risks similar to other urban centers.
                    </p>
                </div>

                {/* Map Container */}
                <div className="w-full bg-[#050608] rounded-xl border border-slate-800 p-4 shadow-2xl relative min-h-[500px]">
                    {loading || !pathGenerator ? (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                            <Loader className="animate-spin mr-2" /> Loading Global Data...
                        </div>
                    ) : (
                        <div className="w-full h-[600px]">
                            <svg viewBox="0 0 800 450" className="w-full h-full">
                                <g>
                                    {features.map((feature, i) => {
                                        const d = pathGenerator(feature);
                                        if (!d) return null;
                                        const val = feature.properties.deathRate;

                                        return (
                                            <path
                                                key={i}
                                                d={d}
                                                fill={getColor(val)}
                                                stroke="#0e1117"
                                                strokeWidth={0.5}
                                                className="transition-colors duration-300 hover:opacity-80 cursor-pointer"
                                                onMouseEnter={() =>
                                                    setHoveredCountry({
                                                        name: feature.properties.NAME_DISPLAY,
                                                        value: val,
                                                    })
                                                }
                                                onMouseLeave={() => setHoveredCountry(null)}
                                            />
                                        );
                                    })}
                                </g>
                                {/* ---- Finland Highlight Layer ---- */}
                                <g>
                                    {features
                                        .filter(f => f.properties.NAME_DISPLAY === "Finland")
                                        .map((fin, i) => {
                                            const d = pathGenerator(fin);
                                            if (!d) return null;
                                            return (
                                                <path
                                                    key={"finland-outline-" + i}
                                                    d={d}
                                                    fill="none"
                                                    stroke="#05ba8aff"       // highlight color
                                                    strokeWidth={3}      // <<< thicker outline
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    pointerEvents="none"   // avoid blocking hover events
                                                />
                                            );
                                        })}
                                </g>
                            </svg>
                        </div>
                    )}

                    {/* Tooltip */}
                    {hoveredCountry && (
                        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-lg shadow-xl pointer-events-none">
                            <h4 className="text-white font-bold text-lg">
                                {hoveredCountry.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                                <Activity
                                    size={16}
                                    className={
                                        hoveredCountry.value > 20 ? "text-red-500" : "text-green-500"
                                    }
                                />
                                <span className="text-slate-300">
                                    {hoveredCountry.value != null
                                        ? hoveredCountry.value.toFixed(2)
                                        : "N/A"}{" "}
                                    <span className="text-xs text-slate-500">deaths / 100k</span>
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 flex gap-2 text-[10px] text-slate-400 bg-black/50 p-2 rounded">
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-[#fcc5c0]" /> &lt;5
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-[#f768a1]" /> 5–10
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-[#dd3497]" /> 10–20
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-[#ae017e]" /> 20–30
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-[#7a0177]" /> &gt;30
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-[#636363]" /> N/A
                        </div>
                    </div>
                </div>

                <div className="text-center mb-24 mt-48">
                    <p className="text-lg md:text-3xl text-slate-300 leading-relaxed font-light">
                        Given this context, the question arises: <br/>
                        <span className="text-[#06d6a0] font-bold">How did a busy Nordic capital reach a full year with zero traffic deaths?</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
