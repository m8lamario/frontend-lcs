"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";

export default function NavMobile({ mobileCities, sectionLinks }) {
  const [open, setOpen] = useState(false);
  const mobileMenuListRef = useRef(null);
  const mobileCitiesPanelRef = useRef(null);
  const mobileCitiesListRef = useRef(null);
  const mobileSectionsListRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const extractCitySlug = (value = "") => {
    const normalized = value.startsWith("/") ? value : `/${value}`;
    const match = normalized.match(/\/competitions\/([^/]+)/i);
    return match ? match[1] : "";
  };

  const getSlugFromPathname = (path = "") => {
    const match = path.match(/\/competitions\/([^/]+)/i);
    return match ? match[1] : "";
  };

  const scrollItemIntoCenter = (container, index) => {
    if (!container || index < 0) return;
    const items = container.querySelectorAll("li");
    const target = items[index];
    if (!target) return;
    const offset =
      target.offsetLeft - container.clientWidth / 2 + target.clientWidth / 2;
    container.scrollLeft = Math.max(0, offset);
  };

  const [focusedCityIndex, setFocusedCityIndex] = useState(() => {
    const slugFromPath = getSlugFromPathname(pathname || "");
    const matchIndex = mobileCities.findIndex(
      (city) => extractCitySlug(city.href) === slugFromPath
    );
    return matchIndex >= 0 ? matchIndex : 0;
  });

  useEffect(() => {
    const slugFromPath = getSlugFromPathname(pathname || "");
    if (!slugFromPath) return;
    const matchIndex = mobileCities.findIndex(
      (city) => extractCitySlug(city.href) === slugFromPath
    );
    if (matchIndex >= 0) {
      setFocusedCityIndex((prev) => (prev === matchIndex ? prev : matchIndex));
    }
  }, [pathname, mobileCities]);

  const focusedCitySlug = useMemo(() => {
    const city = mobileCities[focusedCityIndex];
    const slug = city ? extractCitySlug(city.href) : "";
    if (slug) return slug;
    return getSlugFromPathname(pathname || "");
  }, [focusedCityIndex, mobileCities, pathname]);

  const buildContextHref = (href) => {
    const baseSeg = (href || "/").replace(/^\//, "");
    if (!focusedCitySlug) return href;
    if (!baseSeg) {
      return `/competitions/${focusedCitySlug}`;
    }
    return `/competitions/${focusedCitySlug}/${baseSeg}`;
  };

  const updateFocus = (container, axis = "y") => {
    if (!container) return -1;
    const items = Array.from(container.querySelectorAll("li"));
    if (!items.length) return -1;

    // se siamo a inizio scroll orizzontale: focus forzato sul primo
    if (axis === "x" && container.scrollLeft === 0) {
      items.forEach((el, i) => {
        const isFirst = i === 0;
        gsap.to(el, {
          scale: isFirst ? 1.15 : 0.9,
          opacity: isFirst ? 1 : 0.5,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
        el.classList.toggle("focused", isFirst);
      });
      return 0;
    }

    const rect = container.getBoundingClientRect();
    const containerCenter =
      axis === "y" ? rect.top + rect.height / 2 : rect.left + rect.width / 2;

    let minDist = Infinity;
    let closestIndex = -1;

    const centers = items.map((el) => {
      const r = el.getBoundingClientRect();
      return axis === "y" ? r.top + r.height / 2 : r.left + r.width / 2;
    });

    centers.forEach((c, i) => {
      const d = Math.abs(c - containerCenter);
      if (d < minDist) {
        minDist = d;
        closestIndex = i;
      }
    });

    items.forEach((el, i) => {
      const isFocused = i === closestIndex;
      gsap.to(el, {
        scale: isFocused ? 1.15 : 0.9,
        opacity: isFocused ? 1 : 0.5,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
      el.classList.toggle("focused", isFocused);
    });
    return closestIndex;
  };

  const attachFocusHandlers = (container, axis = "y", onFocusIndex) => {
    if (!container) return () => {};
    let ticking = false;
    const runUpdate = () => {
      const index = updateFocus(container, axis);
      if (typeof onFocusIndex === "function" && index !== -1) {
        onFocusIndex(index);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          runUpdate();
          ticking = false;
        });
      }
    };
    const onResize = () => {
      runUpdate();
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    runUpdate();
    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  };

  // Forza scroll iniziale a sinistra e collega handlers quando si apre il menu
  useEffect(() => {
    if (!open) return;
    const left = mobileMenuListRef.current;
    const right = mobileCitiesListRef.current;
    const sections = mobileSectionsListRef.current;
    [left, right, sections].forEach((list) => {
      if (list) {
        list.style.paddingLeft = "12px";
        list.style.paddingRight = "12px";
      }
    });
    if (left) left.scrollLeft = 0;
    if (sections) sections.scrollLeft = 0;
    scrollItemIntoCenter(right, focusedCityIndex);
    const cleanLeft = attachFocusHandlers(left, "x");
    const cleanRight = attachFocusHandlers(right, "x", setFocusedCityIndex);
    const cleanSections = attachFocusHandlers(sections, "x");
    [left, right, sections].forEach((list) => {
      if (!list) return;
      const lis = list.querySelectorAll("li");
      const focusIndex = list === right ? focusedCityIndex : 0;
      lis.forEach((li, i) => li.classList.toggle("focused", i === focusIndex));
    });
    return () => {
      cleanLeft();
      cleanRight();
      cleanSections();
    };
  }, [open, focusedCityIndex]);

  useEffect(() => {
    if (!open) return;
    const right = mobileCitiesListRef.current;
    scrollItemIntoCenter(right, focusedCityIndex);
  }, [open, focusedCityIndex]);

  // fade pannello destro
  useEffect(() => {
    const panel = mobileCitiesPanelRef.current;
    if (!panel) return;
    gsap.to(panel, {
      autoAlpha: open ? 1 : 0,
      duration: open ? 0.3 : 0.2,
      ease: open ? "power2.out" : "power2.in",
    });
  }, [open]);

  // blocco scroll del body quando il menu è aperto
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [open]);

  const handleMobileCityClick = (e, city, index) => {
    e.preventDefault();
    setFocusedCityIndex(index);
    setOpen(false);
    router.push(city.href);
  };

  const handleMobileSectionClick = (e, link) => {
    e.preventDefault();
    setOpen(false);
    router.push(buildContextHref(link.href));
  };

  return (
    <>
      <div className="hamburger-menu">
        <div id="menuToggle">
          <input
            type="checkbox"
            id="menuCheckbox"
            checked={open}
            onChange={() => setOpen(!open)}
          />
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`menu${open ? " open" : ""}`}>
        <div className="menu-content">
          {/*<ul className="menu-left" ref={mobileMenuListRef}>*/}
          {/*  <li>*/}
          {/*    <a href="/CompetizioneLSC">Competizione LSC</a>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <a href="/Competizione">Competizioni</a>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <a href="/Home">Chi siamo</a>*/}
          {/*  </li>*/}
          {/*  <li>*/}
          {/*    <a href="/Home"></a> /!*elemento vuoto per spacing*!/*/}
          {/*  </li>*/}
          {/*</ul>*/}
          <div className={`menu-right visible`} ref={mobileCitiesPanelRef}>
            <ul className="menu-right-list" ref={mobileCitiesListRef}>
              {mobileCities.map((city, index) => (
                <li key={city.href}>
                  <a href={city.href} onClick={(e) => handleMobileCityClick(e, city, index)}>
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="menu-right-list sections" ref={mobileSectionsListRef}>
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a href={buildContextHref(link.href)} onClick={(e) => handleMobileSectionClick(e, link)}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
