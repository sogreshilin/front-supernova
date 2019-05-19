import React from 'react';
import {connect as reduxConnect} from 'react-redux';
import connect from '@vkontakte/vkui-connect';
import {View, Epic, Tabbar, TabbarItem, Panel, PanelHeader, Input, ScreenSpinner} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Newsfeed from '@vkontakte/icons/dist/24/newsfeed';

import * as pages from './Utils/pageTypes';

import CustomEvents from './Pages/MyEvents/CustomEvents';
import Tinder from './Pages/Feed/Tinder';

import {logIn} from 'src/Services/User/actions';

import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';

import CreateEvent from "./Pages/CreateEvent/CreateEvent";
import {Pages} from "./Pages/model";
import Onboarding from "./Pages/Onboarding/Onboarding";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchedUser: null,
            activeStory: pages.FEED
        };
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.props.dispatch(logIn(e.detail.data));
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }

    go = (e) => {
        this.setState({activePanel: e.currentTarget.dataset.to})
    };

    onStoryChange = (e) => {
        console.log(e.currentTarget.dataset.story);
        this.setState({activeStory: e.currentTarget.dataset.story})
    };

    render() {
        const {isLoading, isRegistering, finishedOnboarding} = this.props.profile;


        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === pages.FEED}
                        data-story={pages.FEED}
                        text="Рекомендации"
                    >
                        <Icon24Newsfeed/>
                    </TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === pages.MY_EVENTS}
                        data-story={pages.MY_EVENTS}
                        text="Мои события"
                    >
                        <Icon24Newsfeed/>
                    </TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === Pages.CREATE_EVENT}
                        data-story={Pages.CREATE_EVENT}
                        text="Создать"
                    >
                        <Icon28AddOutline/>
                    </TabbarItem>
                </Tabbar>
            }>
                <View id={pages.FEED}
                      activePanel={
                          isLoading || isRegistering ? Pages.PROFILE : (finishedOnboarding ? pages.FEED : Pages.ONBOARDING)}
                >
                    <Panel id={Pages.PROFILE}>
                        <ScreenSpinner />
                    </Panel>
                    <Onboarding id={Pages.ONBOARDING} user={this.props.profile.user}/>
                    <Tinder id={pages.FEED} go={this.go}/>
                </View>
                <View id={pages.MY_EVENTS} activePanel="check">
                    <Tinder id={pages.FEED} go={this.go}/>
                    {/*<CustomEvents id="check" go={this.go}*/}
                    {/*userId={this.props.profile.user.id}/>*/}
                </View>
                <View id={Pages.CREATE_EVENT} activePanel={Pages.CREATE_EVENT}>
                    <CreateEvent id={Pages.CREATE_EVENT} user={this.props.profile.user}/>
                </View>
            </Epic>
        );
    }
}

export default reduxConnect(a => a)(App);
