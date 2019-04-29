import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Platform, Keyboard } from 'react-native'
import Touchable from '@appandflow/touchable'
import { graphql } from 'react-apollo'
import CREATE_TWEET_QUERY from '../graphql/mutations/newTweet'
import Loading from '../components/Loading'
import { colors } from '../utils/constants.js'

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

    get _textLength() {
        return 140 - this.state.text.length;
    }
    _onSubmit = async () => {
        this.setState({
            loading: true
        });
        const { text } = this.state
        const { data, error } = await this.props.mutate({
            variables: {
                text
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

                    <TweetButton onPress={this._onSubmit}>
                        <TweetButtonText>
                            Tweet
                        </TweetButtonText>
                    </TweetButton>
                </Wrapper>
            </Root>
        );
    }
}
export default graphql(CREATE_TWEET_QUERY)(NewTweetScreen)

