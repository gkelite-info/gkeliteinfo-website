"use client"

import { useEffect } from "react"

export default function BootstrapClient() {
    useEffect(() => {
        const loadBootstrap = async () => {
            if (typeof window !== "undefined") {
                try { await import("../js/bootstrap.bundle.min.js"); } catch (e) { console.error("Error loading bootstrap:", e); }
                try { await import("../js/noframework.waypoints.js"); } catch (e) { console.error("Error loading waypoints:", e); }
                try { await import("../js/glightbox.min.js"); } catch (e) { console.error("Error loading glightbox:", e); }
                try { await import("../js/swiper-bundle.min.js"); } catch (e) { console.error("Error loading swiper:", e); }
                try { await import("../js/validate.js"); } catch (e) { console.error("Error loading validate:", e); }
                try { await import("../js/main.js"); } catch (e) { console.error("Error loading main:", e); }
            }
        };

        loadBootstrap();
    }, []);

    return null;
}
