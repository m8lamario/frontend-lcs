"use client";
import React, { useEffect, useState, useRef } from "react";
import "./Styles/Nav.css";
import { usePathname } from "next/navigation";
import NavDesktop from "./nav/NavDesktop.jsx";
import NavMobile from "./nav/NavMobile.jsx";
import { useCitiesNav, DEFAULT_NAV_LOGO } from "./nav/useCitiesNav.js";


export default function Nav() {
  const pathname = usePathname();
  const {
    cities,
    mobileCities,
    mounted,
    persistCitiesOrder,
    sectionLinks,
    persistSectionLinksOrder,
    currentCitySlug,
  } = useCitiesNav(pathname);
  const [navLogoSrc, setNavLogoSrc] = useState(DEFAULT_NAV_LOGO);
  const [navLogoLabel, setNavLogoLabel] = useState("LCS");

  // Smart navbar: hide on scroll down, show on scroll up
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Solo su schermi > 1100px
      if (window.innerWidth <= 1100) {
        setNavHidden(false);
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const scrolledPastThreshold = currentScrollY > 100;

      if (scrollingDown && scrolledPastThreshold) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Trova la città corrente basandosi sullo slug estratto dal pathname
    if (currentCitySlug && currentCitySlug !== "esl") {
      const currentCity = cities.find(
        (city) => city?.slug === currentCitySlug ||
                  city?.href?.toLowerCase().includes(currentCitySlug)
      );
      if (currentCity?.logoSrc) {
        setNavLogoSrc(currentCity.logoSrc);
        setNavLogoLabel(currentCity.name || "LCS");
        return;
      }
    }
    // Default: logo LCS
    setNavLogoSrc(DEFAULT_NAV_LOGO);
    setNavLogoLabel("LCS");
  }, [cities, currentCitySlug]);

  return (
    <nav className={navHidden ? "nav-hidden" : undefined} suppressHydrationWarning>
      <a href="/" className="logo" aria-label={`Vai alla home di ${navLogoLabel}`} suppressHydrationWarning>
        <img
          src={navLogoSrc}
          alt={`Logo ${navLogoLabel}`}
          className="logo-img"
          loading="lazy"
          suppressHydrationWarning
        />
      </a>
      {/* Desktop: visibile via CSS su viewport >= 1200px */}
      {mounted ? (
        <NavDesktop
          cities={cities}
          mounted={mounted}
          persistCitiesOrder={persistCitiesOrder}
          sectionLinks={sectionLinks}
          persistSectionLinksOrder={persistSectionLinksOrder}
        />
      ) : (
        <div className="vetro1" style={{ visibility: "hidden" }}>
          <ul className="list-città">
            {mobileCities.map((city) => (
              <li key={city.href}>
                <a href={city.href}>{city.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Mobile: visibile via CSS su viewport < 1200px */}
      <NavMobile mobileCities={mobileCities} sectionLinks={sectionLinks} />
    </nav>
  );
}
