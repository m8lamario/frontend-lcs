"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useRouter, usePathname } from "next/navigation";

export default function NavDesktop({ cities, mounted, persistCitiesOrder }) {
  const desktopCityListRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // refs per flip post-commit
  const cityFlipStateRef = useRef(null);
  const cityPendingHrefRef = useRef(null);
  const rightFlipStateRef = useRef(null);
  const rightPendingHrefRef = useRef(null);

  // links statici della barra destra con stato per poterli riordinare come le città
  const [navLinks, setNavLinks] = useState([
    { name: "Classifica", href: "/Classifica", className: undefined },
    { name: "Squadre", href: "/Squadre", className: "register-btn" },
    { name: "Partite", href: "/Partite", className: "login-btn" },
    { name: "Home", href: "/", className: "login-btn" },
  ]);
  const rightLinksRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  // focus primo elemento per lista città e per cityLinks ad ogni render rispettivo
  useEffect(() => {
    const container = desktopCityListRef.current;
    if (!container) return;
    const lis = container.querySelectorAll("li");
    lis.forEach((el, i) => el.classList.toggle("focused", i === 0));
  }, [cities]);

  useEffect(() => {
    const container = rightLinksRef.current;
    if (!container) return;
    const lis = container.querySelectorAll("li");
    lis.forEach((el, i) => el.classList.toggle("focused", i === 0));
  }, [navLinks]);

  // Esegui FLIP per città dopo che il nuovo ordine è stato renderizzato
  useLayoutEffect(() => {
    const container = desktopCityListRef.current;
    const state = cityFlipStateRef.current;
    if (!container || !state) return;
    const items = container.querySelectorAll("li");
    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      targets: items,
      absolute: true,
      nested: true,
      scale: true,
      onComplete: () => {
        container
          .querySelectorAll("li")
          .forEach((el, i) => el.classList.toggle("focused", i === 0));
        if (cityPendingHrefRef.current) {
          const href = cityPendingHrefRef.current;
          cityPendingHrefRef.current = null;
          router.push(href);
        }
      },
    });
    cityFlipStateRef.current = null;
  }, [cities]);

  // Esegui FLIP per i link di destra dopo il nuovo ordine
  useLayoutEffect(() => {
    const container = rightLinksRef.current;
    const state = rightFlipStateRef.current;
    if (!container || !state) return;
    const items = container.querySelectorAll("li");
    Flip.from(state, {
      duration: 0.5,
      ease: "power2.inOut",
      targets: items,
      absolute: true,
      nested: true,
      scale: true,
      onComplete: () => {
        container
          .querySelectorAll("li")
          .forEach((el, i) => el.classList.toggle("focused", i === 0));
        if (rightPendingHrefRef.current) {
          const href = rightPendingHrefRef.current;
          rightPendingHrefRef.current = null;
          router.push(href);
        }
      },
    });
    rightFlipStateRef.current = null;
  }, [navLinks]);

  const buildContextHref = (link) => {
    const path = pathname || "/";
    const isCity = /^\/competitions\//i.test(path);
    if (!isCity) return link.href; // su LCS/root: usa link base

    const citySegment = path.split("/")[2] || ""; // mantieni case dal path
    // Caso Home: punta alla root della città
    if ((link.href || "/") === "/") {
      return `/competitions/${citySegment}`;
    }
    // Altri: usa il segmento originale del link preservando il case (es. "/Classifica" => "Classifica")
    const baseSeg = (link.href || "/").replace(/^\//, "");
    return `/competitions/${citySegment}/${baseSeg}`;
  };

  const handleCityClick = (e, city, index) => {
    // rispetta click con modifier o tasto non sinistro
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();

    const container = desktopCityListRef.current;
    if (!container) {
      router.push(city.href);
      return;
    }
    if (index === 0) {
      router.push(city.href);
      return;
    }

    const items = container.querySelectorAll("li");
    cityFlipStateRef.current = Flip.getState(items);
    cityPendingHrefRef.current = city.href;

    // aggiorna ordine via parent (re-render poi FLIP in useLayoutEffect)
    const newOrder = [...cities];
    const [moved] = newOrder.splice(index, 1);
    newOrder.unshift(moved);
    persistCitiesOrder(newOrder);

    // porta Home in prima posizione nella lista di destra e persisti
    setNavLinks((prev) => {
      const idxHome = prev.findIndex((l) => (l.href || "/") === "/");
      if (idxHome <= 0) return prev; // già primo o non trovato
      const arr = [...prev];
      const [home] = arr.splice(idxHome, 1);
      const result = [home, ...arr];
      try { localStorage.setItem("navRightLinksOrder", JSON.stringify(result)); } catch {}
      return result;
    });
  };

  const RIGHT_ORDER_KEY = "navRightLinksOrder";
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RIGHT_ORDER_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved) || !saved.length) return;
      const hrefOrder = saved.map((l) => l.href);
      const merged = [
        ...hrefOrder
          .map((h) => navLinks.find((l) => l.href === h))
          .filter(Boolean),
        ...navLinks.filter((l) => !hrefOrder.includes(l.href)),
      ];
      setNavLinks(merged);
    } catch {}
  }, []);

  useEffect(() => {
    const normalizeHref = (href = "") => href.replace(/^\//, "").toLowerCase();
    const getSectionFromPath = (path = "") => {
      const cleanPath = (path || "/").split("?")[0].split("#")[0];
      if (/^\/competitions\/[^/]+\/?$/i.test(cleanPath)) return "";
      const competitionMatch = cleanPath.match(/^\/competitions\/[^/]+\/([^/]+)/i);
      if (competitionMatch) return decodeURIComponent(competitionMatch[1] || "").toLowerCase();
      const rootSection = cleanPath.replace(/^\//, "").split("/")[0] || "";
      return decodeURIComponent(rootSection).toLowerCase();
    };

    const sectionSlug = getSectionFromPath(pathname || "/");
    setNavLinks((prev) => {
      const idx = prev.findIndex((l) => {
        if (!sectionSlug) return (l.href || "/") === "/";
        return normalizeHref(l.href) === sectionSlug;
      });
      if (idx <= 0) return prev;
      const arr = [...prev];
      const [item] = arr.splice(idx, 1);
      const next = [item, ...arr];
      try {
        localStorage.setItem(RIGHT_ORDER_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, [pathname]);

  const handleRightLinkClick = (e, link, index) => {
    // rispetta click con modifier o tasto non sinistro
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();

    const container = rightLinksRef.current;
    const targetHref = buildContextHref(link);
    if (!container) {
      router.push(targetHref);
      return;
    }
    if (index === 0) {
      router.push(targetHref);
      return;
    }

    const items = container.querySelectorAll("li");
    rightFlipStateRef.current = Flip.getState(items);
    rightPendingHrefRef.current = targetHref;

    // aggiorna ordine locale e lascia che useLayoutEffect esegua FLIP
    const newOrder = [...navLinks];
    const [moved] = newOrder.splice(index, 1);
    newOrder.unshift(moved);
    setNavLinks(newOrder);
    try {
      localStorage.setItem(RIGHT_ORDER_KEY, JSON.stringify(newOrder));
    } catch {}
  };

  return (
    <>
      <div className={"vetro1"}>
        <ul className="list-città" ref={desktopCityListRef}>
          {cities.map((city, idx) => (
            <li key={city.href}>
              <a href={city.href} onClick={(e) => handleCityClick(e, city, idx)}>
                {city.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={"vetro2"}>
        <ul className="cityLinks" ref={rightLinksRef}>
          {navLinks.map((link, idx) => (
            <li key={link.href}>
              <a
                href={buildContextHref(link)}
                className={link.className}
                onClick={(e) => handleRightLinkClick(e, link, idx)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="triangle"></div>
      </div>
    </>
  );
}
