import React from 'react';
import {Panel, PanelHeader, Div, Button} from "@vkontakte/vkui";
import EventType from "src/Store/EventType";
import EventTypeDict from "src/Services/Dictionary/EventType";
import request from 'src/Utils/request';
import {connect} from 'react-redux';

import styles from './styles.scss';

class Onboarding extends React.Component {

    constructor(props) {
        super(props);

        const choice = {};
        Object.keys(EventType).map(key => {
            choice[key] = false
        });

        this.state = {
            choice: choice
        }
    }

    onCardClick = (categoryId) => {
        request
            .patch(`/api/persons/${this.props.user.id}/favourites`, {
                type: categoryId
            })
            .then(r => {
                const choice = this.setState.choice;
                choice[categoryId] = !this.setState.choice[categoryId];
                this.setState({
                    choice: choice
                })
            });
    };



    onFinishOnboarding = () => {
        this.dispatch({
            type: 'FINISH_ONBOARDING'
        })
    };

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader>Ваши предпочтения</PanelHeader>
                <div className={styles.grid}>
                    {
                        Object.keys(this.state.choice).map(key =>
                            <div
                                className={this.state.choice[key] ? styles.selected : styles.default}
                                key={key}
                                onClick={() => this.onCardClick(key)}
                            >{EventTypeDict[key]}</div>
                        )
                    }
                </div>
                <Div style={{display: 'flex'}}>
                    <Button
                        size={'xl'}
                        stretched
                        onClick={this.onFinishOnboarding}
                    >
                        Завершить
                    </Button>
                </Div>
            </Panel>
        );
    }

}


export default connect(a => a)(Onboarding);
