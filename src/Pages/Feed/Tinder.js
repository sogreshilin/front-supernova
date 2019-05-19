import React, { Component } from 'react';
import {Panel, PanelHeader, Group, CellButton, platform} from '@vkontakte/vkui';

import ImageContent from '../../Components/ImageContent/ImageContent';
import EventSummary from '../../Components/EventSummary/EventSummary';
import ShiftControls from '../../Components/ShiftControls/ShiftControls';

import styles from './Tinder.css'

export default class Tinder extends Component {
    state = {
        categories: [
            "Развлечения", "Спорт", "Музыка", "Культура",
        ],
    }
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader>
                    Рекомендованные события
                </PanelHeader>
                <div className={styles.Tinder}>
                    <ImageContent 
                        imageSrc='/assets/images/persik.png'/>
                    <EventSummary 
                        title='Title'
                        description='lhwflwfeowefowehfowe'
                        categories={this.state.categories}
                        place='Новосибирск'
                        date='25 сентября'
                    />
                    <ShiftControls />
                </div>
            </Panel>
        );
    }
}
