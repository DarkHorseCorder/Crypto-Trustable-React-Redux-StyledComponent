import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { attemptResetPassword } from "../../../store/thunks/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Error from "../../../component/Error/Error"
import { setResponseStatus } from "../../../store/actions/user";
import "./style.css";
const ResetPassword = () => {
    const { name, isVerify } = useSelector((state) => state.user);
    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordConfirmShow, setPasswordConfirmWrap] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        if (!isVerify) {
            navigate("/login");
        }
    }, [])
    const initialValues = {
        userName: name,
        password: "",
        confirmPassword: ""
    };
    const validationSchema = Yup.object({
        password: Yup.string().min(5).max(255).required("Password is Required"),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').min(5).max(255).required("Coinfirm Password is Required")
    });
    const onSubmit = (values) => {
        setLoading(true);
        dispatch(attemptResetPassword(values)).then((res) => {
            setLoading(false);
            dispatch(setResponseStatus("success password updated"))
            navigate("/login");
        })
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
                        <div className="reset-password">
                            <div className="logo">
                                <Link to="/">
                                    <img alt="" src="image/header-logo.png" />
                                    <p>Crypto Trustable</p>
                                </Link>
                            </div>
                            <div className="reset-password-inner">
                                <Form>
                                    <h1>Reset Password</h1>

                                    <p>make your new password</p>
                                    <div className="input-wrap">
                                        <Field
                                            name="password"
                                            type={passwordShow ? "text" : "password"}
                                            placeholder="Password"
                                        />
                                        <a onClick={() => setPasswordShow(!passwordShow)}><img alt="" src="image/password-show.svg" /></a>
                                        <ErrorMessage name="password" component={Error} />
                                    </div>
                                    <div className="input-wrap">
                                        <Field
                                            name="passwordConfirm"
                                            type={passwordConfirmShow ? "text" : "password"}
                                            placeholder="Confirm Passward"
                                        />
                                        <a onClick={() => setPasswordConfirmWrap(!passwordConfirmShow)}><img alt="" src="image/password-show.svg" /></a>
                                        <ErrorMessage name="passwordConfirm" component={Error} />
                                    </div>
                                    <button type="submit" disabled={!formik.dirty || !formik.isValid || loading} className="btn reset-password-button">Reset</button>
                                </Form>
                            </div>
                        </div>
                    </>
                );
            }}
        </Formik>
    )
}
export default ResetPassword;