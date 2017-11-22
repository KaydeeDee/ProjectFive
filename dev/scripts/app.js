import React from 'react';
import ReactDOM from 'react-dom';
import FormFood from './formFood';

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
  // constructor() {
  //   super();
  //   this.state = {
  //     userBringingItem: '',
  //     itemBeingBrought: ''
  //   }
  // }
    render() {
      return (
        <div>
          <main>
            <header className="first-page--header">
              <h1>hello</h1>
              <button>start</button>
            </header>
            <section className="main-page--header">
            <h1>ahh potlucks!</h1>
            </section>
            <section className="main-page--food-form">
            <FormFood />
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
