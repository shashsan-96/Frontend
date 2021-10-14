import React, { useEffect } from "react";
import user from "../../api/user.service";
import auth from "../../api/auth.service";
import * as yup from "yup";
import {Formik } from "formik";
import Form from 'react-bootstrap/Form'
import { Row,Col,Button } from "react-bootstrap";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
      maxWidth: 900,
      marginLeft: 250,
      marginTop: 40,
      marginBottom: 50,
      paddingBottom: 80,
      backgroundColor: "white",
    },
  
    title: {
      textAlign:"center",
      fontSize: 28,
    },
    pos: {
      marginBottom: 12,
    },
    list: {
      fontSize: 18,
    },
  });
const schema = yup.object().shape({
  firstname: yup.string().required().min(3, "?")
  .max(25, "Input 25 characters or below")
  .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
  lastname: yup.string().required().min(3, "?")
  .max(25, "Input 25 characters or below")
  .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
  address:yup.string().required().min(3, "?")
  .max(50, "Input 50 characters or below")
  .matches(/^[A-Za-z ]*$/, 'Please enter valid address'),
  email: yup.string().required(),
  city: yup.string().required().min(3, "?")
  .max(50, "Input 50 characters or below")
  .matches(/^[A-Za-z ]*$/, 'Please enter valid city'),
  mobile: yup.string().required().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
  .min(10)
  .max(10),
  country: yup.string().required().min(3, "?")
  .max(30, "Input 50 characters or below")
  .matches(/^[A-Za-z ]*$/, 'Please enter valid Country'),
  zip: yup.string().required(),
  profilePic: yup.mixed().required(),
});







const Update = () => {
 

  const classes = useStyles();
  const [list, setList] = React.useState([]);


  
  useEffect(() => {
    user
    .getUserByID(auth.getCurrentUser().id)
    .then((res) => {
      setList(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
  
  
  }, []);

  

function d(e){
console.log(e)
  user.updateUser(auth.getCurrentUser().id,e).then(
    () => {
       
    },
    (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.error(resMessage);
      
    })
}



 












  return (
<Card className={classes.root}>
<Typography
    className={classes.title}
    color="textSecondary"
    gutterBottom
  >
    Profile
 </Typography>
 <CardContent>
    <Formik
    enableReinitialize
    validationSchema={schema}
    onSubmit={(values) => {

      const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));

                    d(formData)
                    console.log(values)       
                  }}
    initialValues={{
      firstname: list.firstname,
      lastname: list.lastname,
      email:list.email,
      username:list.username,
      mobile:list.mobile,
      address:list.address,
      city: list.city,
      zip: list.zip,
      country:list.country,
      profilePic: null,

    }}
  >
    {({
      handleSubmit,
      handleChange,
      handleBlur,
      setFieldValue,
      values,
      touched,
      isValid,
      errors,
    }) => (
      <Form noValidate onSubmit={handleSubmit} >
        <Row className="mb-3">
        <Form.Group
            as={Col}
            md="6"
            controlId="validationFormik103"
            className="position-relative"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="firstname"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
              isInvalid={!!errors.firstname}
            />

            <Form.Control.Feedback type="invalid" tooltip>
              {errors.firstname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationFormik103"
            className="position-relative"
          >
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="lastname"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              isInvalid={!!errors.lastname}
            />

            <Form.Control.Feedback type="invalid" tooltip>
              {errors.lastname}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            md="6"
            controlId="validationFormik103"
            className="position-relative"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />

            <Form.Control.Feedback type="invalid" tooltip>
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="3"
            controlId="validationFormik104"
            className="position-relative"
          >
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Phone Number"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              isInvalid={!!errors.mobile}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.mobile}
            </Form.Control.Feedback>
          </Form.Group>
         
        </Row>
        <Row className="mb-3">
        <Form.Group
            as={Col}
            md="6"
            controlId="validationFormik103"
            className="position-relative"
          >
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              isInvalid={!!errors.address}
            />

            <Form.Control.Feedback type="invalid" tooltip>
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

        <Form.Group
            as={Col}
            md="6"
            controlId="validationFormik103"
            className="position-relative"
          >
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="country"
              name="country"
              value={values.country}
              onChange={handleChange}
              isInvalid={!!errors.country}
            />

            <Form.Control.Feedback type="invalid" tooltip>
              {errors.country}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group
            as={Col}
            md="6"
            controlId="validationFormik103"
            className="position-relative"
          >
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              isInvalid={!!errors.city}
            />

            <Form.Control.Feedback type="invalid" tooltip>
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>


        <Form.Group
            as={Col}
            md="3"
            controlId="validationFormik105"
            className="position-relative"
          >
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zip"
              name="zip"
              value={values.zip}
              onChange={handleChange}
              isInvalid={!!errors.zip}
            />

            <Form.Control.Feedback type="invalid" tooltip>
              {errors.zip}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>






        <Form.Group className="position-relative mb-3">
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
            required
            name="profilePic"
            onChange={(e)=>setFieldValue('profilePic',e.target.files[0])}
            isInvalid={!!errors.profilePic}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {errors.profilePic}
          </Form.Control.Feedback>
        </Form.Group>
       
        <Button type="submit">Submit form</Button>
      </Form>
    )}
  </Formik>

</CardContent>

</Card>




  
     
  );
};
export default Update;



    

 

