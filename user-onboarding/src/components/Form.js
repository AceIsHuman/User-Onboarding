import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Name, Email, Password, TOS(Checkbox), Submit Button

const OnBoardForm = ({ touched, errors, values, status }) => {
    const [users, setUsers] = useState([]);
    // console.log(users);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status])

    return (
        <div>
            <Form>
                <div>
                    <Field type="text" name="name" placeholder="Name" />
                    {touched.name && errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                
                <div>
                    <Field type="email" name="email" placeholder="Email" />
                    {touched.email && errors.email && (
                        <p>{errors.email}</p>
                    )}
                </div>

                <div>
                    <Field type="password" name="password" placeholder="password" />
                    {touched.password && errors.password && (
                        <p>{errors.password}</p>
                    )}
                </div>

                <div>
                    <label>
                        I agree to the Terms of Service
                        <Field type="checkbox" name="tos" checked={values.tos}/>
                        {touched.tos && errors.tos && (
                            <p>{errors.tos}</p>
                        )}
                    </label>
                </div>
                <button>Submit!</button>
            </Form>
            {users.map(user => {
                return (
                    <div>
                        <h4>Name: {user.name}</h4>
                        <p>Email: {user.email}</p>
                    </div>
                )
            })}
        </div>
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