import React from 'react';

import styles from './TinyEvent.css';

const tinyEvent = (props) => {
    return (
        <div className={styles.TinyEvent}>
            <img src={props.imageSrc} alt=""/>
            <div>{props.title}</div>
            <span>{props.type}</span>
        </div>
    )
}

export default tinyEvent;
