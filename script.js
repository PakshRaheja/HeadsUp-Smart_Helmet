
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);


    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    document.getElementById(targetId).classList.add('active');


    document.querySelectorAll('.nav-links a').forEach(navLink => {
      navLink.classList.remove('active');
    });
    link.classList.add('active');


    if (targetId === 'location' && map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  });
});


let map, marker;
let fallPreviouslyDetected = false;
let fallTimeout = null;

function initMap() {
  console.log("Initializing map...");
  map = L.map('map').setView([0, 0], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  marker = L.marker([0, 0]).addTo(map);
}

function updateMap(lat, lon) {
  const pos = [lat, lon];
  map.setView(pos, 16);
  marker.setLatLng(pos);
}

function sendLocation(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  console.log("GPS Position:", lat, lon);
  updateMap(lat, lon);
}

function showFallAlert() {
  const alertBox = document.getElementById("fall-alert");
  alertBox.style.display = "block";

  if (fallTimeout) {
    clearTimeout(fallTimeout);
  }

  fallTimeout = setTimeout(() => {
    alertBox.style.display = "none";
  }, 5000);
}

window.onload = function () {
  initMap();
  setTimeout(() => {
	map.invalidateSize();
       }, 500);


  navigator.geolocation.watchPosition(
    sendLocation,
    function (error) {
      console.error("GPS Error:", error.message);
      alert("GPS Error: " + error.message);
    },
    {
      enableHighAccuracy: false,
      timeout: 1000000,
      maximumAge: 0
    }
  );

  
  setInterval(() => {
    fetch('/fall_status')
      .then(res => res.json())
      .then(data => {
        if (data.fall && !fallPreviouslyDetected) {
          fallPreviouslyDetected = true;
          showFallAlert();
        } else if (!data.fall) {
          fallPreviouslyDetected = false;
        }
      })
      .catch(err => console.error("Fall detection fetch error:", err));
  }, 1000);
};
