// @flow

import React from "react";
import {Keyboard, Platform, TextInput} from "react-native";

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
    style?: StyleSheet.style,
    testID?: string
}

export default class TextField extends React.Component<Props> {
    onChangeText = (text: string) => {
        if (this.props.onChangeText) {
            this.props.onChangeText(text);
        }
    };

    onSubmitEditing = () => {
        if (this.props.onSubmitEditing) {
            this.props.onSubmitEditing();
        } else {
            Keyboard.dismiss();
        }
    };

    focus() {
        this.ref.focus();
    }

    render() {
        const {value,
            placeholder,
            placeholderTextColor,
            onFocus,
            onBlur,
            keyboardType,
            returnKeyType,
            secureTextEntry,
            blurOnSubmit = true,
            autoCapitalize = 'none',
            style,
            testID
        } = this.props;

        return (
            <TextInput
                testID={testID}
                style={[{paddingVertical: Platform.OS === "android" ? 0 : 5}, style]}
                ref={(input) => this.ref = input}
                value={value}
                onChangeText={this.onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
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
        );
    }
}