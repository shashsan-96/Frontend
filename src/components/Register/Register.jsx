import React from "react";
import { Card, Container, Row, Col, Button,Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from '@material-ui/core';
import { useFormik } from "formik";
import * as Yup from "yup";
import bg from "../../assets/bg6.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../api/auth.service";
import {notifyErr,notifySuccess} from "../Toast/Toast"
toast.configure();

const Reg = () => {
  
  const history = useHistory();
  const user = auth.getCurrentUser();

  if (user !== null) {
    history.push("/");
  }

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
      passwordConfirmation: "",
      message: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(5, "Minimum 5 characters need")
        .max(15, "Input 15 characters or below")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain more than 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      auth.register(values.userName, values.email, values.password).then(
        () => {
          notifySuccess("Registered")
          window.setTimeout(() => {
            history.push("/load");
            window.location.reload();
          }, 3000); 
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          notifyErr(resMessage);
        }
      );
    },
  });

  return (
    <div id="Reg">
      <ToastContainer />
      <Card className="card2">
        <Container>
          <Row>
          <Col>
              <Image src={bg} thumbnail />
            </Col>
            <Col>
              <form
                style={{ marginTop: "12px", marginLeft: "40px" }}
                onSubmit={formik.handleSubmit}
              >
                <p className="h4 text-center mb-4 black-text font-weight-bold">
                  Register
                </p>

                <br />
                <label
                  htmlFor="UserName"
                  className="black-text font-weight-bold"
                >
                  User Name
                </label>
                <input
                  className="form-control font-weight-bold "
                  style={{ backgroundColor: "#fafaff", borderWidth: "2px" }}
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <div style={{ color: "red" }}>{formik.errors.userName}</div>
                ) : null}

                <br />

                <label htmlFor="Email" className="black-text font-weight-bold">
                  Email
                </label>
                <input
                  className="form-control font-weight-bold "
                  style={{ backgroundColor: "#fafaff", borderWidth: "2px" }}
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}

                <br />

                <label
                  htmlFor="Password"
                  className="black-text font-weight-bold"
                >
                  Password
                </label>
                <input
                  className="form-control font-weight-bold "
                  style={{ backgroundColor: "#fafaff", borderWidth: "2px" }}
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                ) : null}

                <br />

                <label
                  htmlFor="Password"
                  className="black-text font-weight-bold"
                >
                  Password Confirmation
                </label>

                <input
                  className="form-control font-weight-bold "
                  style={{ backgroundColor: "#fafaff", borderWidth: "2px" }}
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirmation}
                />
                {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.passwordConfirmation}
                  </div>
                ) : null}

                <br />
                <div className="text-center mt-4">
                  <Button type="submit">Register</Button>
                </div>
              </form>
              <Link href="/login"  style={{marginLeft: "220px" }}>Already Registered? </Link>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default Reg;
