"use client"

import { useEffect } from "react"

export default function BootstrapClient() {
    useEffect(() => {
        const loadBootstrap = async () => {
            if (typeof window !== "undefined") {
                await import("../js/main");
                await import("../js/noframework.waypoints");
                await import("../js/validate");
                await import("../js/bootstrap.bundle.min.js");
                await import("../js/glightbox.min.js");
                await import("../js/swiper-bundle.min.js");
            }
        };

        loadBootstrap();
    }, []);

    return null;
}
