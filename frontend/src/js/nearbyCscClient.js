// public/js/nearbyCscClient.js
export function initNearbyCscHelpCenter() {
  const mapEl = document.getElementById("map");
  const btn = document.getElementById("findCscBtn");
  const listEl = document.getElementById("placesList");

  if (!mapEl || !btn || !listEl) {
    console.warn(
      "[nearbyCscClient] Missing #map, #findCscBtn or #placesList in DOM."
    );
    return;
  }

  const map = L.map("map").setView([20.5937, 78.9629], 5); // India default
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  let userMarker = null;
  const placesLayer = L.layerGroup().addTo(map);

  btn.addEventListener("click", () => {
    btn.disabled = true;
    btn.textContent = "Locating... (allow location access)";

    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported by your browser.");
      btn.disabled = false;
      btn.textContent = "Find Nearby CSCs (use my live location)";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        btn.textContent = "Searching CSCs near you...";

        if (userMarker) {
          map.removeLayer(userMarker);
        }
        userMarker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup("You are here")
          .openPopup();
        map.setView([lat, lng], 13);

        try {
          const resp = await fetch("/api/nearby-csc", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat, lng, radius: 5000 }),
          });

          const data = await resp.json();
          console.log("[nearbyCscClient] API response:", data);

          if (!data.success) {
            alert(
              "Failed to fetch nearby CSCs: " + (data.error || "Unknown error")
            );
            return;
          }

          const places = Array.isArray(data.places) ? data.places : [];
          placesLayer.clearLayers();
          listEl.innerHTML = "";

          if (places.length === 0) {
            listEl.innerHTML =
              "<p>No CSCs found within 5 km. Try again or increase radius.</p>";
            return;
          }

          places.forEach((p, index) => {
            const plat = Number(p.location?.lat);
            const plng = Number(p.location?.lng);
            if (!Number.isFinite(plat) || !Number.isFinite(plng)) return;

            const marker = L.marker([plat, plng])
              .addTo(placesLayer)
              .bindPopup(
                `<b>${p.name}</b><br>${p.address ? p.address : ""}`.trim()
              );

            const item = document.createElement("div");
            item.style.padding = "8px";
            item.style.borderBottom = "1px solid #eee";
            item.innerHTML = `
              <b>${index + 1}. ${p.name}</b><br>
              <small>${p.address || ""}</small><br>
              <button data-lat="${plat}" data-lng="${plng}" style="margin-top:6px;">
                Navigate
              </button>
            `;

            const navBtn = item.querySelector("button");
            navBtn.addEventListener("click", () => {
              const destLat = navBtn.dataset.lat;
              const destLng = navBtn.dataset.lng;
              const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destLat},${destLng}&travelmode=driving`;
              window.open(url, "_blank");
            });

            item.addEventListener("mouseenter", () => {
              marker.openPopup();
            });

            listEl.appendChild(item);
          });
        } catch (err) {
          console.error("[nearbyCscClient] Error:", err);
          alert("Error fetching nearby CSCs: " + err.message);
        } finally {
          btn.disabled = false;
          btn.textContent = "Find Nearby CSCs (use my live location)";
        }
      },
      (err) => {
        console.warn("[nearbyCscClient] geolocation error", err);
        alert(
          "Unable to get your location: " +
            (err.message || "Location permission denied")
        );
        btn.disabled = false;
        btn.textContent = "Find Nearby CSCs (use my live location)";
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  });
}
