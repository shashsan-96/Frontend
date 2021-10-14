import React from "react";
import bgImage from "../../assets/bg4.jpg";
import a from '../../assets/a.jpg'
import b from '../../assets/c.jpg'
import c from '../../assets/d.jpg'
import d from '../../assets/e.jpg'
import e from '../../assets/f.jpg'
import f from '../../assets/g.jpg'
import g from '../../assets/h.jpg'
import h from '../../assets/i.jpg'
import book from "../../assets/book.png";
import clock from "../../assets/clock.png";
import loupe from "../../assets/loupe.png";
import {  Card ,Image} from "react-bootstrap";

const home = () => {
  return (
    <div id="home">
      <div>
        <div
          className="home-content p-5"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="intro container text-center text-light">
            <h1 className="title">WELCOME</h1>
            <h2 className="sub-title mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              laborum minus molestiae.
            </h2>
          </div>
        </div>
      </div>
      <div className="se1">
        <div class="container">
          <div class="row text-center text-lg-start">
            <div class="col-lg-3 col-md-4 col-6">
              <Card className="card1">
                <Card.Img variant="top" src={loupe} style={{ height: "100px",width:'100px',marginLeft:"70px" }}/>
                <Card.Body>
                  
                  <Card.Text>
                  We will help you find the exact book that no other store has
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div class="col-lg-3 col-md-4 col-6">
              <Card className="card1">
                <Card.Img variant="top" src={book} style={{ height: "100px",width:'100px',marginLeft:"70px" }}/>
                <Card.Body>
                  
                  <Card.Text>
                  You get to choose from multiple book categories and genres
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div class="col-lg-3 col-md-4 col-6">
              <Card className="card1">
                <Card.Img variant="top" src={clock} style={{ height: "100px",width:'100px',marginLeft:"70px" }}/>
                <Card.Body>
                 
                  <Card.Text>
                  We stock over 200 thousand books for immediate delivery
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className='se2'>

         
      <div class="container">
      <h2 class="fw-light text-center text-lg-start mt-4 mb-0">Featured New Release Books </h2>
      <hr class="mt-2 mb-5"/>

          <div class="row text-center text-lg-start">
            <div class="col-lg-3 col-md-4 col-6">
            <Image src={a} thumbnail style={{ height: "200px"}} />
            </div>

            <div class="col-lg-3 col-md-4 col-6">
            <Image src={b} thumbnail style={{ height: "200px"}}/>
            </div>

            <div class="col-lg-3 col-md-4 col-6">
            <Image src={c} thumbnail style={{ height: "200px"}}/>
            </div>

            <div class="col-lg-3 col-md-4 col-6">
            <Image src={d} thumbnail style={{ height: "200px"}}/>
            </div>
          </div>
        </div>
      </div>

      <div className='se3'>
      <h4 class="fw-light text-center text-lg-start mt-4 mb-0">Read books from the best publishers</h4>
       <p>
We are online retail store selling books published and edited by the most competent and recognized publishers.
Enjoy the best possible online book buying experience with our reliable book store!</p>


      </div>



      <div className='se4'>

         
      <div class="container">
      <h2 class="fw-light text-center text-lg-start mt-4 mb-0">Best sellers in Books</h2>
      <hr class="mt-2 mb-5"/>

          <div class="row text-center text-lg-start">
            <div class="col-lg-3 col-md-4 col-6">
            <Image src={e} thumbnail style={{ height: "200px"}} />
            </div>

            <div class="col-lg-3 col-md-4 col-6">
            <Image src={f} thumbnail style={{ height: "200px"}}/>
            </div>

            <div class="col-lg-3 col-md-4 col-6">
            <Image src={g} thumbnail style={{ height: "200px"}}/>
            </div>

            <div class="col-lg-3 col-md-4 col-6">
            <Image src={h} thumbnail style={{ height: "200px"}}/>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default home;
