// === Replace with your actual OpenCage API Key ===
const GEOCODE_API_KEY = "ab6873e6f16a450fbccb79bc49b4e1f1";

// === 1. Geolocation + Reverse Geocoding ===
navigator.geolocation.getCurrentPosition(async (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const locationText = document.getElementById('location');
  locationText.textContent = `Coordinates: ${lat.toFixed(2)}, ${lon.toFixed(2)} (Fetching address...)`;

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${GEOCODE_API_KEY}`
    );
    const data = await response.json();
    const components = data.results[0].components;
    const city = components.city || components.town || components.village || '';
    const state = components.state || '';
    const country = components.country || '';

    locationText.textContent = `Location: ${city}, ${state}, ${country}`;
  } catch (error) {
    locationText.textContent = `Location: Latitude ${lat}, Longitude ${lon}`;
    console.error("Reverse geocoding failed:", error);
  }
}, () => {
  document.getElementById('location').textContent = "Unable to fetch location.";
});

// === 2. Network Information API with Suggestions ===
if ('connection' in navigator) {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const speed = connection.effectiveType;

  const netStatus = document.getElementById('network-status');
  netStatus.textContent = `Network Type: ${speed.toUpperCase()}`;

  if (["2g", "slow-2g"].includes(speed)) {
    netStatus.innerHTML += " ⚠️ Slow internet detected. Please switch to Wi-Fi for better experience.";
    alert("⚠️ You are on a slow connection. Some features may load slowly.");
  }
}

// === 3. Intersection Observer for Scroll Animations ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
        console.log(`🟢 Card visible: ${entry.target.innerText}`);
      }, index * 200); // staggered animation
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.observer').forEach(card => {
  observer.observe(card);
});

