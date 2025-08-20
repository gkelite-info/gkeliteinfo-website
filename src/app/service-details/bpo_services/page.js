'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Headphones, FileText, Calculator, Monitor, Stethoscope } from "lucide-react";

const services = [
  {
    title: "Customer Support & Contact Center",
    icon: <Headphones size={40} className="text-primary" />,
    points: [
      "Inbound & outbound call handling.",
      "Live chat & email support.",
      "Technical troubleshooting.",
      "Multilingual customer assistance.",
    ],
    example: "E-commerce company outsourcing call center operations."
  },
  {
    title: "Data Entry & Document Processing",
    icon: <FileText size={40} className="text-success" />,
    points: [
      "Data entry & management.",
      "Invoice & billing processing.",
      "OCR & document digitization.",
      "Market research data handling.",
    ],
    example: "Healthcare provider outsourcing patient record management."
  },
  {
    title: "Finance & Accounting",
    icon: <Calculator size={40} className="text-info" />,
    points: [
      "Bookkeeping & general accounting.",
      "Accounts payable & receivable.",
      "Tax preparation & compliance.",
      "Financial analysis & reporting.",
    ],
    example: "Retail chain outsourcing accounts payable to streamline payments."
  },
  {
    title: "IT & Technical Support",
    icon: <Monitor size={40} className="text-warning" />,
    points: [
      "Help desk & IT support.",
      "Software development & maintenance.",
      "Cloud & infrastructure management.",
      "Cybersecurity & compliance.",
    ],
    example: "Fintech startup outsourcing IT helpdesk for 24/7 support."
  },
  {
    title: "Healthcare BPO",
    icon: <Stethoscope size={40} className="text-danger" />,
    points: [
      "Medical billing & coding.",
      "Patient appointment scheduling.",
      "Electronic health record (EHR) management.",
      "Pharmaceutical data processing.",
    ],
    example: "Hospital outsourcing billing for error-free claims processing."
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
                src="/assets/img/hero-carousel/bpo_image.jpg"
                alt="BPO Services"
                title="BPO Services"
                className="img-fluid services-img"
                width={300}
                height={300}
              />
            </div>

            <div className="col-lg-5 h-25 d-none d-lg-block" data-aos="fade-up" data-aos-delay="100">
              <div className="services-list">
                <Link href="/service-details/ai_services">AI Services</Link>
                <Link href="/service-details/dynamic_Digital_marketing_solutions">Dynamic Digital Marketing Solutions</Link>
                <Link href="/service-details/b2b_b2c_sales_mastery">B2B & B2C Sales Mastery</Link>
                <Link href="/service-details/bpo_services" className="active">BPO Services</Link>
                <Link href="/service-details/hr_consultancy">HR Consultancy</Link>
              </div>
              <h4>BPO Services: Enhancing Efficiency & Business Growth</h4>
              <p>
                Business Process Outsourcing (BPO) allows companies to delegate non-core functions to specialized service providers, improving efficiency, reducing costs, and enhancing customer satisfaction.
              </p>
            </div>

            <section className="py-5 text-center">
              <h1 className="display-4 fw-bold">BPO Services</h1>
              <p className="lead mt-3 mx-auto w-75 text-black">
                Empowering businesses with customer support, finance, IT, and healthcare solutions.
              </p>
            </section>

            <section className="container py-5">
              <div className="row g-4 justify-content-center">
                {services.slice(0, 3).map((service, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
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
                        <p className="small text-muted mt-3"><b>Example:</b> {service.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-4 justify-content-center mt-3">
                {services.slice(3).map((service, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
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
                        <p className="small text-muted mt-3"><b>Example:</b> {service.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-light py-5 text-center">
              <h2 className="fw-bold">Ready to Scale with BPO?</h2>
              <p className="text-muted mt-2">
                Let us handle your non-core operations so you can focus on growth.
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
                <Link href="/service-details/bpo_services" className="active">BPO Services</Link>
                <Link href="/service-details/hr_consultancy">HR Consultancy</Link>
              </div>
              <h4>BPO Services: Enhancing Efficiency & Business Growth</h4>
              <p>
                Business Process Outsourcing (BPO) allows companies to delegate non-core functions to specialized service providers, improving efficiency, reducing costs, and enhancing customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;