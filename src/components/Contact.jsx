import React, { useRef, useState } from "react";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Slide,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Alert,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFormik } from "formik";
import { useContact } from "../Context/ContactContext";
import "./contact.css";
import * as yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Contact = (props) => {
  const validate = yup.object().shape({
    name: yup.string().required().max(20).min(2),
    email: yup.string().email().required(),
    number: yup.string().required().min(7).max(10),
  });

  const { contact, index } = props;
  const { setContacts, contacts } = useContact();
  const [editClicked, setEditClicked] = useState(false);
  const [readonly, setReadonly] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef(null);
  const [opendialog, setOpendialog] = useState(false);
  const [deletesnackbar, setDeleteSanckbar] = useState(false);
  const [savesnackbar, setSaveSnackbar] = useState(false);

  const handleClose = () => {
    setSaveSnackbar(false);
    setDeleteSanckbar(false);
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
    setDisabled(true);
  };

  const handleClick = () => {
    setEditClicked(true);
    setReadonly(false);
    setDisabled(false);
    inputRef.current.focus();
  };

  const handleDelete = () => {
    setDeleteSanckbar(true);
    handleDialogClose();

    const newContactlist = contacts.filter((el) => {
      return el.id !== contact.id;
    });

    localStorage.setItem("contacts", JSON.stringify(newContactlist));
    setContacts(newContactlist);
  };

  return (
    <div className="contactlist">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Accordion style={{ width: "50%" }} className="  ml-5">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <input
                ref={inputRef}
                name="name"
                readOnly={readonly}
                onChange={formik.handleChange}
                label="NAME"
                type={"string"}
                value={formik.values.name}
              />
            </Typography>
          </AccordionSummary>
          {formik.errors.name && <span>{formik.errors.name}</span>}
          <AccordionDetails>
            <Typography>
              <div className="contacts">
                <span>
                  Email :
                  <input
                    name="email"
                    readOnly={readonly}
                    onChange={formik.handleChange}
                    type={"email"}
                    value={formik.values.email}
                    className="datas"
                  />
                </span>
                {formik.errors.email && <span>{formik.errors.email}</span>}
                <br />

                <span>
                  Phone No :
                  <input
                    name="number"
                    readOnly={readonly}
                    onChange={formik.handleChange}
                    type={"number"}
                    value={formik.values.number}
                    className="datas w-50"
                  />
                </span>
                {formik.errors.number && <span>{formik.errors.number}</span>}
                <br />
                <span>
                  Date of Birth:
                  <input
                    name="dob"
                    readOnly={readonly}
                    onChange={formik.handleChange}
                    type={"string"}
                    value={formik.values.dob ? formik.values.dob : " N/A"}
                    className="datas"
                  />
                </span>
                <br />
                <span>
                  City :
                  <input
                    name="city"
                    readOnly={readonly}
                    onChange={formik.handleChange}
                    type={"string"}
                    value={formik.values.city ? formik.values.city : " N/A"}
                    className="datas"
                  />
                </span>
                <br />
                <span>
                  District :
                  <input
                    name="district"
                    readOnly={readonly}
                    onChange={formik.handleChange}
                    type={"string"}
                    value={
                      formik.values.district ? formik.values.district : " N/A"
                    }
                    className="datas"
                  />
                </span>
                <br />
                <span className="d-flex">
                  Province:
                  <select
                    c
                    className=" datas d-flex province "
                    name="province"
                    onChange={formik.handleChange}
                    value={formik.values.province}
                    id="exampleFormControlSelect1"
                    disabled={disabled}
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
                </span>
                <br />
                <span>
                  Country:
                  <input
                    name="country"
                    readOnly={readonly}
                    onChange={formik.handleChange}
                    type={"string"}
                    value={
                      formik.values.country ? formik.values.country : " N/A"
                    }
                    className="datas"
                  />
                </span>
                <br />
              </div>
              <div>
                {!editClicked ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary "
                    onClick={handleClick}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-primary "
                    onClick={() => {
                      setEditClicked(false);
                      setReadonly(true);
                      formik.handleSubmit();
                    }}
                  >
                    Save
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-outline-danger ml-4"
                  onClick={() => {
                    setOpendialog(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </form>

      <Snackbar
        open={deletesnackbar}
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
    </div>
  );
};
