# Gym Management System

Aplicație modernă pentru managementul unei săli de fitness.

## Caracteristici principale

- Interfață modernă și minimalistă
- Sidebar cu meniuri principale:
  - Meniu principal
  - Automatizări
  - Istoric
  - Pachete
  - Setări
- Layout principal cu două ferestre redimensionabile:
  - Partea stângă: Timeline cu persoanele prezente în sală
  - Partea dreaptă: Cursuri în desfășurare și următoare
- Funcționalități suplimentare:
  - Căutare persoane
  - Vizualizare produse
  - Adăugare persoane noi
  - Vizualizare detalii persoane

## Tehnologii utilizate

- React
- React Router
- Material-UI
- React Split Pane
- React Timeline
- React Query

## Structura proiectului

```
src/
  ├── components/
  │   ├── layout/
  │   │   ├── Sidebar.js
  │   │   ├── Navbar.js
  │   │   └── MainLayout.js
  │   ├── timeline/
  │   │   ├── Timeline.js
  │   │   └── TimelineItem.js
  │   └── courses/
  │       ├── CourseList.js
  │       └── CourseCard.js
  ├── pages/
  │   ├── Dashboard.js
  │   ├── Automation.js
  │   ├── History.js
  │   ├── Packages.js
  │   └── Settings.js
  ├── context/
  │   └── AppContext.js
  └── utils/
      └── api.js
```

## Instalare și rulare

1. Clonează repository-ul
2. Instalează dependențele:
   ```bash
   npm install
   ```
3. Rulează aplicația:
   ```bash
   npm start
   ```
