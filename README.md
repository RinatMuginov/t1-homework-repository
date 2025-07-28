A simple web application for task management with the ability to group by due date (Today, Tomorrow, Next 7 days).
The user can view the list of tasks, open task details, edit properties, and save changes. All changes are automatically saved in the browser using localStorage.

Each task includes the following fields: title (header), description, category, status, priority, and due date. Tasks can be created, updated, or deleted.
The interface is made using the Ant Design component library and is adapted to different screen sizes.

The project uses React 18, TypeScript, React Router v6, Zustand for state management, and Vite for fast development and build.

to launch my project just:
1. git clone https://github.com/RinatMuginov/t1-homework-repository.git
2. git checkout server
3. npm install
4. npm run build
5. npm run dev:server

The application follows a modular feature-based structure:

Pages — main views (task list, task form)

Entities — task-related logic, including UI components (TaskCard) and global state (Zustand)

Model — types, interfaces, and data store

Shared — global styles and reusable components

Server — Express-based mock API with in-memory storage (for development)

State is managed globally using Zustand, with persistent storage optionally handled via localStorage or backend mock API.
Routing is handled via React Router v6.
UI is built with Ant Design components, responsive by default.