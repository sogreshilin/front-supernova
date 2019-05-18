import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {View, Epic, Tabbar, TabbarItem, Panel, PanelHeader} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';

import Home from './panels/Home';
import Persik from './panels/Persik';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'main',
            fetchedUser: null,
            activeStory: 'main'
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
        this.setState({activeStory: e.currentTarget.dataset.story})
    };

    render() {
        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'main'}
                        data-story="main"
                        text="Главная"
                    >
                        <Icon28Newsfeed/>
                    </TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'discover'}
                        data-story="discover"
                        text="Поиск"
                    >
                        <Icon28Search/>
                    </TabbarItem>
                </Tabbar>
            }>
                <View id='main' activePanel={this.state.activePanel}>
                    <Home id="main" fetchedUser={this.state.fetchedUser} go={this.go}/>
                    <Persik id="persik" go={this.go}/>
                </View>
                <View id="discover" activePanel="discover">
                    <Panel id="discover">
                        <PanelHeader>Discover</PanelHeader>
                    </Panel>
                </View>
            </Epic>

        );
    }
}

export default App;
