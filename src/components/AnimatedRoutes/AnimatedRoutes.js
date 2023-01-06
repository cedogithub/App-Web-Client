import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Accueil from "../Accueil/Accueil";
import ListeBiere from "../ListeBiere/ListeBiere";
import Biere from "../Biere/Biere";
import Header from "../Header/Header";
import DetailBiere from "../DetailBiere/DetailBiere";
import { AnimatePresence } from "framer-motion";

export default function AnimatedRoutes() {
  const location = useLocation();
  const [courriel, setCourriel] = useState("");

  function login(courriel) {
    setCourriel(courriel);
  }

  return (
    <AnimatePresence>
      <Header handleLogin={login} titre="Biero" test="valeur" />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Accueil />} />
        <Route path="/liste" element={<ListeBiere />} />
        <Route
          path="/biere/:id"
          element={<DetailBiere courriel={courriel} />}
        />
        <Route path="/* " element={<Accueil />} />
      </Routes>
    </AnimatePresence>
  );
}
