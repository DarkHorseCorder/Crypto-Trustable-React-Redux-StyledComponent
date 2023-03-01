import React from "react";
import "./style.css"
import SingleServiceBenefit from "../../../component/SingleServiceBenefit/SingleServiceBenefit";
const Benefit = () => {
    const services = [{
        image: "SaftyCome.svg",
        name: "Safety comes First",
        description: "Please be very careful with your account and keep in mind that it is only one way for recover it !"
    },
    {
        image: "EasyDeposit.svg",
        name: "Easy Transfers",
        description: "You can send and receive crypto very fast and easy with our website , just do it !"
    },
    {
        image: "LowCharge.svg",
        name: "Low Charges",
        description: "For our exchange you will have the minimum charges fee's possible !"
    },
    {
        image: "Bonus.svg",
        name: "Bonus & Refferal",
        description: "if you want to discover our bonus & refferal system !"
    },
    {
        image: "FastTransaction.svg",
        name: "Fast Transactions",
        description: "Your transactions will be done as fast as possible , just try it !"
    },
    {
        image: "DeepEncryption.svg",
        name: "Deep Encryption ",
        description: "Don't worry about your data , everything is deep encrypted !"
    },
    {
        image: "FastKYC.svg",
        name: "NO KYC",
        description: "For keeping your identity secret , you don't need to verify your KYC !"
    },
    {
        image: "benefit-support.svg",
        name: "24/7 Support",
        description: "We will suport you anytime , just text us on e-mail or live chat and you will get a very fast answer !"
    },
    ]
    return (
        <>
            <div className="benefit">
                <p className="title">Benefits</p>
                <h1>Our Best Service</h1>
                <p className="description">We will make everything is possible from our side to provide you the best experience , here you can
                    exchange , send , and receive crypto with a secret identity !</p>
                <div className="services">
                    {
                        services.map((item, index) => <SingleServiceBenefit item={item} key={index} />)
                    }
                </div>
            </div>
        </>
    )
}
export default Benefit;