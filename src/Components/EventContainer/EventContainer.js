import React from 'react';

import {Div, Header, Link, HorizontalScroll} from '@vkontakte/vkui';

import TinyEvent from './TinyEvent/TinyEvent';

import styles from './EventContainer.css';

const eventContainer = (props) => {
    let events = null;
    if (props.events) {
        events = props.events.map(event => (
            <div className={styles.SingleEventWrapper}>
                <TinyEvent 
                    title={event.title}
                    type={event.type}
                    imageSrc={event.image}
                />
            </div>
        ));
    }


    return (
        <Div className={styles.EventContainer}>
            <Header 
                aside={<Link>Показать все</Link>}>
                {props.title}
            </Header>
            <HorizontalScroll>
            <div className={styles.EventsWrapper}>
                {events}
            </div>
            </HorizontalScroll>
        </Div>
    );
}

export default eventContainer;
