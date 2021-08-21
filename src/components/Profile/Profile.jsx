import React,{useEffect,useState} from "react";
import UserService from "../../api/user.service";
import auth from "../../api/auth.service";
import { useHistory } from "react-router";
import { ToastContainer, toast, Slide } from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";
import { Card, Container, Row, Col,Button } from "react-bootstrap";
toast.configure();

const Prof = () => {

    const [firstName, setFname] = useState([]);
   
   
    
  const notify = (e) => {
    toast.error(e, {
      position: "top-right",
      autoClose: 6000,
      transition: Slide,
    });
  };

  const notify2 = (e) => {
    toast.info(e, {
      position: "top-right",
      autoClose: 6000,
      transition: Slide,
    });
  };
  
  const deleteUser = () => {
    UserService.deleteUserByID(user.id).then(
      (response) => {
        notify2(response.data.message);
        auth.logout();
        window.setTimeout(() => {
          history.push("/");
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
        notify(resMessage);
      }
    );
  };

  const history = useHistory();
  const user = auth.getCurrentUser();

 const func = () => {
    if (user == null) {
        history.push("/");
      } else {
        if (user.roles[0] !== "ROLE_USER") {
            history.push("/");
    }
}
  }


  useEffect(() => {
    func();

    UserService.getUserByID(user.id).then(
        (response) => {

            setFname(response.data);
            console.log(firstName.email)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.error(resMessage);
        }
      );


    
},[firstName.email,func(),user.id])




 const formik = useFormik({
    enableReinitialize:true,
        initialValues: {
            firstname: firstName,
           
        },

        validationSchema: Yup.object({
            firstname: Yup.string()
                .min(3, "?")
                .max(50, "Input 25 characters or below")
                .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
                lastname: Yup.string()
                .min(3, "?")
                .max(50, "Input 15 characters or below")
                .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
                address: Yup.string()
                .min(10, "Input must be at least 10 characters")
                .max(50, "Input 15 characters or below"),
                mobile: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
                .min(10)
                .max(10),
                zip: Yup.string()
                .min(9)
                .max(12),
                city: Yup.string()
                .min(4)
                .max(30),
                country: Yup.string()
                .min(4)
                .max(30),
                email: Yup.string().email("Invalid email").required("Required")
        }),
        onSubmit: values => {
            UserService.updateUser(values,user.id).then( res => {
               notify2(res.data.message);
               window.setTimeout(() => {
                window.location.reload();
              }, 7000);
            });
        }

    },
)


  return (
    <div id="Profile">
    <ToastContainer/>
     <Card className="card2">
       <Container>
         <Row>
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
                 id="email"
                 name="email"
                 type="text"
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
                   Save
                 </Button>
               </div>
             </form>
           </Col>
         </Row>
       </Container>
     </Card>
   </div>
  );
};

export default Prof;
