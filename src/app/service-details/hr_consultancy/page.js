'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Briefcase, Users, GraduationCap, Building } from "lucide-react";
import { useEffect } from 'react';

const services = [
  {
    title: "Manpower Supply (Recruitment Services)",
    icon: <Users size={40} className="text-primary" />,
    points: [
      "We connect with client companies to understand their hiring needs.",
      "We source, screen, and provide the best-suited candidates.",
    ],
  },
  {
    title: "Training & Skill Development",
    icon: <GraduationCap size={40} className="text-success" />,
    points: [
      "We prepare freshers and professionals with the right skills.",
      "We offer customized training programs to make candidates industry-ready.",
    ],
  },
  {
    title: "Placement Assistance",
    icon: <Briefcase size={40} className="text-info" />,
    points: [
      "We guide candidates to secure jobs in top companies.",
      "We support companies in building strong, skilled teams.",
    ],
  },
  {
    title: "HR Support for Companies",
    icon: <Building size={40} className="text-warning" />,
    points: [
      "Saving time and effort in recruitment.",
      "Providing end-to-end hiring solutions (from job posting to final selection).",
    ],
  },
];

const page = () => {

  useEffect(() => {
    AOS.init({
      duration: 1200, // You can customize these options
      once: true, // You can make animations run only once
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
              <Image src="/assets/img/hero-carousel/hr-consultancy.jpg" alt="HR Consultancy" title='HR Consultancy Services' className="img-fluid services-img" width={300} height={300} />
            </div>
            <div className="col-lg-5 h-25 d-none d-lg-block" data-aos="fade-up" data-aos-delay="100">
              <div className="services-list">
                <Link href="/service-details/ai_services">AI Services</Link>
                <Link href="/service-details/dynamic_Digital_marketing_solutions">Dynamic Digital Marketing Solutions</Link>
                <Link href="/service-details/b2b_b2c_sales_mastery">B2B & B2C Sales Mastery</Link>
                <Link href="/service-details/bpo_services">BPO Services</Link>
                <Link href="/service-details/hr_consultancy" className="active">HR Consultancy</Link>
              </div>
              <h4>HR Consultancy: Strategies for Hiring Top Talent</h4>
              <p>
                At GK Elite Info, we are committed to connecting organizations with the right talent, empowering professionals through training, and delivering end-to-end HR solutions that drive business growth and success.
              </p>
            </div>
            <section className="py-5 text-center">
              <h1 className="display-4 fw-bold">HR Consultancy Services</h1>
              <p className="lead mt-3 mx-auto w-75 text-black">
                Connecting talent with opportunity, building skilled teams for the future.
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-light py-5 text-center">
              <h2 className="fw-bold">Looking for HR support?</h2>
              <p className="text-muted mt-2">
                Get in touch with us to build your dream team today.
              </p>
              <a
                href="/contact"
                className="custom-contact-btn btn btn-primary btn-lg mt-3 shadow-sm"
              >
                Contact Us
              </a>
            </section>

            <div className="col-lg-5 h-25 d-block d-lg-none" data-aos="fade-up" data-aos-delay="100">
              <div className="services-list">
                <Link href="/service-details/ai_services">AI Services</Link>
                <Link href="/service-details/dynamic_Digital_marketing_solutions">Dynamic Digital Marketing Solutions</Link>
                <Link href="/service-details/b2b_b2c_sales_mastery">B2B & B2C Sales Mastery</Link>
                <Link href="/service-details/bpo_services">BPO Services</Link>
                <Link href="/service-details/hr_consultancy" className="active">HR Consultancy</Link>
              </div>
              <h4>HR Consultancy: Strategies for Hiring Top Talent</h4>
              <p>
                At GK Elite Info, we are committed to connecting organizations with the right talent, empowering professionals through training, and delivering end-to-end HR solutions that drive business growth and success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default page