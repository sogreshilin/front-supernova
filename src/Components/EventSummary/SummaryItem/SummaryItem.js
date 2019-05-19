import React from 'react';

import {Div} from '@vkontakte/vkui';

import styles from './SummaryItem.css';


const SummaryItem = (props) => {
  return (
    <Div>
        <div className={styles.SummaryItem}>
            {props.children}
            <span>{props.description}</span>
        </div>
    </Div>
  )
}

export default SummaryItem;
