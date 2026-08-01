# Balloon Pop - Shoot & Score!

A modern, responsive, and interactive JavaScript balloon-shooting game built using vanilla HTML/CSS/JS with jQuery. Lock your targets, aim with your shotgun, and pop all the balloons before they escape!

## Key Features
- **Aesthetic Redesign**: Modern background gradients with subtle structural patterns, glassmorphism UI elements, and glowing layouts.
- **Custom Character SVG Balloons**: 6 vibrant gradient colors with realistic light reflections and floating animation effects.
- **Interactive Custom Cursor**: Active lock-on crosshair that changes color from white to red when hovering over balloons.
- **Game Welcome & Over Modals**: Smooth card overlays showing custom-tailored gameplay information and random motivational/humorous quotes based on performance.
- **Settings Control Center**: Floating gear settings panel at the top-right offering:
  - Game Pause / Resume (with state freezing)
  - Game instant Reset
  - BGM Music Toggle (ON/OFF)
  - SFX Shot Toggle (ON/OFF)
- **Web Audio API Synth BGM**: Programmatic retro chiptune melody synthesized live inside the browser.
- **Sound Effects**: Real shotgun reload-and-fire audio effect mapped directly on shot events.

## Technical Details
- Static HTML/CSS/JS (no npm compilation required).
- Uses jQuery hosted on Google CDN for DOM animations and events.
- Audio pool buffer management to handle rapid fire shotgun click events seamlessly.
- Responsive mobile layouts scaling to any device viewport.

## How to Play
1. Simply double-click/open `index.html` in any modern web browser.
2. Click **Start Game** on the main menu.
3. Aim using the crosshair and click on balloons to shoot them down!
