import React,{Component} from 'react'
import Aux from '../../hoc/Aux/aux'
import Burger from '../../Components/Burger/Burger'
import BurgerControls from '../../Components/Burger/BurgerControls/BurgerControls'
import Modal from '../../Components/Ui/Modal/Modal'
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary"
import axios from '../../axiosOrder'
import Spinner from '../../Components/Ui/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../Store/actions/index';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing : true});
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,ele) => {
             return sum+ele;
            }, 0);

        return sum > 0;
    }

    purchaseCancelPurchase = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname : '/Checkout'
        })
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients Can't Be Loaded</p> :<Spinner />

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BurgerControls
                        isAuth = {this.props.isAuthenticated}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         purchaseContinue={this.purchaseContinueHandler}
                                         purchaseCancel={this.purchaseCancelPurchase}
                                         totalPrice={this.props.price}/>;
        }

        if(this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}
                       modalClose={this.purchaseCancelPurchase}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient()),
        onInitPurchase : () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));