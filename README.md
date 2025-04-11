<a id="top"></a>

<!-- PROJECT TITLE -->

<div align="center">
  <img src="https://miksoft.pro/images/asteroid.webp" alt="Asteroid Monitoring - Near-Earth Object Tracker" width="150" height="150">

<h3>🚀 Asteroid Monitoring</h3>

<p><strong>Real-Time Near-Earth Object (NEO) Tracking Dashboard</strong></p>
<p>An open-source web application for monitoring asteroids approaching Earth today — powered by NASA's Near Earth Object Web Service (NeoWS) API with interactive 3D orbital visualization.</p>

<a href="https://asteroid.miksoft.pro/" target="_blank"><strong>🌐 Explore Live Demo »</strong></a>
<br /><br />
<a href="#installation">Quick Start</a>
·
<a href="#key-features">Features</a>
·
<a href="#contributing">Contribute</a>
·
<a href="#contact">Contact</a>

</div>

<br />

<!-- PROJECT BADGES -->
<div align="center">

[![Contributors][contributors-badge]][contributors-url]
[![Forks][forks-badge]][forks-url]
[![Stargazers][stars-badge]][stars-url]
[![Issues][issues-badge]][issues-url]
[![MIT License][license-badge]][license-url]

[![UI Checks](https://github.com/miksrv/asteroid-monitoring/actions/workflows/checks.yml/badge.svg)](https://github.com/miksrv/asteroid-monitoring/actions/workflows/checks.yml)
[![FTP Deploy](https://github.com/miksrv/asteroid-monitoring/actions/workflows/deploy.yml/badge.svg)](https://github.com/miksrv/asteroid-monitoring/actions/workflows/deploy.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=miksrv_asteroid-monitoring&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=miksrv_asteroid-monitoring)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=miksrv_asteroid-monitoring&metric=coverage)](https://sonarcloud.io/summary/new_code?id=miksrv_asteroid-monitoring)

</div>

---

<!-- TABLE OF CONTENTS -->

### 📋 Table of Contents

<details>
<summary>Click to expand</summary>

- [About the Project](#about-the-project)
    - [Why Asteroid Monitoring?](#why-asteroid-monitoring)
    - [Key Features](#key-features)
    - [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Available Scripts](#available-scripts)
- [Live Demo](#live-demo)
- [Project Architecture](#project-architecture)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

</details>

<!-- ABOUT THE PROJECT -->

## 🌍 About the Project

**Asteroid Monitoring** is a modern, open-source web application that provides real-time tracking of near-Earth objects (NEOs) using [NASA's NeoWS (Near Earth Object Web Service) API](https://api.nasa.gov/). The dashboard displays comprehensive data about asteroids making close approaches to Earth today, enabling users to explore space science interactively.

<div align="center">

![Asteroid Monitoring Dashboard - Near-Earth Object Tracker](public/images/demo.jpg)

</div>

### 📊 Data Displayed for Each Asteroid

| Metric | Description |
|--------|-------------|
| **Close Approach Time** | Exact date and time of closest Earth approach |
| **Miss Distance** | Minimum distance from Earth (in km and lunar distances) |
| **Relative Velocity** | Speed relative to Earth (km/s and km/h) |
| **Estimated Diameter** | Size range based on absolute magnitude |
| **Hazard Classification** | Potentially Hazardous Asteroid (PHA) indicator |
| **3D Orbit Viewer** | Interactive orbital trajectory visualization |

### Why Asteroid Monitoring?

Near-Earth objects (NEOs) are asteroids and comets with orbits that bring them close to Earth's path around the Sun. NASA's Center for Near Earth Object Studies (CNEOS) currently tracks **over 35,000 NEOs**, with new discoveries made weekly. Understanding these objects is crucial for:

- 🔬 **Scientific Research** — Studying asteroid composition and orbital dynamics
- 🛡️ **Planetary Defense** — Monitoring potentially hazardous objects (PHAs)
- 📚 **Education** — Making space science accessible to everyone
- 🌌 **Space Exploration** — Identifying targets for future missions

### Key Features

| Feature | Description |
|---------|-------------|
| 🌍 **Real-Time NASA Data** | Fetches daily near-Earth object data directly from NASA's NeoWS API |
| 📋 **Comprehensive Dashboard** | Lists all asteroids with close approaches scheduled for today |
| ⏱️ **Detailed Metrics** | Shows approach time, miss distance, velocity, and estimated diameter |
| 🛑 **Hazard Alerts** | Highlights Potentially Hazardous Asteroids (PHAs) with visual indicators |
| 🛰️ **3D Orbit Visualization** | Interactive WebGL-powered orbital viewer using spacekit.js |
| 🌐 **Multilingual Support** | Bilingual interface (Russian/English) with automatic browser locale detection |
| ⚡ **Offline Capability** | API responses cached in localStorage for instant repeat access |
| 🚀 **Zero-Server Deployment** | Static HTML export — deploy anywhere without backend infrastructure |
| 📱 **Responsive Design** | Optimized for desktop, tablet, and mobile viewing |
| 🌙 **Dark Mode** | Eye-friendly dark theme with CSS custom properties |

<p align="right">
  (<a href="#top">Back to top</a>)
</p>

### Tech Stack

This project leverages modern web technologies for optimal performance, maintainability, and developer experience:

- [![TypeScript][ts-badge]][ts-url] Strongly typed JavaScript for safer, more maintainable code.
- [![NextJS][nextjs-badge]][nextjs-url] React framework used for static site generation (`output: 'export'`).
- [![Redux][redux-badge]][redux-url] RTK Query for data fetching, caching, and state management.
- [![Sass][sass-badge]][sass-url] CSS Modules with Sass for component-scoped styling.
- [![NodeJS][nodejs-badge]][nodejs-url] JavaScript runtime for development and package management.
- [![GitHub Actions][githubactions-badge]][githubactions-url] CI/CD pipeline for automated linting, testing, and deployment.
- [![SonarCloud][sonarcloud-badge]][sonarcloud-url] Continuous code quality and security analysis.

<p align="right">
  (<a href="#top">Back to top</a>)
</p>

<!-- GETTING STARTED -->

## 🚀 Getting Started

Follow these steps to set up the project locally and start tracking asteroids in minutes.

### Prerequisites

Ensure you have the following installed:

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | v20.11.0+ | Check `.nvmrc` for exact version |
| **Yarn** | 4.x | Enable via `corepack enable && corepack prepare yarn@4.9.2 --activate` |

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/miksrv/asteroid-monitoring.git
    cd asteroid-monitoring
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Obtain a free NASA API key at [api.nasa.gov](https://api.nasa.gov/).

4. Create a `.env` file in the project root:

    ```bash
    NEXT_PUBLIC_API_KEY=your_nasa_api_key_here
    ```

5. Start the development server:

    ```bash
    yarn dev
    ```

    The app will be available at `http://localhost:3000`.

### Available Scripts

| Command               | Description                                |
| --------------------- | ------------------------------------------ |
| `yarn dev`            | Start development server                   |
| `yarn build`          | Production build (static export to `/out`) |
| `yarn test`           | Run unit tests with coverage               |
| `yarn eslint:check`   | Check linting                              |
| `yarn prettier:check` | Check formatting                           |

<p align="right">
  (<a href="#top">Back to top</a>)
</p>

<!-- LIVE DEMO -->

## Live Demo

Explore the production deployment:

🌐 **[asteroid.miksoft.pro](https://asteroid.miksoft.pro/)**

<p align="right">
  (<a href="#top">Back to top</a>)
</p>

<!-- PROJECT ARCHITECTURE -->

## 🏗️ Project Architecture

```
asteroid-monitoring/
├── api/               # RTK Query API layer (endpoints, store, types)
├── components/        # React components with co-located styles
│   ├── Asteroid/      # Individual asteroid card
│   ├── Countdown/     # Time-to-approach countdown
│   ├── Spacemap/      # 3D orbital visualization (spacekit.js)
│   └── ...
├── pages/             # Next.js pages (index, _app, _document)
├── public/
│   ├── locales/       # i18n translation files (en, ru)
│   └── images/        # Static assets
├── styles/            # Global styles and CSS variables
└── tools/             # Utility functions (date formatting, helpers)
```

**Data Flow:**
1. User visits the dashboard
2. RTK Query fetches today's NEO data from NASA NeoWS API
3. Response is cached in localStorage for offline access
4. Redux store distributes data to components
5. UI renders asteroid cards with real-time approach countdowns

<p align="right">
  (<a href="#top">Back to top</a>)
</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing

Contributions are welcome and greatly appreciated. Whether you are fixing a bug, improving documentation, or proposing a new feature — every contribution helps.

**To contribute:**

1. Fork the repository.
2. Clone your fork:
    ```bash
    git clone https://github.com/miksrv/asteroid-monitoring.git
    ```
3. Create a feature branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4. Commit your changes:
    ```bash
    git commit -m "Add your feature"
    ```
5. Push to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
6. Open a pull request against the `main` branch.

Please make sure your changes pass linting (`yarn eslint:check`), formatting (`yarn prettier:check`), and tests (`yarn test`) before submitting.

<p align="right">
  (<a href="#top">Back to top</a>)
</p>

<!-- LICENSE -->

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

<p align="right">
  (<a href="#top">Back to top</a>)
</p>

<!-- ACKNOWLEDGMENTS -->

## 🙏 Acknowledgments

This project wouldn't be possible without these amazing resources:

- [NASA NeoWS API](https://api.nasa.gov/) — Comprehensive near-Earth object data source
- [spacekit.js](https://typpo.github.io/spacekit/) — 3D solar system visualization library for WebGL
- [simple-react-ui-kit](https://github.com/miksrv/simple-react-ui-kit) — Lightweight React UI component library

<p align="right">
  (<a href="#top">Back to top</a>)
</p>

<!-- CONTACT -->

## 📬 Contact

**Misha Topchilo** — Developer & Maintainer

- 🌐 Website: [miksoft.pro](https://miksoft.pro)
- 💼 GitHub: [@miksrv](https://github.com/miksrv)

<p align="right">
  (<a href="#top">Back to top</a>)
</p>

<!-- MARKDOWN VARIABLES (LINKS, IMAGES) -->

[contributors-badge]: https://img.shields.io/github/contributors/miksrv/asteroid-monitoring.svg?style=for-the-badge
[contributors-url]: https://github.com/miksrv/asteroid-monitoring/graphs/contributors
[forks-badge]: https://img.shields.io/github/forks/miksrv/asteroid-monitoring.svg?style=for-the-badge
[forks-url]: https://github.com/miksrv/asteroid-monitoring/network/members
[stars-badge]: https://img.shields.io/github/stars/miksrv/asteroid-monitoring.svg?style=for-the-badge
[stars-url]: https://github.com/miksrv/asteroid-monitoring/stargazers
[issues-badge]: https://img.shields.io/github/issues/miksrv/asteroid-monitoring.svg?style=for-the-badge
[issues-url]: https://github.com/miksrv/asteroid-monitoring/issues
[license-badge]: https://img.shields.io/github/license/miksrv/asteroid-monitoring.svg?style=for-the-badge
[license-url]: https://github.com/miksrv/asteroid-monitoring/blob/main/LICENSE

<!-- Other ready-made icons can be seen for example here: https://github.com/inttter/md-badges -->

[js-badge]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000
[js-url]: https://www.javascript.com/
[ts-badge]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff
[ts-url]: https://www.typescriptlang.org/
[nextjs-badge]: https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white
[nextjs-url]: https://nextjs.org/
[nodejs-badge]: https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white
[nodejs-url]: https://nodejs.org/
[redux-badge]: https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff
[redux-url]: https://redux.js.org/
[sass-badge]: https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff
[sass-url]: https://sass-lang.com/
[sonarcloud-badge]: https://img.shields.io/badge/SonarCloud-F3702A?logo=sonarcloud&logoColor=fff
[sonarcloud-url]: https://sonarcloud.io/
[githubactions-badge]: https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white
[githubactions-url]: https://docs.github.com/en/actions
