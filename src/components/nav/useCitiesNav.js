"use client";
import { useEffect, useMemo, useState } from "react";
import { localleagues } from "../../data/CorrectDataStructure";

export const DEFAULT_NAV_LOGO = "/logoCities/lcsw.png";
const encodeLogoPath = (path) => (typeof path === "string" && path.length ? encodeURI(path) : "");
const CITY_LOGOS = {
  esl: DEFAULT_NAV_LOGO,
  molecup: encodeLogoPath("/logoCities/molecup.png"),
  leonessacup: encodeLogoPath("/logoCities/leonessacup.png"),
  olympiuscup: encodeLogoPath("/logoCities/olympiuscup.png"),
  turascup: encodeLogoPath("/logoCities/turascup.png"),
  boracup: encodeLogoPath("/logoCities/boracup.png"),
  ferreacup: encodeLogoPath("/logoCities/ferreacup.png"),
};

const cityNavItems = (localleagues || []).map(({ slug, name }) => {
  const normalizedSlug = (slug || "").toLowerCase();
  return {
    name: name || slug,
    href: slug ? `/competitions/${slug}` : "/",
    slug: normalizedSlug,
    logoSrc: CITY_LOGOS[normalizedSlug] || DEFAULT_NAV_LOGO,
  };
});

const defaultCities = [
  { name: "LSC", href: "/", slug: "esl", logoSrc: CITY_LOGOS.esl },
  ...cityNavItems,
  { name: "", href: "", slug: "spacer", logoSrc: "" },
];

const SECTION_LINKS = [
  { name: "Home", href: "/" },
  { name: "Squadre", href: "/squadre" },
  { name: "Classifica", href: "/classifica" },
  { name: "Partite", href: "/partite" },
  { name: "", href: ""} //elemento vuoto per spacing
];

export function useCitiesNav(pathname) {
  const [cities, setCities] = useState(defaultCities);
  const [mounted, setMounted] = useState(false);
  const [sectionLinks, setSectionLinks] = useState(SECTION_LINKS);
  const [currentCitySlug, setCurrentCitySlug] = useState("");

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
    const isCompetitionsPath = /^\/competitions\//i.test(path);
    if (isCompetitionsPath) {
      currentCitySlug = decodeURIComponent(path.split("/")[2] || "").toLowerCase();
    } else {
      currentCitySlug = "esl";
    }

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

    // FORZA LSC PRIMA SE NON SIAMO DENTRO /competitions
    if (!isCompetitionsPath) {
      const idxLSC = baseOrder.findIndex(
        (c) => c.href === "/" || c.name.toLowerCase() === "esl"
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
    setCurrentCitySlug(currentCitySlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;

    const normalizeHref = (href = "") => href.replace(/^\//, "").toLowerCase();
    const getSectionFromPath = (path = "") => {
      const cleanPath = (path || "/").split("?")[0].split("#")[0];
      if (/^\/competitions\/[^/]+\/?$/i.test(cleanPath)) return "";
      const competitionMatch = cleanPath.match(/^\/competitions\/[^/]+\/([^/]+)/i);
      if (competitionMatch) return decodeURIComponent(competitionMatch[1] || "").toLowerCase();
      const rootSection = cleanPath.replace(/^\//, "").split("/")[0] || "";
      return decodeURIComponent(rootSection).toLowerCase();
    };

    let baseOrder = [...SECTION_LINKS];
    try {
      const raw = localStorage.getItem("navSectionLinksOrder");
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved) && saved.length) {
          const hrefOrder = saved.map((l) => l.href);
          baseOrder = [
            ...hrefOrder
              .map((h) => SECTION_LINKS.find((l) => l.href === h))
              .filter(Boolean),
            ...SECTION_LINKS.filter((l) => !hrefOrder.includes(l.href)),
          ];
        }
      }
    } catch {}

    const sectionSlug = getSectionFromPath(pathname || "/");
    const idx = baseOrder.findIndex((l) => {
      if (!sectionSlug) return (l.href || "/") === "/";
      return normalizeHref(l.href) === sectionSlug;
    });
    if (idx > 0) {
      const arr = [...baseOrder];
      const [item] = arr.splice(idx, 1);
      arr.unshift(item);
      baseOrder = arr;
    }

    const changed =
      baseOrder.length !== sectionLinks.length ||
      baseOrder.some((l, i) => l.href !== sectionLinks[i]?.href);
    if (changed) setSectionLinks(baseOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, mounted]);

  const mobileCities = defaultCities;

  const persistCitiesOrder = (newOrder) => {
    setCities(newOrder);
    try {
      localStorage.setItem("navCitiesOrder", JSON.stringify(newOrder));
    } catch {}
  };

  const persistSectionLinksOrder = (newOrder) => {
    setSectionLinks(newOrder);
    try {
      localStorage.setItem("navSectionLinksOrder", JSON.stringify(newOrder));
    } catch {}
  };

  return {
    cities,
    mobileCities,
    mounted,
    persistCitiesOrder,
    sectionLinks,
    persistSectionLinksOrder,
    currentCitySlug,
  };
}
