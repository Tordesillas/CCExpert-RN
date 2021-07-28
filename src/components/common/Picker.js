// @flow

import React from "react";
import {StyleSheet, Text, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {withTranslation} from "react-i18next";
import {Chevron} from "../icons";
import {Colors} from "../../utils";

type Props = {
    value: string,
    placeholder?: string,
    items: Array<{value: number | string, label: string}>,
    onValueChange: (value: string) => void,
    title: string,
    disabled?: boolean,
    style?: StyleSheet.style,
    inputStyle?: StyleSheet.style
}

class Picker extends React.Component<Props> {
    render() {
        const {value, placeholder, items, onValueChange, title, disabled, style, inputStyle, t} = this.props;

        return (
            <View style={[styles.main_container, style]}>
                <Text style={styles.title}>{title}</Text>

                <RNPickerSelect
                    placeholder={placeholder || {}}
                    items={items}
                    value={value}
                    onValueChange={onValueChange}
                    disabled={disabled}
                    style={{
                        inputIOS: [styles.input, inputStyle],
                        inputAndroid: [styles.input, inputStyle],
                        iconContainer: styles.icon_container,
                        chevron: {backgroundColor: Colors.WHITE},
                        placeholder: styles.placeholder
                    }}
                    useNativeAndroidPickerStyle={false}
                    doneText={t('commons.close')}
                    Icon={() => <Chevron/>}
                />
            </View>
        );
    }
}

export default withTranslation()(Picker);

const styles = StyleSheet.create({
    main_container: {
        margin: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Colors.BLACK_LIGHT,
        borderRadius: 2,
        elevation: 2,
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        shadowOffset: {width: 0, height: 1}
    },
    title: {
        fontSize: 14,
        color: Colors.WHITE
    },
    input: {
        fontSize: 14,
        color: Colors.WHITE
    },
    icon_container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    placeholder: {
        fontSize: 14,
        color: Colors.GREY_LIGHT
    }
});