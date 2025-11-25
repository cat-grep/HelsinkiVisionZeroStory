# Helsinki Vision Zero Story

An interactive data visualization exploring Helsinki's remarkable journey to achieving zero traffic-related fatalities through the Vision Zero policy framework.

## Overview

This project tells the story of how Helsinki transformed its road network and traffic policies over a decade (2014–2024) to eliminate traffic deaths. Through an interactive scrollable experience, users explore:

- **The Transformation**: A decade-long comparison slider showing the evolution of speed limits and road network fidelity
- **Live Statistics**: Real-time accident data visualization tracking fatalities and injuries over time
- **Comprehensive Safety Measures**: A detailed breakdown of the policies, engineering interventions, and strategies that drove Helsinki's success

## Key Features

- **Interactive Comparison Slider**: Swipe between 2014 and 2024 maps to visualize network changes
- **Dynamic Background**: Map imagery updates as you scroll, synchronized with traffic statistics
- **Accident Statistics Chart**: Line chart tracking deaths and injuries across the decade
- **Policy Cards**: Comprehensive overview of nine key safety initiatives with source attribution
- **Responsive Design**: Optimized for desktop and mobile experiences

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Icon library

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
public/
  ├── Helsinki_Traffic_Policies.json    # Policy data
  ├── Helsinki_Traffic_Records.json     # Traffic statistics
  └── [year].png                        # Road network maps (2014-2024)
src/
  ├── App.jsx                           # Main application component
  ├── App.css                           # Component styles
  ├── main.jsx                          # Entry point
  └── index.css                         # Global styles
```

## Data Sources

- **Traffic Statistics**: Helsinki Police Department & Finnish Transport Infrastructure Agency
- **Road Network Maps**: City of Helsinki GIS data
- **Policy Information**: City of Helsinki official announcements and Vision Zero documentation

## References

- [Helsinki Vision Zero Policy](https://www.hel.fi/en/)
- [Finnish Transport Infrastructure Agency](https://vayla.fi/en)
- [Vision Zero Initiative](https://visionzeroinitiative.com/)
