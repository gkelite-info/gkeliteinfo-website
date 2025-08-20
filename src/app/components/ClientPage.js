'use client'

import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useEffect } from "react";

import React from 'react'

const ClientPage = () => {

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
                                <h2 className="inner-title">One Stop Solution...</h2>
                                <div className="our-story">
                                    <h3>About Us</h3>
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
                {/* <section id="skills" className="skills section" style={{"textal: left;margin-left:150px;margin-right:100px"}}> */}
                <section id="skills" className="skills section" style={{ textAlign: 'left', marginLeft: '150px', marginRight: '100px' }}>

                    <div className="container section-title" data-aos="fade-up">
                        <h2>OUR OBJECTIVES</h2>
                        <p>To drive business success through innovative, comprehensive solutions.</p>
                    </div>

                    <div className="our-story" >
                        <p>At GKelite, we proudly position ourselves as the ultimate one-stop powerhouse, endorsed by industry leaders, to accelerate business success! Our objectives are clear: </p>
                        <h6 className="fw-bold">Talent Acquisition Excellence – GK Elite- Info Service help you secure the best talent, driving innovation and growth.</h6>
                        <p>Talent Acquisition Excellence – At GKelite-Info Service, we are dedicated to securing top-tier talent that fuels innovation and business growth.</p>
                        <ul>
                            <li><span>As one of the fastest-growing talent acquisition platforms, we are the preferred recruiting partner for numerous Fortune 500 companies.</span></li>
                            <li><span>We specialize in helping clients identify and acquire the right talent, perfectly matching skills with business needs.
                            </span></li>
                            <li><span>Our platform provides access to multiple job opportunities tailored to industry-specific skills, ensuring the best fit for both candidates and companies.
                            </span></li>
                            <li><span>We are committed to delivering quality service with a high selection ratio and minimal turnaround time, ensuring efficiency and results in your recruitment process.</span></li>
                        </ul>
                        <p>Join us to experience recruitment success that drives your business forward!</p>

                        <h6 className="fw-bold">Dynamic Digital Marketing Solutions – GK Elite- Info digital will Boost your brand visibility and skyrocket your online presence with cutting-edge strategies.</h6>
                        <p>Dynamic Digital Marketing Solutions – Gk elite-Info Digital amplify your brand’s visibility and catapult your online presence to new heights with our cutting-edge, results-driven digital marketing strategies!</p>

                        <ul>
                            <li><span>GK elite is proudly endorsed by 25 visionary CEOs, all backing our mission to revolutionize businesses by bringing them into the vibrant world of digital marketing. We empower brands to grow, thrive, and become unstoppable forces in the digital space.</span></li>
                            <li><span>Our team is the epitome of youthful energy and expertise. With hands-on experience from top digital marketing firms, we’ve built a dynamic and innovative team that fuels the success of GKelite Digital.</span></li>
                            <li><span>Serving clients from a wide array of industries, we’ve unlocked the secret to explosive growth for brands by crafting customized strategies that deliver real results. Whether it’s boosting visibility or driving traffic, our methods are proven to bring brands to the forefront of the digital landscape.
                            </span></li>
                        </ul>
                        <p>
                            Join us at GKeliteinfo, where brands don’t just compete—they dominate!
                        </p>

                        <h6 className="fw-bold">Global Lead Generation</h6>
                        <p>We understand that generating leads is essential for sustained growth. Our innovative approach allows us to generate high-quality leads for businesses around the world. Whether you're looking to expand into new markets or strengthen your presence in existing ones, our lead generation services are designed to fuel your growth.</p>
                        <h6 className="fw-bold">Innovative Lead Generation Strategies</h6>
                        <p></p>
                        <h6 className="fw-bold">Multi-Channel Lead Generation</h6>
                        <p>In our pursuit of excellence, we continuously explore various projects that utilize a blend of effective lead generation strategies. By leveraging platforms like #LinkedIn, #EmailMarketing, #SocialMediaMarketing, and #PayPerClick, we ensure a diversified approach that captures potential clients from multiple touchpoints.</p>
                        <h6 className="fw-bold">Trial and Error for Optimal Results</h6>
                        <p>Our journey has involved extensive testing and optimization to discover the best lead generation tactics. Through this iterative process, we've honed in on strategies that create a stable flow of new leads daily, providing you with a reliable pipeline to drive your business forward.</p>
                        <h6 className="fw-bold">Top-Tier BPO Services</h6>
                        <p></p>
                        <h6 className="fw-bold">GK Elite-Info Service Providers</h6>
                        <p>GK Elite-Info delivers seamless and efficient Business Process Outsourcing (BPO) solutions that enhance operational workflows and boost productivity.</p>
                        <p>1. We are a leading BPO service provider specializing in engaging conversations across multiple platforms, helping businesses thrive in today’s competitive landscape.</p>
                        <p>2. We recognize that your customers are the backbone of your business. That’s why we prioritize exceptional customer interactions.</p>
                        <p>3. Our team boasts years of experience working with industry giants, excelling in customer service, solutions, and satisfaction.</p>
                        <p>4. We pride ourselves on achieving a higher first call resolution rate, ensuring that customer issues are addressed promptly.</p>
                        <p>5. Our advanced dashboard monitoring allows for real-time tracking of performance metrics to enhance service delivery.</p>
                        <p>6. We offer digital recordings and playbacks, ensuring quality assurance and continuous improvement in our services.</p>
                        <p>7. At GK Elite-Info, we are committed to uncompromised excellence in every aspect of our BPO services.</p>
                    </div>

                </section>
                <section id="team" className="team section light-background">

                    <div className="container section-title" data-aos="fade-up">
                        <h2>Our Team</h2>
                        <p>Experienced Professionals Dedicated To Innovation</p>
                    </div>

                    <div className="container">

                        <div className="row gy-4">

                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                                <div className="team-member">
                                    <div className="member-img">
                                        <img src="/assets/img/team/team-2.png" className="img-fluid" alt="" />
                                        <div className="social">
                                            {/* <Link href=""><i className="bi bi-twitter-x"></i></Link>
                                            <Link href=""><i className="bi bi-facebook"></i></Link>
                                            <Link href=""><i className="bi bi-instagram"></i></Link> */}
                                            <Link href=""><i className="bi bi-linkedin"></i></Link>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <h4>Walter White</h4>
                                        <span>Chief Executive Officer</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                                <div className="team-member">
                                    <div className="member-img">
                                        <img src="/assets/img/team/team-4.png" className="img-fluid" alt="" />
                                        <div className="social">
                                            {/* <Link href=""><i className="bi bi-twitter-x"></i></Link>
                                            <Link href=""><i className="bi bi-facebook"></i></Link>
                                            <Link href=""><i className="bi bi-instagram"></i></Link> */}
                                            <Link href=""><i className="bi bi-linkedin"></i></Link>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <h4>Sarah Jhonson</h4>
                                        <span>Product Manager</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300">
                                <div className="team-member">
                                    <div className="member-img">
                                        <img src="/assets/img/team/team-3.png" className="img-fluid" alt="" />
                                        <div className="social">
                                            {/* <Link href=""><i className="bi bi-twitter-x"></i></Link>
                                            <Link href=""><i className="bi bi-facebook"></i></Link>
                                            <Link href=""><i className="bi bi-instagram"></i></Link> */}
                                            <Link href=""><i className="bi bi-linkedin"></i></Link>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <h4>William Anderson</h4>
                                        <span>CTO</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="400">
                                <div className="team-member">
                                    <div className="member-img">
                                        <img src="/assets/img/team/team-1.png" className="img-fluid" alt="" />
                                        <div className="social">
                                            {/* <Link href=""><i className="bi bi-twitter-x"></i></Link>
                                            <Link href=""><i className="bi bi-facebook"></i></Link>
                                            <Link href=""><i className="bi bi-instagram"></i></Link> */}
                                            <Link href=""><i className="bi bi-linkedin"></i></Link>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <h4>Amanda Jepson</h4>
                                        <span>Accountant</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>



            </main>
        </div>
    )
}

export default ClientPage