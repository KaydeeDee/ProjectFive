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
            alert("Please make sure that you're submitting at leasst one word per 'box'");
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
                <div className="background--foodForm">
                    <form onSubmit={this.handleSubmit} className="foodForm userForm">
                        <input type="text" name="userBringingItem" placeholder="What's your name?" onChange={this.handleChange} value={this.state.userBringingItem} />

                        <input type="text" name="itemBeingBrought" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.itemBeingBrought} />

                        <button>Submit</button>
                    </form>
                </div>
                {this.state.formOneTotal.map((element) => {
                    return <div key={element.key}> 
                        <p> {element.data.nameOfUser} - {element.data.nameOfFood} <button onClick={() => this.removeItem(element.key)} className="deleteFood--button">𝗫</button></p> 
                    </div>
                })}
            </div>
        )
    }
}

export default FormFood;