'use client'

import React from 'react';
import Link from 'next/link';
import Sqids from 'sqids';

const sqids = new Sqids();

const AdmissionsList = ({ college }) => {
    const collegeNames = {
        bcca: "Badruka College of Commerce and Arts (BCCA)",
        bbcit: "Bankatlal Badruka College for Information Technology (BBCIT)",
        bcpgc: "Badruka College Post Graduate Centre (BCPGC)",
        bjcg: "Badruka Junior College for Girls (BJCG)",
        bbsmd: "Bansilal Badruka School of Music and Dance (BBSMD)"
    };

    const currentCollege = collegeNames[college] || "All Colleges";

    const applications = [
        {
            id: "bjcg",
            college: "bjcg",
            status: "Open",
            title: "Inter (BJCG) Application - (2026 - 2027) CEC / MEC / ACE",
            dateText: "Start Date: 12-03-2026 13:49",
            details: "We will get back to you after the evaluation and verification of the furnished details.",
            helpdesk: "If there are any technical issues, kindly send the screenshot to the email id : helpdesk@badruka.com.",
            applyUrl: `/ApplicationForm/Inter_Form/?appid=${sqids.encode([101])}`,
            payUrl: "https://www.tektoncampus.com/bjcg/pay"
        },
        {
            id: "bcca-degree",
            college: "bcca",
            status: "Open",
            title: "Degree (BCCA) Application - (2026 - 2027) BCom / BBA",
            dateText: "Start Date: 12-03-2026 13:49",
            details: "We will get back to you after the evaluation and verification of the furnished details.",
            helpdesk: "If there are any technical issues, kindly send the screenshot to the email id : helpdesk@badruka.com.",
            applyUrl: `/ApplicationForm/Degree_BCCA/?appid=${sqids.encode([102])}`,
            payUrl: "https://www.tektoncampus.com/bcca/pay"
        },
        {
            id: "bbcit-degree",
            college: "bbcit",
            status: "Open",
            title: "Degree (BBCIT) Application - (2026 -2027) BSc",
            dateText: "Start Date: 12-03-2026 13:49",
            details: "We will get back to you after the evaluation and verification of the furnished details.",
            helpdesk: "If there are any technical issues, kindly send the screenshot to the email id : helpdesk@badruka.com.",
            applyUrl: `/ApplicationForm/Degree_BBCIT/?appid=${sqids.encode([103])}`,
            payUrl: "https://www.tektoncampus.com/bbcit/pay"
        },
        {
            id: "bcpgc-pg",
            college: "bcpgc",
            status: "Open",
            title: "PG (BCPGC) Application - (2026 - 2027) MBA",
            dateText: "Start Date: 15-06-2026 10:23",
            details: "We will get back to you after the evaluation and verification of the furnished details.",
            helpdesk: "If there are any technical issues, kindly send the screenshot to the email id : helpdesk@badruka.com.",
            applyUrl: `/ApplicationForm/PG_MBA/?appid=${sqids.encode([104])}`,
            payUrl: "https://www.tektoncampus.com/bcpgc/pay"
        }
    ];

    // Optionally filter or highlight current college applications at the top
    const filteredApplications = college && college !== 'all'
        ? applications.filter(app => app.college === college)
        : applications;

    return (
        <main className="main py-5 bg-light" style={{ minHeight: "80vh" }}>
            <div className="container" style={{ maxWidth: "900px" }}>
                {/* Title Header matching Image 1 */}
                <div
                    className="text-white text-center py-3 fw-bold rounded-top"
                    style={{ backgroundColor: "#007bff", fontSize: "20px" }}
                >
                    Applications 1
                </div>

                {/* Subtitle for the specific college */}
                {college && collegeNames[college] && (
                    <div className="bg-white border-bottom border-start border-end px-4 py-2 text-secondary fw-semibold">
                        Showing applications for: <span className="text-dark">{collegeNames[college]}</span>
                    </div>
                )}

                {/* List Container */}
                <div className="bg-white border border-top-0 p-4 rounded-bottom shadow-sm">
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map((app) => (
                            <div
                                key={app.id}
                                className="border rounded p-3 mb-4"
                                style={{ borderColor: "#e2e8f0" }}
                            >
                                {/* Header Row */}
                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center border-bottom pb-2 mb-3">
                                    <div className="d-flex align-items-center flex-wrap gap-2">
                                        <span
                                            className={`badge px-2 py-1 text-uppercase fw-semibold`}
                                            style={{
                                                backgroundColor: app.status === "Open" ? "#28a745" : "#dc3545",
                                                fontSize: "12px",
                                                borderRadius: "4px"
                                            }}
                                        >
                                            {app.status}
                                        </span>
                                        <span className="fw-bold text-dark" style={{ fontSize: "15px" }}>
                                            {app.title}
                                        </span>
                                    </div>
                                    <div className="text-secondary mt-1 mt-sm-0" style={{ fontSize: "13px" }}>
                                        {app.dateText}
                                    </div>
                                </div>

                                {/* Body Row */}
                                <div className="row g-3">
                                    <div className="col-12 col-md-4 d-flex gap-2 align-items-start">
                                        <a
                                            href={app.applyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary text-white px-3 py-1-5 fw-semibold"
                                            style={{
                                                fontSize: "14px",
                                                borderRadius: "4px",
                                                backgroundColor: "#007bff",
                                                border: "none",
                                                color: "#ffffff"
                                            }}
                                        >
                                            Apply Now
                                        </a>
                                        {app.status === "Open" && app.payUrl && (
                                            <a
                                                href={app.payUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary text-white px-3 py-1-5 fw-semibold"
                                                style={{
                                                    fontSize: "14px",
                                                    borderRadius: "4px",
                                                    backgroundColor: "#007bff",
                                                    border: "none",
                                                    color: "#ffffff"
                                                }}
                                            >
                                                Pay / View
                                            </a>
                                        )}
                                    </div>
                                    <div className="col-12 col-md-8 d-flex flex-column gap-1 text-secondary" style={{ fontSize: "12.5px", lineHeight: "1.4" }}>
                                        <div>{app.details}</div>
                                        {app.status === "Open" && app.helpdesk && (
                                            <div className="fw-semibold text-dark mt-1">
                                                {app.helpdesk}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5 text-secondary">
                            <i className="bi bi-info-circle fs-2"></i>
                            <p className="mt-2">No applications currently available for this college.</p>
                            <Link href="/" className="btn btn-outline-primary mt-3 btn-sm">
                                Return Home
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AdmissionsList;
