import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createRole, search } from "../../actions/roleAction";
import renderField from './../../Common/renderField';

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
        this.props.createRole(values, () => {
            this.props.search();
        });
    }

    render() {
        const { handleSubmit, pristine, submitting, invalid } = this.props
        const form = (
            <form onSubmit={handleSubmit(this.onSumbit.bind(this))}>
                <Field
                    label="Name"
                    name="name"
                    component={renderField}
                    validate={[required, minLength2]}
                />
                <Field
                    label="Description"
                    name="description"
                    component={renderField}
                    validate={[required, minLength2]}
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


function mapStateToProps(state, ownprops) {
    return { initialValues: ownprops.role };
}


export default reduxForm({
    form: 'RoleForm',
})(connect(mapStateToProps, { createRole, search })(CollegeForm));