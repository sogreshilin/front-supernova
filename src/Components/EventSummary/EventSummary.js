import React from 'react';

import {Div, Header, Link} from '@vkontakte/vkui';
import Categories from '../Categories/Categories';

import styles from './EventSummary.css';

const EventSummary = (props) => {
    console.log(props);
    return (
        <div className={styles.EventSummary}>
            <Div>
            <Header 
                aside={<Link>Показать подробнее</Link>}>
                {props.title}
            </Header>
            <p>
                {props.description}
            </p>
            <Categories 
                categories={props.categories}/>
            </Div>
        </div>
    )
}

export default EventSummary;
