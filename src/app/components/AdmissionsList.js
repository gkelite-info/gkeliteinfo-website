'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Sqids from 'sqids';
import { supabase } from '../../utils/supabase/client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ApplicationSummary from './ApplicationSummary';

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

    const [applicationNumber, setApplicationNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [viewedApplication, setViewedApplication] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const router = useRouter();

    const handlePayViewClick = (app) => {
        setSelectedApp(app);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedApp(null);
        setApplicationNumber('');
        setMobileNumber('');
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let query = supabase.from("lead_applications").select("*");

            if (applicationNumber) {
                const cleanAppNum = applicationNumber.trim();
                const numericId = parseInt(cleanAppNum.replace(/^\D+/g, ''), 10);

                if (!isNaN(numericId)) {
                    query = query.or(`applicationNumber.eq.${cleanAppNum},applicationId.eq.${numericId}`);
                } else {
                    query = query.eq("applicationNumber", cleanAppNum);
                }
            } else if (mobileNumber) {
                const cleanMobile = mobileNumber.trim();
                query = query.eq("contactNo", cleanMobile);
            }

            const { data, error } = await query;

            if (error) throw error;

            if (!data || data.length === 0) {
                toast.error("No matching application found. Please check your details.");
                setLoading(false);
                return;
            }

            const leadData = data[0];

            const { data: qualData, error: qualError } = await supabase
                .from("education_qualifications")
                .select("*")
                .eq("applicationId", leadData.applicationId);

            if (qualError) {
                console.error("Qualifications fetch error:", qualError);
            }

            const { data: payData, error: payError } = await supabase
                .from("lead_payments")
                .select("*")
                .eq("applicationId", leadData.applicationId);

            let paymentStatus = "Pending";
            if (payData && payData.length > 0) {
                // If any payment is success
                const hasSuccess = payData.some(p => p.paymentStatus && p.paymentStatus.toLowerCase() === 'success');
                paymentStatus = hasSuccess ? "Success" : "Pending";
            }

            setViewedApplication({
                lead: leadData,
                qualifications: qualData || [],
                paymentStatus: paymentStatus
            });

            toast.success("Application verified successfully!");
            closeModal();
        } catch (err) {
            console.error(err);
            toast.error("An error occurred during verification.");
        } finally {
            setLoading(false);
        }
    };

    if (viewedApplication) {
        // Guess title based on course
        const appTitle = viewedApplication.lead?.course ? `${viewedApplication.lead.course} Application` : "Application";
        
        return (
            <div className="bg-light" style={{ minHeight: '100vh', padding: '1px 0' }}>
                <ApplicationSummary 
                    lead={viewedApplication.lead}
                    qualifications={viewedApplication.qualifications}
                    title={appTitle}
                    paymentStatus={viewedApplication.paymentStatus}
                    onProceedPay={() => {
                        const appId = viewedApplication.lead.applicationNumber || viewedApplication.lead.applicationId;
                        router.push(`/Payment/${appId}`);
                    }}
                />
            </div>
        );
    }

    const filteredApplications = applications;

    return (
        <main className="main py-5 bg-light" style={{ minHeight: "80vh" }}>
            <div className="container" style={{ maxWidth: "900px" }}>
                <div
                    className="text-white text-center py-3 fw-bold rounded-top"
                    style={{ backgroundColor: "#007bff", fontSize: "20px" }}
                >
                    Applications
                </div>

                {college && collegeNames[college] && (
                    <div className="bg-white border-bottom border-start border-end px-4 py-2 text-secondary fw-semibold">
                        Showing applications for: <span className="text-dark">{collegeNames[college]}</span>
                    </div>
                )}

                <div className="bg-white border border-top-0 p-4 rounded-bottom shadow-sm">
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map((app) => (
                            <div
                                key={app.id}
                                className="border rounded p-3 mb-4"
                                style={{ borderColor: "#e2e8f0" }}
                            >
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
                                            <button
                                                onClick={() => handlePayViewClick(app)}
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
                                            </button>
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

                {/* View Application Modal */}
                {showModal && (
                    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}>
                        <div className="bg-white rounded shadow w-100 m-3" style={{ maxWidth: "500px", border: "1px solid #dee2e6" }}>
                            <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
                                <h5 className="modal-title fw-bold m-0" style={{ color: "#333", fontSize: "18px" }}>View Application</h5>
                                <button type="button" className="btn-close shadow-none" onClick={closeModal} aria-label="Close" style={{ fontSize: "12px" }}></button>
                            </div>
                            <div className="px-4 py-4">
                                <p className="mb-4 text-dark" style={{ fontSize: "14px" }}>Enter Application Number Or Mobile Number</p>
                                <form onSubmit={handleSearchSubmit}>
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <label className="form-label fw-semibold text-secondary mb-1" style={{ fontSize: "13px" }}>Application#</label>
                                            <input type="text" className="form-control shadow-none py-2" placeholder="Application#" value={applicationNumber} onChange={(e) => setApplicationNumber(e.target.value)} disabled={loading} style={{ fontSize: "13.5px" }} />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label fw-semibold text-secondary mb-1" style={{ fontSize: "13px" }}>Mobile Number</label>
                                            <input type="text" className="form-control shadow-none py-2" placeholder="Mobile#" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} disabled={loading} style={{ fontSize: "13.5px" }} />
                                        </div>
                                    </div>
                                    <div className="mt-4 d-flex gap-2">
                                        <button type="button" className="btn btn-secondary w-50 py-2 fw-semibold" onClick={closeModal} style={{ fontSize: "14px" }}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary w-50 py-2 fw-semibold" disabled={loading} style={{ fontSize: "14px", backgroundColor: "#007bff", border: "none" }}>
                                            {loading ? "Searching..." : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default AdmissionsList;
