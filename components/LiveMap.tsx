import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap } from "react-leaflet";
import { MapPin, Clock, CreditCard, ArrowRight } from "lucide-react";
import L from "leaflet";
import { AnimatePresence, motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { useBooking } from "@/context/BookingContext";

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Custom Pulsing Div Icon for the User
const createPulseIcon = () => L.divIcon({
  className: "ryngo-pulse-marker",
  iconSize: [12, 12],
  iconAnchor: [6, 6]
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

// Component to handle map focus and auto-fit bounds
function MapUpdater({ p, d }: { p?: [number, number] | null, d?: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (p && d) {
      const bounds = L.latLngBounds([p, d]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    } else if (p) {
      map.flyTo(p, 15, { duration: 1.5 });
    }
    setTimeout(() => map.invalidateSize(), 100);
  }, [p, d, map]);
  return null;
}

export default function LiveMap() {
  const { 
    pickup: pickupCoords, 
    destination: destCoords,
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

  // Dynamic Route Path & Distance Calculation Using OSRM
  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  const [calcDistance, setCalcDistance] = useState(0);

  useEffect(() => {
    if (!pickupCoords || !destCoords) {
      setRoutePath([]);
      setCalcDistance(0);
      setDistance(0);
      return;
    }

    // Immediately show a straight line while loading
    setRoutePath([pickupCoords, destCoords]);

    const fetchRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${pickupCoords[1]},${pickupCoords[0]};${destCoords[1]},${destCoords[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.routes && data.routes[0]) {
          const route = data.routes[0];
          // OSRM returns coordinates in [longitude, latitude]
          const coordinates = route.geometry.coordinates;
          const mappedPath: [number, number][] = coordinates.map((c: number[]) => [c[1], c[0]]);
          
          setRoutePath(mappedPath);
          const roadDistance = route.distance / 1000; // API returns meters, convert to km
          setCalcDistance(roadDistance);
          setDistance(roadDistance);
        }
      } catch (err) {
        console.error("OSRM Routing Error", err);
        // Fallback to Haversine straight line if API fails
        const lat1 = pickupCoords[0], lon1 = pickupCoords[1];
        const lat2 = destCoords[0], lon2 = destCoords[1];
        const R = 6371; // km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const haversineDist = R * c;
        setCalcDistance(haversineDist);
        setDistance(haversineDist);
      }
    };
    
    fetchRoute();
  }, [pickupCoords, destCoords, setDistance]);

  return (
    <div className="w-full h-full relative group">
      <MapContainer 
        center={center} 
        zoom={15} 
        zoomControl={false}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* Modern Light Theme Tiles (CartoDB Positron) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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

        {/* Route Preview Polylines */}
        <Polyline 
          positions={routePath} 
          pathOptions={{ 
            color: '#0046FF', 
            weight: 4, 
            opacity: 0.6,
            lineCap: 'round',
            lineJoin: 'round',
            dashArray: '1, 10'
          }} 
        />

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

        {/* Active Pickup & Destination Markers */}
        {pickupCoords && (
          <Marker position={pickupCoords} icon={createPulseIcon()} />
        )}
        {destCoords && (
          <Marker 
            position={destCoords} 
            icon={L.divIcon({
              className: "dest-marker",
              html: `<div style="width: 12px; height: 12px; background: #0B132B; border-radius: 2px; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
              iconSize: [12, 12],
              iconAnchor: [6, 6]
            })}
          />
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
