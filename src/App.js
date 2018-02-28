import React, { Component } from 'react';
import Layout from './hoc/Layout/layout'
import BurgerBuilder from'./Containers/BurgerBuilder/BurgerBuilder'
import {Route , Switch , withRouter,Redirect} from 'react-router-dom';
import Logout from './Containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './Store/actions/index';
import asynComponent from './hoc/asynComponent'

const asynCheckout = asynComponent(() => {
    return import('./Containers/Checkout/Checkout');
});

const asynOrders = asynComponent(() => {
    return import('./Containers/Orders/orders');
});

const asynAuth = asynComponent(() => {
    return import('./Containers/Auth/Auth');
});

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }
  render() {
        let routes = (
          <Switch>
              <Route path="/Auth" component={asynAuth}/>
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/"/>
          </Switch>
        );

        if(this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asynCheckout} />
                    <Route path="/orders" component={asynOrders}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/Auth" component={asynAuth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/"/>
                </Switch>
            )
        }
    return (
      <div>
          <Layout>
              {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    };
};

const mapToDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp : () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps,mapToDispatchToProps)(App));
