import React from 'react';
import {Platform, View} from 'react-native';
import {Colors, Fonts} from '../utils';

export function containerWithTriangle() {
    return (
        <View style={{width: 0, height: 0, right: 0, bottom: 0, backgroundColor: 'transparent', position: 'absolute',
            borderRightColor: 'transparent', transform: [{rotate: '180deg'}],
            borderRightWidth: 30, borderTopWidth: 40, borderTopColor: Colors.BLACK_LIGHT}}/>
    );
}

export const defaultNavigationOptions = {
    headerTintColor: Colors.WHITE,
    headerStyle: {
        backgroundColor: Colors.BLACK,
    },
    headerShadowVisible: false,
    headerTitleStyle: {
        fontSize: 24,
        fontFamily: Fonts.SirinStencil,
        color: Colors.ORANGE
    },
    headerTitleAlign: 'center',
    headerStatusBarHeight: Platform.OS === 'android' ? 0 : undefined,
    headerBackTitleVisible: false
};
