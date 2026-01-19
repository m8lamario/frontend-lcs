"use client";
import React, { useEffect, useState } from "react";
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
    <nav>
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
