// @flow

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {Colors, Images} from '../../utils';

type Props = {
    title: string,
    icon: Images,
    onPress: () => void,
    style?: StyleSheet.style
}

export default class TouchableCard extends React.Component<Props> {
    render() {
        const {onPress, title, icon, style} = this.props;

        return (
            <Touchable style={[styles.main_container, style]} onPress={onPress}>
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
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: Colors.BLACK_LIGHT,
        elevation: 2,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1}
    },
    sub_container: {
        alignItems: "center"
    },
    title: {
        color: Colors.WHITE,
        fontSize: 16
    },
    image_container: {
        paddingTop: 10,
        justifyContent: "center"
    },
    image: {
        height: 130
    }
});
