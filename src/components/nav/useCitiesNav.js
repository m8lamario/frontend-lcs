"use client";
import { useEffect, useMemo, useState } from "react";

const defaultCities = [
  { name: "LCS", href: "/" },
  { name: "Brescia", href: "/competitions/brescia" },
  { name: "Roma", href: "/competitions/roma" },
  { name: "Milano", href: "/competitions/milano" },
  { name: "Napoli", href: "/competitions/napoli" },
  { name: "Torino", href: "/competitions/torino" },
  { name: "Verona", href: "/competitions/verona" },
  { name: "Genova", href: "/competitions/genova" },
  { name: "Bologna", href: "/competitions/bologna" },
  { name: "Firenze", href: "/competitions/firenze" },
  { name: "Palermo", href: "/competitions/palermo" },
  { name: "Catania", href: "/competitions/catania" },
  { name: "Venezia", href: "/competitions/venezia" },
];

export function useCitiesNav(pathname) {
  const [cities, setCities] = useState(defaultCities);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Riordino reattivo al cambio di pathname (replica 1:1 della logica esistente)
  useEffect(() => {
    if (!mounted) return; // aspetta mount per avere localStorage
    if (typeof window === "undefined") return;
    let baseOrder = [...defaultCities];
    try {
      const raw = localStorage.getItem("navCitiesOrder");
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved) && saved.length) {
          const hrefOrder = saved.map((c) => c.href);
          baseOrder = [
            ...hrefOrder
              .map((h) => defaultCities.find((c) => c.href === h))
              .filter(Boolean),
            ...defaultCities.filter((c) => !hrefOrder.includes(c.href)),
          ];
        }
      }
    } catch {}

    const path = pathname || "/";
    let currentCitySlug = "";
    if (/^\/competitions\//i.test(path))
      currentCitySlug = decodeURIComponent(path.split("/")[2] || "").toLowerCase();
    else currentCitySlug = decodeURIComponent(path.replace(/^\//, "")).toLowerCase();

    if (currentCitySlug) {
      const idx = baseOrder.findIndex((c) => {
        const hrefSlug = c.href
          .replace(/^\/competitions\//i, "")
          .replace(/^\//, "")
          .toLowerCase();
        const nameSlug = c.name.toLowerCase();
        return hrefSlug === currentCitySlug || nameSlug === currentCitySlug;
      });
      if (idx > 0) {
        const arr = [...baseOrder];
        const [item] = arr.splice(idx, 1);
        arr.unshift(item);
        baseOrder = arr;
      }
    }

    // FORZA LSC PRIMA SE SIAMO SU ROOT "/" ANCHE SE L'ORDINE SALVATO AVEVA ALTRO AL PRIMO POSTO
    if (path === "/") {
      const idxLSC = baseOrder.findIndex(
        (c) => c.href === "/" || c.name.toLowerCase() === "lcs"
      );
      if (idxLSC > 0) {
        const arr = [...baseOrder];
        const [lscItem] = arr.splice(idxLSC, 1);
        arr.unshift(lscItem);
        baseOrder = arr;
      }
    }

    const changed =
      baseOrder.length !== cities.length ||
      baseOrder.some((c, i) => c.href !== cities[i]?.href);
    if (changed) setCities(baseOrder);
  }, [pathname, mounted]);

  const mobileCities = useMemo(
    () => cities.filter((c) => c.name !== "LCS" && !/\/home$/i.test(c.href)),
    [cities]
  );

  const persistCitiesOrder = (newOrder) => {
    setCities(newOrder);
    try {
      localStorage.setItem("navCitiesOrder", JSON.stringify(newOrder));
    } catch {}
  };

  return { cities, mobileCities, mounted, persistCitiesOrder };
}
