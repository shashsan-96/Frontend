import React from 'react';

const topBar = () => {
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
              <a href='!#' className='text-light'>
                <i className='fas fa-user mr-4' />
                
              </a>
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

export default topBar;

