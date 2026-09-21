# RoboHub — Smart Engineering Campus

## Overview

RoboHub is a project-discovery and community platform for engineering students. Students can explore projects built by their peers, find campus events, pick learning resources, and keep track of their own work.

It is a **frontend-only prototype** built with plain HTML, CSS and JavaScript. There is no backend: projects, events and student numbers are sample data, and anything you do (saving a project, registering for an event, adding your own project) is stored in your browser only.

To run it, open `index.html` in a browser. No install or build step is needed.

## Features

- **Dashboard** with a welcome banner, four overview cards (projects, students, events, resources), featured projects, upcoming events and recommended resources.
- **Explore Projects** with live text search, category filters with counts, and a clear empty state ("No projects found. Try another keyword or category.").
- **Project details dialog** with a large image, description, technologies, author, status, a GitHub button and a close/back button. It closes with the Esc key or a click on the backdrop.
- **Save projects** with a bookmark button. Saved projects appear in My Projects.
- **Events** with date, title, location and description. The Register button shows a short loading state, a confirmation message, and can be cancelled. Registrations persist in the browser.
- **Resources** (Arduino, ESP32, C Programming, Python, Git & GitHub, Web Development). The Explore button opens a "Start here" list and a link to the official documentation.
- **My Projects** where you can add your own project through a validated form, remove it later, and see everything you saved.
- **Profile** where you set a display name and your interests. The dashboard greeting and recommended resources follow those choices.
- **Dark / light mode** with a toggle in the top bar (also available in Profile). The choice is remembered and applied before the page paints, so there is no flash when you reload or move between pages.
- **Responsive layout** for desktop, laptop, tablet and mobile. On screens up to 900px wide the sidebar becomes a slide-in menu with a backdrop.
- **Active navigation state** driven by the URL hash, so the browser back and forward buttons work.

## Technologies

- HTML5 (semantic elements, native `<dialog>`)
- CSS3 (custom properties, Grid, Flexbox, media queries)
- Vanilla JavaScript (no frameworks, no libraries)

Fonts (Bricolage Grotesque and IBM Plex Sans) load from Google Fonts. If you are offline, the page falls back to your system fonts and everything else still works.

## UI/UX Highlights

- **One clear accent.** The interface is a calm teal and neutral palette. Signal orange is kept for small moments: the logo node, the bookmark state, and the signal that reaches the chip in the hero.
- **Engineering-themed hero.** The welcome banner draws a circuit board once when the page loads, then sends a pulse to the chip. It is the only animation that runs on its own, and it is skipped when the user prefers reduced motion.
- **Consistent design tokens.** Colors, radii, shadows and fonts are CSS variables, so both themes share one set of components.
- **Cards that explain themselves.** Every project card shows the image, category, a short description, technologies, the author and a clear "View project" button.
- **Feedback for every action.** Buttons have hover, focus and pressed states. Registering shows a loading state, and saving or registering shows a short confirmation message.
- **Helpful empty states.** No search results and empty My Projects lists each say what to do next.
- **Accessibility.** Semantic landmarks, a skip link, visible keyboard focus, labelled controls, `aria-pressed` and `aria-expanded` on toggles, a live region for results and messages, focus moved to the page heading on navigation, and Esc to close the menu and dialogs.
- **Mobile first details.** No horizontal scrolling, touch-sized buttons, and type that scales with the screen.
- **Safe rendering.** Text typed by users is escaped before it is shown.

## Project Structure

```
robohub/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── images/
│       ├── favicon.svg
│       ├── smart-home.svg
│       ├── line-follower.svg
│       ├── weather-station.svg
│       ├── energy-monitor.svg
│       ├── obstacle-robot.svg
│       ├── plant-detector.svg
│       ├── event-board.svg
│       ├── lab-dashboard.svg
│       └── custom-project.svg
└── README.md
```

The project images are original SVG illustrations, so they stay sharp on every screen and need no downloads.

## Customising the Sample Data

All sample content is at the top of `script.js`: `SAMPLE_PROJECTS`, `EVENTS` and `RESOURCES`. Replace the `github` links with your real repository links, and change the author names as you like. Event dates are set with `daysFromNow`, so they always stay in the future.

## Future Improvements

- User accounts and sign-in, so profiles, saved projects and registrations follow you across devices.
- A database and API for projects, events and resources, with a form to submit and edit projects.
- Image upload for project covers instead of the placeholder illustration.
- Real event registration with seat limits, reminders and a calendar export.
- Comments, likes and team invitations on projects.
- Admin tools for faculty to publish events and approve featured projects.
- Automated tests for the JavaScript and an accessibility audit in CI.

## Author

**Name:** _Your name here_
**GitHub:** _https://github.com/your-username_
**Email / LinkedIn:** _optional_
