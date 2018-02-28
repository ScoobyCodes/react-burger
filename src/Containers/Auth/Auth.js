import React , {Component} from 'react' ;
import Input from  '../../Components/Ui/Input/Input';
import Button from '../../Components/Ui/Button/Button';
import classes from './Auth.css';
import * as actions from '../../Store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/Ui/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject} from "../../shared/utility";

class Auth extends Component {
    state = {
        controls : {
            email: {
                elementType : 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType : 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength : 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp : false
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value , rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid =  value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event , controlName) => {
        const updatedControls = updateObject(this.state.controls,{
            [controlName] : updateObject(this.state.controls[controlName],{
                value :event.target.value,
                valid :this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched : true
            })
        });

        this.setState({controls : updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    submitAuthHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        })
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id : key,
                config: this.state.controls[key]
            })
        }


        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}
                   changed={(event) => this.inputChangeHandler(event,formElement.id)}/>
        ));

        if(this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;
        console.log(this.props.error);
        if(this.props.error) {
            errorMessage = (
              <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect}/>
        }

        return (
          <div className={classes.Auth}>
              {authRedirect}
              {errorMessage}
              <form onSubmit={this.submitHandler}>
                  {form}
                  <Button btnType="Success">SUBMIT</Button>
              </form>
              <Button clicked={this.submitAuthHandler} btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
          </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger : state.burgerBuilder.building,
        authRedirect : state.auth.authRedirect
    };
}

const mapDispatchTOProps = dispatch => {
    return {
        onAuth : (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchTOProps)(Auth);