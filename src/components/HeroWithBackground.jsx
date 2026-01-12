"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";

// Lazy load componenti pesanti
const HeroAnimation = dynamic(() => import("./HeroAnimation"), {
    ssr: false,
    loading: () => <div style={{ minHeight: "60vh" }} />,
});
const ImageSlider = dynamic(() => import("./ImageSlider"), {
    ssr: false,
});

export default function HeroWithBackground() {
    const [isSmall, setIsSmall] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const mql = window.matchMedia("(max-width: 408px)");
        const update = (e) => setIsSmall(e.matches);
        setIsSmall(mql.matches);

        if (mql.addEventListener) {
            mql.addEventListener("change", update);
            return () => mql.removeEventListener("change", update);
        } else {
            mql.addListener(update);
            return () => mql.removeListener(update);
        }
    }, []);

    const images = useMemo(() => ["/HomeFoto/13.jpg", "/HomeFoto/19.jpg"], []);
    const displayText = isSmall ? "esl" : "estudentsleague";

    return (
        <section
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                overflow: "hidden",
                background: "#000", // fallback durante il caricamento
            }}
        >
            {mounted && <ImageSlider images={images} interval={5000} transition={900} overlayOpacity={0.3} />}
            <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                {mounted ? (
                    <HeroAnimation text={displayText} duration={2} stagger={0.1} />
                ) : (
                    <div style={{ minHeight: "60vh" }} />
                )}
            </div>
        </section>
    );
}
