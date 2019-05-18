import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {Panel, PanelHeader, Footer, platform} from '@vkontakte/vkui';

import EventContainer from '../../Components/EventContainer/EventContainer';

const osname = platform();

export default class CustomEvents extends Component {

    state = {
        favoriteEvents: null,
        likedEvents: null,
    }

    componentDidMount = () => {
        const favoriteEvents = [{
            title: 'Custom event',
            type: 'Развлечения',
            image: '/assets/images/persik.png'
        }];

        const likedEvents = [{
            title: 'Custom event',
            type: 'Развлечения',
            image: '/assets/images/persik.png'
        }];

        this.setState({
            favoriteEvents,
            likedEvents
        });
    }

    render () {
        return (
            <Panel id={this.props.id}>
                <PanelHeader>
                    Мои события
                </PanelHeader>
                <EventContainer
                    title='Избранные события'
                    events = {this.state.favoriteEvents} />
                <EventContainer
                    title='Созданные события' 
                    events = {this.state.likedEvents}/>
                <Footer >Ваши мероприятия</Footer>
            </Panel>
        );

    }
}

CustomEvents.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};
