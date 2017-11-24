import React from 'react';

class FormFood extends React.Component {
    constructor() {
        super();
        this.state = {
            formOneTotal: [],
            userBringingItem: '',
            itemBeingBrought: ''
        }
        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.removeItem = this.removeItem.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(this.props.keyOfEvent);
        const userItem = this.state.userBringingItem.trim();
        const itemBringing = this.state.itemBeingBrought.trim();

        if (userItem && itemBringing) {
            const userAndItemSubmitted = firebase.database().ref('events/' + this.props.keyOfEvent + '/guests');
            const formOne = {
                nameOfUser: this.state.userBringingItem,
                nameOfFood: this.state.itemBeingBrought
            }
            userAndItemSubmitted.push(formOne);
            this.setState({
                userBringingItem: '',
                itemBeingBrought: ''
            });
        } else {
            alert("Please put in a full word!");
        }
    
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('events/' + this.props.keyOfEvent + '/guests');

        dbRef.on("value", (firebaseData) => {
            const formOneArray = [];
            const formOneData = firebaseData.val();

            for (let formOne in formOneData) {
                formOneArray.push({
                    data: formOneData[formOne],
                    key: formOne
                })
            }

            this.setState({
                formOneTotal: formOneArray
            });

        });
    }

    removeItem(itemToRemove) {
        const userResponse = confirm('Are you sure you want to delete this?')
        if (userResponse == true) {
            console.log(itemToRemove);
            const dbRef = firebase.database().ref('events/' + this.props.keyOfEvent + '/guests/' + itemToRemove);
            dbRef.remove();
        }
        else {
            return null;
        }
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="userBringingItem" placeholder="What's your name?" onChange={this.handleChange} value={this.state.userBringingItem} />

                    <input type="text" name="itemBeingBrought" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.itemBeingBrought} />

                    <button>Submit</button>
                </form>
                {this.state.formOneTotal.map((element) => {
                    return <div key={element.key}> <p>{element.data.nameOfUser} {element.data.nameOfFood}
                    </p> 
                    
                        <button onClick={() => this.removeItem(element.key)}>Delete List Item 𝗫</button> 
                    </div>
                })}
            </div>
        )
    }
}

// only one export per module per default
export default FormFood;