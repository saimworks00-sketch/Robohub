"use strict";

/* ==========================================================================
   RoboHub — Smart Engineering Campus
   Vanilla JavaScript, no dependencies. This is a frontend prototype:
   all data below is sample data and nothing is sent to a server.

   Sections
   1. Sample data
   2. State and storage
   3. Small helpers
   4. HTML builders (cards, rows, dialog content)
   5. Rendering
   6. Actions (save, register, dialogs, forms)
   7. Theme, mobile menu, toasts
   8. Routing
   9. Event listeners and start-up
   ========================================================================== */


/* 1. Sample data --------------------------------------------------------- */

const CATEGORIES = ["Robotics", "IoT", "Embedded Systems", "AI/ML", "Web Development"];

// Sample students shown as "Active students" on the dashboard.
const ACTIVE_STUDENTS = 1240;

// The GitHub links open GitHub topic pages with similar open-source work.
// Replace them with real repository links when you have them.
const SAMPLE_PROJECTS = [
  {
    id: "smart-home",
    name: "Smart Home Automation",
    category: "IoT",
    description: "Control lights, fans and sensors from your phone over Wi-Fi, with schedules and energy-saving scenes.",
    details: "A low-cost home controller built around an ESP32. Relays switch lights and fans, while temperature and motion sensors trigger scenes automatically. A simple dashboard shows device status and lets you set schedules from any phone on the same network.",
    tech: ["ESP32", "MQTT", "Relay module", "Node-RED"],
    author: "Nusrat Jahan",
    status: "Completed",
    image: "assets/images/smart-home.svg",
    imageAlt: "Illustration of a house with Wi-Fi signals and connected sensors",
    github: "https://github.com/topics/home-automation",
    featured: true
  },
  {
    id: "line-follower",
    name: "Autonomous Line Following Robot",
    category: "Robotics",
    description: "A compact robot that follows a marked track using infrared sensors and PID steering.",
    details: "Three infrared sensors read the line while a PID loop keeps the robot centred through curves. Tuning notes and lap times are included so you can reproduce the result and try to beat it.",
    tech: ["Arduino Uno", "IR sensors", "L298N driver", "PID control"],
    author: "Tanvir Ahmed",
    status: "Completed",
    image: "assets/images/line-follower.svg",
    imageAlt: "Illustration of a small robot driving along a curved white line",
    github: "https://github.com/topics/line-follower",
    featured: true
  },
  {
    id: "weather-station",
    name: "IoT Weather Station",
    category: "IoT",
    description: "Logs temperature, humidity and pressure and shows live readings on a web dashboard.",
    details: "A battery-friendly station that samples its sensors every minute and sends readings over Wi-Fi. A small web page charts the last 24 hours and flags sudden pressure drops.",
    tech: ["ESP32", "BME280", "Wi-Fi", "Web dashboard"],
    author: "Ayesha Siddiqua",
    status: "In progress",
    image: "assets/images/weather-station.svg",
    imageAlt: "Illustration of a sun, a cloud and a line chart of weather readings",
    github: "https://github.com/topics/weather-station"
  },
  {
    id: "energy-monitor",
    name: "Smart Energy Monitor",
    category: "Embedded Systems",
    description: "Measures household power use in real time and estimates the monthly electricity bill.",
    details: "Current and voltage sensors feed an STM32 microcontroller that calculates real power and energy. Readings appear on an OLED display and are stored on an SD card for later analysis.",
    tech: ["STM32", "ACS712", "OLED display", "C"],
    author: "Rafi Hasan",
    status: "Prototype",
    image: "assets/images/energy-monitor.svg",
    imageAlt: "Illustration of a power gauge with a lightning bolt and bar graphs",
    github: "https://github.com/topics/energy-monitor"
  },
  {
    id: "obstacle-robot",
    name: "Obstacle Avoiding Robot",
    category: "Robotics",
    description: "Ultrasonic sensing lets this robot detect objects and steer around them on its own.",
    details: "An ultrasonic sensor on a servo sweeps the path ahead. The robot picks the clearest direction and turns, which makes it a good first project for learning sensors and motor control.",
    tech: ["Arduino Nano", "HC-SR04", "Servo", "Motor driver"],
    author: "Maliha Rahman",
    status: "Completed",
    image: "assets/images/obstacle-robot.svg",
    imageAlt: "Illustration of a robot sending sonar waves toward a wall",
    github: "https://github.com/topics/obstacle-avoidance"
  },
  {
    id: "plant-detector",
    name: "AI Plant Disease Detector",
    category: "AI/ML",
    description: "Point a camera at a leaf and get an instant guess at common crop diseases.",
    details: "A lightweight image classifier trained on public leaf datasets runs on a Raspberry Pi. It reports the most likely disease with a confidence score, so farmers can act early.",
    tech: ["Python", "TensorFlow Lite", "OpenCV", "Raspberry Pi"],
    author: "Imran Hossain",
    status: "In progress",
    image: "assets/images/plant-detector.svg",
    imageAlt: "Illustration of a green leaf with a scan frame around a diseased spot",
    github: "https://github.com/topics/plant-disease-detection",
    featured: true
  },
  {
    id: "event-board",
    name: "Campus Event Board",
    category: "Web Development",
    description: "A responsive web app where clubs post events and students RSVP in one tap.",
    details: "Built with plain HTML, CSS and JavaScript. Clubs add events, students filter by date and interest, and the layout adapts from phones to lecture-hall projectors.",
    tech: ["HTML5", "CSS3", "JavaScript", "Accessibility"],
    author: "Sadia Karim",
    status: "Open for contributors",
    image: "assets/images/event-board.svg",
    imageAlt: "Illustration of a browser window showing a monthly calendar",
    github: "https://github.com/topics/event-management"
  },
  {
    id: "lab-dashboard",
    name: "Lab Inventory Dashboard",
    category: "Web Development",
    description: "Track components in the electronics lab with search, low-stock alerts and simple charts.",
    details: "A dashboard for lab assistants to see what is in stock at a glance. It highlights low quantities, supports quick search, and helps prepare a shopping list before each semester.",
    tech: ["JavaScript", "CSS Grid", "LocalStorage"],
    author: "Arif Chowdhury",
    status: "Prototype",
    image: "assets/images/lab-dashboard.svg",
    imageAlt: "Illustration of a dashboard with summary cards and a bar chart",
    github: "https://github.com/topics/inventory-management"
  }
];

