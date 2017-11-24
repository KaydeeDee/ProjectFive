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

    removeItem(itemToRemove) {
        const userResponse = confirm('Are you sure you want to delete this event?')
        console.log(itemToRemove);
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
                    <h2 onClick={() => this.toggleEvents()}>{this.state.event.data.nameOfParty} {this.state.event.data.detailsOfParty}</h2>
                    {this.renderFood(this.state.event.key)}
                    <button onClick={() => this.removeItem(this.state.event.key)}>Delete Event 𝗫</button> 
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
        // console.log(event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }


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
            alert('Please put in a full word!');
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

        // dbRef.on("value", (firebaseData) => {
        //     const eventsArray = [];
        //     const eventsData = firebaseData.val();

        //     for (let typeOfParty in eventsData) {
        //         eventsArray.push({
        //             data: eventsData[typeOfParty],
        //             key: typeOfParty
        //         })
        //     }

        //     this.setState({
        //         events: eventsArray
        //     });

        // });
    }

    render() {
        return (
        <div>
            <div className="second-page---top-bar">
                <div className="wrapper--inner">
                    <form onSubmit={this.handleSubmit}>


                        <input type="text" name="whatParty" placeholder="What's the party?" onChange={this.handleChange} value={this.state.whatParty} />
                        

                        <input type="text" name="partyDetails" placeholder="Tell me about the party" onChange={this.handleChange} value={this.state.partyDetails} />

                        <button>finished!</button>
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