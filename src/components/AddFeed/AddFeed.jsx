import React, { useEffect } from "react";
import user from "../../api/user.service";
import auth from "../../api/auth.service";
import fd from '../../api/feed.service';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import {
  Button,
  TextField,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
const useStyles = makeStyles({
  root: {
    maxWidth: 525,
    marginLeft: 450,
    marginTop: 40,
    marginBottom: 50,
    paddingBottom: 80,
    backgroundColor: "white",
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
  left: {
    marginLeft: 110,
  },
  formControl:
  {
    marginLeft: 110,
  },
  size:{
    paddingLeft:100
  }
});

const Feed = () => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {

    user.getUser().then(
      (response) => {
        const id = auth.getCurrentUser().id;
        if (id === null) {
          window.location.href = "/";
        }},
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          console.error(resMessage);
        if (resMessage!==null ) {
          auth.logout();
          history.push("/"); 
        }
      })
  });



  let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

  const [message, setText] = React.useState("");
  const [rate, setRate] = React.useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleChange2 = (event) => {
    setRate(event.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fd.createFeedBack(rate,message,today).then(
      (response) => {
        console.log(response+"Done")
       },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          console.error(resMessage);


  });}

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
          <form onSubmit={handleSubmit}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Rate</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rate}
                onChange={handleChange2}
                className={classes.size}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>

            <br />
            <br />

            <TextField
              fullWidth
              multiline
              label="Input Message"
              value={message}
              onChange={handleChange}
              className={classes.left}
            />

            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              className={classes.left}
            >
              Submit
            </Button>
          </form>
        </CardActions>
      </Card>
    </div>
  );
};
export default Feed;
