import React from 'react';

import Icon24ThumbUp from '@vkontakte/icons/dist/24/thumb_up';
import Icon24ThumbDown from '@vkontakte/icons/dist/24/thumb_down';

import styles from './LikesControls.css';

const likesControls = (props) => {
  return (
    <div className={styles.LikesControls} >
        <div className={styles.LikesControl}>
            <Icon24ThumbUp />
        </div>
        <div className={styles.LikesControl}>
            <Icon24ThumbDown />
        </div>
    </div>
  )
}

export default likesControls;
