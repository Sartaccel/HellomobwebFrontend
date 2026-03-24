import React, { useState } from 'react';
import './ContactDetails.css';

const ContactDetails = ({ onContinue }) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	});
	const [errors, setErrors] = useState({});

	const handleNameInput = (e, fieldName) => {
		const value = e.target.value;
		const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
		setFormData(prev => ({ ...prev, [fieldName]: filteredValue }));
	};

	const handleEmailInput = (e) => {
		const value = e.target.value;
		setFormData(prev => ({ ...prev, email: value }));
		validateEmail(value);
	};

	const handlePhoneInput = (e) => {
		const value = e.target.value.replace(/[^0-9]/g, '');
		setFormData(prev => ({ ...prev, phone: value }));
		if (value && !/^\d{10,}$/.test(value)) {
			setErrors(prev => ({ ...prev, phone: 'Enter valid 10 digit phone number' }));
		} else {
			setErrors(prev => ({ ...prev, phone: '' }));
		}
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email && !emailRegex.test(email)) {
			setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
		} else {
			setErrors(prev => ({ ...prev, email: '' }));
		}
	};

	const handleContinueClick = () => {
		const newErrors = {};

		if (!formData.firstName.trim()) {
			newErrors.firstName = 'First name is required';
		}

		if (!formData.lastName.trim()) {
			newErrors.lastName = 'Last name is required';
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(formData.email)) {
				newErrors.email = 'Enter a valid email address';
			}
		}

		if (!formData.phone.trim()) {
			newErrors.phone = 'Phone number is required';
		} else if (!/^\d{10,}$/.test(formData.phone)) {
			newErrors.phone = 'Enter valid 10 digit phone number';
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0 && onContinue) {
			onContinue();
		}
	};

	return (
		<div className="checkout-screen">
			<div className="checkout-container">
				<section className="form-card">
					<h5 className='head'>Contact Details</h5>

					<div className="form-grid two-columns">
						<div className="field-group">
							<label htmlFor="firstName">First Name <span className="required">*</span></label>
							<input 
								id="firstName" 
								type="text" 
								value={formData.firstName}
								onChange={(e) => handleNameInput(e, 'firstName')}
								placeholder="Enter your first name"
								required
							/>
							{errors.firstName && <span className="error-message">{errors.firstName}</span>}
						</div>

						<div className="field-group">
							<label htmlFor="lastName">Last Name <span className="required">*</span></label>
							<input 
								id="lastName" 
								type="text" 
								value={formData.lastName}
								onChange={(e) => handleNameInput(e, 'lastName')}
								placeholder="Enter your last name"
								required
							/>
							{errors.lastName && <span className="error-message">{errors.lastName}</span>}
						</div>
					</div>

					<div className="field-group">
						<label htmlFor="email">Email <span className="required">*</span></label>
						<input 
							id="email" 
							type="email" 
							value={formData.email}
							onChange={handleEmailInput}
							placeholder="example@email.com"
							required
						/>
						{errors.email && <span className="error-message">{errors.email}</span>}
					</div>

					<div className="field-group">
						<label htmlFor="phone">Phone Number <span className="required">*</span></label>
						<div className="phone-row">
							<select aria-label="Country code" defaultValue="+91">
								<option value="+91">+ 91</option>
								<option value="+1">+ 1</option>
								<option value="+44">+ 44</option>
							</select>
							<input 
								id="phone" 
								type="tel" 
								value={formData.phone}
								onChange={handlePhoneInput}
								placeholder="Enter your phone number"
								required
							/>
						</div>
						{errors.phone && <span className="error-message">{errors.phone}</span>}
					</div>
				</section>

				<section className="form-card">
					<h5 className='head'>Shipping Details</h5>

					<div className="field-group">
						<label htmlFor="flat">Flat/House no.</label>
						<input id="flat" type="text" />
					</div>

					<div className="field-group">
						<label htmlFor="address">Address</label>
						<input id="address" type="text" />
					</div>

					<div className="form-grid two-columns">
						<div className="field-group">
							<label htmlFor="city">City</label>
							<input id="city" type="text" />
						</div>

						<div className="field-group">
							<label htmlFor="state">State</label>
							<input id="state" type="text" />
						</div>
					</div>

					<div className="form-grid two-columns">
						<div className="field-group">
							<label htmlFor="postalCode">Postal Code</label>
							<input id="postalCode" type="text" />
						</div>

						<div className="field-group">
							<label htmlFor="landmark">Famous Landmark</label>
							<input id="landmark" type="text" />
						</div>
					</div>

					<label className="checkbox-row" htmlFor="sameAddress">
						<input id="sameAddress" type="checkbox" defaultChecked />
						<span>My shipping and Billing address are the same</span>
					</label>
				</section>

				<div className="button-row">
					<button type="button" className="continue-btn" onClick={handleContinueClick}>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContactDetails;
