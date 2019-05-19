import React from 'react';
import {Div} from '@vkontakte/vkui';


import styles from './EventControls.css';

import LikesControls from './LikesControls/LikesControls';
import OtherControls from './OtherControls/OtherControls';

const eventControls = () => {
    return (
        <div className={styles.EventControls}>
            <Div>
                <div className={styles.EventControlsContainer}>
                    <OtherControls />
                    <LikesControls />
                </div>
            </Div>
        </div>
    )
}

export default eventControls;
