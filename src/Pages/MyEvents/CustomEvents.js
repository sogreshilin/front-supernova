import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, platform, IOS} from '@vkontakte/vkui';
import '../../panels/persik.css';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import EventContainer from '../../Components/EventContainer/EventContainer';

const osname = platform();

const CustomEvents = props => (
	<Panel id={props.id}>
		<PanelHeader>
			Мои события
		</PanelHeader>
        <EventContainer
            title='Избранные события' />
        <EventContainer
            title='Созданные события' />
	</Panel>
);

CustomEvents.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default CustomEvents;