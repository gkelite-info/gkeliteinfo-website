'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti';

const PaymentPage = ({ params }) => {
    const unwrappedParams = use(params);
    const { applicationId } = unwrappedParams;
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('cards');
    const [upiTimer, setUpiTimer] = useState(232);
    const [qrExpired, setQrExpired] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [showCvc, setShowCvc] = useState(false);
    const [cardHolderName, setCardHolderName] = useState('');

    const isFormValid = cardNumber.length === 19 && expiryDate.length === 5 && cvc.length >= 3 && cardHolderName.trim().length > 0;

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formatted);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        setExpiryDate(value);
    };

    const handleCvcChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        setCvc(value);
    };

    const [orderId] = useState(() => `${Math.floor(Math.random() * 100000000)}${applicationId}`);
    const amount = 500;

    useEffect(() => {
        let interval;
        if (activeTab === 'upi' && !qrExpired && upiTimer > 0) {
            interval = setInterval(() => {
                setUpiTimer((prev) => {
                    if (prev <= 1) {
                        setQrExpired(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [activeTab, qrExpired, upiTimer]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleShowQR = () => {
        setQrExpired(false);
        setUpiTimer(232);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsLoading(true);
        const expParts = expiryDate.split('/');

        try {
            const response = await fetch('/api/payment/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardNumber: cardNumber.replace(/\s/g, ''),
                    expMonth: parseInt(expParts[0], 10),
                    expYear: parseInt('20' + expParts[1], 10),
                    cvc: cvc,
                    cardHolderName: cardHolderName,
                    amount: amount,
                    applicationId: applicationId
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success('Payment successful!');
                setIsSuccess(true);
            } else {
                toast.error(data.error || 'Payment failed.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred during payment.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center bg-light" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
                <Confetti recycle={false} numberOfPieces={800} gravity={0.15} />
                <div className="bg-white rounded shadow-lg p-5 text-center" style={{ maxWidth: '500px', zIndex: 10 }}>
                    <div className="mb-4">
                        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '80px' }}></i>
                    </div>
                    <h2 className="fw-bold mb-3" style={{ color: '#1a1f36' }}>Cheers! Payment Successful</h2>
                    <p className="text-secondary mb-4" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                        Your payment of <strong className="text-dark">₹{amount}</strong> has been successfully processed and recorded. Thank you for your application!
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="btn btn-primary fw-bold px-5 py-3 mt-2"
                        style={{ borderRadius: '50px', backgroundColor: '#007bff', border: 'none', transition: 'all 0.3s' }}
                    >
                        <i className="bi bi-house-door-fill me-2"></i> Return to Home
                    </button>
                </div>
            </div>
        );
    }

    const topBanks = [
        { id: 1, name: 'Axis Bank [Retail]', logo: 'https://logo.clearbit.com/axisbank.com' },
        { id: 2, name: 'HDFC Bank [Retail]', logo: 'https://logo.clearbit.com/hdfcbank.com' },
        { id: 3, name: 'ICICI Bank [Retail]', logo: 'https://logo.clearbit.com/icicibank.com' },
        { id: 4, name: 'Kotak Bank', logo: 'https://logo.clearbit.com/kotak.com' },
        { id: 5, name: 'State Bank of India', logo: 'https://logo.clearbit.com/onlinesbi.sbi' }
    ];

    const otherBanks = [
        'Airtel Payments Bank',
        'Andhra Pragathi Grameena Bank',
        'AU Small Finance Bank'
    ];

    return (
        <main className="bg-light" style={{ minHeight: '100vh', padding: '40px 15px' }}>
            <Toaster position="top-right" />

            <div className="container" style={{ maxWidth: '1000px' }}>
                <div className="bg-white rounded p-3 mb-4 d-flex justify-content-between align-items-center shadow-sm">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-light border rounded px-2 py-1 fw-bold text-secondary">
                            SS
                        </div>
                        <h6 className="m-0 fw-bold" style={{ color: '#1a1f36', fontSize: '15px' }}>
                            Seth Ghasiram Gopikishan Badruka Educational Soceity
                        </h6>
                    </div>
                    <button onClick={() => router.back()} className="btn btn-light rounded-circle shadow-none" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="bg-white rounded shadow-sm overflow-hidden d-flex flex-column" style={{ minHeight: '500px' }}>
                            <div className="p-4 border-bottom">
                                <h5 className="fw-bold m-0" style={{ color: '#1a1f36' }}>Payment Methods</h5>
                            </div>

                            <div className="d-flex flex-grow-1">
                                <div className="border-end" style={{ width: '250px', backgroundColor: '#fcfdfd' }}>
                                    <div
                                        onClick={() => setActiveTab('cards')}
                                        className="p-3 border-bottom d-flex align-items-center gap-3 cursor-pointer"
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: activeTab === 'cards' ? '#fff' : 'transparent',
                                            borderLeft: activeTab === 'cards' ? '4px solid #ff5722' : '4px solid transparent',
                                            color: activeTab === 'cards' ? '#1a1f36' : '#5469d4',
                                            fontWeight: activeTab === 'cards' ? '600' : '500',
                                        }}
                                    >
                                        <i className="bi bi-credit-card"></i>
                                        <span style={{ fontSize: '14px' }}>Credit / Debit Cards</span>
                                    </div>
                                    <div
                                        className="p-3 border-bottom d-flex align-items-center gap-3"
                                        style={{
                                            opacity: 0.6,
                                            backgroundColor: 'transparent',
                                            borderLeft: '4px solid transparent',
                                            color: '#5469d4',
                                            fontWeight: '500',
                                        }}
                                    >
                                        <i className="bi bi-bank"></i>
                                        <span style={{ fontSize: '14px' }}>Net Banking</span>
                                    </div>
                                    <div
                                        className="p-3 border-bottom d-flex align-items-center gap-3"
                                        style={{
                                            opacity: 0.6,
                                            backgroundColor: 'transparent',
                                            borderLeft: '4px solid transparent',
                                            color: '#5469d4',
                                            fontWeight: '500',
                                        }}
                                    >
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" style={{ height: '16px', filter: 'grayscale(100%)' }} />
                                    </div>
                                    <div className="p-3 text-secondary d-flex align-items-center gap-3" style={{ opacity: 0.6 }}>
                                        <i className="bi bi-wallet2"></i>
                                        <span style={{ fontSize: '14px' }}>Wallets</span>
                                    </div>
                                </div>

                                <div className="p-4 flex-grow-1" style={{ backgroundColor: '#fff' }}>

                                    {activeTab === 'cards' && (
                                        <form onSubmit={handlePaymentSubmit}>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <span style={{ fontSize: '13px', color: '#5469d4', fontWeight: '500' }}>Card details</span>
                                                <div className="d-flex gap-2">
                                                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" style={{ height: '24px', objectFit: 'contain' }} />
                                                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" style={{ height: '24px', objectFit: 'contain' }} />
                                                    <img src="https://img.icons8.com/color/48/000000/rupay.png" alt="Rupay" style={{ height: '24px', objectFit: 'contain' }} />
                                                </div>
                                            </div>

                                            <div className="border rounded mb-4 shadow-sm" style={{ borderColor: '#e2e8f0' }}>
                                                <input type="text" className="form-control border-0 border-bottom shadow-none p-3" placeholder="Card number" required value={cardNumber} onChange={handleCardNumberChange} />
                                                <div className="d-flex">
                                                    <input type="text" className="form-control border-0 border-end shadow-none p-3" placeholder="Expiration date (MM/YY)" style={{ width: '50%' }} required value={expiryDate} onChange={handleExpiryChange} />
                                                    <div className="position-relative" style={{ width: '50%' }}>
                                                        <input type={showCvc ? "text" : "password"} className="form-control border-0 shadow-none p-3 pe-5" placeholder="Security code" required value={cvc} onChange={handleCvcChange} />
                                                        <i className={`bi ${showCvc ? "bi-eye-slash" : "bi-eye"} position-absolute text-muted`} style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '18px' }} onClick={() => setShowCvc(!showCvc)}></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label style={{ fontSize: '13px', color: '#5469d4', fontWeight: '500', marginBottom: '10px' }}>Card holder name</label>
                                                <input type="text" className="form-control shadow-none p-3 border rounded" placeholder="Full name on card" required value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} />
                                            </div>

                                            <button type="submit" className="btn w-100 fw-bold" disabled={!isFormValid || isLoading} style={{ backgroundColor: isFormValid ? '#28a745' : '#e2e8f0', color: isFormValid ? '#ffffff' : '#8792a2', padding: '12px', transition: 'all 0.3s' }}>
                                                {isLoading ? 'Processing...' : `Pay ₹${amount}`}
                                            </button>
                                        </form>
                                    )}

                                    {activeTab === 'netbanking' && (
                                        <div>
                                            <div className="position-relative mb-4">
                                                <i className="bi bi-search position-absolute" style={{ top: '12px', left: '15px', color: '#8792a2' }}></i>
                                                <input type="text" className="form-control shadow-none border rounded" placeholder="Search by bank name" style={{ padding: '10px 15px 10px 40px' }} />
                                            </div>

                                            <div className="mb-4">
                                                <span style={{ fontSize: '12px', color: '#8792a2' }}>Top banks</span>
                                                <div className="row g-2 mt-2">
                                                    {topBanks.map(bank => (
                                                        <div key={bank.id} className="col-4">
                                                            <div className="border rounded p-3 text-center cursor-pointer hover-shadow" style={{ height: '90px', cursor: 'pointer' }} onClick={handlePaymentSubmit}>
                                                                <img src={bank.logo} alt={bank.name} style={{ height: '20px', objectFit: 'contain', marginBottom: '10px' }} onError={(e) => { e.target.style.display = 'none' }} />
                                                                <div style={{ fontSize: '11px', lineHeight: '1.2' }}>{bank.name}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <span style={{ fontSize: '12px', color: '#8792a2' }}>All other banks</span>
                                                <div className="mt-2 border rounded">
                                                    {otherBanks.map((bank, index) => (
                                                        <div key={index} className={`d-flex justify-content-between align-items-center p-3 cursor-pointer hover-bg ${index !== otherBanks.length - 1 ? 'border-bottom' : ''}`} style={{ cursor: 'pointer' }} onClick={handlePaymentSubmit}>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                                                                    <i className="bi bi-bank" style={{ color: '#ff5722' }}></i>
                                                                </div>
                                                                <span style={{ fontSize: '14px', color: '#5469d4' }}>{bank}</span>
                                                            </div>
                                                            <i className="bi bi-chevron-right text-secondary"></i>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'upi' && (
                                        <div className="d-flex justify-content-center align-items-center h-100">
                                            <div className="border rounded p-4 d-flex gap-4 shadow-sm" style={{ maxWidth: '400px' }}>

                                                <div className="position-relative" style={{ width: '120px', height: '120px' }}>
                                                    {!qrExpired ? (
                                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=test@okbizaxis" alt="QR Code" className="img-fluid" />
                                                    ) : (
                                                        <div className="w-100 h-100 bg-secondary rounded d-flex align-items-center justify-content-center" style={{ opacity: 0.8 }}>
                                                            <button onClick={handleShowQR} className="btn btn-light shadow-sm fw-bold px-3 py-2" style={{ fontSize: '13px' }}>
                                                                Show QR
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6 className="fw-bold m-0" style={{ color: '#1a1f36', fontSize: '16px' }}>Scan the QR code</h6>
                                                    <p className="text-secondary m-0 mt-1 mb-3" style={{ fontSize: '13px', lineHeight: '1.4' }}>
                                                        using your UPI app to make the payment
                                                    </p>

                                                    {!qrExpired && (
                                                        <div className="fw-bold mb-3" style={{ fontSize: '13px', color: '#1a1f36' }}>
                                                            Code expires in <span style={{ color: '#00a15d' }}>{formatTime(upiTimer)}</span>
                                                        </div>
                                                    )}

                                                    <div className="d-flex gap-2">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" style={{ height: '14px' }} />
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" style={{ height: '14px' }} />
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" style={{ height: '14px' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="bg-white rounded shadow-sm p-4">
                            <div className="d-flex align-items-center gap-2 border-bottom pb-3 mb-3">
                                <i className="bi bi-receipt text-secondary"></i>
                                <span className="fw-bold" style={{ color: '#5469d4', fontSize: '14px' }}>Summary</span>
                            </div>

                            <div className="d-flex justify-content-between mb-4">
                                <span className="text-secondary" style={{ fontSize: '13px' }}>Order ID</span>
                                <span className="fw-bold" style={{ fontSize: '13px', color: '#1a1f36' }}>{orderId}</span>
                            </div>

                            <div className="d-flex justify-content-between border-top pt-3 mb-4">
                                <span className="fw-bold" style={{ color: '#5469d4', fontSize: '15px' }}>Total Amount</span>
                                <span className="fw-bold" style={{ color: '#1a1f36', fontSize: '15px' }}>₹{amount}</span>
                            </div>

                            <div className="d-flex justify-content-center mt-5">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Billdesk_logo.png" alt="BillDesk" style={{ height: '24px' }} onError={(e) => { e.target.style.display = 'none' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PaymentPage;
