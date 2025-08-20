'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Briefcase, Users, Target, TrendingUp } from 'lucide-react';

const services = [
  {
    title: "B2B Sales Strategies for High-Value Deals",
    icon: <Briefcase size={40} className="text-primary" />,
    points: [
      "Lead Qualification & Prospecting – identify decision-makers & high-value prospects.",
      "Consultative Selling Approach – tailor solutions instead of hard selling.",
      "Account-Based Marketing (ABM) – target specific companies with personalized campaigns.",
      "Value-Driven Pitch – highlight ROI, efficiency & long-term benefits.",
      "Multi-Channel Outreach – LinkedIn, email, events & referrals.",
      "Negotiation & Long-Term Contracts – build trust with effective deals."
    ],
  },
  {
    title: "B2C Sales Strategies for Faster Conversions",
    icon: <Users size={40} className="text-success" />,
    points: [
      "Personalized Customer Experience – data-driven recommendations & offers.",
      "Social Proof & Reviews – influencers, testimonials & user content.",
      "Omnichannel Selling – seamless shopping across web, social & retail.",
      "Limited-Time Offers & Discounts – flash sales & seasonal promos.",
      "Upselling & Cross-Selling – suggest complementary products."
    ],
  },
  {
    title: "Lead Generation & Nurturing for Long-Term Success",
    icon: <Target size={40} className="text-warning" />,
    points: [
      "B2B: Content marketing, LinkedIn outreach, events & whitepapers.",
      "B2C: Social ads, influencer marketing, referral programs & viral campaigns.",
      "Lead Nurturing: Automated email sequences, case studies, webinars & retargeting campaigns."
    ],
  },
  {
    title: "Sales Performance Optimization & Closing Deals",
    icon: <TrendingUp size={40} className="text-info" />,
    points: [
      "B2B: Solution selling, objection handling, ROI-focused proposals.",
      "B2C: Scarcity tactics, emotional triggers, instant gratification with fast delivery.",
      "Follow-Up Strategy: Check-ins & customized proposals to maintain engagement."
    ],
  }
];

const page = () => {

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
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
                src="/assets/img/hero-carousel/b2b.jpg" 
                alt="B2B & B2C Sales Mastery" 
                title="B2B & B2C Sales Mastery" 
                className="img-fluid services-img" 
                width={600} 
                height={400} 
              />
            </div>

            <div className="col-lg-5 h-25 d-none d-lg-block" data-aos="fade-up" data-aos-delay="100">
              <div className="services-list">
                <Link href="/service-details/ai_services">AI Services</Link>
                <Link href="/service-details/dynamic_Digital_marketing_solutions">Dynamic Digital Marketing Solutions</Link>
                <Link href="/service-details/b2b_b2c_sales_mastery" className="active">B2B & B2C Sales Mastery</Link>
                <Link href="/service-details/bpo_services">BPO Services</Link>
                <Link href="/service-details/hr_consultancy">HR Consultancy</Link>
              </div>
              <h4>B2B & B2C Sales Mastery: Proven Strategies for Business Growth</h4>
              <p>
                Sales strategies differ significantly between Business-to-Business (B2B) and Business-to-Consumer (B2C) models. While B2B focuses on long-term relationships, B2C prioritizes quick decision-making and high-volume sales. Mastering both requires tailored approaches to prospecting, conversion, and customer retention.
              </p>
            </div>

            <section className="py-5 text-center">
              <h1 className="display-4 fw-bold">B2B & B2C Sales Mastery</h1>
              <p className="lead mt-3 mx-auto w-75 text-black">
                Unlock growth by mastering high-value B2B deals and fast-paced B2C conversions with proven strategies.
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
              <h2 className="fw-bold">Ready to Boost Your Sales?</h2>
              <p className="text-muted mt-2">
                Let us help you design winning B2B & B2C sales strategies to grow your business.
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
                <Link href="/service-details/b2b_b2c_sales_mastery" className="active">B2B & B2C Sales Mastery</Link>
                <Link href="/service-details/bpo_services">BPO Services</Link>
                <Link href="/service-details/hr_consultancy">HR Consultancy</Link>
              </div>
              <h4>B2B & B2C Sales Mastery: Proven Strategies for Business Growth</h4>
              <p>
                Sales strategies differ significantly between Business-to-Business (B2B) and Business-to-Consumer (B2C) models. While B2B focuses on long-term relationships, B2C prioritizes quick decision-making and high-volume sales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default page;