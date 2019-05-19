import React from 'react';

import {CellButton, Cell} from '@vkontakte/vkui';


import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

import styles from './ShiftControls.css';

const ShiftControls = () => {
    return (
        <div className={styles.ShiftControls}>
            <CellButton before={<Icon24BrowserBack />}>Назад</CellButton>
            <CellButton before={<Icon24BrowserForward />}>Вперед</CellButton>
        </div>
    );
}

export default ShiftControls;
