import React from 'react';

import EventControls from '../EventControls/EventControls';

import styles from './ImageContent.css';

const ImageContent = (props) => {
    return (
        <div className={styles.ImageContent}>
            <img src={props.imageSrc} alt=""/>
            <EventControls />
        </div>
    )
}

export default ImageContent;
