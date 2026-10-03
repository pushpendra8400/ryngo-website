import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap } from "react-leaflet";
import { MapPin, ArrowRight } from "lucide-react";
import L from "leaflet";
import { AnimatePresence, motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { useBooking } from "@/context/BookingContext";

// Custom Pickup Pin (Uber/Modern navigation style with white dot inside black circle and label badge)
const createPickupIcon = (label?: string) => L.divIcon({
  className: "ryngo-pickup-marker",
  html: `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      ${label ? `
        <div style="
          position: absolute;
          bottom: 26px;
          white-space: nowrap;
          background: #ffffff;
          color: #0B132B;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 12px rgba(0,0,0,0.18);
          border: 1px solid rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 4px;
          pointer-events: none;
          z-index: 1000;
        ">
          <span>From ${label}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      ` : ''}
      <div style="
        width: 18px;
        height: 18px;
        background: #000000;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        border: 2.5px solid #ffffff;
      ">
        <div style="width: 6px; height: 6px; background: #ffffff; border-radius: 50%;"></div>
      </div>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// Custom Destination Pin (Uber/Modern navigation style with white square inside black square and label badge)
const createDestinationIcon = (label?: string) => L.divIcon({
  className: "ryngo-dest-marker",
  html: `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      ${label ? `
        <div style="
          position: absolute;
          bottom: 26px;
          white-space: nowrap;
          background: #ffffff;
          color: #0B132B;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 12px rgba(0,0,0,0.18);
          border: 1px solid rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 4px;
          pointer-events: none;
          z-index: 1000;
        ">
          <span>To ${label}</span>
        </div>
      ` : ''}
      <div style="
        width: 18px;
        height: 18px;
        background: #000000;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        border: 2.5px solid #ffffff;
      ">
        <div style="width: 6px; height: 6px; background: #ffffff; border-radius: 1px;"></div>
      </div>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// Custom Car Icon (SVG based)
const createCarIcon = (type: string) => L.divIcon({
  className: "ryngo-car-marker",
  html: `<div style="background: white; border-radius: 50%; padding: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); border: 2px solid ${type === 'mini' ? '#3D8C40' : '#0B132B'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>
          </svg>
        </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

// Helper to generate orthogonal street-turn waypoints when offline
function generateStreetGridFallback(p: [number, number], d: [number, number]): [number, number][] {
  const [lat1, lon1] = p;
  const [lat2, lon2] = d;
  const midLat = lat1 + (lat2 - lat1) * 0.45;
  const midLon = lon1 + (lon2 - lon1) * 0.55;
  return [
    [lat1, lon1],
    [midLat, lon1],
    [midLat, midLon],
    [lat2, midLon],
    [lat2, lon2]
  ];
}

// Component to handle map focus and auto-fit bounds
function MapUpdater({ p, d, route }: { p?: [number, number] | null, d?: [number, number] | null, route?: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (route && route.length > 1) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    } else if (p && d) {
      const bounds = L.latLngBounds([p, d]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    } else if (p) {
      map.flyTo(p, 15, { duration: 1.5 });
    }
    setTimeout(() => map.invalidateSize(), 100);
  }, [p, d, route, map]);
  return null;
}

export default function LiveMap() {
  const { 
    pickup: pickupCoords, 
    destination: destCoords,
    pickupAddress,
    destinationAddress,
    setAvailableCars,
    setDistance
  } = useBooking();

  const [center] = useState<[number, number]>([19.0760, 72.8777]);
  const [cars, setCars] = useState([
    { id: 1, type: 'mini', pos: [19.0780, 72.8800] as [number, number] },
    { id: 2, type: 'sedan', pos: [19.0740, 72.8750] as [number, number] },
    { id: 3, type: 'mini', pos: [19.0800, 72.8720] as [number, number] },
    { id: 4, type: 'xl', pos: [19.0720, 72.8850] as [number, number] },
  ]);

  // Derive short readable labels for markers
  const pickupLabel = useMemo(() => {
    if (!pickupAddress) return "";
    const short = pickupAddress.split(',')[0].trim();
    return short.length > 20 ? short.slice(0, 18) + '…' : short;
  }, [pickupAddress]);

  const destLabel = useMemo(() => {
    if (!destinationAddress) return "";
    const short = destinationAddress.split(',')[0].trim();
    return short.length > 20 ? short.slice(0, 18) + '…' : short;
  }, [destinationAddress]);

  // Share cars with global context for AI visibility
  useEffect(() => {
    setAvailableCars(cars);
  }, [cars, setAvailableCars]);

  // Simulate Car Movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCars(prev => prev.map(car => ({
        ...car,
        pos: [
          car.pos[0] + (Math.random() - 0.5) * 0.0005,
          car.pos[1] + (Math.random() - 0.5) * 0.0005
        ]
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Surge Zone Area (Transparent red polygon)
  const surgeZone: [number, number][] = [
    [19.0770, 72.8760],
    [19.0785, 72.8780],
    [19.0765, 72.8795],
    [19.0750, 72.8770],
  ];

  // Dynamic Route Path & Distance Calculation Using Road Routing Engines
  const [fetchedRoute, setFetchedRoute] = useState<[number, number][]>([]);
  const [fetchedDistance, setFetchedDistance] = useState(0);

  // Derive routePath: NEVER return a raw 2-point straight line
  const routePath = useMemo(() => {
    if (!pickupCoords || !destCoords) return [];
    return fetchedRoute;
  }, [pickupCoords, destCoords, fetchedRoute]);

  const calcDistance = useMemo(() => {
    if (!pickupCoords || !destCoords) return 0;
    return fetchedDistance;
  }, [pickupCoords, destCoords, fetchedDistance]);

  const pLat = pickupCoords?.[0];
  const pLon = pickupCoords?.[1];
  const dLat = destCoords?.[0];
  const dLon = destCoords?.[1];

  useEffect(() => {
    if (pLat === undefined || pLon === undefined || dLat === undefined || dLon === undefined) {
      setFetchedRoute([]);
      setFetchedDistance(0);
      setDistance(0);
      return;
    }

    let isMounted = true;

    const fetchRoute = async () => {
      const endpoints = [
        `https://router.project-osrm.org/route/v1/driving/${pLon},${pLat};${dLon},${dLat}?overview=full&geometries=geojson`,
        `https://routing.openstreetmap.de/routed-car/route/v1/driving/${pLon},${pLat};${dLon},${dLat}?overview=full&geometries=geojson`
      ];

      for (const url of endpoints) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            if (data.routes && data.routes[0] && data.routes[0].geometry) {
              const route = data.routes[0];
              const coordinates = route.geometry.coordinates;
              const mappedPath: [number, number][] = coordinates.map((c: number[]) => [c[1], c[0]]);

              if (isMounted && mappedPath.length > 0) {
                setFetchedRoute(mappedPath);
                const roadDistance = route.distance / 1000;
                setFetchedDistance(roadDistance);
                setDistance(roadDistance);
                return;
              }
            }
          }
        } catch (err) {
          console.warn(`Routing endpoint ${url} failed:`, err);
        }
      }

      // If all remote routing services are unavailable, use street-turn waypoints
      if (isMounted) {
        const streetPoints = generateStreetGridFallback([pLat, pLon], [dLat, dLon]);
        setFetchedRoute(streetPoints);
        const R = 6371; 
        const dLatRad = (dLat - pLat) * Math.PI / 180;
        const dLonRad = (dLon - pLon) * Math.PI / 180;
        const a = Math.sin(dLatRad/2) * Math.sin(dLatRad/2) +
                  Math.cos(pLat * Math.PI / 180) * Math.cos(dLat * Math.PI / 180) * 
                  Math.sin(dLonRad/2) * Math.sin(dLonRad/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const roadDist = (R * c) * 1.35;
        setFetchedDistance(roadDist);
        setDistance(roadDist);
      }
    };

    fetchRoute();

    return () => {
      isMounted = false;
    };
  }, [pLat, pLon, dLat, dLon, setDistance]);

  return (
    <div className="w-full h-full relative group">
      <MapContainer 
        center={center} 
        zoom={15} 
        zoomControl={false}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* OpenStreetMap Standard Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Surge Zone Polygons */}
        <Polygon 
          positions={surgeZone}
          pathOptions={{ 
            fillColor: '#ef4444', 
            fillOpacity: 0.15, 
            color: '#ef4444', 
            weight: 2,
            dashArray: '5, 10'
          }} 
        />

        {/* Route Preview Polylines - Clean, Bold, High-Visibility Solid Blue Route */}
        {routePath.length > 0 && (
          <>
            {/* Outer casing for sharp contrast */}
            <Polyline 
              positions={routePath} 
              pathOptions={{ 
                color: '#1E3A8A', 
                weight: 8, 
                opacity: 0.85,
                lineCap: 'round',
                lineJoin: 'round'
              }} 
            />
            {/* Inner vibrant solid blue navigation line */}
            <Polyline 
              positions={routePath} 
              pathOptions={{ 
                color: '#2563EB', 
                weight: 5, 
                opacity: 1,
                lineCap: 'round',
                lineJoin: 'round'
              }} 
            />
          </>
        )}

        {/* Moving Car Markers */}
        {cars.map(car => (
          <Marker 
            key={car.id} 
            position={car.pos} 
            icon={createCarIcon(car.type)}
          >
            <Popup className="ryngo-map-popup">
              <div className="text-xs font-bold text-[#0B132B]">
                Ryngo {car.type.toUpperCase()}<br/>
                <span className="text-[#3D8C40] uppercase">Available</span>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Active Pickup & Destination Markers (Image 2 style) */}
        {pickupCoords && (
          <Marker position={pickupCoords} icon={createPickupIcon(pickupLabel)} />
        )}
        {destCoords && (
          <Marker position={destCoords} icon={createDestinationIcon(destLabel)} />
        )}

        <MapUpdater p={pickupCoords} d={destCoords} />
      </MapContainer>

      {/* Fare & Distance Preview Card (Shows when route exists) */}
      <AnimatePresence>
        {calcDistance > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-6 right-6 z-[999]"
          >
            <div className="glass-card p-4 shadow-2xl border border-white/40 ring-1 ring-black/5 bg-white/90 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Distance</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#0B4619]" />
                    <span className="text-xl font-black text-[#0B132B]">{calcDistance.toFixed(1)} km</span>
                  </div>
                </div>
                
                <div className="w-[1px] h-10 bg-gray-200" />

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Estimated Fare</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black text-[#3D8C40]">₹{(calcDistance * 22.7 + 60).toFixed(0)}</span>
                  </div>
                </div>

                <button className="bg-[#0B132B] text-white p-2.5 rounded-xl hover:bg-black transition-all active:scale-90">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Content Overlay (Top Right Badge) */}
      <div className="absolute top-4 right-4 z-[999] pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-gray-100 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-[#0B132B] uppercase tracking-tighter">High Demand Zone</span>
        </div>
      </div>
    </div>
  );
}
