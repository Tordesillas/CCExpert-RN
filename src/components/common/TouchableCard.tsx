import React from 'react';
import {Image, Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors, Fonts} from '../../utils';

interface Props {
    title: string;
    icon: number;
    onPress: () => void;
    style?: ViewStyle;
}

export default class TouchableCard extends React.Component<Props> {
    render() {
        const {onPress, title, icon, style} = this.props;

        return (
            <Pressable
                style={[styles.main_container, style]}
                android_ripple={{color: 'rgba(255,163,26,0.12)'}}
                onPress={onPress}
            >
                <View style={styles.sub_container}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <View style={styles.image_container}>
                        <Image
                            source={icon}
                            style={styles.image}
                            resizeMode="contain"
                            fadeDuration={0}
                        />
                    </View>
                </View>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: Colors.BLACK_LIGHT,
        elevation: 3,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    sub_container: {
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.SirinStencil,
        color: Colors.WHITE
    },
    image_container: {
        paddingTop: 10,
        justifyContent: 'center'
    },
    image: {
        height: 130
    }
});
