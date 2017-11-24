import React from 'react';
import ReactDOM from 'react-dom';
import Scroll, { scroller } from 'react-scroll';
import Login from "./login";
import FormFood from './formFood';
import FormEvents from './formEvents';

// smooth scroll component
var Link = Scroll.Link;

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
              <header className="first-page-header--background">
                <h1>hello</h1>
                <Login />
                <Link to="test1" spy={true} smooth={true} offset={-20} duration={1000}>start </Link>
              </header>
            <section name="test1" className="main-page--header">
                <h1>ahh potlucks!</h1>
              
                <FormEvents />
              
              </section>
              
              <section className="main-page--food-form">
              </section>

              <section className="main-page--food-results">
                <ul>
                </ul>
              </section>
            </main>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
