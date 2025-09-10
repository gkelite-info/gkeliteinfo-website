'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Search, Share2, FileText, Mail } from "lucide-react";

const services = [
  {
    title: "Search Engine Optimization (SEO)",
    icon: <Search size={40} className="text-primary" />,
    points: [
      "Keyword Research & Optimization",
      "On-Page SEO (meta tags, headings, content)",
      "Technical SEO (speed, mobile responsiveness, indexing)",
      "Link Building & Authority Growth",
    ],
    example: "Example: A local restaurant optimizing its website for 'best Italian food near me'."
  },
  {
    title: "Social Media Marketing",
    icon: <Share2 size={40} className="text-success" />,
    points: [
      "Platform-Specific Content for Instagram, LinkedIn, etc.",
      "Influencer Collaborations",
      "Community Engagement & Responses",
      "Paid Promotions & Targeted Ads",
    ],
    example: "Example: A fashion brand using Instagram reels & influencers to promote collections."
  },
  {
    title: "Content Marketing",
    icon: <FileText size={40} className="text-info" />,
    points: [
      "Blog Writing & SEO Articles",
      "Video Marketing (tutorials, testimonials)",
      "Infographics & Visual Storytelling",
      "Case Studies & Whitepapers",
    ],
    example: "Example: A fitness company publishing healthy lifestyle blogs to engage users."
  },
  {
    title: "Email Marketing",
    icon: <Mail size={40} className="text-warning" />,
    points: [
      "Personalized Campaigns",
      "Automated Email Sequences",
      "Engaging Subject Lines & CTAs",
      "Customer Segmentation",
    ],
    example: "Example: A travel agency sending personalized vacation offers based on past bookings."
  },
];

const page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <main className="main">
      <div className="page-title accent-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Service Details</h1>
        </div>
      </div>

      <section id="service-details" className="service-details section">
        <div className="container">
          <div className="row gy-0 px-3 px-lg-0">
            
            <div className="col-lg-7" data-aos="fade-up" data-aos-delay="200">
              <Image 
                src="/assets/img/hero-carousel/dm.jpg" 
                alt="Dynamic Digital Marketing Solutions" 
                title="Dynamic Digital Marketing Solutions" 
                className="img-fluid services-img" 
                width={300} 
                height={300} 
              />
            </div>

            <div className="col-lg-5 h-25 d-none d-lg-block" data-aos="fade-up" data-aos-delay="100">
              <div className="services-list">
                <Link href="/service-details/ai_services">AI Services</Link>
                <Link href="/service-details/dynamic_Digital_marketing_solutions" className="active">Dynamic Digital Marketing Solutions</Link>
                <Link href="/service-details/b2b_b2c_sales_mastery">B2B & B2C Sales Mastery</Link>
                <Link href="/service-details/bpo_services">BPO Services</Link>
                <Link href="/service-details/hr_consultancy">HR Consultancy</Link>
              </div>
              <h4>Dynamic Digital Marketing Solutions</h4>
              <p>
                Digital marketing is evolving rapidly, requiring businesses to adopt innovative strategies to stay competitive. From SEO to social media, each component drives engagement and conversions.
              </p>
            </div>

            <section className="py-5 text-center">
              <h1 className="display-5 fw-bold">Dynamic Digital Marketing Solutions</h1>
              <p className="lead mt-3 mx-auto w-75 text-black">
                Helping businesses grow by enhancing visibility, engaging audiences, and driving conversions.
              </p>
            </section>

            <section className="container py-5">
              <div className="row g-4">
                {services.map((service, index) => (
                  <div className="col-md-6 py-2" key={index}>
                    <div className="card shadow-sm h-100 border-0 rounded-5">
                      <div className="card-body shadow-lg rounded-5">
                        <div className="mb-3">{service.icon}</div>
                        <h5 className="card-title fw-semibold">{service.title}</h5>
                        <ul className="list-unstyled mt-3">
                          {service.points.map((point, i) => (
                            <li key={i} className="mb-2 d-flex align-items-start">
                              <span className="me-2 text-secondary">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                        <p className="text-muted small mt-3"><em>{service.example}</em></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-light py-5 text-center">
              <h2 className="fw-bold">Want to grow your brand digitally?</h2>
              <p className="text-muted mt-2">
                Get in touch with us to build a results-driven digital marketing strategy.
              </p>
              <a
                href="/contact"
                className="custom-contact-btn btn btn-primary btn-lg mt-3 shadow-sm"
              >
                Contact Us
              </a>
            </section>

            <div className="col-lg-5 h-25 d-block d-lg-none mt-5" data-aos="fade-up" data-aos-delay="100">
              <div className="services-list">
                <Link href="/service-details/ai_services">AI Services</Link>
                <Link href="/service-details/dynamic_Digital_marketing_solutions" className="active">Dynamic Digital Marketing Solutions</Link>
                <Link href="/service-details/b2b_b2c_sales_mastery">B2B & B2C Sales Mastery</Link>
                <Link href="/service-details/bpo_services">BPO Services</Link>
                <Link href="/service-details/hr_consultancy">HR Consultancy</Link>
              </div>
              <h4>Dynamic Digital Marketing Solutions</h4>
              <p>
                From SEO to social media and content strategies, we help brands scale in the digital world.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;