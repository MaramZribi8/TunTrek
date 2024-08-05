import React from 'react';

export default function CustomPhoneInput({ value, onChange }) {
    const handleChange = (e) => {
        const inputValue = e.target.value;
        // Remove non-numeric characters
        const numericValue = inputValue.replace(/\D/g, '');
        // Format the numeric value
        let formattedValue = '';
        for (let i = 0; i < numericValue.length; i++) {
            if (i === 2 || i === 5) {
                formattedValue += ' ' + numericValue[i];
            } else {
                formattedValue += numericValue[i];
            }
        }
        // Update state
        onChange(formattedValue);
    };

    return (
        <div className="ant-input-affix-wrapper ant-input-affix-wrapper-status-error css-j3qx7v" style={{ display: 'flex', alignItems: 'center' }}>
            <span className="ant-input-prefix">
                <span style={{ display: 'flex', width: '68px', alignItems: 'center' }}>
                    <img alt="Tunisia flag" src="data:image/png;base64,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" width="40" style={{ maxHeight: '16px', margin: '4px' }} />
                    <span style={{ color: 'rgb(143, 143, 143)' }}>+216</span>
                </span>
            </span>
            <input
                maxLength="10"
                placeholder="Votre numéro de téléphone"
                className="ant-input css-j3qx7v"
                type="text"
                value={value}
                onChange={handleChange}
                aria-describedby="normal_login_phone_number_help"
                aria-required="true"
            />
        </div>
    );
}
