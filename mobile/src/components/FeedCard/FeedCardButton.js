import React, { Component } from 'react';
import styled from 'styled-components/native';
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';
import FAVORITE_TWEET_MUTATION  from '../../graphql/mutations/favoriteTweet.js'
import { graphql } from "react-apollo";
import { colors } from '../../utils/constants';
import { connect } from "react-redux";
import { login } from "../../store/actions/authActions";
import { compose } from "redux";
import { navigate } from "../../services/navigator.js";

const Root = styled.View`
    height: 40;
    flexDirection: row;

`
const Button = styled(Touchable).attrs({
    feedback: 'opacity'
})`
    flex: 1;
    flexDirection: row;
    alignItems: center;
    justifyContent: space-around;
    paddingHorizontal: 30px;
`
const ButtonText = styled.Text`
    fontSize: 14;
    fontWeight: 500;
    color: ${props => props.theme.LIGHT_GRAY};

`
const ICON_SIZE = 20;
const favoriteCount = 3;
const isFavorited = false;

class FeedCardButton extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        isFavorited: props.isFavorited,
        favoriteCount: props.favoriteCount
      };
    }
    _onFavoritePress = async () => {
        if (!this.props.isAuthenticated) {
            navigate("login");
        }
        const { data, error } = await this.props.mutate({
            variables: {
                id: this.props.tweetId
            },
            optimisticResponse: {
                __typename: 'Mutation',
                favoriteTweet: {
                    __typename: 'Tweet',
                    isFavorited: !this.state.isFavorited,
                    favoriteCount: this.state.isFavorited ? this.state.favoriteCount - 1 : this.state.favoriteCount + 1
                }
            }
        })
        if (data) {
            this.setState({
                isFavorited: data.favoriteTweet.isFavorited,
                favoriteCount: data.favoriteTweet.favoriteCount
            })
        }

    }
    render () {
      return (
        <Root>
            <Button>
                <SimpleLineIcons name="bubble" size={ICON_SIZE} color={colors.LIGHT_GRAY}/>
                <ButtonText>
                    {favoriteCount}
                </ButtonText>
            </Button>
            <Button>
                <Entypo name="retweet" size={ICON_SIZE} color={colors.LIGHT_GRAY} />
                <ButtonText>
                    {favoriteCount}
                </ButtonText>
            </Button>
            <Button onPress={this._onFavoritePress}>
                <Entypo name="heart" size={ICON_SIZE} color={this.state.isFavorited ? 'red' : colors.LIGHT_GRAY} />
                <ButtonText>
                    {this.state.favoriteCount}
                </ButtonText>
            </Button>
        </Root>
      )    
    }

}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};
export default compose(
    connect(
        mapStateToProps,
        {
            login
        }
    ), graphql(FAVORITE_TWEET_MUTATION)
)(FeedCardButton);