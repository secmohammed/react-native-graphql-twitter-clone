import React, { Component } from 'react';
import styled from 'styled-components/native';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
const AVATAR_SIZE = 40;
const AVATAR_RADIUS = AVATAR_SIZE / 2;
import { navigate } from "../../services/navigator.js";
import Touchable from '@appandflow/touchable';

const Root = styled.View`
    height: 50;
    flexDirection: row;
    alignItems: center;
`;
const AvatarContainer = styled.View`
    flex: 0.2;
    justifyContent: center;
    alignSelf: stretch;
`
const Button = styled(Touchable).attrs({
    feedback: 'opacity'
})`
`

const Avatar = styled.Image`
    height: ${AVATAR_SIZE};
    width: ${AVATAR_SIZE};
    borderRadius: ${AVATAR_RADIUS};
`

const MetaContainer = styled.View`
    flex: 1;
    alignSelf: stretch;
`

const MetaTopContainer = styled.View`
    flex: 1;
    alignSelf: stretch;
    flexDirection: row;
    alignItems: center;
    justifyContent: flex-start;
`
const MetaBottomContainer = styled.View`
    flex: 0.8;
    alignSelf: stretch;
    alignItems: flex-start;
    justifyContent: center;

`
const MetaText = styled.Text`
    fontSize: 14;
    fontWeight: 600;
    color: ${props => props.theme.LIGHT_GRAY}
`
const MetaFullName = styled.Text`
    fontSize: 16;
    fontWeight: bold;
    color: ${props => props.theme.SECONDARY};
`

class FeedCardHeader extends Component {
    constructor(props) {
      super(props);
    
    }
    _onAvatarPress = async () => {
        navigate("Profile", { _id: this.props._id});
    };
    render () {
        return (
            <Root>
                <AvatarContainer>
                    <Button onPress={this._onAvatarPress}>
                        <Avatar source={{ uri: this.props.avatar }}/>
                    </Button>
                </AvatarContainer>
                <MetaContainer>
                    <MetaTopContainer>
                        <MetaFullName>
                            {this.props.firstName} {this.props.lastName}
                        </MetaFullName>
                        <MetaText style={{ marginLeft: 5 }}>
                            @{this.props.username}
                        </MetaText>
                    </MetaTopContainer>
                    <MetaBottomContainer>
                        <MetaText>
                            {distanceInWordsToNow(this.props.createdAt)}
                        </MetaText>
                    </MetaBottomContainer>
                </MetaContainer>
            </Root>
        )
    }
}

export default FeedCardHeader;