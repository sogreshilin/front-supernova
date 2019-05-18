import React from 'react';

import styles from './TinyEvent.css';

const tinyEvent = (props) => {
    return (
        <div className={styles.TinyEvent}>
            <img src='/assets/images/persik.png' alt=""/>
            <div>Мое мероприятие</div>
            <span>22.04.19</span>
        </div>
    )
}

export default tinyEvent;
