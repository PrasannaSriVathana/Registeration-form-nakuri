import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    age: '',
    mobile: '',
    gender: '',
    aadhaar: '',
    smartCard: '',
    panCard: '',
    address: '',
    pincode: '',
    bankDetails: [{ bankName: '', accountType: 'default', branch: '', ifsc: '', accountNumber: '' }],
    annualIncome: '',
    familyMembers: '',
    insurance: 'no',
    insuranceType: '',
    renewalDate: '',
    vrf: 'no',
    vrfAmount: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  const handleBankChange = (index, e) => {
    const { name, value } = e.target;
    const newBankDetails = formData.bankDetails.map((bank, i) =>
        i === index ? { ...bank, [name]: value } : bank
    );
    setFormData({
      ...formData,
      bankDetails: newBankDetails
    });
    validateBankField(index, name, value);
  };

  const addBankDetail = () => {
    if (formData.bankDetails.length < 3) {
      setFormData({
        ...formData,
        bankDetails: [...formData.bankDetails, { bankName: '', accountType: 'default', branch: '', ifsc: '', accountNumber: '' }]
      });
    }
  };

  const removeBankDetail = (index) => {
    const newBankDetails = formData.bankDetails.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      bankDetails: newBankDetails
    });
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
      case 'fatherName':
        if (value.length < 3) {
          error = 'Minimum 3 characters required';
        }
        break;
      case 'mobile':
        if (!/^[6-9]\d{9}$/.test(value) || /(.)\1{4}/.test(value)) {
          error = 'Invalid mobile number';
        }
        break;
      case 'aadhaar':
        if (!/^[1-9]\d{11}$/.test(value) || /(.)\1{4}/.test(value)) {
          error = 'Invalid Aadhaar number';
        }
        break;
      case 'dob':
      case 'age':
        if (name === 'age' && value < 18) {
          error = 'Age must be 18 or above';
        }
        break;
      case 'smartCard':
        if (!/^33\d{8}$/.test(value)) {
          error = 'Invalid Smart Card number';
        }
        break;
      case 'panCard':
        if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(value)) {
          error = 'Invalid PAN Card number';
        }
        break;
      case 'pincode':
        if (!/^[1-9]\d{5}$/.test(value)) {
          error = 'Invalid Pincode';
        }
        break;
      default:
        break;
    }
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const validateBankField = (index, name, value) => {
    let error = '';
    if (name === 'ifsc' && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
      error = 'Invalid IFSC code';
    }
    const newBankErrors = formData.bankDetails.map((bank, i) =>
        i === index ? { ...bank, [name]: error } : bank
    );
    setErrors({
      ...errors,
      bankDetails: newBankErrors
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const formErrors = {};
    let isValid = true;

    // Validate main form fields
    const mainFields = ['name', 'fatherName', 'dob', 'age', 'mobile', 'gender', 'aadhaar', 'smartCard', 'panCard', 'address', 'pincode'];
    mainFields.forEach(field => {
      if (!formData[field]) {
        formErrors[field] = 'Required';
        isValid = false;
      } else if (errors[field]) {
        formErrors[field] = errors[field];
        isValid = false;
      }
    });

    // Validate bank details fields
    formData.bankDetails.forEach((bank, index) => {
      const bankErrors = {};
      const bankFields = ['bankName', 'branch', 'ifsc', 'accountNumber'];
      bankFields.forEach(field => {
        if (!bank[field]) {
          bankErrors[field] = 'Required';
          isValid = false;
        } else if (errors.bankDetails && errors.bankDetails[index] && errors.bankDetails[index][field]) {
          bankErrors[field] = errors.bankDetails[index][field];
          isValid = false;
        }
      });
      if (Object.keys(bankErrors).length > 0) {
        formErrors.bankDetails = formErrors.bankDetails ? [...formErrors.bankDetails, bankErrors] : [bankErrors];
      }
    });

    if (!isValid) {
      setErrors(formErrors);
    } else {
      // Navigate to result page with formData
      // You can use React Router or other navigation techniques here
      console.log('Form data:', formData);
      // Example: using localStorage to store form data temporarily
      localStorage.setItem('formData', JSON.stringify(formData));
      // Redirect to result page
      window.location.href = '/result'; // Replace with your route for result page
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Father Name</label>
                <input type="text" name="fatherName" className="form-control" value={formData.fatherName} onChange={handleChange} />
                {errors.fatherName && <div className="text-danger">{errors.fatherName}</div>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleChange} />
                {errors.dob && <div className="text-danger">{errors.dob}</div>}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Age</label>
                <input type="number" name="age" className="form-control" value={formData.age} onChange={handleChange} />
                {errors.age && <div className="text-danger">{errors.age}</div>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} />
                {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" className="form-control" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Aadhaar Number</label>
                <input type="text" name="aadhaar" className="form-control" value={formData.aadhaar} onChange={handleChange} />
                {errors.aadhaar && <div className="text-danger">{errors.aadhaar}</div>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Smart Card Number</label>
                <input type="text" name="smartCard" className="form-control" value={formData.smartCard} onChange={handleChange} />
                {errors.smartCard && <div className="text-danger">{errors.smartCard}</div>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>PAN Card Number</label>
                <input type="text" name="panCard" className="form-control" value={formData.panCard} onChange={handleChange} />
                {errors.panCard && <div className="text-danger">{errors.panCard}</div>}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
                {errors.address && <div className="text-danger">{errors.address}</div>}
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" name="pincode" className="form-control" value={formData.pincode} onChange={handleChange} />
                {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
              </div>
            </div>
          </div>
          {formData.bankDetails.map((bankDetail, index) => (
              <div key={index} className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Bank Name</label>
                    <input type="text" name="bankName" className="form-control" value={bankDetail.bankName} onChange={(e) => handleBankChange(index, e)} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Account Type</label>
                    <select name="accountType" className="form-control" value={bankDetail.accountType} onChange={(e) => handleBankChange(index, e)}>
                      <option value="default">Default</option>
                      <option value="savings">Savings</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Bank Branch</label>
                    <input type="text" name="branch" className="form-control" value={bankDetail.branch} onChange={(e) => handleBankChange(index, e)} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>IFSC Code</label>
                    <input type="text" name="ifsc" className="form-control" value={bankDetail.ifsc} onChange={(e) => handleBankChange(index, e)} />
                    {errors.bankDetails && errors.bankDetails[index] && <div className="text-danger">{errors.bankDetails[index].ifsc}</div>}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Account Number</label>
                    <input type="text" name="accountNumber" className="form-control" value={bankDetail.accountNumber} onChange={(e) => handleBankChange(index, e)} />
                    {errors.bankDetails && errors.bankDetails[index] && <div className="text-danger">{errors.bankDetails[index].accountNumber}</div>}
                  </div>
                </div>
                {index > 0 && (
                    <div className="col-md-4">
                      <button type="button" className="btn btn-danger" onClick={() => removeBankDetail(index)}>Cancel</button>
                    </div>
                )}
              </div>
          ))}
          {formData.bankDetails.length < 3 && (
              <div className="row">
                <div className="col-md-12">
                  <button type="button" className="btn btn-primary" onClick={addBankDetail}>Add Bank</button>
                </div>
              </div>
          )}
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Annual Income</label>
                <input type="number" name="annualIncome" className="form-control" value={formData.annualIncome} onChange={handleChange} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Family Members</label>
                <input type="number" name="familyMembers" className="form-control" value={formData.familyMembers} onChange={handleChange} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Insurance</label>
                <select name="insurance" className="form-control" value={formData.insurance} onChange={handleChange}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
          </div>
          {formData.insurance === 'yes' && (<div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Insurance Type</label>
                    <select name="insuranceType" className="form-control" value={formData.insuranceType} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="type1">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="type3">Type 3</option>
                      <option value="type4">Type 4</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Renewal Date</label>
                    <input type="date" name="renewalDate" className="form-control" value={formData.renewalDate} onChange={handleChange} />
                  </div>
                </div>
              </div>
          )}
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>VRF</label>
                <select name="vrf" className="form-control" value={formData.vrf} onChange={handleChange}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
            {formData.vrf === 'yes' && (
                <div className="col-md-4">
                  <div className="form-group">
                    <label>VRF Amount</label>
                    <input type="number" name="vrfAmount" className="form-control" value={formData.vrfAmount} onChange={handleChange} />
                  </div>
                </div>
            )}
          </div>
          <button type="submit" className="btn btn-success">Register</button>
        </div>
      </form>
  );
};

export default RegistrationForm;