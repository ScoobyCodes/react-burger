import React , {Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux';

class Checkout extends Component {


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/"/>
        let purchasedRedirect
        if(this.props.ings) {
             purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
        }
        if(this.props.ings) {
            summary = (
               <div>
                   {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings}
                                 checkoutCancelled={this.checkoutCancelledHandler}
                                 checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
               </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);