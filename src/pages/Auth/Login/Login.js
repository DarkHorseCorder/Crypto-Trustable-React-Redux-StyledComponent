import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { attemptLogin } from "../../../store/thunks/auth"
import Error from "../../../component/Error/Error"
import { setResponseStatus } from "../../../store/actions/user";
import { attemptGetWalletAddress } from "../../../store/thunks/wallet";
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"

const Login = (props) => {
    const { responseStatus } = useSelector((state) => state.user);
    const [passwordShow, setPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const initialValues = {
        userName: "",
        password: "",
    };
    const validationSchema = Yup.object({
        userName: Yup.string().required("userName is Required"),
        password: Yup.string().min(5).max(255).required("Password is Required"),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const passwordIncorrect = () => toast.error("Password is not correct.");
    const userNameIncorrect = () => toast.error("Username is not correct.");
    const successRegister = () => toast.success(({ closeToast }) => <div><label>Success Register.</label><label> Please Sign In Now</label></div>);
    const successUpdatePassword = () => toast.success("Success Update New Password.");
    const ServerError = () => toast.error("Server Connection Error. Please try again.");

    const onSubmit = (values) => {
        setLoading(true);
        dispatch(attemptLogin(values)).then((response) => {
            if (response === 200) {
                dispatch(attemptGetWalletAddress(values.userName));
                navigate("/market");
            }
            if (response === 400) {
                passwordIncorrect();
            }
            if (response === 404) {
                userNameIncorrect();
            }
            if (response === 500) {
                serverError();
            }
            setLoading(false);
        }).catch(({ response }) => {
            setLoading(false);
        });
    };
    useEffect(() => {
        if (responseStatus === "success register") {
            dispatch(setResponseStatus(""));
            successRegister();
        }
        if (responseStatus === "success password updated") {
            dispatch(setResponseStatus(""));
            successUpdatePassword();
        }
    })
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <>
                        <div className="login">
                            <div className="logo">
                                <Link to="/">
                                    <img alt="" src="image/header-logo.png" />
                                    <p>Crypto Trustable</p>
                                </Link>
                            </div>
                            <ToastContainer limit={3} autoClose={3000} hideProgressBar={true} theme="colored" />
                            <div className="login-inner">
                                <Form>
                                    <h1>Sign In</h1>
                                    <div className="email-wrap">
                                        <Field
                                            name="userName"
                                            type="text"
                                            placeholder="username"
                                        />
                                        <ErrorMessage name="userName" component={Error} />
                                    </div>
                                    <div className="password-wrap">
                                        <Field
                                            name="password"
                                            type={passwordShow ? "text" : "password"}
                                            placeholder="Password"
                                        />
                                        <a onClick={() => setPasswordShow(!passwordShow)}><img alt="" src="image/password-show.svg" /></a>
                                        <ErrorMessage name="password" component={Error} />
                                    </div>
                                    <div className="forgot-password-wrap">
                                        <p>Scan to login</p>
                                        <Link to="/confirm-recovery-phrase">Forgot Password?</Link>
                                    </div>
                                    <div>
                                        <button type="submit" disabled={!formik.dirty || !formik.isValid || loading} className="sign-in-button btn btn-primary">Sign in</button>
                                    </div>
                                    <div className="go-register-wrap">
                                        <h5>If you don’t have an account you can</h5>
                                        <Link to="/register">Register Here!</Link>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </>
                );
            }}
        </Formik>

    );
};
export default Login;