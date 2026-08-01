# AGENTS.md

## Project

Interactive JavaScript balloon-shooting game — static HTML/CSS/JS with modern UI/UX improvements, no build system, no package manager.

## Files

| File | Role |
|---|---|
| `index.html` | Entry point, loads jQuery CDN + `script.js` + `main.css`, contains DOM layout |
| `script.js` | Game logic: spawns SVG balloons sequentially, handles crosshair shot mechanics, Web Audio API sound loop, settings state, score tracker |
| `main.css` | Modern styling, glassmorphism UI, custom crosshair cursors, floating/fade keyframe animations |
| `Shotgun.mp3` | Active audio asset used for the pop shot sound effect |

## Key details

- jQuery loaded from CDN (`ajax.googleapis.com`), no local installation needed
- Custom BGM music synthesized dynamically on runtime using Web Audio API (Triangle/Sine oscillator loop)
- Integrated toggle switches in the Settings panel for individual BGM and SFX controls
- To verify: open `index.html` in a web browser
- `.gitattributes` normalizes line endings; `.gitignore` ignores OS/Windows artifacts
