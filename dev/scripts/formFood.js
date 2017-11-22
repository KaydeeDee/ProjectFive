import React from 'react';

class FormFood extends React.Component {
    constructor() {
        super();
        this.state = ({
            formOneTotal: [],
            userBringingItem: '',
            itemBeingBrought: ''
        })
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
        const userAndItemSubmitted = firebase.database().ref('formOne');
        const formOne = {
            nameOfUser: this.state.userBringingItem,
            nameOfFood: this.state.itemBeingBrought
        }
        userAndItemSubmitted.push(formOne);
        this.setState({
            userBringingItem: '',
            itemBeingBrought: ''
        });
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('formOne');

        dbRef.on("value", (firebaseData) => {
            const formOneArray = [];
            const formOneData = firebaseData.val();

            for (let formOne in formOneData) {
                formOneArray.push({
                    data: formOneData[formOne],
                    key: formOne
                })
            }

            console.log(formOneArray);

        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="userBringingItem" placeholder="What's your name?" onChange={this.handleChange} value={this.state.userBringingItem} />

                <input type="text" name="itemBeingBrought" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.itemBeingBrought} />

                <button>Submit</button>
            </form>
        )
    }
}

// only one export per module per default
export default FormFood;