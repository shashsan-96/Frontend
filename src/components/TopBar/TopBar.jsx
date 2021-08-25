import React, { useState, useEffect } from "react";
import auth from "../../api/auth.service";
import userS from '../../api/user.service'
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  orange: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  }
}));


const TopBar = () => {
  const [use, setUse] = useState(false);
  const [name,setName] = useState('');
  useEffect(() => {

    userS.getUser().then(
      (response) => {

        const user = auth.getCurrentUser();
        setName(user.username.charAt(0));
        if (user) {
          if(user.roles[0]==="ROLE_USER"){
            setUse(true);
          }
         
            }
            else{
              setUse(false);
            }



      },
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
          
        }
      }
    );




    
  }, []);


  const classes = useStyles();







  return (
    <div className='top-bar pt-1 pb-1 text-light'>
      <div className='container-sm'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex pt-2 pb-2'>
            
          </div>
          <div className='d-flex pt-2 pb-2'>
            <div className='social-media d-flex align-item-center'>
            {use && (<a href='!#' className='text-light'>
                <i className='fas fa-shopping-cart mr-4' />
              </a>)}
              
              {use &&(<a href='!#' className='text-light'>
                <i className='fa fa-history mr-4' />
              </a>)}
              {use&&(
                <a href='/profile' className='text-light'>
                <Avatar alt="Remy Sharp" className={classes.orange} >
                 {name}
                </Avatar>
                </a>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

