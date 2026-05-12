"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Car {
  id: number;
  type: string;
  pos: [number, number];
}

interface BookingContextType {
  pickup: [number, number] | null;
  destination: [number, number] | null;
  pickupAddress: string;
  destinationAddress: string;
  weather: string | null;
  availableCars: Car[];
  isSurge: boolean;
  distance: number;
  
  setPickup: (coords: [number, number] | null) => void;
  setDestination: (coords: [number, number] | null) => void;
  setPickupAddress: (address: string) => void;
  setDestinationAddress: (address: string) => void;
  setWeather: (weather: string | null) => void;
  setAvailableCars: (cars: Car[]) => void;
  setIsSurge: (surge: boolean) => void;
  setDistance: (dist: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [pickup, setPickup] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [weather, setWeather] = useState<string | null>(null);
  const [availableCars, setAvailableCars] = useState<Car[]>([]);
  const [isSurge, setIsSurge] = useState(false);
  const [distance, setDistance] = useState(0);

  // Fetch live weather for Mumbai once on mount
  React.useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&current_weather=true");
        if (res.ok) {
          const data = await res.json();
          const temp = data.current_weather.temperature;
          const code = data.current_weather.weathercode;
          
          let condition = "Clear ☀️";
          if (code >= 1 && code <= 3) condition = "Cloudy ⛅";
          if (code >= 45 && code <= 48) condition = "Fog 🌫️";
          if (code >= 51 && code <= 67) condition = "Rain 🌧️";
          if (code >= 71 && code <= 77) condition = "Snow ❄️";
          if (code >= 95) condition = "Thunderstorm ⛈️";
          
          setWeather(`${condition} ${temp}°C`);
        } else {
          setWeather("Clear ☀️ 28°C"); // Fallback if API fails
        }
      } catch (err) {
        setWeather("Clear ☀️ 28°C"); // Fallback on error
      }
    };
    fetchWeather();
  }, []);

  return (
    <BookingContext.Provider value={{
      pickup, setPickup,
      destination, setDestination,
      pickupAddress, setPickupAddress,
      destinationAddress, setDestinationAddress,
      weather, setWeather,
      availableCars, setAvailableCars,
      isSurge, setIsSurge,
      distance, setDistance
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
