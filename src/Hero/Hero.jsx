import React, { useEffect, useState } from "react";
import "./Hero.scss";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Hero() {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzEDKp52xvAXeSHLGvBVqHVE9CrOP-KruqysEGNG8ed2a-dXo0PoXsI_TdEExdmftmJkw/exec";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = formData.name && formData.email;

    if (!isFormValid) {
      toast.error("Please enter all required data", {
        toastStyle: {
          background: "white",
          color: "red",
        },
      });
    } else {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);

      // Send the form data to the Google Sheets script URL using fetch
      fetch(scriptURL, { method: "POST", body: formDataToSend })
        .then((response) => {
          // Clear the form fields upon successful submission
          setFormData({
            name: "",
            email: "",
          });

          toast.success("Success! We will contact you as soon as possible", {
            toastStyle: {
              background: "white",
              color: "black",
            },
          });
        })
        .catch((error) => {
          toast.error("An error occurred while submitting the form", {
            toastStyle: {
              background: "white",
              color: "red",
            },
          });
        });
    }
  };

  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center h-screen w-screen"
    >
      <img src="/herologo.png" alt="" className="logo" />
      <h1 className="title">Your Fast, Smart, & Revolutionary Agency.</h1>
      <p className="description">
        Build a Brand, Amplify your Reach.
        <br /> We're here to create personalized solutions for your businesses.
        Get a Free Quote Today!
      </p>
      <form>
        <p className="form-title">Sign up to Secure Your Limited Offer</p>
        <input
          className="firstname"
          type="text"
          placeholder="First name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="email"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <button className="submit" type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={true}
          toastStyle={{
            background: "white",
            color: "black",
          }}
          progressBarStyle={{
            background: "#FF0000",
          }}
          limit={3}
        />
      </form>
    </section>
  );
}
