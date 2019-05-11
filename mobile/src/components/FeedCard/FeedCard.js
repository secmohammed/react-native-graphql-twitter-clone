import React from 'react';
import styled from 'styled-components/native';
import Placeholder, { Line, Media } from "rn-placeholder";
import gql from "graphql-tag";
import FeedCardHeader from './FeedCardHeader.js'
import FeedCardButton from './FeedCardButton.js'

const Root = styled.View`
    minHeight: 180;
    backgroundColor: ${props => props.theme.WHITE};
    width: 100%;
    padding: 7px;
    shadowColor: ${props => props.theme.SECONDARY};
    shadowOffset: 0px 2px;
    shadowRadius: 2;
    shadowOpacity: 0.1;
    marginVertical: 5;
`
const CardContentContainer = styled.View`
    flex: 1;
    padding: 10px 20px 10px 0px;
`;

const CardContentText = styled.Text`
    fontSize: 14;
    textAlign: left;
    fontWeight: 500;
    color: ${props => props.theme.SECONDARY};
`;
const Wrapper = styled.View`flex: 1;`
const FeedCard = (props) =>  {
    if (props.placeholder) {
        <Root>
            <Placeholder isReady={!props.isLoaded} animate="shine" renderLeft={() => <Media hasRadius />}>
                <Line width="70%" />
                <Line />
                <Line />
                <Line width="30%" />
            </Placeholder>
        </Root>
    }
    return (
        <Root>
            <FeedCardHeader createdAt={props.createdAt} {...props.user} />
            <CardContentContainer>
                <CardContentText>
                    {props.text}
                </CardContentText>
            </CardContentContainer>
            <FeedCardButton tweetId={props._id} favoriteCount={props.favoriteCount} />

        </Root>
    );
}
export default FeedCard;