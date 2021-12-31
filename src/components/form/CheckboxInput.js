import React from 'react';

const CheckboxInput = ({className, label, ...rest}) => {
    return (
        <label className={`${className} checkbox-input`}>
              <input type="checkbox" {...rest} />
              <span>{label}</span>
        </label>
    );
};

export default CheckboxInput;