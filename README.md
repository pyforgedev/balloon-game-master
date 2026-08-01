# 🎈 Balloon Pop — Shoot & Score!

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Play%20Now-brightgreen?style=for-the-badge&logo=google-chrome&logoColor=white)](http://mybaloon.pyforgedev.web.id/)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS%20%7C%20jQuery-blue?style=flat-square)](#-tech-stack)

A modern, responsive, and interactive JavaScript balloon-shooting game built using vanilla HTML/CSS/JS with jQuery. Lock your targets, aim with your shotgun, and pop all the balloons before they escape!

**[🕹️ Play Live Demo](http://mybaloon.pyforgedev.web.id/)**

</div>

---

## 🚀 Key Features

*   🎨 **Aesthetic Redesign**: Modern background gradients with subtle structural patterns, glassmorphism UI elements, and glowing layouts.
*   🎈 **Custom Character SVG Balloons**: 6 vibrant gradient colors with realistic light reflections and floating animation effects.
*   🎯 **Interactive Custom Cursor**: Active lock-on crosshair that changes color from white to red when hovering over balloons.
*   🏆 **Welcome & Game Over Modals**: Smooth card overlays showing custom-tailored gameplay information and random motivational/humorous quotes based on performance.
*   ⚙️ **Settings Control Center**: Floating gear settings panel at the top-right offering:
    *   Game Pause / Resume (with state freezing)
    *   Game instant Reset
    *   🎵 BGM Music Toggle (ON/OFF)
    *   🔊 SFX Shot Toggle (ON/OFF)
*   🎹 **Web Audio API Synth BGM**: Programmatic retro chiptune melody synthesized live inside the browser.
*   💥 **Sound Effects**: Real shotgun reload-and-fire audio effect mapped directly on shot events.

---

## 🛠️ Tech Stack

| Technology / Library | Purpose |
| :--- | :--- |
| **HTML5 & CSS3** | Structural markup, glassmorphic styling, keyframe animations, & responsive layouts |
| **JavaScript (ES6+)** | Game engine, state handling, and interactive game loop |
| **jQuery 3.7.1** | DOM animations, dynamic balloon generation, and event listeners |
| **Web Audio API** | Real-time chiptune synthesizer for background music (BGM) |
| **HTML5 Audio** | Dynamic audio pool buffer management for rapid-fire shotgun sounds |

---

## ⚙️ Technical Details

*   **Zero Build Setup**: Pure static HTML/CSS/JS—no `npm install`, compilers, or bundlers required.
*   **Performance Audio**: Custom audio pool buffer management to handle rapid-fire clicks without clipping or delay.
*   **Fully Responsive**: Scales to any device viewport from mobile phones to high-resolution desktop monitors.

---

## 📂 Project Structure

```text
balloon-game-master/
├── favicon/              # App icon variations & manifest
├── index.html            # Main markup & entry point
├── main.css              # Custom styling & glassmorphism UI rules
├── script.js             # Core game engine logic & audio pool
├── Shotgun.mp3           # SFX shotgun firing sound asset
├── README.md             # Project documentation
├── AGENTS.md             # Developer & AI instructions sheet
└── LICENSE               # MIT License declaration
```

---

## 🎮 How to Play

1. 📂 Open `index.html` directly in any modern web browser.
2. 🟢 Click **Start Game** on the main menu.
3. 🎯 Aim using the crosshair and click on balloons to shoot them down!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
