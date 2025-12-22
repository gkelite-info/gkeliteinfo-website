'use client'
import toast from "react-hot-toast";
import AOSWrapper from "../components/aosWrapper";
import { useState } from "react";
import { createReview } from "../api/supabase/reviewAPI"; 

const Review = () => {

    const [name, setName] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [designation, setDesignation] = useState("");
    const [rating, setRating] = useState(0);
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);


    const allowOnlyAlphabets = (value) => {
        return value.replace(/[^a-zA-Z\s]/g, "");
    }

    const handleSubmit = async () => {

        if (!name) {
            toast.error("Name is required");
            return
        }

        if (!designation) {
            toast.error("Designation is required");
            return
        }

        if (rating < 1 || rating > 5) {
            toast.error("Please select a valid rating");
            return;
        }

        if (!note) {
            toast.error("Note is required");
            return
        }

        try {
            setLoading(true);

            await createReview({
                fullname: name,
                organizationName,
                designation,
                starRating: rating,
                note
            });

            toast.success("Thank you for your review!");

            setName("");
            setOrganizationName("");
            setDesignation("");
            setRating(0);
            setNote("");
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            return
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <>
            <AOSWrapper>
                <div>
                    <main>
                        <div className="page-title accent-background">
                            <div className="container d-lg-flex justify-content-between align-items-center">
                                <h1 className="mb-2 mb-lg-0">Review</h1>
                            </div>
                        </div>
                        <section
                            id="contact"
                            className="contact section p-4"
                            style={{ backgroundColor: "#f2f2f2" }}
                        >
                            <div className="mb-4 ps-lg-5">
                                <h4 className="text-black fw-semibold">
                                    Share Your Experience With Us
                                </h4>
                                <p className="text-muted mb-0">
                                    We’d Love To Hear How Our Services Helped Your Business Grow!
                                </p>
                            </div>

                            <div className="container">
                                <div className="row g-4">
                                    <div className="col-12 col-lg-6">
                                        <div className="bg-white p-4 rounded shadow-sm h-100">
                                            <h6 className="mb-2 fw-semibold text-black">Name</h6>
                                            <input
                                                type="text"
                                                value={name}
                                                placeholder="Enter your fullname"
                                                className="form-control mb-4 no-focus-outline"
                                                onChange={(e) => setName(allowOnlyAlphabets(e.target.value))}
                                            />
                                            <h6 className="mb-2 fw-semibold text-black">
                                                Organization Name <span className="text-muted">(Optional)</span>
                                            </h6>
                                            <input
                                                type="text"
                                                value={organizationName}
                                                placeholder="Company or organization name"
                                                className="form-control mb-4 no-focus-outline"
                                                onChange={(e) => setOrganizationName(allowOnlyAlphabets(e.target.value))}
                                            />
                                            <h6 className="mb-2 fw-semibold text-black">Designation</h6>
                                            <input
                                                type="text"
                                                value={designation}
                                                placeholder="Your role or position"
                                                className="form-control mb-4 no-focus-outline"
                                                onChange={(e) => setDesignation(allowOnlyAlphabets(e.target.value))}
                                            />
                                            <h6 className="mb-2 fw-semibold text-black">Rating</h6>
                                            <div className="border rounded p-3 d-flex justify-content-center gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        className={`fs-4 cursor-pointer ${star <= rating ? "text-warning" : "text-secondary"
                                                            }`}
                                                        onClick={() => setRating(star)}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="mt-2 text-muted small">
                                                Selected Rating: {rating || "None"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="bg-white p-4 rounded shadow-sm h-100 d-flex flex-column">
                                            <h6 className="mb-2 fw-semibold text-black">Note</h6>
                                            <textarea
                                                value={note}
                                                placeholder="Write few lines about your experience with us....."
                                                className="form-control flex-grow-1 mb-4 no-focus-outline"
                                                rows={8}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleSubmit();
                                                    }
                                                }}
                                                onChange={(e) => setNote(e.target.value)}
                                            />
                                            <button className="btn btn-success w-100 py-3 fw-semibold"
                                                onClick={handleSubmit}
                                                disabled={loading}
                                            >
                                                {loading ? "Submitting..." : "Submit"}
                                            </button>
                                        </div>
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
export default Review;