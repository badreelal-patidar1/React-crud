import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createUser,search } from "../../actions/userAction";


class CollegeForm extends Component {

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
        this.props.createUser(values,()=>{
            this.props.search();
        })
    }
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
    render() {
        const { handleSubmit, pristine, submitting, invalid } = this.props
        const form = (
            <form onSubmit={handleSubmit(this.onSumbit.bind(this))}>
                <Field
                    label="First Name"
                    name="firstName"
                    component={this.renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="Last Name"
                    name="lastName"
                    component={this.renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="Login"
                    name="login"
                    component={this.renderField}
                    validate={[required, email]}
                />
                <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={this.renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="Date_of_birth"
                    name="dob"
                    component={this.renderField}
                    validate={[required, minLength2]}
                />

                <Field
                    label="Mobile No"
                    name="mobileNo"
                    component={this.renderField}
                    validate={[required, phoneNumber]}
                />
                <Field
                    label="Role Id"
                    name="roleId"
                    component={this.renderField}
                    validate={[required]}
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
    value && !/^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/i.test(value)
        ? 'Invalid phone number, must be 10 digits or start with 0'
        : undefined

function mapStateToProps(state, ownprops) {
    return { initialValues: ownprops.user };
}


export default reduxForm({
    form: 'NoteNewFormUnique',
})(connect(mapStateToProps, { createUser,search })(CollegeForm));