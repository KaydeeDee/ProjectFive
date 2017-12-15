import React from 'react';
import FormFood from './formFood';


// when h2 party time is clicked, show the list items associated to it, while not removing the others.
class TogglingEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEventList: true,
            event: props.event
        }
        this.toggleEvents = this.toggleEvents.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    // toggling events to show the food lists under each event
    toggleEvents() {
        
        this.setState({
            showEventList: !this.state.showEventList
        })
    }
    renderFood(key) {
        if (this.state.showEventList === false){
            return (<FormFood keyOfEvent={key} />)
        }
        else {
            return null;
        }
    }

    // delete button for events
    removeItem(itemToRemove) {
        const userResponse = confirm('Are you sure you want to delete this event?')
        if (userResponse == true) {
            const dbRef = firebase.database().ref(`events/${itemToRemove}`);
            dbRef.remove();
        }
        else {
            return null;
        }
    }
    
    render() {
        return (
                <div className="second-page--event-boxes">
                    <i className="fa fa-thumb-tack fa-2x" aria-hidden="true"></i>
                    <h3 onClick={() => this.toggleEvents()} className="second-page--event-boxes-eventName">{this.state.event.data.nameOfParty}</h3>
                    <h3 onClick={() => this.toggleEvents()} className="second-page--event-boxes-DetailsOfParty"> {this.state.event.data.detailsOfParty}</h3> 
                    <h4 onClick={() => this.toggleEvents()}>See list ✚</h4>
                    {this.renderFood(this.state.event.key)}
                    <button onClick={() => this.removeItem(this.state.event.key)} className="deleteEvent--button">𝗫 Delete Event</button> 
                </div>
        )
    }
}

class FormEvents extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],
            whatParty: '',
            partyDetails: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // sending info to firebase for events
    handleSubmit(event) {
        event.preventDefault();
        const nameParty = this.state.whatParty;
        const detailsAboutParty = this.state.partyDetails;
        if (nameParty && detailsAboutParty){
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
        }else {
            alert("You can't submit empty feilds!");
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('events');
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
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
        });
    }
    render() {
        return (
        <div>
            <div className="second-page---top-bar">
                    <div className="wrapper--inner">
                        <h2>Your Events</h2>
                        <form onSubmit={this.handleSubmit} className="userForm second-page--eventsForm">


                            <input type="text" name="whatParty" placeholder="Name of the event" onChange={this.handleChange} value={this.state.whatParty} />
                            

                            <input type="text" name="partyDetails" placeholder="What day is it happening on?" onChange={this.handleChange} value={this.state.partyDetails} />

                            <button>Add Event</button>
                        </form>
                    </div>
                </div>
            <div>
                    <section className="wrapper--inner second-page--event-boxes-spacing">
                    {this.state.events.map((event) => {
                        return <TogglingEvents event={event} key={event.key}/>
                    })}
                    
                </section>
            </div>
        </div>
        )
    }
}

export default FormEvents;