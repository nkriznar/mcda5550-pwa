# MCDA5550 PWA Assignment - Task Manager

## Overview
This is a Progressive Web App (PWA) that combines a task manager with motivational quotes. It is built using React, Vite, and IndexedDB.

## Features
- **Add/Delete Tasks:** Manage your daily to-dos.
- **Offline Capable:** Works without internet access (caches assets + saves data locally).
- **Motivational Quotes:** Fetches from an API when online; falls back to local quotes when offline.
- **Visual Deadlines:** Tasks change color (Red/Orange/Yellow) as deadlines approach.

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. To test PWA features (Offline/Install), run `npm run build` followed by `npm run preview`.

## Assumptions / External Resources
- Used `vite-plugin-pwa` for manifest and service worker generation.
- Used `idb` library for IndexedDB management.
- Used `uuid` for generating unique task IDs.
- External Quote API: `https://dummyjson.com/quotes/random`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
