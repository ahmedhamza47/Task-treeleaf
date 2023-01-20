import React, { useRef, useState } from "react";
import { useContact } from "../Context/ContactContext";
import * as yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import {
  Button,
  Snackbar,
  Slide,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Alert,
} from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Table = (props) => {
  const validate = yup.object().shape({
    name: yup.string().required().max(20).min(2),
    email: yup.string().email().required(),
    number: yup.string().required().min(7).max(10),
  });

  const { contact, index } = props;
  const { setContacts, contacts } = useContact();
  const [editClicked, setEditClicked] = useState(false);
  const [readonly, setReadonly] = useState(true);
  const inputRef = useRef(null);
  const [opendialog, setOpendialog] = useState(false);
  const [snackbaropen, setSnackbaropen] = useState(false);
  const [savesnackbar, setSaveSnackbar] = useState(false);

  const handleClose = () => {
    setSaveSnackbar(false);
    setSnackbaropen(false);
  };

  const handleDialogClose = () => {
    setOpendialog(false);
  };

  const formik = useFormik({
    initialValues: {
      name: contact ? contact.name : "",
      email: contact ? contact.email : "",
      number: contact ? contact.number : "",
      dob: contact ? contact.dob : "",
      city: contact ? contact.city : "",
      district: contact ? contact.district : "",
      province: contact ? contact.province : "",
      country: contact ? contact.country : "",
    },

    validationSchema: validate,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  const handleSave = (values) => {
    const newContactlist = contacts.map((oldcontact, key) => {
      if (index === key) {
        return {
          ...oldcontact,
          name: values.name,
          email: values.email,
          number: values.number,
          dob: values.dob,
          city: values.city,
          province: values.province,
          country: values.country,
        };
      }
      return oldcontact;
    });
    localStorage.setItem("contacts", JSON.stringify(newContactlist));
    setContacts(newContactlist);
    setSaveSnackbar(true);
  };

  const handleClick = () => {
    console.log(contact);
    setEditClicked(true);
    setReadonly(false);
    inputRef.current.focus();
  };

  const handleDelete = () => {
    handleDialogClose();

    const newContactlist = contacts.filter((el) => {
      return el.id !== contact.id;
    });
    //console.log(newContactlist);

    localStorage.setItem("contacts", JSON.stringify(newContactlist));
    setContacts(newContactlist);
    setSnackbaropen(true);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          {" "}
          <Input
            ref={inputRef}
            type={"string"}
            name="name"
            value={formik.values.name}
            readOnly={readonly}
            onChange={formik.handleChange}
          />
        </td>

        <td>
          {" "}
          <Input
            ref={inputRef}
            type={"string"}
            name="email"
            value={formik.values.email}
            readOnly={readonly}
            onChange={formik.handleChange}
          />
        </td>

        <td>
          {" "}
          <Input
            ref={inputRef}
            type={"number"}
            name="number"
            value={formik.values.number}
            readOnly={readonly}
            onChange={formik.handleChange}
            className="pl-2"
          />
        </td>

        {/* <td>{item.email}</td>
      <td>{item.number}</td> */}

        <td className="text-left ">
          {!editClicked ? (
            <button
              type="button"
              className="btn btn-outline-primary ml-3"
              onClick={handleClick}
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-primary ml-3"
              onClick={() => {
                setEditClicked(false);
                setReadonly(true);
                formik.handleSubmit();
              }}
            >
              Save
            </button>
          )}
        </td>
        <td className="text-left">
          <button
            type="button"
            className="btn btn-outline-danger mr-3"
            onClick={() => {
              setOpendialog(true);
            }}
          >
            Delete
          </button>
        </td>
      </tr>

      {formik.errors.name && formik.touched.name ? (
        <p className="text-danger "> {formik.errors.name}</p>
      ) : null}

      {formik.errors.number && formik.touched.number ? (
        <p className="text-danger "> {formik.errors.number}</p>
      ) : null}
      {formik.errors.email && formik.touched.name ? (
        <p className="text-danger "> {formik.errors.email}</p>
      ) : null}

      <Snackbar
        open={snackbaropen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Contact Deleted Successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={savesnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Contact Saved Successfully!
        </Alert>
      </Snackbar>
      <Dialog
        open={opendialog}
        TransitionComponent={Transition}
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Are you Sure You want to Delete this Contact?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>NO</Button>
          <Button onClick={handleDelete}>YES</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const Input = styled.input`
  text-align: center;
  width: 200px !important;
  margin-right: 0px;
  margin-left: 0px;

  padding: 0px !important;
  font-size: 0.9rem !important;
`;
export default Table;
