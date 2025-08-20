"use client"

import { useEffect } from "react"

export default function BootstrapClient() {
    useEffect(() => {
        const loadBootstrap = async () => {
            if (typeof window !== "undefined") {
                // Dynamically import all the necessary scripts without AOS
                await import("../js/main");
                await import("../js/noframework.waypoints");
                await import("../js/validate");
                await import("../js/bootstrap.bundle.min.js");
                await import("../js/glightbox.min.js");
                await import("../js/swiper-bundle.min.js");
            }
        };

        // Call the loadBootstrap function
        loadBootstrap();
    }, []);  // Run once after the initial mount

    return null;
}
