import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createStudent, search } from "../../actions/studentAction";
import renderField from './../../Common/renderField';
class StudentForm extends Component {

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
    onSumbit(values) {
        this.props.createStudent(values, () => {
            this.props.search();
        });
    }

    render() {
        const { handleSubmit, pristine, submitting, invalid } = this.props
        const form = (
            <form onSubmit={handleSubmit(this.onSumbit.bind(this))}>
                <Field
                    label="College Id"
                    name="collegeId"
                    component={renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="College Name"
                    name="collegeName"
                    component={renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="First Name"
                    name="firstName"
                    component={renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="Last Name"
                    name="lastName"
                    component={renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="Date_of_birth"
                    name="dob"
                    component={renderField}
                    validate={[required, minLength2, dob]}
                />

                <Field
                    label="Mobile No"
                    name="mobileNo"
                    component={renderField}
                    validate={[required, phoneNumber]}
                />
                <Field
                    label="Email"
                    name="email"
                    component={renderField}
                    validate={[required, email]}
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

//validaion 
const required = value => (value ? undefined : 'Required');

export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength2 = minLength(2)

export const phoneNumber = value =>
    value && !/^[0]?[789]\d{9}$/i.test(value)
        ? 'Invalid phone number, must be 10 digits or start with 0'
        : undefined

export const email = value =>
    value && !/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/i.test(value)
        ? 'Please enter valid email'
        : undefined

export const dob = value =>
    value && !/^(19[5-9][0-9]|20[0-4][0-9]|2050)[-](0?[1-9]|1[0-2])[-](0?[1-9]|[12][0-9]|3[01])$/i.test(value)
        ? 'Please enter "YYYY-MM-DD" this format'
        : undefined
        
function mapStateToProps(state, ownprops) {
    return { initialValues: ownprops.student };
}


export default reduxForm({
    form: 'StudentForm',
})(connect(mapStateToProps, { createStudent, search })(StudentForm));