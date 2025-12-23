// NearbyCsc.jsx
// type:module React component (export default)
import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function NearbyCsc() {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [userPos, setUserPos] = useState(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // 1️⃣ Initialize map + fix marker icons
  useEffect(() => {
    let L;
    (async () => {
      L = (await import("leaflet")).default;

      // 🔴 IMPORTANT: fix default marker icon paths (otherwise markers are invisible)
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapRef.current) {
        mapRef.current = L.map("nearby-csc-map", {
          center: [20.5937, 78.9629], // India default
          zoom: 5,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap",
        }).addTo(mapRef.current);

        // ensure map sizes correctly after mount
        setTimeout(() => {
          mapRef.current.invalidateSize();
        }, 300);
      }
    })();

    // cleanup
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch {}
        mapRef.current = null;
      }
    };
  }, []);

  // 2️⃣ Render markers whenever places / userPos change
  useEffect(() => {
    (async () => {
      if (!mapRef.current) return;
      const L = (await import("leaflet")).default;

      // Clear old markers
      markersRef.current.forEach((m) => {
        try {
          mapRef.current.removeLayer(m);
        } catch {}
      });
      markersRef.current = [];

      // User marker
      if (userPos) {
        const um = L.circleMarker([userPos.lat, userPos.lng], {
          radius: 8,
          color: "#2563eb",
          fillColor: "#2563eb",
          fillOpacity: 0.8,
          weight: 3,
        })
          .bindPopup("📍 You are here")
          .addTo(mapRef.current);

        markersRef.current.push(um);
        mapRef.current.setView([userPos.lat, userPos.lng], 13);
      }

      // CSC markers (from JSON)
      console.log("CSC places from API:", places); // 👀 debug in console

      places.forEach((p) => {
        if (typeof p.lat !== "number" || typeof p.lng !== "number") return;

        const marker = L.marker([p.lat, p.lng])
          .addTo(mapRef.current)
          .bindPopup(
            `<b>${p.name}</b><br>${p.address || ""}<br><small>${(
              p.distance_m / 1000
            ).toFixed(2)} km</small>`
          );

        markersRef.current.push(marker);
      });
    })();
  }, [places, userPos]);

  // 3️⃣ Trigger API call using live geolocation
  //   const findNearby = () => {
  //     setError("");
  //     setLoading(true);
  //     setPlaces([]);

  //     if (!navigator.geolocation) {
  //       setError("Geolocation not supported by browser.");
  //       setLoading(false);
  //       return;
  //     }

  //     navigator.geolocation.getCurrentPosition(
  //       async (pos) => {
  //         const lat = pos.coords.latitude;
  //         const lng = pos.coords.longitude;
  //         setUserPos({ lat, lng });

  //         try {
  //           const resp = await fetch("/api/nearby-csc", {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({ lat, lng, radius: 5000, limit: 20 }),
  //           });
  //           const json = await resp.json();
  //           console.log("API response:", json); // 👀 make sure places is coming
  //           if (!json.success) throw new Error(json.error || "server error");
  //           setPlaces(json.places || []);
  //         } catch (e) {
  //           console.error(e);
  //           setError(e.message || "Failed to get nearby CSCs");
  //         } finally {
  //           setLoading(false);
  //         }
  //       },
  //       (err) => {
  //         setError(err.message || "Unable to get location");
  //         setLoading(false);
  //       },
  //       { enableHighAccuracy: true, timeout: 10000 }
  //     );
  //   };

  //   const findNearby = () => {
  //     setError("");
  //     setLoading(true);
  //     setPlaces([]);

  //     if (!navigator.geolocation) {
  //       setError("Geolocation not supported by browser.");
  //       setLoading(false);
  //       return;
  //     }

  //     navigator.geolocation.getCurrentPosition(
  //       async (pos) => {
  //         const lat = pos.coords.latitude;
  //         const lng = pos.coords.longitude;
  //         console.log("User location:", lat, lng);
  //         setUserPos({ lat, lng });

  //         try {
  //           const resp = await fetch("/api/nearby-csc", {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({ lat, lng, radius: 5000, limit: 20 }),
  //           });
  //           const json = await resp.json();
  //           console.log("API response:", json);
  //           if (!json.success) throw new Error(json.error || "server error");
  //           setPlaces(json.places || []);
  //         } catch (e) {
  //           console.error(e);
  //           setError(e.message || "Failed to get nearby CSCs");
  //         } finally {
  //           setLoading(false);
  //         }
  //       },
  //       (err) => {
  //         console.error("Geo error:", err);
  //         if (err.code === 3) {
  //           setError(
  //             "Location request timed out. Please move to an open area or check GPS and try again."
  //           );
  //         } else if (err.code === 1) {
  //           setError("Location permission denied. Please allow location access.");
  //         } else {
  //           setError(err.message || "Unable to get location");
  //         }
  //         setLoading(false);
  //       },
  //       {
  //         enableHighAccuracy: false, // ⬅️ faster & less likely to time out
  //         timeout: 30000, // ⬅️ 30 seconds instead of 10
  //         maximumAge: 0,
  //       }
  //     );
  //   };

  const findNearby = () => {
    setError("");
    setLoading(true);
    setPlaces([]);

    if (!navigator.geolocation) {
      setError("Geolocation not supported by browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        console.log("User live location:", lat, lng);
        setUserPos({ lat, lng });

        // 👉 STATIC DUMMY CSCs AROUND USER LOCATION
        const dummyPlaces = [
          {
            id: "csc-1",
            name: "CSC Center - North",
            address: "Approx 500m north of your location",
            lat: lat + 0.004, // ~400–450m north-east
            lng: lng + 0.004,
            distance_m: 600,
          },
          {
            id: "csc-2",
            name: "CSC Center - South",
            address: "Approx 800m south of your location",
            lat: lat - 0.006,
            lng: lng - 0.002,
            distance_m: 900,
          },
          {
            id: "csc-3",
            name: "CSC Center - East",
            address: "Approx 1.2km east of your location",
            lat: lat,
            lng: lng + 0.01,
            distance_m: 1200,
          },
          {
            id: "csc-4",
            name: "CSC Center - West",
            address: "Approx 2km west of your location",
            lat: lat,
            lng: lng - 0.018,
            distance_m: 2000,
          },
        ];

        setPlaces(dummyPlaces);
        setLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError(err.message || "Unable to get location");
        setLoading(false);
      },
      {
        enableHighAccuracy: false, // faster + avoids many timeouts
        timeout: 30000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Find nearby CSCs (live location)
        </h2>
        <button
          onClick={findNearby}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Locating..." : "Use my live location"}
        </button>
      </div>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      <div className="grid md:grid-cols-3 gap-4">
        {/* Left side: list */}
        <div className="md:col-span-1">
          <div className="bg-white rounded shadow p-3 h-96 overflow-auto">
            <h3 className="font-medium mb-2">Results</h3>
            {!places.length && (
              <p className="text-sm text-gray-500">
                No results yet. Click the button to search.
              </p>
            )}
            <ul>
              {places.map((p, i) => (
                <li key={p.id || i} className="border-b py-2">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-gray-600">{p.address}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        {(p.distance_m / 1000).toFixed(2)} km
                      </div>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&origin=${
                          userPos?.lat || ""
                        },${userPos?.lng || ""}&destination=${p.lat},${p.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 text-sm"
                      >
                        Navigate
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side: map */}
        <div className="md:col-span-2">
          <div
            id="nearby-csc-map"
            className="h-96 rounded shadow bg-gray-100 w-full"
          />
        </div>
      </div>
    </div>
  );
}
