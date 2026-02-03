import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Prizes from "./pages/Prizes";
import { AnimatePresence } from "framer-motion";
import Contact from "./pages/Contact";
import { HelmetProvider } from "react-helmet-async";
import Prices from "./pages/Prices";
import AlbumCatalogue from "./pages/AlbumCatalogue";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/preturi" element={<Prices />} />
              <Route path="/premii" element={<Prizes />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/albume/:albumCategory"
                element={<AlbumCatalogue />}
              />
            </Route>
          </Routes>
        </AnimatePresence>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
);
