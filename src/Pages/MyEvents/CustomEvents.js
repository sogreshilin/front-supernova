import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, Footer, platform, IOS} from '@vkontakte/vkui';
import '../../panels/persik.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import EventContainer from '../../Components/EventContainer/EventContainer';

const osname = platform();

export default class CustomEvents extends Component {

    render () {
        return (
            <Panel id={this.props.id}>
                <PanelHeader>
                    Мои события
                </PanelHeader>
                <EventContainer
                    title='Избранные события' />
                <EventContainer
                    title='Созданные события' />
                <Footer >Ваши мероприятия</Footer>
            </Panel>
        );

    }
}

CustomEvents.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};
