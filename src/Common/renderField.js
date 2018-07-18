import React from 'react';

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div>
            <div className="form-group">
                <label className="col-lg-3 col-form-label form-control-label" >{label}</label>
                <div className="col-sm-10">
                    <input {...input} placeholder={label} type={type} className="form-control" />
                    {touched &&
                        ((error && <small className="form-text text-danger">{error}</small>) ||
                            (warning && <span>{warning}</span>))}
                </div>
            </div>
        </div>
    )
export default renderField;