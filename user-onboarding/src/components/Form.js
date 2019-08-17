import React from 'react';
import { Form, Field, withFormik } from 'formik';

// Name, Email, Password, TOS(Checkbox), Submit Button

function onboardForm() {
    return(
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            <Field type="email" name="email" placeholder="Email" />
            <Field type="password" name="password" placeholder="password" />
            <label>
                I agree to the terms of service
                <Field type="checkbox" name="tos" checked={''}/>
            </label>
            <button>Submit!</button>
        </Form>
    )
}

const formikForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        }
    }
})(onboardForm)

export default formikForm;