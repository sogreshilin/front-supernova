import React, {Component} from 'react';
import PropTypes from 'prop-types';
import request from '../../Utils/request';

import {Panel, PanelHeader, Footer, platform} from '@vkontakte/vkui';

import EventContainer from '../../Components/EventContainer/EventContainer';

const osname = platform();

export default class CustomEvents extends Component {

    state = {
        favoriteEvents: null,
        createdEvents: null,
    }


    componentDidMount = () => {
        const eventsToSend = [];
        request.get(`/api/persons/${this.props.userId}`)
            .then(resp => {
                const createdEvents = resp.data.createdEvents;
                const favouriteEvents = resp.data.favouriteEvents;

                const updatedCreatedEvents = createdEvents.map(createdEvent => {
                    const title = createdEvent.title;
                    const type = createdEvent.types[0];
                    const imgId = createdEvent.images[0].id;

                    return {
                        title,
                        type,
                        imgId,
                    }
                });

                const updatedFavouritesEvents = favouriteEvents.map(createdEvent => {
                    const title = createdEvent.title;
                    const type = createdEvent.types[0];
                    const imgId = createdEvent.images[0].id;

                    return {
                        title,
                        type,
                        imgId,
                    }
                });

                this.setState({
                    createdEvents: updatedCreatedEvents,
                    createdEvevnts:  updatedFavouritesEvents,
                });

                return new Promise((resolve,_ ) => resolve(updatedCreatedEvents));
            })
            .catch(error => {
                console.log(error);
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
                    events = {this.state.createdEvents}/>
                <Footer >Ваши мероприятия</Footer>
            </Panel>
        );

    }
}

CustomEvents.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};
