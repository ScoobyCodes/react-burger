import React from 'react';
import Button from '../../Ui/Button/Button'
import Aux from '../../../hoc/Aux/aux'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
        });

    return (
      <Aux>
          <h3>Your Order</h3>
          <p>A delicous burger with following Ingredients.</p>
          <ul>
              {ingredientSummary}
          </ul>
          <p>Continue to Checkout?</p>
          <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
          <Button btnType="Danger" clicked={() => props.purchaseCancel()}>CANCEL</Button>
          <Button btnType="Success" clicked={() => props.purchaseContinue()}>CONTINUE</Button>
      </Aux>
    );
};
export default orderSummary;