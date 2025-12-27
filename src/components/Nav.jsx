"use client";
import React from "react";
import "./Styles/Nav.css";
import { usePathname } from "next/navigation";
import NavDesktop from "./nav/NavDesktop.jsx";
import NavMobile from "./nav/NavMobile.jsx";
import { useCitiesNav } from "./nav/useCitiesNav.js";


export default function Nav() {
  const pathname = usePathname();
  const {
    cities,
    mobileCities,
    mounted,
    persistCitiesOrder,
    sectionLinks,
    persistSectionLinksOrder,
  } = useCitiesNav(pathname);

  return (
    <nav>
      <a href="/" className="logo">
        <img
          src="/logo/PNG-lcs_logo_white_t.png"
          alt="Logo"
          className="logo-img"
        />
      </a>
      {/* Desktop: visibile via CSS su viewport >= 1200px */}
      <NavDesktop
        cities={cities}
        mounted={mounted}
        persistCitiesOrder={persistCitiesOrder}
        sectionLinks={sectionLinks}
        persistSectionLinksOrder={persistSectionLinksOrder}
      />
      {/* Mobile: visibile via CSS su viewport < 1200px */}
      <NavMobile mobileCities={mobileCities} sectionLinks={sectionLinks} />
    </nav>
  );
}
