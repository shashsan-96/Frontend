import React from "react";
import { Card, Image, Container, Row, Col,Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from '@material-ui/core';
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer,toast} from 'react-toastify'
import {notifyErr,notifyWar,notifySuccess} from "../Toast/Toast"
import 'react-toastify/dist/ReactToastify.css'
import bg from "../../assets/bg5.svg";
import auth from "../../api/auth.service"
toast.configure();

const Login = () => {


  const history = useHistory();
  const user = auth.getCurrentUser();

  if (user !== null) {
    notifyWar("Already Loged In");
    window.setTimeout(() => {
      history.push("/");
    }, 3000);

    
  }

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      message: "",
    },

    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      auth.login(values.userName, values.password).then(
        () => {

          notifySuccess("Loged in");
          window.setTimeout(() => {
            history.push("/");
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
            console.error(resMessage);
            notifyErr(resMessage);
        }
      );
    },
  });

  return (
    <div id="Login">
     <ToastContainer/>
      <Card className="card2">
        <Container>
          <Row>
            <Col>
              <Image src={bg} thumbnail />
            </Col>
            <Col>
              <form
                style={{ marginTop: "10px", marginLeft: "40px" }}
                onSubmit={formik.handleSubmit}
              >
                <p className="h4 text-center mb-4 black-text font-weight-bold">
                  Login
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

                <label
                  htmlFor="Password"
                  className="black-text font-weight-bold"
                >
                  Your password
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

                <div className="text-center mt-4">
                  <Button
                    type="submit"
                  >
                    log-In
                  </Button>
                </div>
              </form>
              <Link href="/register"  style={{marginLeft: "240px" }}>Not Registered? </Link>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default Login;

