import React from 'react';
import ReactDOM from 'react-dom';
import Scroll, { scroller } from 'react-scroll';
import Login from "./login";
import FormFood from './formFood';
import FormEvents from './formEvents';

// smooth scroll component
const Link = Scroll.Link;

//  Initialize Firebase
const config = {
  apiKey: "AIzaSyBV73LfoJV9Nj5VEkyZrP1cGRciN5t0agg",
  authDomain: "potluck-project4.firebaseapp.com",
  databaseURL: "https://potluck-project4.firebaseio.com",
  projectId: "potluck-project4",
  storageBucket: "potluck-project4.appspot.com",
  messagingSenderId: "749232518595"
};
firebase.initializeApp(config);

class App extends React.Component {
    render() {
      return (
        <div>
            <main>
              <header className="first-page-header--background wrapper--max">
              <div className="first-page-header--center-wording wrapper--inner">
                  <h1>hello</h1>
                  <Login />
                <Link to="test1" spy={true} smooth={true} offset={5} duration={1000}><i className="fa fa-chevron-down fa-5x" aria-hidden="true" aria-label="Go Down To Main Section"></i></Link>
                </div>
              </header>
            <section name="test1" className="second-page">
                
              
                <FormEvents />
              
              </section>
              
              {/* <section className="main-page--food-form">
              </section>

              <section className="main-page--food-results">
                <ul>
                </ul>
              </section> */}
          
            
            </main>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
