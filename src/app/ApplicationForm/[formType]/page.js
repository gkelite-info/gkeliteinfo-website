'use client';

import React, { useState, useEffect, use } from 'react';
import { CaretDown } from "@phosphor-icons/react";
import { State, City } from 'country-state-city';
import { toast, Toaster } from 'react-hot-toast';
import { saveLeadApplication, uploadApplicationFile } from '../../../lib/helpers/education/leads';
import { useRouter } from 'next/navigation';
import ApplicationSummary from '../../components/ApplicationSummary';

// Custom Select wrapper with state-based rotation
const CustomSelect = ({ children, className = '', style = {}, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="position-relative">
            <select
                className={`form-select shadow-none ${className}`}
                style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    backgroundImage: 'none',
                    paddingRight: '2rem',
                    ...style
                }}
                onClick={() => !props.disabled && setIsOpen(!isOpen)}
                onBlur={() => setIsOpen(false)}
                onChange={(e) => {
                    setIsOpen(false);
                    if (props.onChange) props.onChange(e);
                }}
                {...props}
            >
                {children}
            </select>
            <CaretDown
                size={20}
                weight="bold"
                className="position-absolute end-0 top-50 translate-middle-y me-2 select-icon text-secondary"
                style={{
                    pointerEvents: 'none',
                    transition: 'transform 0.3s ease',
                    transform: isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%) rotate(0deg)'
                }}
            />
        </div>
    );
};

