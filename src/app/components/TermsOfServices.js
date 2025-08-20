'use client'

import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useEffect } from "react";

import React from 'react'

const TermsOfServices = () => {

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1000, // Adjust as needed
        });
    }, []);

    return (
        <div>
            <main className="main">
                <div className="page-title accent-background">
                    <div className="container d-lg-flex justify-content-between align-items-center">
                        <h1 className="mb-2 mb-lg-0">About</h1>

                    </div>
                </div>

                <section id="about" className="about section">

                    <div className="container">

                        <div className="row position-relative">

                            <div className="col-lg-7 about-img" data-aos="zoom-out" data-aos-delay="200"><img src="assets/img/about.jpg" /></div>

                            <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
                                {/* <h2 className="inner-title">One Stop Solution...</h2> */}
                                <div className="our-story">
                                    <h3>Terms of Services</h3>
                                    <p>GKeliteinfo is an innovative startup, recognized and endorsed by 25 leading CEOs as the ultimate one-stop solution for all your business needs. Our cutting-edge services are designed to streamline operations, boost growth, and deliver unparalleled value to enterprises looking for efficient, effective solutions.</p>
                                    <ul>
                                        <li><i className="bi bi-check-circle"></i> <span>Comprehensive Business Solutions</span></li>
                                        <li><i className="bi bi-check-circle"></i> <span>Endorsement by Industry Leaders</span></li>
                                        <li><i className="bi bi-check-circle"></i> <span>Focus on Results and Efficiency</span></li>
                                    </ul>

                                </div>
                            </div>

                        </div>

                    </div>

                </section>
                <section id="skills" className="skills section container">
                    <div className="our-story" >
                        <h6 className="fw-bold"><span>Acceptance of Terms</span></h6>
                        <p>By accessing or using the GKeliteinfo website, you confirm that:</p>
                        <ul>
                            <li><i className="bi bi-check-circle"></i> <span>You are at least 18 years old or have the consent of a parent or guardian.</span></li>
                            <li><i className="bi bi-check-circle"></i> <span>You agree to these terms in full, along with any other policies or guidelines provided by GKeliteinfo.</span></li>
                        </ul>
                        <h6 className="fw-bold"><span>Changes to Terms</span></h6>
                        <p>GKeliteinfo reserves the right to update or modify these Terms of Service at any time without prior notice. Continued use of the website after changes have been made constitutes acceptance of the revised terms.</p>
                        <h6 className="fw-bold"><span>Use of Services</span></h6>
                        <ul>
                            <li><i className="bi bi-check-circle"></i> <span> GKeliteinfo provides business solutions and cutting-edge services designed to streamline operations and boost growth.</span></li>
                            <li><i className="bi bi-check-circle"></i> <span> You agree to use our services responsibly and in compliance with all applicable laws and regulations.</span></li>
                            <li><i className="bi bi-check-circle"></i> <span> Unauthorized use, including but not limited to hacking, data scraping, or attempts to disrupt the website or services, is strictly prohibited.</span></li>

                        </ul>
                        <h6 className="fw-bold"><span>Intellectual Property</span></h6>
                        <p>All content on the GKeliteinfo website, including text, graphics, logos, images, and software, is the intellectual property of GKeliteinfo or its licensors. Unauthorized reproduction, distribution, or use of our content is prohibited without explicit written permission.</p>
                        <h6 className="fw-bold"><span>User Responsibilities</span></h6>
                        <ul>
                            <li><i className="bi bi-check-circle"></i> <span> You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</span></li>
                            <li><i className="bi bi-check-circle"></i> <span> You agree to provide accurate, current, and complete information when creating an account or using our services.</span></li>
                        </ul>
                    </div>

                </section>
            </main>
        </div>
    )
}

export default TermsOfServices