// daysFromNow keeps the sample events in the future, whenever you open the page.
const EVENTS = [
  {
    id: "robotics-workshop",
    title: "Robotics Workshop",
    daysFromNow: 9,
    time: "10:00 AM – 1:00 PM",
    location: "Robotics Lab, Engineering Building",
    description: "Assemble and program a small line-following robot. Kits are provided and no experience is needed."
  },
  {
    id: "iot-bootcamp",
    title: "IoT Bootcamp",
    daysFromNow: 21,
    time: "9:00 AM – 4:00 PM",
    location: "Innovation Hub, Room 204",
    description: "A full day of connecting sensors to the web with an ESP32. Bring your own laptop."
  },
  {
    id: "hackathon",
    title: "Hackathon",
    daysFromNow: 38,
    time: "9:00 AM – 9:00 PM",
    location: "Main Auditorium",
    description: "Form a team of up to four and build a working prototype in one day. Mentors are on hand throughout."
  },
  {
    id: "ai-seminar",
    title: "AI Seminar",
    daysFromNow: 52,
    time: "3:00 PM – 5:00 PM",
    location: "Seminar Hall B",
    description: "See how students apply machine learning to farming, health and energy problems, then join the open Q&A."
  }
];

const RESOURCES = [
  {
    id: "arduino",
    title: "Arduino",
    icon: "cpu",
    level: "Beginner",
    description: "Learn the basics of microcontrollers with LEDs, buttons and simple sensors.",
    interests: ["Robotics", "Embedded Systems", "IoT"],
    steps: ["Install the Arduino IDE and blink the built-in LED.", "Read a push button and a temperature sensor.", "Drive a small motor or servo."],
    docs: "https://docs.arduino.cc/"
  },
  {
    id: "esp32",
    title: "ESP32",
    icon: "wifi",
    level: "Intermediate",
    description: "Add Wi-Fi and Bluetooth to your builds with a low-cost, capable board.",
    interests: ["IoT", "Embedded Systems"],
    steps: ["Set up the ESP32 in the Arduino IDE.", "Connect to Wi-Fi and read a sensor.", "Publish readings to a web page or an MQTT broker."],
    docs: "https://docs.espressif.com/projects/esp-idf/en/latest/esp32/"
  },
  {
    id: "c-programming",
    title: "C Programming",
    icon: "code",
    level: "Beginner",
    description: "Build a solid foundation in the language behind most embedded systems.",
    interests: ["Embedded Systems", "Robotics"],
    steps: ["Write, compile and run a Hello World program.", "Practise loops, arrays and functions.", "Learn pointers with small memory exercises."],
    docs: "https://en.cppreference.com/w/c"
  },
  {
    id: "python",
    title: "Python",
    icon: "terminal",
    level: "Beginner",
    description: "Automate tasks, analyse sensor data and take your first steps in machine learning.",
    interests: ["AI/ML", "Robotics"],
    steps: ["Install Python and run scripts from the terminal.", "Read and plot a CSV file of sensor readings.", "Train a simple classifier with scikit-learn."],
    docs: "https://docs.python.org/3/tutorial/"
  },
  {
    id: "git-github",
    title: "Git & GitHub",
    icon: "git",
    level: "Beginner",
    description: "Track changes, collaborate with teammates and publish your projects.",
    interests: ["Web Development", "AI/ML"],
    steps: ["Create a repository and make your first commit.", "Push to GitHub and write a clear README.", "Open a pull request on a teammate's project."],
    docs: "https://docs.github.com/en/get-started"
  },
  {
    id: "web-development",
    title: "Web Development",
    icon: "globe",
    level: "Beginner",
    description: "Learn HTML, CSS and JavaScript to build interfaces for your own projects.",
    interests: ["Web Development"],
    steps: ["Structure a page with semantic HTML.", "Style a responsive layout with CSS Grid and Flexbox.", "Add interaction with vanilla JavaScript."],
    docs: "https://developer.mozilla.org/en-US/docs/Learn"
  }
];

