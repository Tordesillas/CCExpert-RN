// @flow

import React from 'react';
import {Keyboard, Platform, StyleSheet, TextInput, View} from 'react-native';
import {Defs, LinearGradient, Svg, Rect, Stop} from 'react-native-svg';
import {Colors, Fonts} from '../../utils';

type Props = {
    value?: string,
    placeholder?: string,
    placeholderTextColor?: string,
    onChangeText?: (text: string) => void,
    onFocus?: () => void,
    onBlur?: () => void,
    keyboardType?: string,
    returnKeyType?: string,
    secureTextEntry?: boolean,
    blurOnSubmit?: boolean,
    autoCapitalize?: string,
    onSubmitEditing?: () => void,
    style?: StyleSheet.style
}

export default class TextField extends React.Component<Props> {
    state = {
        isFocused: false
    };

    onChangeText = (text: string) => {
        this.props.onChangeText?.(text);
    };

    onSubmitEditing = () => {
        if (this.props.onSubmitEditing) {
            this.props.onSubmitEditing();
        } else {
            Keyboard.dismiss();
        }
    };

    handleInputFocus = () => {
        this.setState({isFocused: true}, () => this.props.onFocus?.());
    };

    handleInputBlur = () => {
        this.setState({isFocused: false}, () => this.props.onBlur?.());
    };

    focus() {
        this.ref.focus();
    }

    render() {
        const {value,
            placeholder,
            placeholderTextColor,
            keyboardType,
            returnKeyType,
            secureTextEntry,
            blurOnSubmit = true,
            autoCapitalize = 'none',
            style
        } = this.props;
        const {isFocused} = this.state;

        return (
            <View style={[styles.main_container, {borderColor: isFocused ? Colors.ORANGE : Colors.GREY}, style]}>
                <View style={styles.background_wrapper}>
                    <Svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <Defs>
                            <LinearGradient id="verticalGrad" x1="0.5" y1="0" x2="0.5" y2="1">
                                <Stop offset="0" stopColor={Colors.GREY_LIGHT} stopOpacity="1"/>
                                <Stop offset="0.6" stopColor="#999999" stopOpacity="1"/>
                            </LinearGradient>
                        </Defs>
                        <Rect width="100" height="100" fill="url(#verticalGrad)" />
                    </Svg>
                </View>

                <TextInput
                    style={styles.input}
                    ref={(input) => this.ref = input}
                    value={value}
                    onChangeText={this.onChangeText}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    onSubmitEditing={this.onSubmitEditing}
                    hitSlop={{top: 5, left: 5, bottom: 5, right: 5}}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    secureTextEntry={secureTextEntry}
                    blurOnSubmit={blurOnSubmit}
                    autoCapitalize={autoCapitalize}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        overflow: 'hidden',
        paddingVertical: Platform.OS === 'android' ? 0 : 5,
        borderWidth: 1,
        borderRadius: 5
    },
    background_wrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    input: {
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE
    }
});