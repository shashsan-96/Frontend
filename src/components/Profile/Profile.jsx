import React, { useState, useEffect } from "react";
import user from "../../api/user.service";
import auth from "../../api/auth.service";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { purple } from "@material-ui/core/colors";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Image from "react-bootstrap/Image";
import a from "../../assets/avt.svg";
import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";


const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

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

const Regular = () => {


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState([]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDel = () => {
    setOpen(false);
    del();
  };

  
   useEffect(() => {
    const id = auth.getCurrentUser().id
    if(id===null)
    {
      window.location.href = "/";
    }
    user
    .getUserByID(id)
    .then((res) => {
      setList(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
    
   const del = () =>{
    user.deleteUserByID(auth.getCurrentUser().id).then((res) => {
      setList(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
   }
    const feedback = () =>
    {
      window.location.href = "/feedBack";
    }


  

  return (
    <div>
 <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Before Deleting"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleDel} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    <Card className={classes.root}>
    
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Profile
        </Typography>
        <Image
          src={a}
          roundedCircle
          style={{ height: "100px", marginLeft: "10px", marginBottom: "20px" }}
        />
        
          <ul className="list-group" style={{ fontSize: "18px" }}>
            <li className="list-group-item d-flex justify-content-between align-items-center">
               First Name
              <span className="badge badge-primary badge-pill">{list.firstname}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Last Name
              <span className="badge badge-primary badge-pill">{list.lastname}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              User Name
              <span className="badge badge-primary badge-pill">{list.username}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
               Email
              <span className="badge badge-primary badge-pill">{list.email}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
               Mobile Number
              <span className="badge badge-primary badge-pill">{list.mobile}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
               Address
              <span className="badge badge-primary badge-pill">{list.address}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
               Zip
              <span className="badge badge-primary badge-pill">{list.zip}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
               City
              <span className="badge badge-primary badge-pill">{list.city}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
               Country
              <span className="badge badge-primary badge-pill">{list.country}</span>
            </li>
          </ul>
       
      </CardContent>

      <CardActions>
        <ColorButton
          variant="contained"
          color="primary"
          className={classes.margin}
          startIcon={<FeedbackIcon />}
          onClick={feedback}
        >
          FeedBacks
        </ColorButton>
      </CardActions>
      <br />
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={handleClickOpen}
        >
          Delete Acc
        </Button>
      </CardActions>
      <br />
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EditIcon />}
          onClick={handleClickOpen}
        >
          Edit _______
        </Button>
      </CardActions>
    </Card>
    </div>
  );
};
export default Regular;