const ROUTES = {
  "dashboard": "Dashboard",
  "projects": "Explore projects",
  "events": "Events",
  "resources": "Resources",
  "my-projects": "My projects",
  "profile": "Profile"
};


/* 2. State and storage --------------------------------------------------- */

// Small wrapper around localStorage. It never throws, so the app still works
// when storage is blocked (for example in some private browsing modes).
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem("robohub:" + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem("robohub:" + key, JSON.stringify(value));
    } catch (error) { /* ignore: data simply will not persist */ }
  }
};

const state = {
  query: "",
  category: "All",
  saved: store.get("saved", []),
  registered: store.get("registered", []),
  myProjects: store.get("myProjects", []),
  profile: store.get("profile", { name: "Student", interests: [] }),
  pendingResource: null
};

const allProjects = () => [...SAMPLE_PROJECTS, ...state.myProjects];
const findProject = (id) => allProjects().find((project) => project.id === id);
const isRegistered = (id) => state.registered.includes(id);


/* 3. Small helpers ------------------------------------------------------- */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

// Everything a user can type is escaped before it is placed into HTML.
function escapeHTML(value) {
  const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value).replace(/[&<>"']/g, (char) => entities[char]);
}

const icon = (name) =>
  `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

function getInitials(name) {
  const letters = name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join("");
  return letters ? letters.toUpperCase() : "?";
}

function getEventDate(eventItem) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + eventItem.daysFromNow);
  return date;
}

// "Sep", not "Sept": en-GB shortens September differently, so months use en-US.
const shortMonth = (date) => date.toLocaleDateString("en-US", { month: "short" });
const longMonth = (date) => date.toLocaleDateString("en-US", { month: "long" });
const shortWeekday = (date) => date.toLocaleDateString("en-GB", { weekday: "short" });

function toISODate(date) {
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Cached references to elements used often.
const els = {
  appMain: $("#appMain"),
  sidebar: $("#sidebar"),
  scrim: $("#scrim"),
  menuBtn: $("#menuBtn"),
  themeToggle: $("#themeToggle"),
  globalSearch: $("#globalSearch"),
  globalSearchForm: $("#globalSearchForm"),
  projectSearch: $("#projectSearch"),
  categoryFilters: $("#categoryFilters"),
  resultCount: $("#resultCount"),
  projectGrid: $("#projectGrid"),
  emptyState: $("#emptyState"),
  featuredGrid: $("#featuredGrid"),
  dashEvents: $("#dashEvents"),
  dashResources: $("#dashResources"),
  recoHint: $("#recoHint"),
  eventList: $("#eventList"),
  resourceGrid: $("#resourceGrid"),
  ownGrid: $("#ownGrid"),
  ownEmpty: $("#ownEmpty"),
  savedGrid: $("#savedGrid"),
  savedEmpty: $("#savedEmpty"),
  navMineCount: $("#navMineCount"),
  profileForm: $("#profileForm"),
  displayName: $("#displayName"),
  interestOptions: $("#interestOptions"),
  projectDialog: $("#projectDialog"),
  projectDialogBody: $("#projectDialogBody"),
  addDialog: $("#addDialog"),
  addForm: $("#addForm"),
  toastRegion: $("#toastRegion")
};


/* 4. HTML builders ------------------------------------------------------- */

function projectCard(project, options = {}) {
  const saved = state.saved.includes(project.id);
  const id = escapeHTML(project.id);
  const name = escapeHTML(project.name);
  const removeButton = options.removable
    ? `<button class="btn btn-quiet btn-sm" type="button" data-action="remove-project" data-id="${id}">Remove<span class="sr-only"> ${name}</span></button>`
    : "";

  return `
    <article class="card project-card" data-project-id="${id}">
      <div class="card-media" data-action="open-project" data-id="${id}">
        <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt)}" width="800" height="500" loading="lazy">
        <span class="badge badge-category">${escapeHTML(project.category)}</span>
        <button class="icon-btn bookmark-btn" type="button" data-action="toggle-save" data-id="${id}" aria-pressed="${saved}" aria-label="Save ${name}">
          ${icon("bookmark")}
        </button>
      </div>
      <div class="card-body">
        <h3 class="card-title">${name}</h3>
        <p class="card-text">${escapeHTML(project.description)}</p>
        <ul class="tags" aria-label="Technologies">
          ${project.tech.slice(0, 4).map((tech) => `<li>${escapeHTML(tech)}</li>`).join("")}
        </ul>
      </div>
      <div class="card-foot">
        <span class="author">
          <span class="avatar avatar-sm" aria-hidden="true">${escapeHTML(getInitials(project.author))}</span>
          <span>${escapeHTML(project.author)}</span>
        </span>
        <div class="card-actions">
          ${removeButton}
          <button class="btn btn-secondary btn-sm" type="button" data-action="open-project" data-id="${id}">View project<span class="sr-only">: ${name}</span></button>
        </div>
      </div>
    </article>`;
}

function registerButton(eventItem) {
  const registered = isRegistered(eventItem.id);
  return `
    <button class="btn btn-sm ${registered ? "btn-secondary" : "btn-primary"}" type="button" data-action="toggle-register" data-id="${eventItem.id}">
      <span class="btn-label">${registered ? "Cancel registration" : "Register"}</span><span class="sr-only"> for ${escapeHTML(eventItem.title)}</span>
    </button>`;
}

function dateTile(date, small = false) {
  return `
    <div class="date-tile ${small ? "date-tile-sm" : ""}" aria-hidden="true">
      <span class="date-month">${shortMonth(date)}</span>
      <span class="date-day">${date.getDate()}</span>
    </div>`;
}

function eventCard(eventItem) {
  const date = getEventDate(eventItem);
  const longDate = `${shortWeekday(date)}, ${date.getDate()} ${longMonth(date)}`;
  return `
    <li class="card event-card">
      ${dateTile(date)}
      <div class="event-body">
        <h3 class="card-title">${escapeHTML(eventItem.title)}</h3>
        <p class="event-meta">
          <span>${icon("calendar")}<time datetime="${toISODate(date)}">${longDate}</time></span>
          <span>${icon("clock")}${escapeHTML(eventItem.time)}</span>
          <span>${icon("pin")}${escapeHTML(eventItem.location)}</span>
        </p>
        <p class="card-text">${escapeHTML(eventItem.description)}</p>
        <p class="registered-note" data-registered-note="${eventItem.id}" ${isRegistered(eventItem.id) ? "" : "hidden"}>${icon("check")}You are registered</p>
      </div>
      <div class="event-action">${registerButton(eventItem)}</div>
    </li>`;
}

function miniEventRow(eventItem) {
  const date = getEventDate(eventItem);
  const shortDate = `${shortWeekday(date)}, ${date.getDate()} ${shortMonth(date)}`;
  return `
    <li class="mini-item">
      ${dateTile(date, true)}
      <div>
        <h3 class="mini-title">${escapeHTML(eventItem.title)}</h3>
        <p class="mini-sub"><time datetime="${toISODate(date)}">${shortDate}</time>, ${escapeHTML(eventItem.location.split(",")[0])}</p>
      </div>
      ${registerButton(eventItem)}
    </li>`;
}

function miniResourceRow(resource) {
  return `
    <li class="mini-item">
      <span class="tile tile-sm" aria-hidden="true">${icon(resource.icon)}</span>
      <div>
        <h3 class="mini-title">${escapeHTML(resource.title)}</h3>
        <p class="mini-sub">${escapeHTML(resource.description)}</p>
      </div>
      <button class="btn btn-secondary btn-sm" type="button" data-action="open-resource" data-id="${resource.id}">Explore<span class="sr-only"> ${escapeHTML(resource.title)}</span></button>
    </li>`;
}

function resourceCard(resource) {
  const panelId = `resource-panel-${resource.id}`;
  return `
    <article class="card resource-card" id="resource-${resource.id}">
      <div class="card-body">
        <div class="resource-head">
          <span class="tile" aria-hidden="true">${icon(resource.icon)}</span>
          <span class="badge badge-level">${resource.level}</span>
        </div>
        <h3 class="card-title">${escapeHTML(resource.title)}</h3>
        <p class="card-text">${escapeHTML(resource.description)}</p>
      </div>
      <div class="resource-foot">
        <button class="btn btn-secondary btn-sm resource-toggle" type="button" data-action="toggle-resource" data-id="${resource.id}" aria-expanded="false" aria-controls="${panelId}">
          <span class="btn-label">Explore</span><span class="sr-only"> ${escapeHTML(resource.title)}</span>${icon("arrow-right")}
        </button>
      </div>
      <div class="resource-panel" id="${panelId}" hidden>
        <h4>Start here</h4>
        <ol>${resource.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol>
        <a class="link" href="${resource.docs}" target="_blank" rel="noopener noreferrer">Open the official documentation<span class="sr-only"> (opens in a new tab)</span></a>
      </div>
    </article>`;
}

function projectDialogHTML(project) {
  const saved = state.saved.includes(project.id);
  const id = escapeHTML(project.id);
  const githubButton = project.github
    ? `<a class="btn btn-primary" href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer">${icon("github")}<span>View on GitHub</span><span class="sr-only"> (opens in a new tab)</span></a>`
    : "";

  return `
    <div class="dialog-layout">
      <div class="dialog-media">
        <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt)}" width="800" height="500">
      </div>
      <dl class="facts">
        <div><dt>Author</dt><dd><span class="avatar avatar-sm" aria-hidden="true">${escapeHTML(getInitials(project.author))}</span>${escapeHTML(project.author)}</dd></div>
        <div><dt>Status</dt><dd>${escapeHTML(project.status)}</dd></div>
        <div><dt>Category</dt><dd>${escapeHTML(project.category)}</dd></div>
      </dl>
      <div class="dialog-main">
        <div class="dialog-head">
          <span class="badge badge-status" data-status="${escapeHTML(project.status)}">${escapeHTML(project.status)}</span>
          <h2 class="dialog-title" id="projectDialogTitle">${escapeHTML(project.name)}</h2>
        </div>
        <section class="dialog-section">
          <h3>About this project</h3>
          <p>${escapeHTML(project.details)}</p>
        </section>
        <section class="dialog-section">
          <h3>Technologies</h3>
          <ul class="tags">${project.tech.map((tech) => `<li>${escapeHTML(tech)}</li>`).join("")}</ul>
        </section>
        <div class="dialog-actions">
          ${githubButton}
          <button class="btn btn-secondary" type="button" data-action="toggle-save" data-id="${id}" aria-pressed="${saved}">
            ${icon("bookmark")}<span class="btn-label">${saved ? "Saved" : "Save project"}</span>
          </button>
          <button class="btn btn-quiet" type="button" data-action="close-dialog">Back to projects</button>
        </div>
      </div>
    </div>`;
}


