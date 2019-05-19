import React from 'react';

import Icon24Globe from '@vkontakte/icons/dist/24/globe';

import {Div, Header, Link} from '@vkontakte/vkui';
import Categories from '../Categories/Categories';
import SummaryItem from '../EventSummary/SummaryItem/SummaryItem';

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
                <Div>
                    <span>{props.description}</span>
                </Div>
                <SummaryItem
                    description={props.date}>
                    <Icon24Globe />
                </SummaryItem>
                <SummaryItem
                    description={props.place}>
                    <Icon24Globe />
                </SummaryItem>
                <Categories 
                categories={props.categories}/>
            </Div>
        </div>
    )
}

export default EventSummary;
