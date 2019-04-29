import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable'
import ME_QUERY from '../graphql/queries/me.js'
import { graphql } from 'react-apollo'
import Loading from './Loading.js'
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { logout } from '../store/actions/authActions'

const AVATAR_SIZE = 30;
const AVATAR_RADUIS = AVATAR_SIZE / 2;
import {navigate, getParam } from '../services/navigator.js'
const Avatar = styled.Image`
    height: ${AVATAR_SIZE};
    width: ${AVATAR_SIZE};
    borderRadius: ${AVATAR_RADUIS};
`
const Button = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlop: { top: 20, bottom: 20, right: 20, left: 20 }
})`
    marginLeft: 15;
    justifyContent: center;
    alignItems: center;
`
class HeaderAvatar extends Component {
    constructor(props) {
      super(props);
    }
    _onUnauthenticatedPress = () => {
        navigate('Authentication')
    }
    _onOpenActionSheet = () => {
        const options = ['Logout', 'Cancel'];
        const destructiveButtonIndex = 0;
        this.props.showActionSheetWithOptions({
            options,
            destructiveButtonIndex
        }, async buttonIndex => {
            if (buttonIndex === 0) {
                await this.props.logout()
            }
        })
    }
    render() {
        const { me, loading } = this.props.user;
        if (loading) {
            return (
                <Button disabled>
                    <Loading size="small" />
                </Button>
            )   
        }
        if (me && this.props.isAuthenticated) {
            return (
                <Button onPress={ this._onOpenActionSheet }>
                    <Avatar source={{ uri: me.avatar }} />
                </Button>
            );

        }
        return (
            <Button onPress={this._onUnauthenticatedPress}>
                <Loading size="small" />
            </Button>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default compose(
    connect(mapStateToProps, {
        logout
    }),
    graphql(ME_QUERY,{ name: "user", options: {fetchPolicy: 'network-only'}})
)(connectActionSheet(HeaderAvatar))