/* 5. Rendering ----------------------------------------------------------- */

function getFilteredProjects() {
  const query = state.query.trim().toLowerCase();
  return allProjects().filter((project) => {
    if (state.category !== "All" && project.category !== state.category) return false;
    if (!query) return true;
    const searchable = [project.name, project.description, project.category, project.author, ...project.tech]
      .join(" ")
      .toLowerCase();
    return searchable.includes(query);
  });
}

function renderFilters() {
  const projects = allProjects();
  const options = ["All", ...CATEGORIES];
  els.categoryFilters.innerHTML = options.map((category) => {
    const count = category === "All" ? projects.length : projects.filter((p) => p.category === category).length;
    return `<button class="chip" type="button" data-action="set-category" data-category="${escapeHTML(category)}" aria-pressed="${state.category === category}">${escapeHTML(category)} <span class="chip-count">${count}</span></button>`;
  }).join("");
}

function renderProjects() {
  const results = getFilteredProjects();
  els.projectGrid.innerHTML = results.map((project) => projectCard(project)).join("");
  els.projectGrid.hidden = results.length === 0;
  els.emptyState.hidden = results.length !== 0;
  els.resultCount.textContent = `Showing ${results.length} of ${allProjects().length} projects`;
}

function renderFeatured() {
  const featured = SAMPLE_PROJECTS.filter((project) => project.featured).slice(0, 3);
  els.featuredGrid.innerHTML = featured.map((project) => projectCard(project)).join("");
}

