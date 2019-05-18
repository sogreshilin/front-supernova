import React from 'react';

import {Div} from '@vkontakte/vkui';

import styles from './EventContainer.css'

const eventContainer = (props) => {
  return (
    <Div className={styles.EventContainer}>
        <h3>{props.title}</h3>
    </Div>
  );
}

export default eventContainer;
