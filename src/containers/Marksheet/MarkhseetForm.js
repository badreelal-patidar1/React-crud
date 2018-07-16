import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createMarksheet, search } from "../../actions/marksheetAction";


class MarksheetForm extends Component {

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
        this.props.createMarksheet(values, () => {
            this.props.search();
        });
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
                    label="Roll No"
                    name="rollNo"
                    component={this.renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="Student Id"
                    name="studentId"
                    component={this.renderField}
                    validate={[required, minLength2, student]}
                />
                <Field
                    label="name"
                    name="name"
                    component={this.renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="Physics"
                    name="physics"
                    component={this.renderField}
                    validate={[required, marks]}
                />
                <Field
                    label="Chemistry"
                    name="chemistry"
                    component={this.renderField}
                    validate={[required, marks]}
                />
                <Field
                    label="Maths"
                    name="maths"
                    component={this.renderField}
                    validate={[required, marks]}
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

export const marks = value =>
    value && !/\b(0?[0-9]|[1-9][0-9]|100)\b/i.test(value)
        ? 'Please Enter valid marks'
        : undefined

export const student = value =>
    value && !/^\d+$/i.test(value)
        ? 'Please enter valid Id should be number'
        : undefined



function mapStateToProps(state, ownprops) {
    return { initialValues: ownprops.marksheet };
}

export default reduxForm({
    form: 'MarksheetForm',
})(connect(mapStateToProps, { createMarksheet, search })(MarksheetForm));