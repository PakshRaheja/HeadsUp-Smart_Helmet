# 🧠 HeadsUP! — Smart Helmet for Kids & Adventure Enthusiasts

Heads UP! is a smart helmet system built using a **Raspberry Pi** and camera to provide **live video streaming**, **real-time fall detection**, and **GPS-based location tracking** on an interactive web interface. It's designed to enhance safety for **children** and **adventure lovers** like cyclists, skaters, and trekkers.

---

## 🚀 Features

### 🎥 Live Video Feed
- The Raspberry Pi camera streams real-time footage directly to a web page.
- Guardians or remote observers can see exactly what the user sees.

### 📉 Fall Detection
- A simple yet effective tilt-based fall detection algorithm analyzes video stream orientation.
- If a fall is detected, a warning is shown instantly on the web dashboard.

### 📍 Real-Time Location Tracking
- Uses the device's GPS via the browser and displays location on an interactive **Leaflet.js** map.
- Continuously updates position as the wearer moves.

### 🌐 Web Interface
- Built with Flask (Python) as the backend server.
- Stylish and responsive front-end with custom navigation, alert system, and animations.
- Fully functional on mobile browsers too.

---

## 🧰 Tech Stack

| Component | Technology |
|----------|-------------|
| **Hardware** | Raspberry Pi 4 + Pi Camera |
| **Backend** | Python + Flask |
| **Frontend** | HTML, CSS, JavaScript |
| **Location Map** | [Leaflet.js](https://leafletjs.com/) with OpenStreetMap |
| **Camera Streaming** | Raw image stream using Flask `/video_feed` |
| **Fall Detection** | Tilt-based algorithm using video feed frame analysis |

---

## Webpage screenshots

<img width="1440" alt="Screenshot 2025-04-18 at 01 37 04" src="https://github.com/user-attachments/assets/1cff6c58-44cb-41e4-b787-bc44124d28e9" />
<img width="1440" alt="Screenshot 2025-04-18 at 01 42 23" src="https://github.com/user-attachments/assets/1f1baf04-b2d8-4381-8521-e98ea44b2d59" />

---


