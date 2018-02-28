import React from 'react';
import classes from './Spinner.css';
const spinner = () => (
    <div className={classes.spinner}>
        <div className={classes.doubleBounce1}></div>
        <div className={classes.doubleBounce2}></div>
    </div>
);

export default spinner;