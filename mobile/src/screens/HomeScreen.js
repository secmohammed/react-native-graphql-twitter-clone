import React, { Component } from 'react';
import styled from 'styled-components/native';

import FeedCard from '../components/FeedCard/FeedCard.js'
const Root = styled.View`
    backgroundColor: #f2f2f2;
    flex: 1;
    paddingTop: 5;

`
const List = styled.ScrollView`
`
export default class HomeScreen extends Component {
    render() {
        return (
            <Root>
                <List>
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                    <FeedCard />
                </List>
            </Root>
        );
    }
}
