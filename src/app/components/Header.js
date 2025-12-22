// "use client"

// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const Header = () => {
//     const pathname = usePathname();

//     // Function to check if the current route matches the href
//     const isActive = (href) => pathname === href;

//     return (
//         <div>
//             <header id="header" className="header d-flex align-items-center sticky-top">
//                 <div className="container position-relative d-flex align-items-center">

//                     {/* Logo */}
//                     <Link href="/" className="logo d-flex align-items-center me-auto">
//                         <h1 className="sitename">GKELITE</h1>
//                     </Link>

//                     {/* Navigation Menu */}
//                     <nav id="navmenu" className="navmenu">
//                         <ul>
//                             <li>
//                                 <Link href="/" className={isActive("/") ? "active" : ""}>Home</Link>
//                             </li>
//                             <li>
//                                 <Link href="/about" className={isActive("/about") ? "active" : ""}>About</Link>
//                             </li>
//                             <li>
//                                 <Link href="/services" className={isActive("/services") ? "active" : ""}>Services</Link>
//                             </li>
//                             <li>
//                                 <Link href="/blog" className={isActive("/blog") ? "active" : ""}>Blog</Link>
//                             </li>
//                             <li>
//                                 <Link href="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
//                             </li>
//                         </ul>
//                         <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
//                     </nav>

//                     {/* Social Links */}
//                     <div className="header-social-links">
//                         <a href="#" className="twitter" target="_blank"><i className="bi bi-twitter-x"></i></a>
//                         <a href="#" className="facebook" target="_blank"><i className="bi bi-facebook"></i></a>
//                         <a href="#" className="instagram" target="_blank"><i className="bi bi-instagram"></i></a>
//                         <a href="#" className="linkedin" target="_blank"><i className="bi bi-linkedin"></i></a>
//                     </div>
//                 </div>
//             </header>
//         </div>
//     );
// };

// export default Header;


"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


const Header = () => {
    const router = useRouter();

    const pathname = usePathname();
    const [isSticky, setIsSticky] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/v1/gkelite/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                setIsLoggedIn(true);
                setUsername('');
                setPassword('');
                router.push('/about');
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.log("Something went wrong with login.", error);
        }
    };

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");

        if (confirmLogout) {
            try {
                const res = await fetch("http://localhost:3000/api/v1/gkelite/logout", {
                    method: "POST",
                    credentials: "include",
                });
                if (res.ok) {
                    setIsLoggedIn(false);
                    router.push('/');
                    alert("Logged out successfully!");
                } else {
                    alert("Logout failed. Please try again.");
                }
            } catch (error) {
                console.log("Something went wrong with logout.", error);
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href) => pathname === href;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <header
                id="header"
                className={`header d-flex align-items-center ${isSticky ? "sticky-header visible" : ""
                    }`}
            >
                <div className="container position-relative d-flex align-items-center">
                    <div className="w-100 d-flex align-items-center cursor-pointer" onClick={scrollToTop}>
                        {/* <h1 className="sitename_1 cursor-pointer fw-bold">GKELITE</h1> */}
                        <img src="/gkLogo.png" alt="gkLogo.png" style={{ width: "10%" }} />

                    </div>

                    <nav id="navmenu" className="navmenu">
                        <ul className="pt-2">
                            <li>
                                <Link href="/" className={isActive("/") ? "active" : ""}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className={isActive("/about") ? "active" : ""}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className={isActive("/services") ? "active" : ""}
                                >
                                    Services
                                </Link>
                            </li>
                            {/* <li>
                                <Link href="/blog" className={isActive("/blog") ? "active" : ""}>
                                    Blog
                                </Link>
                            </li> */}
                            <li>
                                <Link
                                    href="/contact"
                                    className={isActive("/contact") ? "active" : ""}
                                >
                                    Contact
                                </Link>
                            </li>
                            {/* <li className="px-3">
                                {isLoggedIn ? (
                                    <button
                                        className="d-block btn btn-primary d-lg-none"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <button
                                        className="d-block btn btn-primary d-lg-none"
                                        data-bs-toggle="modal"
                                        data-bs-target="#loginModal"
                                    >
                                        Login
                                    </button>
                                )}
                            </li> */}
                            <li>
                                <Link
                                    href="/review"
                                    className={isActive("/review") ? "active" : ""}
                                >
                                    Review
                                </Link>
                            </li>
                        </ul>
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"
                        ></i>
                    </nav>

                    {/* {isLoggedIn ? (
                        <button
                            className="btn btn-primary d-none d-lg-block"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary d-none d-lg-block"
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal"
                        >
                            Login
                        </button>
                    )} */}
                </div>
            </header>

            <div
                className="modal fade"
                id="loginModal"
                tabIndex="-1"
                aria-labelledby="loginModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">
                                Login
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleLogin();
                                }}
                            >
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Header;