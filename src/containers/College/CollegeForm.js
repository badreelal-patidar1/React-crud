import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createCollege, search } from "../../actions/collegeActions";

class CollegeForm extends Component {

    //received props
    componentWillReceiveProps(nextProps) {
        const { change, initialValues } = this.props
        const values = nextProps.initialValues;

        if (initialValues !== values) {
            for (var key in values) {
                if (values.hasOwnProperty(key)) {
                    change(key, values[key]);
                }
            }
        }
    }

    //submit form
    onSumbit(values) {
        this.props.createCollege(values, () => {
            this.props.search();
        });
    }

    //Input field
    renderField = ({
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

    //render DOM
    render() {
        const { handleSubmit, pristine, submitting, invalid } = this.props
        const form = (
            <form onSubmit={handleSubmit(this.onSumbit.bind(this))}>
                <Field
                    label="College Name"
                    name="name"
                    component={this.renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="Address"
                    name="address"
                    component={this.renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="State"
                    name="state"
                    component={this.renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="City"
                    name="city"
                    component={this.renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="PhoneNo"
                    name="phoneNo"
                    component={this.renderField}
                    validate={[required, phoneNumber]}
                />
                <button className="btn btn-primary" disabled={invalid || pristine || submitting} type="submit">Submit</button>
            </form>
        )
        return (
            <div>
                {form}
            </div>
        )
    }
}

//Field Validation

const required = value => (value ? undefined : 'Required');

export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength2 = minLength(2)

export const phoneNumber = value =>
    value && !/^[0]?[789]\d{9}$/i.test(value)
        ? 'Invalid phone number, must be 10 digits or start with 0'
        : undefined

function mapStateToProps(state, ownprops) {
    return { initialValues: ownprops.college };
}
//export class 
export default reduxForm({
    form: 'CollegeForm',
})(connect(mapStateToProps, { createCollege, search })(CollegeForm));