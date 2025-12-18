# Helsinki Vision Zero Story

An interactive data visualization exploring Helsinki's remarkable journey to achieving zero traffic-related fatalities. This project demonstrates how the "Vision Zero" policy framework—combined with data-driven infrastructure changes—transformed urban safety between 2014 and 2024.

## 📖 Overview

Helsinki transformed its road network and traffic policies over a decade to eliminate traffic deaths. This application tells that story through an interactive, scroll-based narrative. Users can explore:

- **The Transformation**: A timeline comparison showing the evolution of speed limits (30km/h zones) and road network fidelity.
- **Data-Driven Impact**: Visualization of accident statistics (2000–2024) correlated with specific policy interventions.
- **Policy Breakdown**: Detailed analysis of the 9 key safety measures, from infrastructure redesigns to school zone interventions.

## 🛠 Tech Stack

- **Core**: React 18, Vite
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Visualization**:
  - **Recharts** (Statistical charts)
  - **D3.js** (Data binding and custom interactions)
  - **Kepler.gl** (Geospatial data rendering)

## Data Sources

This project aggregates data from multiple open-source Finnish registries:
- [Helsinki Region Infoshare (HRI):](https://hri.fi/fi/) District divisions, local speed limit shapefiles, and accident reports.
- [Finnish Transport Infrastructure Agency (Väylävirasto):](https://vayla.fi/vaylista/aineistot/digiroad) "Digiroad" national road network data and speed camera locations.
- [Statistics Finland (Tilastokeskus):](https://stat.fi/fi) Long-term accident statistics and educational institution locations.
- [Digital Geography Lab:](https://www.helsinki.fi/en/researchgroups/digital-geography-lab) Accessibility and travel time matrices.