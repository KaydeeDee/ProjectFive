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
  constructor() {
    super();
    this.state = {
      user:null
    }
    this.signOut = this.signOut.bind(this);
  }

  signOut(){
    firebase.auth().signOut();
  }
    componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        this.setState({
          user
        })
      })
    }
    render() {
      let loggedIn = null;
      if(this.state.user !== null) {
        loggedIn = (
          <div>
            <section name="test1" className="second-page">
              <FormEvents />
              <button className="button--signOut" onClick={this.signOut}>Sign Out</button>
            </section>
          </div>
        )
      }
      return (
        <div>
          <main className="wrapper--max">
              <header className="first-page-header--background">
              <nav className="wrapper--footer-nav">
                <a href="https://twitter.com/intent/tweet?hashtags=havefunthough" className="tweet" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
              </nav>
              <div className="first-page-header--center-wording wrapper--inner">
                  <h1>hello</h1>
                  <Login />
                  <Link to="test1" spy={true} smooth={true} offset={5} duration={1000}><i className="fa fa-chevron-down fa-5x" aria-hidden="true" aria-label="Go Down To Main Section"></i></Link>
                </div>
                <div className="wrapper--footer-nav first-page-header--bottom-a">
                  <a href="#">Made By Katie D'Angelo!</a>
                </div>
              </header>
              {loggedIn}
            </main>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
