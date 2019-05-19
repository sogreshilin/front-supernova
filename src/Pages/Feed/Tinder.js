import React, { Component } from 'react';
import {Panel, PanelHeader, Footer, platform} from '@vkontakte/vkui';

import ImageContent from '../../Components/ImageContent/ImageContent';
import EventSummary from '../../Components/EventSummary/EventSummary';

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
                <ImageContent 
                    imageSrc='/assets/images/persik.png'/>
                <EventSummary 
                    title='Title'
                    description='lhwflwfeowefowehfowe'
                    categories={this.state.categories}
                    check='cheeeck'
                />
            </Panel>
        );
    }
}
