import React from 'react';
import Link from '../Link/Link'


const footer = () => {

  var d = new Date();
  const n = d.getFullYear();

  return (
    <footer className=''>
      <div className='container text-light pt-5'>
        <div className='row'>
          <div className=' col-lg-3 '>
            <div className='footer-title'>
              <h6>About Us</h6>
            </div>
            <div className='footer-content'>
              <p>
                <small className='text-muted'>
                 Akura is a website for an extensive collection of books,
                 stationery and magazines.Not only a “one-stop shop” for book lovers 
                 but also an interactive and innovative destination designed to 
                 make it fun and exciting to discover and shop for new books and 
                 gifts online.
                </small>
              </p>
              
            </div>
          </div>
          <div className=' col-lg-1 '>

          </div>
          <div className=' col-lg-3 '>
            <div className='footer-title'>
              <h6>Quick Links</h6>
            </div>
            <div className='footer-content'>
              <ul className='list-group quick-links'>
                <li>
                  <Link target='/' offset={-120}>
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link target='/'>FAQ</Link>
                </li>
              </ul>
            </div>
          </div>



          <div className=' col-lg-3 '>
            <div className='footer-title'>
              <h6>Quick Links</h6>
            </div>
            <div className='footer-content'>
              <ul className='list-group quick-links'>
                <li>
                  <Link target='/'>Delivery Policy</Link>
                </li>
                <li>
                  <Link target='/'>Return Policy</Link>
                </li>
                
              </ul>
            </div>
          </div>


         
          <div className='col-lg-2 '>
            <div className='footer-title'>
              <h6>Contact Us</h6>
            </div>
            <div className='footer-content'>
              <p className='text-muted'>
                <small>Address : 123 main street Colombo</small>
              </p>
              <p className='text-muted'>
                <small>Phone : 011 111 1111</small>
              </p>
              <p className='text-muted'>
                <small>E-mail : Akura@email.com</small>
              </p>
              <div className='social-media mt-4'>
                <a href='!#' className='text-light'>
                  <i className='fab fa-facebook-f mr-4' />
                </a>
                <a href='!#' className='text-light'>
                  <i className='fab fa-twitter mr-4' />
                </a>
                <a href='!#' className='text-light'>
                  <i className='fab fa-instagram mr-4' />
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bottom-footer pt-3 pb-3 text-center'>
        <small>© All Right Reserved {n}</small>
      </div>
    </footer>
  );
};

export default footer;
