# AGENTS.md

## Project

Simple JavaScript balloon-shooting game — static HTML/CSS/JS, no build system, no package manager.

## Files

| File | Role |
|---|---|
| `index.html` | Entry point, loads jQuery CDN + `script.js` + `main.css` |
| `script.js` | Game logic: spawns balloons, handles clicks, score counter, replay |
| `main.css` | Styling, balloon/score layout |
| `fireball.wav` | Pop sound effect (loaded by `script.js`) |
| `Shotgun.mp3` | Unused audio asset |

## Key details

- jQuery loaded from CDN (`ajax.googleapis.com`), no local install needed
- `Shotgun.mp3` is not referenced in any code
- No build, test, lint, or typecheck commands exist
- To verify: open `index.html` in a browser
- `.gitattributes` normalizes line endings; `.gitignore` ignores OS/Windows artifacts