'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <div>
            <footer id="footer" className="footer dark-background">
                <div className="container footer-top">
                    <div className="row gy-4">
                        <div className="col-lg-4 col-md-6 footer-about bg-green-400">
                            <Link href="https://maps.app.goo.gl/K7L8txP4VR5cpA3MA" className="logo d-flex align-items-center">
                                <img src='/gkLogoDark.png' alt='gkLogoDark.png' />
                            </Link>
                            <div className="footer-contact pt-3 bg-blue-200">
                                <p>Opp: Pillar No. 1432,</p>
                                <p>6-3-853/1, 302 B, 3rd floor Meridian plaza,</p>
                                <p>Ameerpet, Hyderabad, Telangana</p>
                                <p>500016.</p>
                                <p className="mt- bg-red-600"><strong>Phone:</strong> <span>+91 9000266832, <br /><span style={{ marginLeft: '52px' }}>+91 7093256562</span></span>
                                </p>
                                <p><strong>Email:</strong> <span>gkeliteinfo@gmail.com,</span></p>
                                <p style={{ marginLeft: '45px' }}>business@gkeliteinfo.com,</p><p style={{ marginLeft: '45px' }}>hr@gkeliteinfo.com</p>
                            </div>
                            <div className="social-links d-flex mt-4">
                                <Link href="https://x.com/GkeliteInfo" target="_blank" className='custom-social-links'><i className="bi bi-twitter-x"></i></Link>
                                <Link href="https://www.facebook.com/people/GK-Elite-Info/61579019744439/" target="_blank" className='custom-social-links'><i className="bi bi-facebook"></i></Link>
                                <Link href="https://www.instagram.com/gkelite_info/" target="_blank" className='custom-social-links'><i className="bi bi-instagram"></i></Link>
                                <Link href="https://www.linkedin.com/company/gk-elite-info/" target="_blank" className='custom-social-links'><i className="bi bi-linkedin"></i></Link>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-3 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><Link href="/" className='custom-useful-links'>Home</Link></li>
                                <li><Link href="/about" className='custom-useful-links'>About us</Link></li>
                                <li><Link href="/services" className='custom-useful-links'>Services</Link></li>
                                <li><Link href="/terms-of-services" className='custom-useful-links'>Terms of service</Link></li>
                                {/* <li><Link href="#">Privacy policy</Link></li> */}
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-3 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><Link href="/service-details/ai_services" className='custom-services-links'>AI Services</Link></li>
                                <li><Link href="/service-details/dynamic_Digital_marketing_solutions" className='custom-services-links'> Digital Marketing</Link></li>
                                <li><Link href="/service-details/b2b_b2c_sales_mastery" className='custom-services-links'>B2B & B2C Sales</Link></li>
                                <li><Link href="/service-details/bpo_services" className='custom-services-links'>BPO Service</Link></li>
                                <li><Link href="/service-details/hr_consultancy" className='custom-services-links'>HR Consultancy</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-4 col-md-12 footer-newsletter">
                            <h4>Our Newsletter</h4>
                            <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
                            {/* Replace with Next.js handler or external API */}
                            <form action="your_api_endpoint_here" method="POST" className="php-email-form">
                                <div className="newsletter-form">
                                    <input type="email" name="email" required placeholder="Your email" />
                                    <input type="submit" value="Subscribe" />
                                </div>
                                <div className="loading">Loading</div>
                                <div className="error-message"></div>
                                <div className="sent-message">Your subscription request has been sent. Thank you!</div>
                            </form>
                        </div>
                    </div>

                    <div className="container copyright text-center mt-4">
                        <p>© <span>Copyright</span> <strong className="px-1 sitename">GKelite</strong> <span>All Rights Reserved</span></p>
                        <div className="credits">
                            Designed by <Link href="https://bootstrapmade.com/" className='custom-gkelite-link'>GKelite-IT</Link>
                        </div>
                    </div>

                </div>

            </footer>
        </div>
    );
}

export default Footer;
