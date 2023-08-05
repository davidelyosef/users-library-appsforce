import React from 'react';
import classes from '../style/Masthead.module.scss';

function Masthead() {
  return (
    <section className={classes.masthead}>
      <div className="container">
        <h1>Users library</h1>
      </div>
    </section>
  );
}

export default Masthead;