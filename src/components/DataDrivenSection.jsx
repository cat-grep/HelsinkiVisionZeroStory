import { useEffect, useRef, useState } from "react";
import { DatabaseZap } from "lucide-react";
import * as d3 from "d3";
import {
    speedLimitDataURL,
    helsinkiTrafficAccidentDataURL,
} from "../constants";

export default function DataDrivenSection() {
    const wrapperRef = useRef(null);
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);

    const [years, setYears] = useState([]);
    const [currentYear, setCurrentYear] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [yearStats, setYearStats] = useState([]);

    // New state for the timeline tooltip
    const [timelineTooltip, setTimelineTooltip] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        async function init() {
            const wrapperEl = wrapperRef.current;
            const svgEl = svgRef.current;
            if (!wrapperEl || !svgEl) return;

            const width = wrapperEl.clientWidth || 900;
            const height = 500;

            const svg = d3
                .select(svgEl)
                .attr("viewBox", `0 0 ${width} ${height}`)
                .attr("preserveAspectRatio", "xMidYMid meet");

            svg.selectAll("*").remove();

            // Zoomable container — both layers go inside so zoom/pan applies together
            const zoomGroup = svg.append("g").attr("class", "zoom-group");

            const zoom = d3
                .zoom()
                .scaleExtent([0.5, 15])
                .on("zoom", (event) => {
                    zoomGroup.attr("transform", event.transform);
                });

            svg.call(zoom);
            svg.node().__zoom__ = zoom;

            const [roads, accidents] = await Promise.all([
                fetch(speedLimitDataURL).then((r) => r.json()),
                fetch(helsinkiTrafficAccidentDataURL).then((r) => r.json()),
            ]);
            if (isCancelled) return;

            const roadsFC = {
                type: "FeatureCollection",
                features: roads.features || roads,
            };

            // Create projection once to fit data
            // Note: We use accidents for bounds to ensure points are visible
            const accidentsFC = {
                type: "FeatureCollection",
                features: accidents.features || accidents,
            };

            const projection = d3.geoMercator().fitSize([width, height], accidentsFC);
            const path = d3.geoPath(projection);

            // --- 1. Draw Road Background ---
            zoomGroup
                .append("g")
                .attr("class", "roads-layer")
                .selectAll("path")
                .data(roadsFC.features)
                .join("path")
                .attr("d", path)
                .attr("fill", "none")
                .attr("stroke", "#707070")
                .attr("stroke-width", 0.5)
                .attr("stroke-opacity", 0.9);

            // --- 2. Process Statistics ---
            const allYears = Array.from(
                new Set(accidents.features.map((f) => f.properties.VV))
            ).sort((a, b) => a - b);

            setYears(allYears);
            setCurrentYear(allYears[0] ?? null);

            const stats = allYears.map((y) => {
                const feats = accidents.features.filter((f) => f.properties.VV === y);
                let fatal = 0,
                    injury = 0,
                    damage = 0;

                feats.forEach((f) => {
                    const s = Number(f.properties.VAKAV_A);
                    if (s === 3) fatal += 1;
                    else if (s === 2) injury += 1;
                    else damage += 1;
                });

                const total = fatal + injury + damage || 1;
                return { year: y, fatal, injury, damage, total };
            });

            setYearStats(stats);

            // --- 3. Setup Point Rendering ---
            // Pre-calculate synthetic IDs for D3 join stability
            accidents.features.forEach((f, i) => {
                const p = f.properties;
                const [lon, lat] = f.geometry.coordinates;
                f._id = `${p.VV}-${lon.toFixed(5)}-${lat.toFixed(5)}-${i}`;
            });

            const pointLayer = zoomGroup.append("g").attr("class", "accidents-layer");
            const tooltip = d3.select(tooltipRef.current);

            const severityLabel = (VAKAV_A) => {
                if (VAKAV_A === 3 || VAKAV_A === "3") return "Fatality";
                if (VAKAV_A === 2 || VAKAV_A === "2") return "Injury";
                return "Property damage only";
            };

            const typeLabel = (laji) => {
                const key = (laji || "").toLowerCase();
                const map = {
                    jk: "Pedestrian accident",
                    pp: "Bicycle accident",
                    mp: "Moped/motorcycle accident",
                    ma: "Motor vehicle accident",
                };
                return map[key] || "Other road accident";
            };

            function renderPoints(year) {
                if (year == null) return;

                const yearly = accidents.features.filter(
                    (f) => f.properties.VV === year
                );

                const severityNum = (d) => +d.properties.VAKAV_A;

                // 1. Helper to get color based on severity
                const getSeverityColor = (val) => {
                    const s = String(val); // ensure string comparison
                    if (s === "3") return "#f97373"; // Red (Fatality)
                    if (s === "2") return "#facc15"; // Yellow (Injury)
                    return "#38bdf8";                // Blue (Damage)
                };

                const circles = pointLayer
                    .selectAll("circle")
                    .data(yearly, (d) => d._id);

                circles.exit().remove();

                circles
                    .enter()
                    .append("circle")
                    .attr("r", 0)
                    .attr("cx", (d) => projection(d.geometry.coordinates)[0])
                    .attr("cy", (d) => projection(d.geometry.coordinates)[1])
                    .attr("fill", (d) => getSeverityColor(d.properties.VAKAV_A)) // Use helper here
                    .attr("fill-opacity", 0.8)
                    .attr("stroke", "#454545")
                    .attr("stroke-width", 0.4)
                    .on("mousemove", (event, d) => {
                        const [x, y] = d3.pointer(event, wrapperEl);
                        const props = d.properties;

                        // 2. Get the specific color for this point
                        const titleColor = getSeverityColor(props.VAKAV_A);

                        tooltip
                            .style("opacity", 1)
                            .style("left", `${x + 12}px`)
                            .style("top", `${y + 12}px`)
                            .html(
                                `<div class="text-xs">
                                   <div style="color: ${titleColor}; font-weight: bold; margin-bottom: 2px;">
                                     ${severityLabel(props.VAKAV_A)}
                                   </div>
                                   <div class="text-slate-200">Type: ${typeLabel(props.LAJI)}</div>
                                   <div class="text-slate-200">Year: ${props.VV}</div>
                                 </div>`
                            );
                    })
                    .on("mouseleave", () => {
                        tooltip.style("opacity", 0);
                    })
                    .transition()
                    .duration(400)
                    .attr("r", 2);

                circles
                    .transition()
                    .duration(400)
                    .attr("cx", (d) => projection(d.geometry.coordinates)[0])
                    .attr("cy", (d) => projection(d.geometry.coordinates)[1]);

                pointLayer
                    .selectAll("circle")
                    .sort((a, b) => d3.ascending(severityNum(a), severityNum(b)));
            }

            if (allYears[0] != null) {
                renderPoints(allYears[0]);
            }

            svg.node().__renderPoints__ = renderPoints;
        }

        init();

        return () => {
            isCancelled = true;
        };
    }, []);

    // Sync currentYear change to D3
    useEffect(() => {
        const svgNode = svgRef.current;
        if (!svgNode) return;
        const renderPoints = svgNode.__renderPoints__;
        if (currentYear != null && typeof renderPoints === "function") {
            renderPoints(currentYear);
        }
    }, [currentYear]);

    // Autoplay logic
    useEffect(() => {
        if (!years.length || !isPlaying) return;
        const id = setInterval(() => {
            setCurrentYear((prev) => {
                if (prev == null) return years[0];
                const idx = years.indexOf(prev);
                const nextIdx = idx === -1 || idx === years.length - 1 ? 0 : idx + 1;
                return years[nextIdx];
            });
        }, 4500);
        return () => clearInterval(id);
    }, [years, isPlaying]);

    const handleZoomIn = () => {
        const node = svgRef.current;
        if (node?.__zoom__) d3.select(node).transition().duration(250).call(node.__zoom__.scaleBy, 1.5);
    };
    const handleZoomOut = () => {
        const node = svgRef.current;
        if (node?.__zoom__) d3.select(node).transition().duration(250).call(node.__zoom__.scaleBy, 1 / 1.5);
    };
    const handleZoomReset = () => {
        const node = svgRef.current;
        if (node?.__zoom__) d3.select(node).transition().duration(300).call(node.__zoom__.transform, d3.zoomIdentity);
    };

    return (
        <div className="relative z-50 bg-[#0e1117] py-24 px-6 md:px-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        <DatabaseZap className="text-blue-500" size={40} />
                        Data Drives Policy
                    </h2>
                    <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light">
                        Helsinki analyzes collision patterns and injury hotspots (2000–2024) to guide critical interventions,
                        ranging from speed-limit reforms and intersection redesigns to school-zone safety.
                        This rigorous evidence base shapes funding priorities and Vision Zero goals,
                        while grassroots groups further champion <a href="https://urbanfinland.com/2016/04/15/making-downtown-helsinki-more-walkable-its-time-for-a-grassroots-revolution/" target="_blank" className="underline text-blue-500 font-bold">walkability and public space design.</a> 
                    </p>
                </div>

                {/* Stacked-bar timeline */}
                {years.length > 0 && yearStats.length > 0 && (
                    <div className="max-w-6xl mx-auto mt-4 select-none overflow-x-auto pb-4">
                        {(() => {
                            const maxTotal =
                                yearStats.reduce((m, s) => Math.max(m, s.total), 0) || 1;

                            return (
                                <div className="flex items-end gap-1 md:gap-3 h-[240px] pb-2 min-w-[600px] md:min-w-0 px-1">
                                    {years.map((y) => {
                                        const s = yearStats.find((d) => d.year === y) || {
                                            fatal: 0,
                                            injury: 0,
                                            damage: 0,
                                            total: 1,
                                        };
                                        const isActive = y === currentYear;
                                        const rel = s.total / maxTotal;
                                        const barHeight = rel * 200;

                                        return (
                                            <button
                                                key={y}
                                                type="button"
                                                onClick={() => {
                                                    setCurrentYear(y);
                                                    setIsPlaying(false);
                                                }}
                                                onMouseMove={(e) => {
                                                    setTimelineTooltip({
                                                        x: e.clientX,
                                                        y: e.clientY,
                                                        data: s,
                                                    });
                                                }}
                                                onMouseLeave={() => setTimelineTooltip(null)}
                                                className="flex-1 flex flex-col items-center group focus:outline-none h-full justify-end"
                                            >
                                                <div
                                                    style={{ height: `${barHeight}px` }}
                                                    className={`w-full border rounded-xs flex flex-col-reverse overflow-hidden transition-all duration-300
                                                        ${isActive
                                                            ? "border-3 border-[#06d6a0] bg-slate-900 shadow-[0_0_10px_#06d6a040]"
                                                            : "border-slate-700 bg-slate-900/60 group-hover:border-slate-300"
                                                        }`}
                                                >
                                                    {s.damage > 0 && (
                                                        <div
                                                            style={{ flex: s.damage }}
                                                            className="bg-sky-400/80 group-hover:bg-sky-300/90 transition-colors"
                                                        />
                                                    )}
                                                    {s.injury > 0 && (
                                                        <div
                                                            style={{ flex: s.injury }}
                                                            className="bg-yellow-400/85 group-hover:bg-yellow-300/95 transition-colors"
                                                        />
                                                    )}
                                                    {s.fatal > 0 && (
                                                        <div
                                                            style={{
                                                                flex: s.fatal,
                                                                minHeight: "4px"
                                                            }}
                                                            className="bg-red-400/90 group-hover:bg-red-300 transition-colors"
                                                        />
                                                    )}
                                                </div>

                                                <span
                                                    className={`mt-2 text-[9px] md:text-[10px] font-mono transition-colors ${isActive ? "text-[#06d6a0] font-bold" : "text-slate-400"
                                                        }`}
                                                >
                                                    {y}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            );
                        })()}

                        <div className="mt-1 flex flex-wrap items-center justify-between gap-4 text-[10px] text-slate-400 sticky left-0">
                             {/* ... (Your existing Legend Code remains unchanged) ... */}
                             {/* Note: I added 'sticky left-0' above just in case, but standard flex behavior is fine here */}
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsPlaying((p) => !p)}
                                    className="px-3 py-1 rounded-full border border-slate-600 bg-slate-900 text-xs hover:border-slate-300 transition-colors"
                                >
                                    {isPlaying ? "Pause" : "Play"}
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-sky-400/80 inline-block rounded-sm" />
                                    Property damage only
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-yellow-400/85 inline-block rounded-sm" />
                                    Injury
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-red-400/90 inline-block rounded-sm" />
                                    Fatality
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div
                ref={wrapperRef}
                className="relative max-w-6xl mx-auto h-[600px] rounded-xl overflow-hidden border border-slate-800 bg-black mt-4"
            >
                <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

                {/* Zoom controls */}
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                    <button
                        onClick={handleZoomIn}
                        title="Zoom in"
                        className="w-8 h-8 bg-slate-800/90 border border-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors text-lg font-bold flex items-center justify-center"
                    >+</button>
                    <button
                        onClick={handleZoomOut}
                        title="Zoom out"
                        className="w-8 h-8 bg-slate-800/90 border border-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors text-lg font-bold flex items-center justify-center"
                    >−</button>
                    <button
                        onClick={handleZoomReset}
                        title="Reset view"
                        className="w-8 h-8 bg-slate-800/90 border border-slate-600 text-slate-300 rounded-md hover:bg-slate-700 transition-colors text-xs font-bold flex items-center justify-center"
                    >⊙</button>
                </div>

                {/* Hint */}
                <div className="absolute bottom-3 left-3 z-10 text-[10px] text-slate-500 pointer-events-none select-none">
                    Scroll to zoom · Drag to pan
                </div>

                {/* Map Tooltip (D3 controlled) */}
                <div
                    ref={tooltipRef}
                    className="pointer-events-none absolute z-20 bg-black/80 border border-slate-600 rounded-md px-3 py-2 text-xs text-slate-100 backdrop-blur-sm"
                    style={{ opacity: 0 }}
                />
            </div>

            {/* Timeline Tooltip (React controlled) */}
            {timelineTooltip && (
                <div
                    className="fixed z-50 pointer-events-none bg-black/90 border border-slate-600 rounded-md px-3 py-2 text-xs text-slate-100 backdrop-blur-md shadow-xl"
                    style={{
                        top: timelineTooltip.y - 80, // Position slightly above cursor
                        left: timelineTooltip.x - 50, // Center align roughly
                        minWidth: "120px",
                    }}
                >
                    <div className="font-bold text-[#06d6a0] mb-1 text-sm border-b border-slate-700 pb-1">
                        {timelineTooltip.data.year} Stats
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-red-300">Fatal:</span>
                        <span className="font-mono">{timelineTooltip.data.fatal}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-yellow-300">Injury:</span>
                        <span className="font-mono">{timelineTooltip.data.injury}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <span className="text-sky-300">Property damage only:</span>
                        <span className="font-mono">{timelineTooltip.data.damage}</span>
                    </div>
                    <div className="mt-1 pt-1 border-t border-slate-700 flex justify-between gap-4 font-bold">
                        <span>Total:</span>
                        <span>{timelineTooltip.data.total}</span>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto mt-4">
                <div className="text-center mb-4">
                    <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light">
                        Long-term charts of traffic injuries and fatalities in Helsinki show a consistent downward trend,
                        with the years leading up to 2024 marking some of the lowest totals on record.
                        The <strong>zero-fatality year</strong> is not a sudden miracle, it is the culmination of decades of policy refinement,
                        sustained investment, and community support.
                    </p>
                </div>
            </div>
        </div>
    );
}