function getUpcomingEvents() {
  return [...EVENTS].sort((a, b) => a.daysFromNow - b.daysFromNow);
}

function renderEvents() {
  const events = getUpcomingEvents();
  els.eventList.innerHTML = events.map(eventCard).join("");
  els.dashEvents.innerHTML = events.slice(0, 3).map(miniEventRow).join("");
}

function getRecommendedResources() {
  const interests = state.profile.interests;
  return RESOURCES
    .map((resource, index) => ({
      resource,
      index,
      score: resource.interests.filter((topic) => interests.includes(topic)).length
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3)
    .map((item) => item.resource);
}

function renderResources() {
  els.resourceGrid.innerHTML = RESOURCES.map(resourceCard).join("");
  els.dashResources.innerHTML = getRecommendedResources().map(miniResourceRow).join("");
  els.recoHint.textContent = state.profile.interests.length
    ? "Picked from the interests in your profile."
    : "Good places to start. Add interests in your profile for better picks.";
}

function renderMyProjects() {
  const own = state.myProjects;
  const saved = state.saved.map(findProject).filter(Boolean);

  els.ownGrid.innerHTML = own.map((project) => projectCard(project, { removable: true })).join("");
  els.ownGrid.hidden = own.length === 0;
  els.ownEmpty.hidden = own.length !== 0;

  els.savedGrid.innerHTML = saved.map((project) => projectCard(project)).join("");
  els.savedGrid.hidden = saved.length === 0;
  els.savedEmpty.hidden = saved.length !== 0;
}

function renderProfile() {
  els.displayName.value = state.profile.name;
  els.interestOptions.innerHTML = CATEGORIES.map((category) => `
    <label class="chip-check">
      <input type="checkbox" name="interests" value="${escapeHTML(category)}" ${state.profile.interests.includes(category) ? "checked" : ""}>
      <span>${escapeHTML(category)}</span>
    </label>`).join("");
  const currentTheme = document.documentElement.getAttribute("data-theme");
  $$('input[name="theme"]').forEach((radio) => { radio.checked = radio.value === currentTheme; });
}

function updateUserName() {
  $$("[data-user-name]").forEach((node) => { node.textContent = state.profile.name; });
  $$("[data-avatar]").forEach((node) => { node.textContent = getInitials(state.profile.name); });
}

function animateNumber(element, target) {
  if (prefersReducedMotion() || target === 0) {
    element.textContent = target.toLocaleString("en-US");
    return;
  }
  const duration = 900;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased).toLocaleString("en-US");
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Updates every number on the page that depends on state.
function updateCounters(animate = false) {
  const own = state.myProjects.length;
  const mineTotal = new Set([...state.saved, ...state.myProjects.map((p) => p.id)]).size;

  const stats = {
    projects: allProjects().length,
    students: ACTIVE_STUDENTS,
    events: EVENTS.length,
    resources: RESOURCES.length
  };
  $$("[data-stat]").forEach((node) => {
    const value = stats[node.dataset.stat];
    if (animate) animateNumber(node, value);
    else node.textContent = value.toLocaleString("en-US");
  });

  els.navMineCount.textContent = mineTotal;
  els.navMineCount.hidden = mineTotal === 0;

  const activity = { own, saved: state.saved.length, events: state.registered.length };
  $$("[data-activity]").forEach((node) => { node.textContent = activity[node.dataset.activity]; });
}

function renderAll() {
  renderFilters();
  renderProjects();
  renderFeatured();
  renderEvents();
  renderResources();
  renderMyProjects();
  renderProfile();
  updateUserName();
  updateCounters();
}


/* 6. Actions ------------------------------------------------------------- */

function setQuery(value) {
  state.query = value;
  if (els.projectSearch.value !== value) els.projectSearch.value = value;
  if (els.globalSearch.value !== value) els.globalSearch.value = value;
  renderProjects();
}

function setCategory(category) {
  state.category = category;
  renderFilters();
  renderProjects();
  // Keep keyboard focus on the chip that was just used.
  const active = $(`#categoryFilters [data-category="${category}"]`);
  if (active) active.focus();
}

function clearFilters() {
  state.category = "All";
  renderFilters();
  setQuery("");
  els.projectSearch.focus();
}

function syncSavedUI(id) {
  const saved = state.saved.includes(id);
  $$(`[data-action="toggle-save"][data-id="${id}"]`).forEach((button) => {
    button.setAttribute("aria-pressed", String(saved));
    const label = $(".btn-label", button);
    if (label) label.textContent = saved ? "Saved" : "Save project";
  });
}

function toggleSave(id) {
  const project = findProject(id);
  if (!project) return;
  const wasSaved = state.saved.includes(id);
  state.saved = wasSaved ? state.saved.filter((savedId) => savedId !== id) : [...state.saved, id];
  store.set("saved", state.saved);

  syncSavedUI(id);
  updateCounters();
  if (currentRoute() === "my-projects") renderMyProjects();
  showToast(wasSaved ? `Removed ${project.name} from saved projects.` : `Saved ${project.name} to My projects.`);
}

function removeProject(id) {
  const project = state.myProjects.find((item) => item.id === id);
  if (!project) return;
  if (!window.confirm(`Remove "${project.name}" from My projects?`)) return;

  state.myProjects = state.myProjects.filter((item) => item.id !== id);
  state.saved = state.saved.filter((savedId) => savedId !== id);
  store.set("myProjects", state.myProjects);
  store.set("saved", state.saved);
  renderAll();
  showToast("Project removed.");
}

function toggleRegistration(button) {
  if (button.classList.contains("is-loading")) return;
  const eventItem = EVENTS.find((item) => item.id === button.dataset.id);
  if (!eventItem) return;

  const registering = !isRegistered(eventItem.id);
  const label = $(".btn-label", button);

  // Short loading state so the click feels acknowledged (there is no real server call).
  button.classList.add("is-loading");
  button.setAttribute("aria-busy", "true");
  label.textContent = registering ? "Registering…" : "Cancelling…";

  setTimeout(() => {
    state.registered = registering
      ? [...state.registered, eventItem.id]
      : state.registered.filter((id) => id !== eventItem.id);
    store.set("registered", state.registered);

    button.classList.remove("is-loading");
    button.removeAttribute("aria-busy");
    syncRegistrationUI(eventItem.id);
    updateCounters();
    showToast(registering
      ? `You are registered for ${eventItem.title}.`
      : `Registration cancelled for ${eventItem.title}.`);
  }, 650);
}

function syncRegistrationUI(id) {
  const registered = isRegistered(id);
  $$(`[data-action="toggle-register"][data-id="${id}"]`).forEach((button) => {
    button.classList.toggle("btn-primary", !registered);
    button.classList.toggle("btn-secondary", registered);
    $(".btn-label", button).textContent = registered ? "Cancel registration" : "Register";
  });
  $$(`[data-registered-note="${id}"]`).forEach((note) => { note.hidden = !registered; });
}

function setResourceOpen(id, open) {
  const button = $(`#resource-${id} .resource-toggle`);
  const panel = $(`#resource-panel-${id}`);
  if (!button || !panel) return;
  button.setAttribute("aria-expanded", String(open));
  $(".btn-label", button).textContent = open ? "Hide" : "Explore";
  panel.hidden = !open;
}

function toggleResource(id) {
  const button = $(`#resource-${id} .resource-toggle`);
  setResourceOpen(id, button.getAttribute("aria-expanded") !== "true");
}

// Used by the dashboard: go to Resources and open the chosen card.
function openResource(id) {
  state.pendingResource = id;
  if (currentRoute() === "resources") revealPendingResource();
  else window.location.hash = "#resources";
}

function revealPendingResource() {
  const id = state.pendingResource;
  state.pendingResource = null;
  if (!id) return;
  setResourceOpen(id, true);
  const card = $(`#resource-${id}`);
  if (card) {
    card.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
    $(".resource-toggle", card).focus({ preventScroll: true });
  }
}

function openProjectDialog(id) {
  const project = findProject(id);
  if (!project) return;
  els.projectDialogBody.innerHTML = projectDialogHTML(project);
  els.projectDialogBody.scrollTop = 0;
  document.body.classList.add("no-scroll");
  els.projectDialog.showModal();
}

function openAddDialog() {
  closeMenu();
  els.addForm.reset();
  $$(".field-error", els.addForm).forEach((error) => { error.hidden = true; });
  $$("[aria-invalid]", els.addForm).forEach((input) => input.removeAttribute("aria-invalid"));
  document.body.classList.add("no-scroll");
  els.addDialog.showModal();
}

function setFieldError(input, message) {
  const error = $(`#${input.id}-error`);
  if (message) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
  error.textContent = message;
  error.hidden = !message;
}

function handleAddProject(event) {
  event.preventDefault();
  const form = els.addForm;
  const nameInput = form.elements.name;
  const techInput = form.elements.tech;
  const descriptionInput = form.elements.description;
  const githubInput = form.elements.github;

  const name = nameInput.value.trim();
  const tech = techInput.value.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 6);
  const description = descriptionInput.value.trim();
  const github = githubInput.value.trim();

  const errors = [
    [nameInput, name.length < 3 ? "Enter a project name with at least 3 characters." : ""],
    [techInput, tech.length === 0 ? "Add at least one technology, for example Arduino." : ""],
    [descriptionInput, description.length < 20 ? "Describe your project in at least 20 characters." : ""],
    [githubInput, github && !isValidWebLink(github) ? "Enter a full link, like https://github.com/you/your-project." : ""]
  ];
  errors.forEach(([input, message]) => setFieldError(input, message));

  const firstInvalid = errors.find(([, message]) => message);
  if (firstInvalid) {
    firstInvalid[0].focus();
    return;
  }

  state.myProjects = [
    {
      id: "mine-" + Date.now(),
      name,
      category: form.elements.category.value,
      description,
      details: description,
      tech,
      author: state.profile.name,
      status: "In progress",
      image: "assets/images/custom-project.svg",
      imageAlt: "Placeholder circuit illustration for " + name,
      github
    },
    ...state.myProjects
  ];
  store.set("myProjects", state.myProjects);

  els.addDialog.close();
  renderAll();
  showToast(`Added ${name} to My projects.`);
  if (currentRoute() !== "my-projects") window.location.hash = "#my-projects";
}

function isValidWebLink(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (error) {
    return false;
  }
}

function handleProfileSave(event) {
  event.preventDefault();
  const name = els.displayName.value.trim();
  const error = $("#displayName-error");

  if (!name) {
    els.displayName.setAttribute("aria-invalid", "true");
    error.textContent = "Enter a display name.";
    error.hidden = false;
    els.displayName.focus();
    return;
  }
  els.displayName.removeAttribute("aria-invalid");
  error.hidden = true;

  const interests = $$('input[name="interests"]:checked', els.profileForm).map((input) => input.value);
  state.profile = { name, interests };
  store.set("profile", state.profile);

  updateUserName();
  renderResources();
  showToast("Profile saved.");
}


/* 7. Theme, mobile menu, toasts ------------------------------------------ */

function applyTheme(theme, persist = true) {
  document.documentElement.setAttribute("data-theme", theme);
  els.themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  $$('input[name="theme"]').forEach((radio) => { radio.checked = radio.value === theme; });
  if (persist) {
    try { localStorage.setItem("robohub:theme", theme); } catch (error) { /* ignore */ }
  }
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  applyTheme(isDark ? "light" : "dark");
}

const mobileQuery = window.matchMedia("(max-width: 900px)");

function isMenuOpen() {
  return els.sidebar.classList.contains("is-open");
}

function openMenu() {
  els.sidebar.classList.add("is-open");
  els.scrim.hidden = false;
  els.menuBtn.setAttribute("aria-expanded", "true");
  els.appMain.inert = true;                // keeps keyboard focus inside the menu
  document.body.classList.add("no-scroll");
  (($(".nav-link.is-active", els.sidebar)) || $(".nav-link", els.sidebar)).focus();
}

function closeMenu(returnFocus = false) {
  if (!isMenuOpen()) return;
  els.sidebar.classList.remove("is-open");
  els.scrim.hidden = true;
  els.menuBtn.setAttribute("aria-expanded", "false");
  els.appMain.inert = false;
  document.body.classList.remove("no-scroll");
  if (returnFocus) els.menuBtn.focus();
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = icon("check");
  const text = document.createElement("span");
  text.textContent = message;
  toast.appendChild(text);

  // Keep at most three toasts on screen.
  while (els.toastRegion.children.length >= 3) els.toastRegion.firstChild.remove();
  els.toastRegion.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("is-leaving");
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}


/* 8. Routing ------------------------------------------------------------- */

function currentRoute() {
  const name = window.location.hash.replace(/^#\/?/, "");
  return Object.prototype.hasOwnProperty.call(ROUTES, name) ? name : "dashboard";
}

let firstRouteShown = false;

function showRoute() {
  const route = currentRoute();

  $$(".view").forEach((view) => { view.hidden = view.dataset.view !== route; });
  $$(".nav-link").forEach((link) => {
    const active = link.dataset.route === route;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.title = `${ROUTES[route]} · RoboHub`;

  if (route === "my-projects") renderMyProjects();
  closeMenu();

  if (state.pendingResource && route === "resources") {
    revealPendingResource();
  } else if (firstRouteShown) {
    // Move focus to the new page heading so screen readers announce the change.
    window.scrollTo(0, 0);
    if (document.activeElement !== els.globalSearch) {
      $(`[data-view="${route}"] h1`).focus({ preventScroll: true });
    }
  }
  firstRouteShown = true;
}


/* 9. Event listeners and start-up ---------------------------------------- */

// One click handler for every button that has a data-action attribute.
document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  // Clicking the bookmark on top of a card image should not also open the project.
  if (target.dataset.action === "open-project" && event.target.closest(".bookmark-btn")) return;

  const id = target.dataset.id;
  switch (target.dataset.action) {
    case "open-project": openProjectDialog(id); break;
    case "toggle-save": toggleSave(id); break;
    case "remove-project": removeProject(id); break;
    case "toggle-register": toggleRegistration(target); break;
    case "toggle-resource": toggleResource(id); break;
    case "open-resource": openResource(id); break;
    case "set-category": setCategory(target.dataset.category); break;
    case "clear-filters": clearFilters(); break;
    case "open-add-project": openAddDialog(); break;
    case "close-dialog": target.closest("dialog").close(); break;
    case "close-menu": closeMenu(true); break;
  }
});

// Clicking the dark backdrop closes a dialog.
[els.projectDialog, els.addDialog].forEach((dialog) => {
  let pressStartedOnBackdrop = false;
  dialog.addEventListener("mousedown", (event) => { pressStartedOnBackdrop = event.target === dialog; });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog && pressStartedOnBackdrop) dialog.close();
  });
  dialog.addEventListener("close", () => document.body.classList.remove("no-scroll"));
});

els.projectSearch.addEventListener("input", (event) => setQuery(event.target.value));

els.globalSearch.addEventListener("input", (event) => {
  setQuery(event.target.value);
  if (currentRoute() !== "projects") window.location.hash = "#projects";
});
els.globalSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (currentRoute() !== "projects") window.location.hash = "#projects";
});

els.addForm.addEventListener("submit", handleAddProject);
els.profileForm.addEventListener("submit", handleProfileSave);
els.themeToggle.addEventListener("click", toggleTheme);
$$('input[name="theme"]').forEach((radio) => {
  radio.addEventListener("change", () => applyTheme(radio.value));
});

els.menuBtn.addEventListener("click", openMenu);
els.scrim.addEventListener("click", () => closeMenu(true));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isMenuOpen()) closeMenu(true);
});
mobileQuery.addEventListener("change", (event) => { if (!event.matches) closeMenu(); });

window.addEventListener("hashchange", showRoute);

// Start-up
$("#projectCategory").innerHTML = CATEGORIES.map((category) => `<option>${escapeHTML(category)}</option>`).join("");
applyTheme(document.documentElement.getAttribute("data-theme") || "light", false);
renderAll();
updateCounters(true);
showRoute();
