import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {View, Epic, Tabbar, TabbarItem, Panel, PanelHeader, Input} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';

import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon24Reorder from '@vkontakte/icons/dist/24/reorder';
import Icon24Newsfeed from '@vkontakte/icons/dist/24/newsfeed';

import * as pages from './Utils/pageTypes';
import * as myEventsPanels from './panels/MyEvents/panels';

import CustomEvents from './Pages/MyEvents/CustomEvents';
import Tinder from './Pages/Feed/Tinder';


import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';

import Home from './panels/Home';
import Persik from './panels/Persik';
import CreateEvent from "./Pages/CreateEvent/CreateEvent";
import {Pages} from "./Pages/model";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: pages.FEED,
            fetchedUser: null,
            activeStory: pages.FEED
        };
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({fetchedUser: e.detail.data});
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
                <View id={pages.FEED} activePanel="main">
                    <Tinder id="main" go={this.go}/>
                </View>
                <View id={pages.MY_EVENTS} activePanel="check">
                    <CustomEvents id="check" go={this.go}/>
                </View>
                <View id={Pages.CREATE_EVENT} activePanel={Pages.CREATE_EVENT}>
                    <CreateEvent id={Pages.CREATE_EVENT}/>
                </View>
            </Epic>
        );
    }
}

export default App;
