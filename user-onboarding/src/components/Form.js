import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Name, Email, Password, TOS(Checkbox), Submit Button

const OnBoardForm = ({ values, status }) => {
    const [users, setUsers] = useState([]);
    // console.log(users);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status])

    return (
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            <Field type="email" name="email" placeholder="Email" />
            <Field type="password" name="password" placeholder="password" />
            <label>
                I agree to the Terms of Service
                <Field type="checkbox" name="tos" checked={values.tos}/>
            </label>
            <button>Submit!</button>
        </Form>
    );
};

const formikForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Please enter your name'),
        email: Yup.string().required('Please enter your email address'),
        password: Yup.string().required('A password is required'),
        tos: Yup.bool().oneOf([true], 'You must agree to the Terms of Service')
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        axios
          .post("https://reqres.in/api/users", values)
          .then(res => {
            // console.log(res);
            setStatus(res.data);
            resetForm();
          })
          .catch(err => console.error(err));
      }
})(OnBoardForm)

export default formikForm;