import React, { useState, useEffect } from "react";
import user from "../../api/user.service";
import auth from "../../api/auth.service";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { Form, Col, Row, Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
const useStyles = makeStyles({
  root: {
    maxWidth: 525,
    marginLeft: 450,
    marginTop: 40,
    marginBottom: 50,
    paddingBottom: 80,
    backgroundColor: "rgb(242, 242, 242)",
  },

  title: {
    textAlign: "center",
    fontSize: 28,
  },
  pos: {
    marginBottom: 12,
  },
  list: {
    fontSize: 18,
  },
});

const Feed = () => {
  const classes = useStyles();

  useEffect(() => {
    const id = auth.getCurrentUser().id;
    if (id === null) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Add FeedBack
          </Typography>
        </CardContent>

        <CardActions>
          <Form>
          <FloatingLabel controlId="floatingSelect" label="Works with selects">
  <Form.Select aria-label="Floating label select example">
    <option>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </Form.Select>
</FloatingLabel>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </CardActions>
      </Card>
    </div>
  );
};
export default Feed;
