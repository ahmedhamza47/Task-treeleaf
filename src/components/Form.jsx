import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import { useContact } from "../Context/ContactContext";
import * as yup from "yup";

export const Form = () => {
  const [snackbaropen, setSnackbaropen] = useState(false);
  const { addContact } = useContact();
  const validate = yup.object().shape({
    name: yup.string().required().max(20).min(2),
    email: yup.string().email().required(),
    number: yup.string().required().min(7).max(10),
  });

  const handleClose = () => {
    setSnackbaropen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      dob: "",

      city: "",
      district: "",
      province: "",
      country: "Nepal",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      console.log(values);
      const contact = {
        id: Date.now(),
        name: values.name,
        email: values.email,
        number: values.number,
        dob: values.dob,
        city: values.city,
        district: values.district,
        province: values.province,
        country: values.country,
      };
      addContact(contact);
      setSnackbaropen(true);
      formik.resetForm();
    },
    // onReset: values=>{
    // }
  });

  return (
    <div>
      <h1 className="text-center mb-4 " style={{ fontFamily: "Kanit" }}>
        {" "}
        Contact Page{" "}
      </h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name:</label>
          <input
            error={formik.errors.name}
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            type={"string"}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your name"
          />
          {formik.errors.name ? (
            <p className="text-danger "> {formik.errors.name}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Phone:</label>
          <input
            error={formik.errors.number}
            onChange={formik.handleChange}
            value={formik.values.number}
            name="number"
            type={"number"}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your phone number"
          />
          {formik.errors.number ? (
            <p className="text-danger "> {formik.errors.number}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email:</label>
          <input
            error={formik.errors.email}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            type={"email"}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
          />
          {formik.errors.email ? (
            <p className="text-danger "> {formik.errors.email}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Date of Birth:</label>
          <input
            error={formik.errors.dob}
            onChange={formik.handleChange}
            value={formik.values.dob}
            name="dob"
            type={"string"}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="year/month/day"
          />
          {formik.errors.dob ? (
            <p className="text-danger "> {formik.errors.dob}</p>
          ) : null}
        </div>
        <div className="address mb-4">
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="inputCity">City </label>
              <input
                name="city"
                placeholder="City"
                type="text"
                className="form-control address-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </div>
            <div className="form-group col-md-3 ">
              <label htmlFor="inputCity">District</label>
              <input
                name="district"
                placeholder="District"
                type="text"
                className="form-control address-input "
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                value={formik.values.district}
              />
            </div>
            <div className="form-group col-md-3 mr-3 ">
              <label htmlFor="inputState">State</label>
              <select
                className="form-control pr-5 "
                name="province"
                onChange={formik.handleChange}
                value={formik.values.province}
                id="exampleFormControlSelect1"
              >
                <option>Choose..</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
            </div>
            <div className="form-group col-md-2 ml-2">
              <label htmlFor="inputZip">Country</label>
              <input
                name="country"
                onChange={formik.handleChange}
                value={formik.values.country}
                type="text"
                className="form-control address-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
        </div>
        <div className="justify-content-center text-center">
          <button type="submit" className="btn btn-lg btn-primary px-5 mr-3 ">
            Submit
          </button>
        </div>
      </form>

      <Snackbar
        open={snackbaropen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Contact Added Successfully!
          <br />
          Click Profiles to see full details
        </Alert>
      </Snackbar>
    </div>
  );
};
