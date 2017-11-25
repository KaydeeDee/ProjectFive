import React from 'react';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            formToShow: '',
            email: '',
            password: '',
            confirm: ''
        };
        this.formToShow = this.formToShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }
    formToShow(event) {
        event.preventDefault();
        this.setState({
            formToShow: event.target.className
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    signup(event) {
        event.preventDefault();
        if (this.state.password === this.state.confirm && this.state.password.length <= 6) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                alert("You have successfully signed up! Click the arrow below to start making your lists!")

            })
        } else {
            alert("Your password must be at least 6 characters long and should match what was put in 'confirm' password. Please try again!");
        }

    }
    login(event) {
        event.preventDefault();
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
                alert("You have successfully logged in! Click on the arrow below to get started.");
        });
    

    }
    render() {
        let loginForm = '';
        if (this.state.formToShow === 'signup') {
            loginForm = (
                <form onSubmit={this.signup} className="userForm  signUp">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" onChange={this.handleChange} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" placeholder="Must be at least 6 characters" name="password" onChange={this.handleChange} />
                    <label htmlFor="confirm">Confirm Password: </label>
                    <input type="password" name="confirm" onChange={this.handleChange} />
                    <button className="signUpForm--button">Sign In</button>
                </form>
            );
        }
        else if (this.state.formToShow === "login") {
            loginForm = (
                <form onSubmit={this.login} className="userForm LogIn">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" onChange={this.handleChange} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" onChange={this.handleChange} />
                    <button className="signUpForm--button">Log In</button>
                </form>
            );
        }
        return (
            <div>
                <div className="header--login">
                    <ul>
                        <li><a href="" className="signup" onClick={this.formToShow}>Sign Up</a></li>
                        <li><a href="" className="login" onClick={this.formToShow}>Log In</a></li>
                    </ul>
                </div>
            {loginForm}
            </div>
        )
    }
}

export default Login;