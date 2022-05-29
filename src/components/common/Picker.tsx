import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import {withTranslation, WithTranslation} from 'react-i18next';
import {Chevron} from '../icons';
import {Colors, Fonts} from '../../utils';

interface Props extends WithTranslation {
    value: string;
    placeholder?: string;
    items: Array<{value: number | string, label: string}>;
    onValueChange: (value: string) => void;
    title: string;
    disabled?: boolean;
    style?: ViewStyle;
    inputStyle?: TextStyle;
}

class Picker extends React.Component<Props> {
    render() {
        const {value, placeholder, items, onValueChange, title, disabled, style, inputStyle, t} = this.props;

        return (
            <View style={[styles.main_container, style]}>
                <Text style={styles.title}>{title}</Text>

                <PickerSelect
                    placeholder={placeholder || {}}
                    items={items}
                    value={value}
                    onValueChange={onValueChange}
                    disabled={disabled}
                    style={{
                        inputIOS: [styles.input, inputStyle] as TextStyle,
                        inputAndroid: [styles.input, inputStyle] as TextStyle,
                        iconContainer: styles.icon_container,
                        chevron: styles.chevron,
                        placeholder: styles.placeholder
                    }}
                    useNativeAndroidPickerStyle={false}
                    doneText={t('commons.close')}
                    Icon={(() => <Chevron/>) as any}
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
        elevation: 3,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    title: {
        fontSize: 12,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.ORANGE
    },
    input: {
        fontSize: 12,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE
    },
    icon_container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chevron: {
        backgroundColor: Colors.WHITE
    },
    placeholder: {
        fontSize: 12,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.GREY_LIGHT
    }
});