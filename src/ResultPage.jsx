import React, { useEffect, useState } from 'react';

const ResultPage = () => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Fetch form data from localStorage
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }
    }, []);

    return (
        <div className="container">
            <h2>Registration Details</h2>
            <div>
                <strong>Name:</strong> {formData.name}<br />
                <strong>Father's Name:</strong> {formData.fatherName}<br />
                <strong>Date of Birth:</strong> {formData.dob}<br />
                <strong>Age:</strong> {formData.age}<br />
                <strong>Mobile Number:</strong> {formData.mobile}<br />
                <strong>Gender:</strong> {formData.gender}<br />
                <strong>Aadhaar Number:</strong> {formData.aadhaar}<br />
                <strong>Smart Card Number:</strong> {formData.smartCard}<br />
                <strong>PAN Card Number:</strong> {formData.panCard}<br />
                <strong>Address:</strong> {formData.address}<br />
                <strong>Pincode:</strong> {formData.pincode}<br />

                <h3>Bank Details</h3>
                {formData.bankDetails.map((bank, index) => (
                    <div key={index}>
                        <strong>Bank Name:</strong> {bank.bankName}<br />
                        <strong>Account Type:</strong> {bank.accountType}<br />
                        <strong>Bank Branch:</strong> {bank.branch}<br />
                        <strong>IFSC Code:</strong> {bank.ifsc}<br />
                        <strong>Account Number:</strong> {bank.accountNumber}<br />
                    </div>
                ))}

                <h3>Other Details</h3>
                <strong>Annual Income:</strong> {formData.annualIncome}<br />
                <strong>Family Members:</strong> {formData.familyMembers}<br />
                <strong>Insurance:</strong> {formData.insurance}<br />
                {formData.insurance === 'yes' && (
                    <div>
                        <strong>Insurance Type:</strong> {formData.insuranceType}<br />
                        <strong>Renewal Date:</strong> {formData.renewalDate}<br />
                    </div>
                )}
                <strong>VRF:</strong> {formData.vrf}<br />
                {formData.vrf === 'yes' && (
                    <strong>VRF Amount:</strong>)}
                    {formData.vrfAmount}<br />
            </div>
        </div>
    );
};

export default ResultPage;