'use client'

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import React from 'react'

const Blog = () => {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1000, // Adjust as needed
        });
    }, []);

    return (
        <div>
            <main>
                <div className="page-title accent-background">
                    <div className="container d-lg-flex justify-content-between align-items-center">
                        <h1 className="mb-2 mb-lg-0">Blog</h1>
                        {/* <nav className="breadcrumbs">
                            <ol>
                                <li><a href="index.html">Home</a></li>
                                <li className="current">Blog</li>
                            </ol>
                        </nav> */}
                    </div>
                </div>
                <section id="blog-posts" className="blog-posts section">

                    <div className="container">
                        <div className="row gy-4">

                            <div className="col-lg-4">
                                <article className="position-relative h-100">

                                    <div className="post-img position-relative overflow-hidden">
                                        <img src="/assets/img/blog/blog-1.jpg" className="img-fluid" alt="" />
                                        <span className="post-date">December 12</span>
                                    </div>

                                    <div className="post-content d-flex flex-column">

                                        <h3 className="post-title">Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia</h3>

                                        <div className="meta d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-person"></i> <span className="ps-2">Narra Shiva Prasad</span>
                                            </div>
                                            <span className="px-3 text-black-50">/</span>
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-folder2"></i> <span className="ps-2">AI Services</span>
                                            </div>
                                        </div>

                                        <p>
                                            Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
                                        </p>

                                        <hr />

                                        <a href="/blog-details/blog1" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right"></i></a>

                                    </div>

                                </article>
                            </div>
                            <div className="col-lg-4">
                                <article className="position-relative h-100">

                                    <div className="post-img position-relative overflow-hidden">
                                        <img src="/assets/img/blog/blog-2.jpg" className="img-fluid" alt="" />
                                        <span className="post-date">March 19</span>
                                    </div>

                                    <div className="post-content d-flex flex-column">

                                        <h3 className="post-title">Nisi magni odit consequatur autem nulla dolorem</h3>

                                        <div className="meta d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-person"></i> <span className="ps-2">Narra Shiva Prasad</span>
                                            </div>
                                            <span className="px-3 text-black-50">/</span>
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-folder2"></i> <span className="ps-2">Marketify</span>
                                            </div>
                                        </div>

                                        <p>
                                            Incidunt voluptate sit temporibus aperiam. Quia vitae aut sint ullam quis illum voluptatum et. Quo libero rerum voluptatem pariatur nam.
                                        </p>

                                        <hr />

                                        <a href="/blog-details/blog2" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right"></i></a>

                                    </div>

                                </article>
                            </div>
                            <div className="col-lg-4">
                                <article className="position-relative h-100">

                                    <div className="post-img position-relative overflow-hidden">
                                        <img src="/assets/img/blog/blog-3.jpg" className="img-fluid" alt="" />
                                        <span className="post-date">June 24</span>
                                    </div>

                                    <div className="post-content d-flex flex-column">

                                        <h3 className="post-title">Possimus soluta ut id suscipit ea ut. In quo quia et soluta libero sit sint.</h3>

                                        <div className="meta d-flex align-items-center">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-person"></i> <span className="ps-2">Narra Shiva Prasad</span>
                                            </div>
                                            <span className="px-3 text-black-50">/</span>
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-folder2"></i> <span className="ps-2">BPO Services</span>
                                            </div>
                                        </div>

                                        <p>
                                            Aut iste neque ut illum qui perspiciatis similique recusandae non. Fugit autem dolorem labore omnis et. Eum temporibus fugiat voluptate enim tenetur sunt omnis.
                                        </p>

                                        <hr />

                                        <a href="/blog-details/blog3" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right"></i></a>

                                    </div>

                                </article>
                            </div>
                        </div>
                    </div>

                </section>

                {/* <section id="blog-pagination" className="blog-pagination section">

                    <div className="container">
                        <div className="d-flex justify-content-center">
                            <ul>
                                <li><a href="#"><i className="bi bi-chevron-left"></i></a></li>
                                <li><a href="#">1</a></li>
                                <li><a href="#" className="active">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li>...</li>
                                <li><a href="#">10</a></li>
                                <li><a href="#"><i className="bi bi-chevron-right"></i></a></li>
                            </ul>
                        </div>
                    </div>

                </section> */}

            </main>
        </div>
    )
}

export default Blog