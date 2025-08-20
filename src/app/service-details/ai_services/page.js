'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Brain, MessageCircle, HeartPulse, LineChart, Palette, Mic } from "lucide-react";

const aiServices = [
  {
    title: "Large Language Models (LLMs) for Business",
    icon: <Brain size={40} className="text-primary" />,
    points: [
      "Custom LLMs built for specific business needs.",
      "Proprietary AI with domain-specific intelligence.",
      "Example: Legal firm fine-tuning GPT-4 on case documents."
    ],
  },
  {
    title: "Customer Support Chatbots",
    icon: <MessageCircle size={40} className="text-success" />,
    points: [
      "Fine-tuned on support tickets, FAQs & logs.",
      "Delivers quick, accurate responses to users.",
      "Example: E-commerce chatbot for orders & returns."
    ],
  },
  {
    title: "Medical Diagnosis & Healthcare AI",
    icon: <HeartPulse size={40} className="text-danger" />,
    points: [
      "Trained on research papers & patient records.",
      "Helps doctors analyze symptoms & suggest treatments.",
      "Example: Hospitals fine-tuning BERT for radiology."
    ],
  },
  {
    title: "Finance & Stock Market Analysis",
    icon: <LineChart size={40} className="text-info" />,
    points: [
      "Summarizes reports & predicts stock trends.",
      "Provides AI-driven investment insights.",
      "Example: Hedge funds fine-tuning AI for predictive analytics."
    ],
  },
  {
    title: "AI-Generated Art & Creative Content",
    icon: <Palette size={40} className="text-warning" />,
    points: [
      "Fine-tuned Stable Diffusion for unique designs.",
      "Trains on artist’s works for signature styles.",
      "Example: Fashion brand creating textile patterns."
    ],
  },
  {
    title: "Voice Cloning & Speech AI",
    icon: <Mic size={40} className="text-purple-600" />,
    points: [
      "Fine-tuned Whisper & Tacotron for voice synthesis.",
      "Used in assistants, audiobooks & ads.",
      "Example: Media company cloning celebrity voices."
    ],
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
                src="/assets/img/hero-carousel/ai-service-1.png"
                alt="Generative AI Services"
                title="Generative AI Services"
                className="img-fluid services-img"
                width={300}
                height={300}
              />
            </div>

            <div className="col-lg-5 h-25 d-none d-lg-block" data-aos="fade-up" data-aos-delay="100">
              <div className="services-list">
                <Link href="/service-details/ai_services" className="active">AI Services</Link>
                <Link href="/service-details/dynamic_Digital_marketing_solutions">Dynamic Digital Marketing Solutions</Link>
                <Link href="/service-details/b2b_b2c_sales_mastery">B2B & B2C Sales Mastery</Link>
                <Link href="/service-details/bpo_services">BPO Services</Link>
                <Link href="/service-details/hr_consultancy">HR Consultancy</Link>
              </div>
              <h4>Generative AI Services: Pretrained Models & Fine-Tuning</h4>
              <p>
                Explore how fine-tuned AI models are revolutionizing industries with tailored solutions.
              </p>
            </div>

            <section className="py-5 text-center">
              <h1 className="display-5 fw-bold">Fine-Tuned Generative Models & Use Cases</h1>
              <p className="lead mt-3 mx-auto w-75 text-black">
                Discover real-world applications of customized AI models across industries.
              </p>
            </section>

            <section className="container py-5">
              <div className="row g-4">
                {aiServices.map((service, index) => (
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
              <h2 className="fw-bold">Transform Your Business with AI</h2>
              <p className="text-muted mt-2">
                Leverage cutting-edge AI solutions to automate processes, gain insights, and scale smarter.
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
                <Link href="/service-details/ai_services" className="active">AI Services</Link>
                <Link href="/service-details/dynamic_Digital_marketing_solutions">Dynamic Digital Marketing Solutions</Link>
                <Link href="/service-details/b2b_b2c_sales_mastery">B2B & B2C Sales Mastery</Link>
                <Link href="/service-details/bpo_services">BPO Services</Link>
                <Link href="/service-details/hr_consultancy">HR Consultancy</Link>
              </div>
              <h4>Generative AI Services: Pretrained Models & Fine-Tuning</h4>
              <p>
                Explore how fine-tuned AI models are revolutionizing industries with tailored solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default page;