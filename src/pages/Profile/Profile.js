import React, { useState, useRef, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import PhoneInput from 'react-phone-input-2';
import { useSelector, useDispatch } from "react-redux";
import { attemptResetUser } from "../../store/thunks/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css'
import "./style.css"
const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const [disable, setDisable] = useState(true);
    const [edit, setEdit] = useState(false);
    const inputReference = useRef(null);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [displayName, setDisplayName] = useState(user.displayName);
    const [userName, setUserName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phoneValue, setPhoneValue] = useState(user.phoneNumber);
    const success = () => toast.success("Success Update");
    const dispatch = useDispatch();
    const editInformation = () => {
        setEdit(true);
        setDisable(false);
    }
    useEffect(() => {
        if (edit == true)
            inputReference.current.focus();
    }, [edit]);
    const sendUpdateUser = {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        displayName: displayName,
        email: email,
        phoneNumber: phoneValue,
    }
    const onCLickCancel = () => {
        setEdit(false);
        setDisable(true);
    }
    const saveChange = () => {
        setDisable(true);
        dispatch(attemptResetUser(sendUpdateUser)).then((res) => {
            if (res === true) {
                success();
                setEdit(false)

            }
            setDisable(false)
        }).catch((response) => {
            setDisable(false);
        })
    }

    return (
        <>
            <div className="profile">
                <ToastContainer limit={3} autoClose={3000} hideProgressBar={true} theme="colored" />
                <div className="profile-title">
                    <h1>My Profile</h1>
                    <button onClick={editInformation}><BiEditAlt /> Edit</button>
                </div>
                <h2>Personal Information</h2>
                <p>Here you can add your own personal informations about your account !</p>
                <div className="personal-information-wrap">
                    <div className="personal-information-wrap-column">
                        <div className="information-item">
                            <label>First Name</label>
                            <div className="input-wrap">
                                <input ref={inputReference} disabled={!edit} type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                            </div>
                        </div>
                        <div className="information-item">
                            <label>Last Name</label>
                            <div className="input-wrap">
                                <input disabled={!edit} type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                            </div>
                        </div>
                    </div>
                    <div className="personal-information-wrap-column">
                        <div className="information-item">
                            <label>Display Name</label>
                            <div className="input-wrap">
                                <input disabled={!edit} type="text" onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
                                <BiEditAlt />
                            </div>
                        </div>
                        <div className="information-item">
                            <label>User Name</label>
                            <div className="input-wrap">
                                <input disabled={true} type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />
                            </div>
                        </div>
                    </div>
                </div>
                <h2>Contact Information</h2>
                <p>Here you need to provide your contact informations , maybe you’ll get in touch with our team !</p>
                <div className="personal-information-wrap">
                    <div className="personal-information-wrap-column">
                        <div className="information-item">
                            <label>Email</label>
                            <div className="input-wrap">
                                <input disabled={!edit} value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                                <MdOutlineEmail />
                            </div>
                        </div>
                        <div className="information-item">
                            <label>Phone Number</label>
                            <div className="input-wrap">
                                <PhoneInput
                                    country={'us'}
                                    value={phoneValue}
                                    onChange={(e) => setPhoneValue(e)}
                                    disabled={!edit}
                                />
                                <ImPhone />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-setting">
                    <h3>This account was created on {user.date}</h3>
                    <div className="profile-setting-button-wrap">
                        <button disabled={disable} className="btn profile-setting-cancel" onClick={onCLickCancel} >
                            Cancel
                        </button>
                        <button disabled={disable} onClick={saveChange} className="btn profile-setting-save">
                            Save Change
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;