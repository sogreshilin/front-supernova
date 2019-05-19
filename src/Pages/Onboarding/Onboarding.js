import React from 'react';
import {Panel} from "@vkontakte/vkui";

export default class Onboarding extends React.Component {

    render() {
        const userId = this.props.user ? this.props.user.id : 'Подключаемся...';

        return (
            <Panel id={this.props.id}>{userId}</Panel>
        );
    }

}
