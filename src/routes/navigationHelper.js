import React from 'react';
import {Platform, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import {Colors} from '../utils';

const HIT_SLOP = {top: 20, left: 20, bottom: 20, right: 20};

function touchableButton(iconComponent: React.Component, left: boolean, onPress: () => void) {
    const TouchableComponent = (Platform.OS === 'android' && Platform.Version >= 21) ?
        TouchableNativeFeedback : TouchableOpacity;

    return (
        <View style={left ? {left: 10} : {right: 10}}>
            <TouchableComponent
                hitSlop={HIT_SLOP}
                onPress={onPress}
                delayPressIn={0}
                useForeground={TouchableNativeFeedback.canUseNativeForeground()}
                background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .32)', true)}
            >
                <View style={{width: 35, height: 35, alignItems: 'center', justifyContent: 'center'}}>
                    {iconComponent}
                </View>
            </TouchableComponent>
        </View>
    );
}

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
        backgroundColor: Colors.BLACK
    },
    headerTitleStyle: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'normal'
    },
    headerTitleAlign: 'center',
    headerStatusBarHeight: Platform.OS === 'android' ? 0 : undefined,
    headerBackTitleVisible: false
};
