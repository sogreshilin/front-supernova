import React, { Component } from 'react';
import {Panel, PanelHeader, Footer, platform} from '@vkontakte/vkui';

import Categories from '../../Components/Categories/Categories'

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
                <Categories categories={this.state.categories} />
                <h1>Рекомендованные события</h1>
            </Panel>
        );
    }
}
