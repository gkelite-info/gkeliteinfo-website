'use client'
import "aos/dist/aos.css";
import React from "react";
import dynamic from "next/dynamic";

const AOSWrapper = dynamic(() => import('../components/aosWrapper'), { ssr: false });

const Contact = () => {
    return (
        <>
            <AOSWrapper>
                <div>
                    <main>
                        <div className="page-title accent-background">
                            <div className="container d-lg-flex justify-content-between align-items-center">
                                <h1 className="mb-2 mb-lg-0">Contact</h1>
                                {/* <nav className="breadcrumbs">
    <ol>
        <li><a href="index.html">Home</a></li>
        <li className="current">Contact</li>
    </ol>
</nav> */}
                            </div>
                        </div>
                        <section id="contact" className="contact section">
                            <div className="mb-5">
                                <iframe style={{ width: '100%', height: '400px', border: '0' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d856.8328954054585!2d78.45170207398887!3d17.435000169724102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f64f1e3ce3%3A0xeaea5d30eff6efe6!2sGKELITE%20INFO!5e0!3m2!1sen!2sin!4v1779107418523!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>

                            <div className="container" data-aos="fade">
                                <div className="row gy-5 gx-lg-5">
                                    <div className="col-lg-4">
                                        <div className="info">
                                            <h3>Get in touch</h3>
                                            <p>For any concerns, please contact us.</p>
                                            <div className="info-item d-flex">
                                                <i className="bi bi-geo-alt flex-shrink-0"></i>
                                                <div>
                                                    <h4>Location:</h4>
                                                    <p>6-3-853/1, 306 B, 3rd Floor Meridian Plaza, Ameerpet, Hyderabad, Telangana, 500016.</p>
                                                </div>
                                            </div>
                                            <div className="info-item d-flex">
                                                <i className="bi bi-envelope flex-shrink-0"></i>
                                                <div>
                                                    <h4>Email:</h4>
                                                    <p>hr@gkeliteinfo.com</p>
                                                </div>
                                            </div>

                                            <div className="info-item d-flex">
                                                <i className="bi bi-phone flex-shrink-0"></i>
                                                <div>
                                                    <h4>Phone:</h4>
                                                    <p>+91 9000266832, <br />
                                                        +91 7093256562
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-lg-8">
                                        <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required="" />
                                                </div>
                                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required="" />
                                                </div>
                                            </div>
                                            <div className="form-group mt-3">
                                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required="" />
                                            </div>
                                            <div className="form-group mt-3">
                                                <textarea className="form-control" name="message" placeholder="Message" required=""></textarea>
                                            </div>
                                            <div className="my-3">
                                                <div className="loading">Loading</div>
                                                <div className="error-message"></div>
                                                <div className="sent-message">Your message has been sent. Thank you!</div>
                                            </div>
                                            <div className="text-center"><button type="submit">Send Message</button></div>
                                        </form>
                                    </div>

                                </div>

                            </div>

                        </section>

                    </main>
                </div>
            </AOSWrapper>
        </>
    )
}

export default Contact