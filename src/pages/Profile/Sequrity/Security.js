import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Error from "../../../component/Error/Error";
import { attemptChangePassword } from "../../../store/thunks/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"
const Sequrity = () => {
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [oldPasswordShow, setOldPasswordShow] = useState(false);
    const [newPasswordShow, setNewPasswordShow] = useState(false);
    const [passwordConfirmShow, setPasswordConfirmWrap] = useState(false);
    const dispatch = useDispatch();
    const initialValues = {
        userName: user.name,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    };
    const validationSchema = Yup.object({
        oldPassword: Yup.string().min(5).max(255).required("Current Password is Required"),
        newPassword: Yup.string().min(5).max(255).required("New Password is Required"),
        passwordConfirm: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').min(5).max(255).required("Coinfirm Password is Required")
    });
    const success = () => toast.success("Success Update New Password.");
    const passwordIncorrect = () => toast.error("Current Password is not correct.");
    const onSubmit = (values) => {
        setLoading(true);
        dispatch(attemptChangePassword(values)).then((res) => {
            success();
            setLoading(false);
        }).catch(({ response }) => {
            if (response.status === 400)
                passwordIncorrect();
            setLoading(false);
        });
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <>
                        <div className="security-profile">
                            <ToastContainer limit={3} autoClose={3000} hideProgressBar={true} theme="colored" />

                            <Form>
                                <h1>Security</h1>
                                <h2>Password</h2>
                                <p>Set a unique password to protect your personal account.</p>
                                <div className="password-change-wrap">
                                    <label>Old Password</label>
                                    <div className="password-input-wrap">
                                        <Field
                                            name="oldPassword"
                                            type={oldPasswordShow ? "text" : "password"}
                                            placeholder="Current Password"
                                        />
                                        <a onClick={() => setOldPasswordShow(!oldPasswordShow)}><img alt="" src="/image/password-show.svg" /></a>
                                        <ErrorMessage name="oldPassword" component={Error} />
                                    </div>
                                    <div className="password-change-inner-wrap">
                                        <div className="new-password">
                                            <label>New Password</label>
                                            <div className="password-input-wrap">
                                                <Field
                                                    name="newPassword"
                                                    type={newPasswordShow ? "text" : "password"}
                                                    placeholder="New Password"
                                                />
                                                <a onClick={() => setNewPasswordShow(!newPasswordShow)}><img alt="" src="/image/password-show.svg" /></a>
                                                <ErrorMessage name="newPassword" component={Error} />
                                            </div>
                                        </div>

                                        <div className="reenter-password">
                                            <label>Re-enter password</label>
                                            <div className="password-input-wrap">
                                                <Field
                                                    name="passwordConfirm"
                                                    type={passwordConfirmShow ? "text" : "password"}
                                                    placeholder="Confirm Passward"
                                                />
                                                <a onClick={() => setPasswordConfirmWrap(!passwordConfirmShow)}><img alt="" src="/image/password-show.svg" /></a>
                                                <ErrorMessage name="passwordConfirm" component={Error} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="security-profile-footer">
                                    <p>To ensure your account is well protected, please use 8 or more characters with a mix of letters, numbers & symbols.</p>
                                    <button className="btn" disabled={!formik.dirty || !formik.isValid || loading} type="submit" >Save Password</button>
                                </div>
                            </Form>
                        </div>
                    </>
                );
            }}
        </Formik>
    )
}
export default Sequrity;