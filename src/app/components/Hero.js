"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      src: "/assets/img/hero-carousel/ai_services.jpg",
      alt: "AI Services",
      title: "AI Services",
      titleClass: 'slide-title-services',
      description:
        "GKelite-Info Digital harnesses the power of AI to deliver cutting-edge generative AI models, offering innovative solutions tailored to your unique challenges. Empower your business with intelligent, results-driven strategies designed to transform your vision into reality!",
    },
    {
      src: "/assets/img/hero-carousel/digital_marketing2.jpg",
      alt: "Digital Marketing Solutions",
      title: "Dynamic Digital Marketing Solutions",
      titleClass: 'slide-title-services',
      description:
        "GKelite-Info Digital amplifies your brand’s visibility and elevates your online presence to new heights with cutting-edge, results-driven digital marketing strategies!",
    },
    {
      src: "/assets/img/hero-carousel/b2b.jpg",
      alt: "B2B & B2C Sales Mastery",
      title: "B2B & B2C Sales Mastery",
      titleClass: 'slide-title-services',
      description:
        " Mastering B2B and B2C sales is crucial in today’s competitive marketplace. GKelite-Info specializes in providing unparalleled sales services that enhance your sales strategy and deliver measurable results in both business-to-business and business-to-consumer sectors.",
    },
    {
      src: "/assets/img/hero-carousel/bpo_image.jpg",
      alt: "BPO Services",
      title: "BPO Services",
      titleClass: 'slide-title-services',
      description:
        "Our BPO services are designed to deliver exceptional support for your business processes, allowing you to focus on your core operations.",
    },
    {
      src: "/assets/img/hero-carousel/hr-consultancy.jpg",
      alt: "HR Consultancy",
      title: "HR Consultancy",
      titleClass: 'slide-title-services',
      description:
        "At GK Elite Info, we are committed to connecting organizations with the right talent, empowering professionals through training, and delivering end-to-end HR solutions that drive business growth and success.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval); // Cleanup function to avoid memory leaks
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <section id="hero" className="hero section dark-background">
      <div id="hero-carousel" className="carousel slide carousel-fade">
        {/* Slide Items */}
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-item ${index === currentIndex ? "active" : ""}`}>
            <img src={slide.src} alt={slide.alt} className="img-fluid w-100" />
            <div className="container">
              <h2 className={`${slide.titleClass}`}>{slide.title}</h2>
              <p className="fs-6 fs-md-5">{slide.description}</p>
            </div>

          </div>
        ))}

        {/* Navigation Controls */}
        <Link className="carousel-control-prev" href="#" onClick={goToPrevious}>
          <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
        </Link>

        <Link className="carousel-control-next" href="#" onClick={goToNext}>
          <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
        </Link>

      </div>
    </section>
  );
};

export default HeroCarousel;