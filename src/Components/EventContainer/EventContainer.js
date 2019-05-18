import React from 'react';

import {Div, Header, Link, HorizontalScroll} from '@vkontakte/vkui';

import TinyEvent from './TinyEvent/TinyEvent';

import styles from './EventContainer.css';

const itemStyle = {
    flexShrink: 0,
    display: 'flex',
    flexDirection:
    'column',
    alignItems: 'center',
    fontSize: 12
  };

const eventContainer = (props) => {
  return (
    <Div className={styles.EventContainer}>
        <Header 
            aside={<Link>Показать все</Link>}>
            {props.title}
        </Header>
        <HorizontalScroll>
          <div className={styles.EventsWrapper}>
            <div className={styles.SingleEventWrapper}>
                <TinyEvent />
            </div>
            <div className={styles.SingleEventWrapper}>
                <TinyEvent />
            </div>
            <div className={styles.SingleEventWrapper}>
                <TinyEvent />
            </div>
            <div className={styles.SingleEventWrapper}>
                <TinyEvent />
            </div>
          </div>
        </HorizontalScroll>
    </Div>
  );
}

export default eventContainer;
