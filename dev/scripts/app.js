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
  constructor() {
    super();
    this.state = {
      events: [],
      whatParty: '',
      partyDetails: '',
      showEventList: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderLists = this.renderLists.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  
  handleChange(event) {
    // console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    const dbRef = firebase.database().ref('events');
    const typeOfParty = {
      nameOfParty: this.state.whatParty,
      detailsOfParty: this.state.partyDetails
    }
    dbRef.push(typeOfParty);
    this.setState({
      whatParty: '',
      partyDetails: ''
    });
  }

  componentDidMount() {
    const dbRef = firebase.database().ref('events');

    dbRef.on("value", (firebaseData) => {
      const eventsArray = [];
      const eventsData = firebaseData.val();

      for (let typeOfParty in eventsData) {
        eventsArray.push({
          data: eventsData[typeOfParty],
          key: typeOfParty
        })
      }

      this.setState({
        events: eventsArray
      });

    });
  }
  toggle(key) {
    console.log(key)
    this.setState({
      showEventList: !this.state.showEventList,
      showKey: key
    })
  }
  renderLists() {
    if (this.state.showEventList === false) {
      return (<div>this will be a single event with a form  <FormFood /> </div>)
    } else {
      return (
        this.state.events.map((element) => {
          return <p key={element.key} onClick={() => this.toggle(element.key)}>{element.data.nameOfParty}{element.data.detailsOfParty}</p>
        })
      )
    }
  }
    render() {
      return (
        <div>
          <main>
            <header className="first-page--header">
              <h1>hello</h1>
              <button>start</button>
            </header>
            <section>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="whatParty" placeholder="What's the party?" onChange={this.handleChange} value={this.state.whatParty} />

                <input type="text" name="partyDetails" placeholder="Tell me about the party" onChange={this.handleChange} value={this.state.partyDetails} />

                <button>finished!</button>
              </form>
            </section>
            <section className="main-page--header">
            <h1>ahh potlucks!</h1>
            </section>
            {this.renderLists()}
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
