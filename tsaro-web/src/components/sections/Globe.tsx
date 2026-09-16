"use client";

import { useEffect, useState, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface GlobeProps {
  locations: { name: string; coords: [number, number] }[];
  activeIdx: number | null;
  onLocationClick?: (idx: number) => void;
}

function Globe({ locations, activeIdx, onLocationClick }: GlobeProps) {
  // Center and zoom state for rotation
  const [center, setCenter] = useState<[number, number]>([20, 10]);
  const [scale, setScale] = useState(150);

  useEffect(() => {
    if (activeIdx !== null && locations[activeIdx]) {
      const loc = locations[activeIdx];
      // react-simple-maps uses [lng, lat] for center
      setCenter([loc.coords[1], loc.coords[0]]);
      setScale(300);
    } else {
      // Default view showing Africa/Europe/Americas
      setCenter([20, 10]);
      setScale(150);
    }
  }, [activeIdx, locations]);

  return (
    <ComposableMap
      projection="geoOrthographic"
      projectionConfig={{
        center: [0, 0],
        rotate: [-center[0], -center[1], 0],
        scale: scale,
      }}
      width={500}
      height={500}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Ocean background circle */}
      <circle cx={250} cy={250} r={scale * 1.65} fill="#1a1a1a" stroke="#333" strokeWidth={0.5} />

      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#333"
              stroke="#444"
              strokeWidth={0.5}
              style={{
                default: { outline: 'none' },
                hover: { fill: '#444', outline: 'none' },
                pressed: { outline: 'none' },
              } as any}
            />
          ))
        }
      </Geographies>

      {/* Location markers */}
      {locations.map((loc, idx) => (
        <Marker
          key={idx}
          coordinates={[loc.coords[1], loc.coords[0]]}
          onClick={() => onLocationClick?.(idx)}
        >
          {/* Pulse ring */}
          <circle
            r={activeIdx === idx ? 12 : 6}
            fill="none"
            stroke="#D72323"
            strokeWidth={activeIdx === idx ? 2 : 1}
            opacity={activeIdx === idx ? 0.4 : 0.2}
          >
            {activeIdx === idx && (
              <animate
                attributeName="r"
                from="8"
                to="18"
                dur="1.5s"
                repeatCount="indefinite"
              />
            )}
            {activeIdx === idx && (
              <animate
                attributeName="opacity"
                from="0.6"
                to="0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          {/* Main dot */}
          <circle
            r={activeIdx === idx ? 6 : 4}
            fill="#D72323"
            stroke="#fff"
            strokeWidth={activeIdx === idx ? 2 : 1}
            style={{
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
          {/* Label */}
          {activeIdx === idx && (
            <text
              textAnchor="middle"
              y={-16}
              style={{
                fontFamily: 'system-ui, sans-serif',
                fill: '#fff',
                fontSize: '11px',
                fontWeight: 600,
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
            >
              {loc.name}
            </text>
          )}
        </Marker>
      ))}
    </ComposableMap>
  );
}

export default memo(Globe);
