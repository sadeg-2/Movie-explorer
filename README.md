# 🎬 Movie Explorer

A modern web application for discovering movies built with React and Vite, featuring a clean UI, real-time search, and interactive details. Perfect for movie enthusiasts looking to browse and explore trending, popular, or top-rated films.

---

## 🛠️ Tech Stack

- **React** (UI Framework)
- **Vite** (Fast development/build tool)
- **TypeScript** (Static typing)
- **Tailwind CSS** (Styling)
- **Axios** or **Fetch API** (Data fetching)
- **React Router** (Routing)
- **Movie Database API** (e.g., TMDB, OMDb)
- [Optional] **Jest** / **React Testing Library** (Testing)

---

## ✨ Features

- 🔎 **Instant Search**: Find movies as you type.
- 🗂️ **Browse Categories**: Trending, Popular, Top Rated, Upcoming, etc.
- 📄 **Detailed Movie Info**: View title, year, rating, synopsis, poster, genres, and more.
- 💾 **Save Favorites**: Local storage support for favorites/watchlist.
- 🎨 **Responsive & Accessible UI**: Mobile-friendly and keyboard accessible.
- 🌙 **Light/Dark Mode**: Switch between UI themes.
- 🔄 **Pagination & Infinite Scroll**: Seamlessly browse through movie lists.
- 📊 **Rating Visualization**: See movie scores at a glance.

---

## ⚡ Installation

```bash
# 1. Clone the repository
git clone https://github.com/sadeg-2/Movie-explorer.git
cd Movie-explorer

# 2. Install dependencies
npm install                # or 'yarn install' or 'pnpm install'

# 3. Start development server
npm run dev                # or 'yarn dev' or 'pnpm dev'
```

---

## 🚀 Scripts

| Script        | Description                             |
|---------------|-----------------------------------------|
| `dev`         | Launches local development server        |
| `build`       | Builds production-ready files            |
| `preview`     | Preview build output locally             |
| `test`        | Run test suite (if configured)           |
| `lint`        | Run linter for code quality (if added)   |

Example:
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
```

---

## 📁 Folder Structure

```
├── public/           # Static assets (index.html, icons, etc.)
├── src/
│   ├── assets/       # Images, logos, etc.
│   ├── components/   # Reusable React components
│   ├── pages/        # Route pages (Home, Details, etc.)
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utility functions
│   ├── api/          # API logic (e.g., data fetching)
│   ├── App.tsx       # Root component
│   └── main.tsx      # App entry point
├── .env.example      # Environment variable template
├── package.json      # Project metadata & scripts
└── README.md
```

---

## 🗝️ Environment Variables

Create a `.env` file in the root directory for API keys and sensitive config. Copy `.env.example` as a starting point.

Example `.env`:
```env
VITE_API_KEY=your_api_key_here
VITE_API_URL=https://api.example.com
```

Access these in your code via `import.meta.env`.

---

## 🌍 Deployment

### Vercel

1. Push your repository to GitHub.
2. Import into [Vercel](https://vercel.com/) and set environment variables.
3. Vercel will auto-detect Vite/React and deploy.

### Netlify

1. Connect your repo at [Netlify](https://netlify.com/).
2. Add environment variables in settings.
3. Use build command: `npm run build` and publish directory: `dist`.

After deployment, your app will be live at your assigned domain.

---

## 🤝 Contributing

1. Fork this repo and create your branch: `git checkout -b my-feature`
2. Make your changes & commit: `git commit -m 'add feature'`
3. Push to your fork: `git push origin my-feature`
4. Create a Pull Request

Please follow the [Contributor Covenant](https://www.contributor-covenant.org/) for respectful and productive collaboration.

---

## 📜 License

Licensed under the [MIT License](LICENSE).

---

## 📸 Screenshots / Demo

![App Screenshot](public/screenshot.png)

👉 [Live Demo](https://your-app-demo-link.vercel.app/)

---

*Feel free to customize this README for your own Movie Explorer project!*
