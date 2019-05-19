import React from 'react';

import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';
import styles from './OtherControls.css';

const otherControls = (props) => {
  return (
    <div className={styles.OtherControls} >
        <div className={styles.SingleControl}>
            <Icon24Favorite />
        </div>
        <div className={styles.SingleControl}>
            <Icon24MoreHorizontal />
        </div>
    </div>
  )
}

export default otherControls;