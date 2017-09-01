import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            username: "",
            password: "",
            email: "",
            usernameError: "",
            passwordError: "",
            passwordConfirm: "",
            emailError: "",
            userExist: "",
            emailExist: "",
            isLoading: ""
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);

    }
    onChange(event) {
        const name = event.target.name,
            value = event.target.value;
        // re = /\S+@\S+\.\S+/,
        // emailValidate = re.test(value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(formData) {
        this.setState({ isLoading: true })
        formData.preventDefault();
        this.props.onSubmit(this.state)
            .then((data) => {
                Materialize.toast('Sign Up Successfully', 5000, 'blue',
                    () => {
                        this.setState({ isLoading: false })
                        window.location.href = "/dashboard";
                    });
            })
    }

    onFocus(e) {
        const name = e.target.name;
        switch (name) {
            case "cpassword":
                this.setState({ passwordConfirm: "" })
                break;
            case "username":
                this.setState({ usernameError: "", userExist: "" })
                break;
            case "password":
                this.setState({ passwordError: "" })
                break;
            case "cpassword":
                this.setState({ passwordConfirm: "" })
                break;
            case "email":
                this.setState({ emailError: "", emailExist: "" })
        }
    }

    onBlur(e) {
        const name = e.target.name,
            value = e.target.value,
            passwordField = document.getElementById('password').value;
        switch (name) {
            case "password":
                if (value.length < 5 || !value) {
                    this.setState({ passwordError: "Password must be a minimum of 8 characters" });
                    return false;
                } else {
                    this.setState({ passwordError: "" });
                    return true;
                }
            case "email":
                this.props.EmailExist({ email: value })
                    .then((data) => {
                        if (data.length > 1) {
                            this.setState({ emailExist: data })
                            return false;
                        } else {
                            return true;
                        }
                    });
                break;
            case "cpassword":
                if (value !== passwordField) {
                    this.setState({ passwordConfirm: "Confirm password must be equal to password" });
                    return false;
                } else {
                    this.setState({ passwordConfirm: "" });
                    return true;
                }
            case "username":
                this.props.UserExist({ username: value })
                    .then((data) => {
                        if (data.length > 1) {
                            this.setState({ userExist: data })
                        } else {
                            this.setState({ userExist: '' })
                        }
                    })
                if (value.length < 5 || !value) {
                    this.setState({ usernameError: "Username must be a minimum of 5 characters" });
                    return false;
                } else {
                    this.setState({ usernameError: "" });
                    return true;
                }

        }
    }

    render() {
        const { userExist } = this.props;
        return (
            <div id="register" className="col s12">
                <form className="col s12" id="form-validate" onSubmit={this.handleSubmit}>
                    <div className="form-container">
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="fullName"
                                    type="text"
                                    onChange={this.onChange}
                                    className="validate" required />
                                <label htmlFor="fullName">Full Name</label>
                                <div style={{ color: "red" }}>{this.state.fullNameError} </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="username"
                                    type="text"
                                    onBlur={this.onBlur}
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    className="validate" required />
                                <label htmlFor="username">Username</label>
                                <div style={{ color: "red" }}>{this.state.userExist} </div>
                                <div style={{ color: "red" }}>{this.state.usernameError} </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="email"
                                    type="email"
                                    onChange={this.onChange}
                                    onBlur={this.onBlur}
                                    onFocus={this.onFocus}
                                    className="validate" required />
                                <label htmlFor="email">Email</label>
                                <div style={{ color: "red" }}>{this.state.emailError} </div>
                                <div style={{ color: "red" }}>{this.state.emailExist} </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="password"
                                    type="password"
                                    id="password"
                                    onChange={this.onChange}
                                    onBlur={this.onBlur}
                                    onFocus={this.onFocus}
                                    className="validate" required />
                                <label htmlFor="password">Password</label>
                                <div style={{ color: "red" }}>{this.state.passwordError} </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="cpassword"
                                    onChange={this.onChange}
                                    onBlur={this.onBlur}
                                    onFocus={this.onFocus}
                                    type="password" className="validate" />
                                <label htmlFor="password-confirm">Password Confirmation</label>
                                <div style={{ color: "red" }}>{this.state.passwordConfirm} </div>
                            </div>
                        </div>
                        <center>
                            <button className="btn waves-effect waves-light teal" type="submit" name="submit" disabled={this.state.isLoading}>Submit</button>
                        </center>
                    </div>

                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { userExist: state.userExist }
}
export default connect(mapStateToProps)(Register)