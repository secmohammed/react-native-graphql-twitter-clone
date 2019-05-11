import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Platform, Keyboard } from 'react-native'
import Touchable from '@appandflow/touchable'
import { graphql, compose } from 'react-apollo';
import CREATE_TWEET_MUTATION from '../graphql/mutations/newTweet'
import GET_TWEETS_QUERY from '../graphql/queries/getTweets.js';
import ME_QUERY from '../graphql/queries/me.js'
import Loading from '../components/Loading'
import { colors } from '../utils/constants.js'
const uuidv4 = require('uuid/v4');

const Root = styled.View`
    backgroundColor: ${props => props.theme.WHITE};
    flex: 1;
    alignItems: center;
`
const Wrapper = styled.View`
    height: 80%;
    width: 90%;
    paddingTop: 5;
    position: relative;
`
const Input = styled.TextInput.attrs({
    multiline: true,
    placeholder: 'What\'s on your mind ?',
    maxLength: 140,
    selectionColor: Platform.OS === 'ios' && colors.PRIMARY,
    autoFocus: true
})`
    height: 40%;
    width: 100%;
    fontSize: 18;
    color: ${props => props.theme.SECONDARY};
`
const TweetButton = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlop: { top: 20, left: 20, right: 20, bottom: 20 }
})`
    backgroundColor: ${props => props.theme.PRIMARY};
    justifyContent: center;
    alignItems: center;
    width: 80;
    height: 40;
    borderRadius: 20;
    position: absolute;
    top: 60%;
    right: 0;
`
const TweetButtonText = styled.Text`
    color: ${props => props.theme.WHITE};
    fontSize: 16;
`
const TextLength = styled.Text`
    fontSize: 18;
    color: ${props => props.theme.PRIMARY};
    position: absolute;
    top: 45%;
    right: 5%;

`
class NewTweetScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        text: '',
        loading: false
      };
    }
    componentWillUnmount() {
      Keyboard.dismiss();
    }
    get _buttonDisabled () {
        return this.state.text.length < 5;
    }
    get _textLength() {
        return 140 - this.state.text.length;
    }
    _onSubmit = async () => {
        this.setState({
            loading: true
        });
        const { username, firstName, avatar, lastName } = this.props.user.me;
        const { text } = this.state
        const { data, error } = await this.props.mutate({
            variables: {
                text
            },
            optimisticResponse: {
                __typename: 'Mutation',
                createTweet: {
                    __typename: 'Tweet',
                    text,
                    favoriteCount: 0,
                    isFavorited: false,
                    _id: uuidv4(),
                    createdAt: new Date(),
                    user: this.props.user.me
                }
            },
            update: (proxy, { data: { createTweet } }) => {
                const data = proxy.readQuery({ query: GET_TWEETS_QUERY, variables: { offset: 0, limit: 10 }});
                data.getTweets.unshift(createTweet);
                proxy.writeQuery({ query : GET_TWEETS_QUERY, data, variables: { offset: 0, limit: 10 }})
            }
        })
        this.setState({
            loading: false
        });

        this.props.navigation.navigate('Home');

    }

    _onChangeText = text => this.setState({ text });
    render() {
        if (this.props.loading) {
            return <Loading />
        }
        return (
            <Root>
                <Wrapper>
                    <Input value={this.state.text} onChangeText={this._onChangeText} />
                    <TextLength>
                        {this._textLength}
                    </TextLength>

                    <TweetButton onPress={this._onSubmit} disabled={this._buttonDisabled}>
                        <TweetButtonText>
                            Tweet
                        </TweetButtonText>
                    </TweetButton>
                </Wrapper>
            </Root>
        );
    }
}
export default compose(
    graphql(CREATE_TWEET_MUTATION),
    graphql(ME_QUERY,{ name: "user", options: {fetchPolicy: 'cache-only'}})
)(NewTweetScreen)

