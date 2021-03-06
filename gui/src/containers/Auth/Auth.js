import React from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity, createForm } from "../../shared/utility";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        label: "Email",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        label: "Password",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    IsSignup: true,
  };

  componentDidMount() {
    if (this.props.auth.token != null) {
      this.props.onSetAuthRedirectPath("/profile");
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({
      controls: updatedControls,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.props.onLogin(email, password);
  };

  switchAuthModeHandler = () => {
    this.props.history.push("/signup");
  };

  render() {
    let form = createForm(this.state.controls, this.inputChangedHandler);

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p style={{ color: "red" }}>{this.props.auth.error}</p>;
    }

    let authRedirect = null;
    if (this.props.auth.token !== null) {
      authRedirect = <Redirect to={this.props.auth.authRedirectPath} />;
    }

    return (
      <div className={classes.MainContainer}>
        <div className={classes.Container}>
          <h2>Login</h2>
          {authRedirect}
          {errorMessage}

          <form onSubmit={this.submitHandler}>
            {form}
            <Button btnType="Info"> Submit </Button>
            <Button btnType="Info" clicked={this.switchAuthModeHandler}>
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => {
      dispatch(actions.login(email, password));
    },
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