export default function ApplicationForm({ params }) {
    // Unwrap params using React.use() as required in newer Next.js versions for dynamic APIs
    const { formType } = use(params);

    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedRefNo, setSubmittedRefNo] = useState(null);
    const [submittedEmail, setSubmittedEmail] = useState(null);
    const [submittedData, setSubmittedData] = useState(null);
    const router = useRouter();

    // Form state
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        try {
            fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventType: 'FORM_OPEN',
                    formType: formType,
                    path: window.location.pathname
                })
            });
        } catch (error) {
            console.error("Analytics tracking failed:", error);
        }
    }, [formType]);

    // Handle State change
    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        setSelectedState(stateCode);
        if (stateCode) {
            setCities(City.getCitiesOfState('IN', stateCode));
        } else {
            setCities([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const toastId = toast.loading('Submitting application...');

        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            // 1. Upload Profile Image
            const profileImageFile = formData.get('profileImage');
            let profileImageUrl = '';
            if (profileImageFile && profileImageFile.size > 0) {
                const fileName = `${Date.now()}_${profileImageFile.name}`;
                const uploadRes = await uploadApplicationFile(profileImageFile, 'application-files', `profiles/${fileName}`);
                if (uploadRes.success) {
                    profileImageUrl = uploadRes.url;
                } else {
                    throw new Error("Failed to upload profile image.");
                }
            }

            // 2. Prepare Lead Data
            const leadPayload = {
                applicationFor: data.applicationFor,
                course: data.course,
                firstName: data.firstName,
                lastName: data.lastName,
                fathersName: data.fathersName,
                mothersName: data.mothersName,
                gender: data.gender ? data.gender.toLowerCase() : null,
                dateOfBirth: data.dateOfBirth,
                contactNo: data.contactNo,
                emailId: data.emailId,
                nationality: data.nationality,
                category: data.category,
                aadhaarNumber: data.aadhaarNumber ? data.aadhaarNumber.replace(/\s/g, '') : null,
                postalAddress: data.postalAddress,
                state: data.state,
                city: data.city,
                pinCode: data.pinCode,
                profileImage: profileImageUrl,
                admissionRegistrationFee: 500, // Fixed fee
                is_deleted: false,
            };

            // 3. Handle Educational Qualifications
            const qualifications = [];
            const levels = data.applicationFor === 'PG' ? ['Degree'] : ['IX', 'X'];

            for (const level of levels) {
                const school = formData.get(`school_${level}`);
                if (school) { // Only add if they filled it out
                    let certUrl = '';
                    const certFile = formData.get(`certificate_${level}`);
                    if (certFile && certFile.size > 0) {
                        const certName = `${Date.now()}_${level}_${certFile.name}`;
                        const uploadRes = await uploadApplicationFile(certFile, 'application-files', `certificates/${certName}`);
                        if (uploadRes.success) certUrl = uploadRes.url;
                    }

                    qualifications.push({
                        level: level,
                        schoolOrCollege: school,
                        boardOrUniversity: formData.get(`board_${level}`) || 'N/A',
                        passingYear: formData.get(`year_${level}`),
                        gradeOrPercentage: formData.get(`grade_${level}`),
                        medium: formData.get(`medium_${level}`),
                        certificateUrl: certUrl
                    });
                }
            }

            // 4. Handle Entrance Exam (if provided)
            let entranceExam = null;
            if (data.applicationFor === 'PG') {
                const entranceCertFile = formData.get('entranceCertificate');
                if (entranceCertFile && entranceCertFile.size > 0) {
                    let certUrl = '';
                    const certName = `${Date.now()}_entrance_${entranceCertFile.name}`;
                    const uploadRes = await uploadApplicationFile(entranceCertFile, 'application-files', `entrance/${certName}`);
                    if (uploadRes.success) certUrl = uploadRes.url;

                    entranceExam = {
                        examName: formData.get('entranceExamName') || 'ICET',
                        htNumber: formData.get('entranceHtNumber') || 'N/A',
                        rank: parseInt(formData.get('entranceRank'), 10) || 0,
                        year: formData.get('entranceYear') || new Date().toISOString().split('T')[0],
                        certificateUrl: certUrl
                    };
                }
            }

            // 5. Save everything
            const result = await saveLeadApplication({
                lead: leadPayload,
                qualifications,
                entranceExam
            });

            if (result.success) {
                toast.success('Application submitted successfully!', { id: toastId });

                // Track Form Submit Analytics
                try {
                    fetch('/api/analytics', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            eventType: 'FORM_SUBMIT',
                            formType: formType,
                            applicationId: result.applicationId,
                            path: window.location.pathname
                        })
                    });
                } catch (error) {
                    console.error("Analytics tracking failed:", error);
                }

                // Trigger email notification
                try {
                    const emailRes = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            emailId: leadPayload.emailId,
                            firstName: leadPayload.firstName,
                            lastName: leadPayload.lastName,
                            applicationNumber: result.applicationNumber,
                            course: leadPayload.course,
                            applicationFor: leadPayload.applicationFor
                        })
                    });

                    const emailData = await emailRes.json();
                    if (!emailRes.ok || !emailData.success) {
                        console.error("Email API responded with error:", JSON.stringify(emailData));
                        toast.error(`Application saved, but email failed: ${emailData.error || 'Unknown error'}`, { duration: 5000 });
                    }
                } catch (emailErr) {
                    console.error("Email send network/parsing error:", emailErr);
                    toast.error("Application saved, but failed to reach email service.", { duration: 5000 });
                }

                setSubmittedEmail(leadPayload.emailId);
                setSubmittedRefNo(result.applicationNumber);
                setSubmittedData({ lead: leadPayload, qualifications: qualifications });
                e.target.reset();
            } else {
                throw new Error("Failed to save application to database.");
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message || 'An error occurred during submission.', { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) return null;

    // Determine Title, Courses, and Show Aadhaar based on formType
    let title = "Application Form";
    let applicationFor = "";
    let courses = [];
    let showAadhaar = false;

    if (formType === 'Inter_Form') {
        title = "Intermediate Application";
        applicationFor = "Inter";
        courses = ["CEC", "MEC", "ACE"];
    } else if (formType === 'Degree_BCCA') {
        title = "Degree Application";
        applicationFor = "Degree";
        courses = ["BCom", "BBA"];
        showAadhaar = true;
    } else if (formType === 'Degree_BBCIT') {
        title = "Degree Application";
        applicationFor = "Degree";
        courses = ["BSc"];
        showAadhaar = true;
    } else if (formType === 'PG_MBA') {
        title = "PG (MBA) Application";
        applicationFor = "PG";
        courses = ["MBA"];
        showAadhaar = true;
    }

    if (submittedRefNo && submittedData) {
        const { lead, qualifications } = submittedData;
        return (
            <main className="bg-light py-5" style={{ minHeight: '100vh' }}>
                <ApplicationSummary
                    lead={lead}
                    qualifications={qualifications}
                    title={title}
                    onEdit={() => { setSubmittedRefNo(null); setSubmittedData(null); }}
                    onProceedPay={() => {
                        // Assuming result from save has applicationId or applicationNumber
                        router.push(`/Payment/${submittedRefNo}`);
                    }}
                />
            </main>
        );
    }

    const indianStates = State.getStatesOfCountry('IN');

    // Calculate max date for DOB (13 years ago)
    const today = new Date();
    today.setFullYear(today.getFullYear() - 13);
    const maxDateString = today.toISOString().split('T')[0];

    return (
        <main className="bg-light py-5" style={{ minHeight: '100vh' }}>
            <Toaster position="top-right" />
            <style jsx global>{`
                .form-label {
                    font-size: 14px;
                    margin-bottom: 0.25rem;
                }
                .form-control, .form-select {
                    font-size: 14px;
                }
                .required-asterisk {
                    color: red;
                }
                .section-header {
                    background-color: #f8f9fa;
                    padding: 10px 15px;
                    border: 1px solid #dee2e6;
                    font-size: 14px;
                    text-transform: uppercase;
                    color: #495057;
                }
            `}</style>

            <div className="container bg-white p-0 border rounded shadow-sm" style={{ maxWidth: '900px' }}>
                {/* Header */}
                <div className="text-white text-center py-3 fw-bold rounded-top" style={{ backgroundColor: '#007bff', fontSize: '22px' }}>
                    {title}
                </div>

                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            {/* Application For & Course */}
                            <div className="col-md-6">
                                <label className="form-label">Application For:<span className="required-asterisk">*</span></label>
                                {/* We must pass this value when submitting, so we use a hidden input or ensure disabled fields are omitted and we reconstruct it. We'll use a hidden input for the actual value because disabled inputs aren't in FormData. */}
                                <input type="hidden" name="applicationFor" value={applicationFor} />
                                <CustomSelect required value={applicationFor} disabled>
                                    <option value="">Select</option>
                                    <option value="Inter">Inter</option>
                                    <option value="Degree">Degree</option>
                                    <option value="PG">PG</option>
                                </CustomSelect>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Course:<span className="required-asterisk">*</span></label>
                                <CustomSelect name="course" required>
                                    <option value="">Select</option>
                                    {courses.map(course => (
                                        <option key={course} value={course}>{course}</option>
                                    ))}
                                </CustomSelect>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">First Name:<span className="required-asterisk">*</span></label>
                                <input type="text" name="firstName" className="form-control" required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Last Name:<span className="required-asterisk">*</span></label>
                                <input type="text" name="lastName" className="form-control" required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Father's Name:<span className="required-asterisk">*</span></label>
                                <input type="text" name="fathersName" className="form-control" required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Mother's Name:<span className="required-asterisk">*</span></label>
                                <input type="text" name="mothersName" className="form-control" required />
                            </div>

                            {/* Gender & DOB */}
                            <div className="col-md-6">
                                <label className="form-label">Gender:<span className="required-asterisk">*</span></label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="female" required />
                                        <label className="form-check-label" htmlFor="genderFemale">Female</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="genderMale" value="male" />
                                        <label className="form-check-label" htmlFor="genderMale">Male</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Date of Birth:<span className="required-asterisk">*</span></label>
                                <input type="date" name="dateOfBirth" className="form-control" max={maxDateString} required />
                            </div>

                            {/* Nationality & Category */}
                            <div className="col-md-6">
                                <label className="form-label">Nationality:<span className="required-asterisk">*</span></label>
                                <CustomSelect name="nationality" required>
                                    <option value="">Select Nationality</option>
                                    <option value="Indian">Indian</option>
                                    <option value="NRI">NRI</option>
                                    <option value="Other">Other</option>
                                </CustomSelect>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Category:<span className="required-asterisk">*</span></label>
                                <CustomSelect name="category" required>
                                    <option value="">Select Category</option>
                                    <option value="OC">OC</option>
                                    <option value="BC">BC</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                </CustomSelect>
                            </div>

                            {/* Conditional Aadhaar */}
                            {showAadhaar && (
                                <div className="col-md-12">
                                    <label className="form-label">Aadhaar Number:<span className="required-asterisk">*</span></label>
                                    <input
                                        type="text"
                                        name="aadhaarNumber"
                                        className="form-control"
                                        maxLength="19"
                                        onInput={(e) => {
                                            let val = e.target.value.replace(/\D/g, ''); // keep only digits
                                            val = val.substring(0, 19); // max 19 digits
                                            let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                                            e.target.value = formatted;
                                        }}
                                        required
                                    />
                                </div>
                            )}

                            {/* Postal Address */}
                            <div className="col-12">
                                <label className="form-label">Postal Address:<span className="required-asterisk">*</span></label>
                                <textarea name="postalAddress" className="form-control" rows="2" required></textarea>
                            </div>

                            {/* State & City */}
                            <div className="col-md-6">
                                <label className="form-label">State:<span className="required-asterisk">*</span></label>
                                <CustomSelect name="state" onChange={handleStateChange} value={selectedState} required>
                                    <option value="">Select State</option>
                                    {indianStates.map((state) => (
                                        <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                                    ))}
                                </CustomSelect>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">City:<span className="required-asterisk">*</span></label>
                                <CustomSelect name="city" required disabled={!selectedState}>
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city.name} value={city.name}>{city.name}</option>
                                    ))}
                                </CustomSelect>
                            </div>

                            {/* Pin Code & Contact No */}
                            <div className="col-md-6">
                                <label className="form-label">Pin Code:<span className="required-asterisk">*</span></label>
                                <input type="text" name="pinCode" maxLength={6} className="form-control" required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Contact No:<span className="required-asterisk">*</span></label>
                                <input type="text" name="contactNo" maxLength={10} className="form-control" required />
                            </div>

                            {/* Email & Profile Image */}
                            <div className="col-md-6">
                                <label className="form-label">Email-id:<span className="required-asterisk">*</span></label>
                                <input type="email" name="emailId" className="form-control" required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Profile Image (jpg only):<span className="required-asterisk">*</span></label>
                                <input type="file" name="profileImage" className="form-control" accept=".jpg, .jpeg" required />
                            </div>

                            {/* Admission Registration Fee */}
                            <div className="col-md-6 mb-4">
                                <label className="form-label">Admission Registration Fee:<span className="required-asterisk">*</span></label>
                                <input type="text" className="form-control bg-light" value="500" readOnly />
                            </div>
                        </div>

                        {/* Educational Qualification */}
                        <div className="mt-2 border rounded">
                            <div className="section-header">
                                EDUCATIONAL QUALIFICATION  <span className='required-asterisk'>*</span>
                            </div>
                            <div className="p-3 overflow-auto">
                                <table className="table table-borderless align-middle mb-0" style={{ minWidth: '700px' }}>
                                    {applicationFor === 'PG' ? (
                                        <thead className="bg-light" style={{ fontSize: '13px' }}>
                                            <tr>
                                                <th>Degree<span className="required-asterisk">*</span></th>
                                                <th>College/University<span className="required-asterisk">*</span></th>
                                                <th>Year<span className="required-asterisk">*</span></th>
                                                <th>Percentage / Division<span className="required-asterisk">*</span></th>
                                                <th>Medium<span className="required-asterisk">*</span></th>
                                                <th>Certificate (pdf/jpg)<span className="required-asterisk">*</span></th>
                                            </tr>
                                        </thead>
                                    ) : (
                                        <thead className="bg-light" style={{ fontSize: '13px' }}>
                                            <tr>
                                                <th>Class</th>
                                                <th>School</th>
                                                <th>Board</th>
                                                <th>Year</th>
                                                <th>Grade/Percentage(%)</th>
                                                <th>Medium</th>
                                                <th>Certificate (pdf only)</th>
                                            </tr>
                                        </thead>
                                    )}
                                    <tbody>
                                        {applicationFor === 'PG' ? (
                                            <tr>
                                                <td><input type="text" name="school_Degree" className="form-control form-control-sm" placeholder="e.g. B.Com" required /></td>
                                                <td><input type="text" name="board_Degree" className="form-control form-control-sm" required /></td>
                                                <td><input type="date" name="year_Degree" className="form-control form-control-sm" required /></td>
                                                <td><input type="number" name="grade_Degree" className="form-control form-control-sm" min="0" max="100" step="0.01" onInput={(e) => { if (e.target.value > 100) e.target.value = 100; if (e.target.value < 0) e.target.value = 0; }} required /></td>
                                                <td>
                                                    <CustomSelect name="medium_Degree" className="form-select-sm" style={{ paddingRight: '1.5rem' }} required>
                                                        <option value="">Select Medium</option>
                                                        <option value="Telugu">Telugu</option>
                                                        <option value="English">English</option>
                                                        <option value="Hindi">Hindi</option>
                                                        <option value="Urdu">Urdu</option>
                                                    </CustomSelect>
                                                </td>
                                                <td><input type="file" name="certificate_Degree" className="form-control form-control-sm" accept=".pdf,.jpg,.jpeg" required /></td>
                                            </tr>
                                        ) : (
                                            <>
                                                <tr>
                                                    <td className="fw-bold">X</td>
                                                    <td><input type="text" name="school_X" className="form-control form-control-sm" required /></td>
                                                    <td><input type="text" name="board_X" className="form-control form-control-sm" required /></td>
                                                    <td><input type="date" name="year_X" className="form-control form-control-sm" required /></td>
                                                    <td><input type="number" name="grade_X" className="form-control form-control-sm" min="0" max="100" step="0.01" onInput={(e) => { if (e.target.value > 100) e.target.value = 100; if (e.target.value < 0) e.target.value = 0; }} required /></td>
                                                    <td>
                                                        <CustomSelect name="medium_X" className="form-select-sm" style={{ paddingRight: '1.5rem' }} required>
                                                            <option value="">Select</option>
                                                            <option value="Telugu">Telugu</option>
                                                            <option value="English">English</option>
                                                            <option value="Hindi">Hindi</option>
                                                            <option value="Urdu">Urdu</option>
                                                        </CustomSelect>
                                                    </td>
                                                    <td><input type="file" name="certificate_X" className="form-control form-control-sm" accept=".pdf" required /></td>
                                                </tr>
                                                <tr>
                                                    <td className="fw-bold">IX</td>
                                                    <td><input type="text" name="school_IX" className="form-control form-control-sm" required /></td>
                                                    <td><input type="text" name="board_IX" className="form-control form-control-sm" required /></td>
                                                    <td><input type="date" name="year_IX" className="form-control form-control-sm" required /></td>
                                                    <td><input type="number" name="grade_IX" className="form-control form-control-sm" min="0" max="100" step="0.01" onInput={(e) => { if (e.target.value > 100) e.target.value = 100; if (e.target.value < 0) e.target.value = 0; }} required /></td>
                                                    <td>
                                                        <CustomSelect name="medium_IX" className="form-select-sm" style={{ paddingRight: '1.5rem' }} required>
                                                            <option value="">Select</option>
                                                            <option value="Telugu">Telugu</option>
                                                            <option value="English">English</option>
                                                            <option value="Hindi">Hindi</option>
                                                            <option value="Urdu">Urdu</option>
                                                        </CustomSelect>
                                                    </td>
                                                    <td><input type="file" name="certificate_IX" className="form-control form-control-sm" accept=".pdf" required /></td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Qualifying Entrance Examination - Only for PG */}
                        {applicationFor === 'PG' && (
                            <div className="mt-4 border rounded">
                                <div className="section-header">
                                    QUALIFYING ENTRANCE EXAMINATION
                                </div>
                                <div className="p-3 overflow-auto">
                                    <table className="table table-borderless align-middle mb-0" style={{ minWidth: '700px' }}>
                                        <thead className="bg-light" style={{ fontSize: '13px' }}>
                                            <tr>
                                                <th>Examination<span className="required-asterisk">*</span></th>
                                                <th>HT Number<span className="required-asterisk">*</span></th>
                                                <th>Rank<span className="required-asterisk">*</span></th>
                                                <th>Year<span className="required-asterisk">*</span></th>
                                                <th>Certificate/Rank Card (pdf/jpg)<span className="required-asterisk">*</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="text" name="entranceExamName" className="form-control form-control-sm bg-light" value="ICET" readOnly required /></td>
                                                <td><input type="text" name="entranceHtNumber" className="form-control form-control-sm" required /></td>
                                                <td><input type="number" name="entranceRank" className="form-control form-control-sm" min="1" required /></td>
                                                <td><input type="date" name="entranceYear" className="form-control form-control-sm" required /></td>
                                                <td><input type="file" name="entranceCertificate" className="form-control form-control-sm" accept=".pdf,.jpg,.jpeg" required /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Submit Buttons */}
                        <div className="text-center mt-4 mb-2">
                            <button type="reset" className="btn btn-primary px-4 me-2">Reset</button>
                            <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
