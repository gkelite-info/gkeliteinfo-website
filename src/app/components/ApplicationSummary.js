'use client';

import React from 'react';

const ApplicationSummary = ({ lead, qualifications, title, paymentStatus, onEdit, onProceedPay }) => {
    if (!lead) return null;

    return (
        <div className="container p-0 mb-5 mt-4" style={{ maxWidth: '1000px' }}>
            {/* Top success banner */}
            <div className="alert alert-success text-center mb-3" style={{ backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '4px' }}>
                Successfully Application submitted..
            </div>
            
            <div className="bg-white border rounded shadow-sm">
                {/* Blue Header */}
                <div className="text-white text-center py-3 fw-bold rounded-top" style={{ backgroundColor: paymentStatus === 'Success' ? '#28a745' : '#007bff', fontSize: '22px' }}>
                    {title || "Application"} {paymentStatus === 'Success' ? 'Successful' : 'Pending'}
                </div>

                <div className="row g-0 p-4">
                    {/* Left Column (Profile) */}
                    <div className="col-md-3 border-end text-center pe-4">
                        <img src={lead.profileImage || '/placeholder-user.jpg'} alt="Profile" className="img-fluid rounded mb-3" style={{ maxWidth: '150px', border: '1px solid #ddd' }} />
                        <h6 className="fw-bold mb-1">{lead.firstName} {lead.lastName}</h6>
                        <p className="text-muted small text-break">{lead.emailId}</p>
                    </div>

                    {/* Middle Column (Personal Details) */}
                    <div className="col-md-5 border-end px-4">
                        <h5 className="fw-bold mb-3">Personal Details</h5>
                        <div className="row mb-2">
                            <div className="col-6"><small className="text-muted fw-bold">Course</small><br /><span>{lead.course}</span></div>
                            <div className="col-6"></div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-6"><small className="text-muted fw-bold">First Name</small><br /><span>{lead.firstName}</span></div>
                            <div className="col-6"><small className="text-muted fw-bold">Last Name</small><br /><span>{lead.lastName}</span></div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-6"><small className="text-muted fw-bold">Father Name</small><br /><span>{lead.fathersName}</span></div>
                            <div className="col-6"><small className="text-muted fw-bold">Mother Name</small><br /><span>{lead.mothersName}</span></div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-6"><small className="text-muted fw-bold">Gender</small><br /><span className="text-capitalize">{lead.gender}</span></div>
                            <div className="col-6"><small className="text-muted fw-bold">Date of Birth</small><br /><span>{lead.dateOfBirth}</span></div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6"><small className="text-muted fw-bold">Nationality</small><br /><span>{lead.nationality}</span></div>
                            <div className="col-6"><small className="text-muted fw-bold">Caste</small><br /><span>{lead.category}</span></div>
                        </div>

                        <h5 className="fw-bold mb-3 mt-4">Payment Details</h5>
                        <div className="row mb-2">
                            <div className="col-6"><small className="text-muted fw-bold">Fees</small><br /><span>{lead.admissionRegistrationFee}</span></div>
                            <div className="col-6"><small className="text-muted fw-bold">Payment Status</small><br /><span className={paymentStatus === 'Success' ? 'text-success fw-bold' : ''}>{paymentStatus || 'Not Paid'}</span></div>
                        </div>
                    </div>

                    {/* Right Column (Contact Details) */}
                    <div className="col-md-4 ps-4">
                        <h5 className="fw-bold mb-3">Contact Details</h5>
                        <div className="mb-2"><small className="text-muted fw-bold">Email ID</small><br /><span className="text-break">{lead.emailId}</span></div>
                        <div className="mb-2"><small className="text-muted fw-bold">Mobile Number</small><br /><span>{lead.contactNo}</span></div>
                        <div className="mb-2"><small className="text-muted fw-bold">Postal Address</small><br /><span>{lead.postalAddress}</span></div>
                        <div className="mb-2"><small className="text-muted fw-bold">City</small><br /><span>{lead.city}</span></div>
                        <div className="mb-2"><small className="text-muted fw-bold">State</small><br /><span>{lead.state}</span></div>
                        <div className="mb-2"><small className="text-muted fw-bold">Postcode</small><br /><span>{lead.pinCode}</span></div>
                    </div>
                </div>

                {/* Education Details */}
                <div className="p-4 pt-0">
                    <h5 className="fw-bold mb-3">Education Details</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped" style={{ fontSize: '14px' }}>
                            <thead className="bg-light">
                                <tr>
                                    <th>Class</th>
                                    <th>School</th>
                                    <th>Board</th>
                                    <th>Year</th>
                                    <th>Grade/Percentage(%)</th>
                                    <th>Medium</th>
                                    <th>Certificate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {qualifications && qualifications.map((q, idx) => (
                                    <tr key={idx}>
                                        <td className="fw-bold">{q.level}</td>
                                        <td>{q.schoolOrCollege}</td>
                                        <td>{q.boardOrUniversity}</td>
                                        <td>{q.passingYear}</td>
                                        <td>{q.gradeOrPercentage}(%)</td>
                                        <td>{q.medium}</td>
                                        <td>
                                            {q.certificateUrl ? (
                                                <a href={q.certificateUrl} target="_blank" rel="noreferrer" className="text-primary text-decoration-none">
                                                    {q.certificateUrl.split('/').pop()}
                                                </a>
                                            ) : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="d-flex justify-content-center gap-2 p-4 border-top bg-white rounded-bottom">
                    {onEdit && (
                        <button className="btn btn-success px-4 text-white" style={{ backgroundColor: '#28a745', border: 'none' }} onClick={onEdit}>
                            Edit
                        </button>
                    )}
                    <button className="btn btn-success px-4 text-white" style={{ backgroundColor: '#28a745', border: 'none' }} onClick={onProceedPay}>
                        Proceed to Online Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationSummary;
