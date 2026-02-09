import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AnimatePresence } from "framer-motion";

// Eager load only the homepage
import Homepage from "./pages/Homepage";

// Lazy load everything else
const Prices = lazy(() => import("./pages/Prices"));
const Prizes = lazy(() => import("./pages/Prizes"));
const Contact = lazy(() => import("./pages/Contact"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const AlbumCatalogue = lazy(() => import("./pages/AlbumCatalogue"));
const AlbumDisplay = lazy(() => import("./pages/AlbumDisplay"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative w-20 h-20">
      <div
        className="absolute inset-0 border-4 rounded-full animate-spin"
        style={{
          borderColor: "#6F8584 transparent transparent transparent",
        }}
      />
      <div
        className="absolute inset-2 border-4 rounded-full animate-spin"
        style={{
          borderColor: "transparent transparent #6F8584 transparent",
          animationDuration: "1.2s",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-8 h-8 animate-pulse"
          style={{ color: "#6F8584" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </div>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/preturi" element={<Prices />} />
              <Route path="/premii" element={<Prizes />} />
              <Route path="/despre-mine" element={<AboutMe />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/albume/:albumCategory"
                element={<AlbumCatalogue />}
              />
              <Route
                path="/albume/:albumCategory/:albumId"
                element={<AlbumDisplay />}
              />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </BrowserRouter>
  </StrictMode>,
);
