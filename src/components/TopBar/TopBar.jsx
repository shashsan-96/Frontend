import React, { useState, useEffect } from "react";
import auth from "../../api/auth.service";
const TopBar = () => {
  const [use, setUse] = useState(false);

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) {
      if(user.roles[0]==="ROLE_USER"){
        setUse(true);
      }
     
        }
        else{
          setUse(false);
        }
  }, []);










  return (
    <div className='top-bar pt-1 pb-1 text-light'>
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex pt-2 pb-2'>
            
          </div>
          <div className='d-flex pt-2 pb-2'>
            <div className='social-media d-flex align-item-center'>
              <a href='!#' className='text-light'>
                <i className='fas fa-shopping-cart mr-4' />
              </a>
              {use && (
              <a href='/profile' className='text-light'>
                <i className='fas fa-user mr-4' />
              </a>)}
              <a href='!#' className='text-light'>
                <i className='fa fa-history mr-4' />
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

