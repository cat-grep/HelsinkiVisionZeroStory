// App.jsx
import CoverSection from "./components/CoverSection";
import IntroSection from "./components/IntroSection";
import WorldMapSection from "./components/WorldMapSection";
import CoreIdeaSection from "./components/CoreIdeaSection";
import PolicySection from "./components/PolicySection";
import DataDrivenSection from "./components/DataDrivenSection";
import CitationSection from "./components/CitationSection";
import SummarySection from "./components/SummarySection";

export default function App() {
  return (
    <div className="relative bg-[#0e1117] text-white font-sans">
      <CoverSection />
      <IntroSection />

      <WorldMapSection />

      <CoreIdeaSection />

      <PolicySection />

      <DataDrivenSection />

      <SummarySection />
      
      <CitationSection />

    </div>
  );
}
