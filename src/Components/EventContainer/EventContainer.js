import React from 'react';

import EVENT_TYPES from '../../Services/Dictionary/EventType';


import {Div, Header, Link, HorizontalScroll, InfoRow} from '@vkontakte/vkui';

import TinyEvent from './TinyEvent/TinyEvent';

import styles from './EventContainer.css';

const eventContainer = (props) => {
    let events = (
        <Div>
        	<InfoRow title="Начните работать с событиями">
        	    Здесь будут отображаться мероприятия
        	</InfoRow>
        </Div>
    );

    if (props.events) {
        events = props.events.map(event => (
            <div className={styles.SingleEventWrapper}
                key={event.title}>
                <TinyEvent 
                    title={event.title}
                    type={EVENT_TYPES[event.type]}
                    imgId={event.imgId}
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
