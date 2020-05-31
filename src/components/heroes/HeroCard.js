// @flow

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Hero from '../../models/Hero';
import {Colors} from '../../utils';

type Props = {
    hero: Hero,
    size: number,
    onPress: () => void,
    style?: StyleSheet.style
}

export default class HeroCard extends React.Component<Props> {
    render() {
        const {hero, size, onPress, style} = this.props;

        return (
            <Touchable style={[styles.main_container, {width: size}, style]} onPress={onPress}>
                <View style={styles.sub_container}>
                    <Image
                        source={hero.getPicture()}
                        style={styles.image}
                        resizeMode="contain"
                        fadeDuration={0}
                    />
                    <Text style={styles.title}>
                        {hero.getName()}
                    </Text>
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        margin: 2,
        backgroundColor: Colors.BLACK_LIGHT,
        elevation: 2,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1}
    },
    sub_container: {
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        marginTop: -6,
        paddingHorizontal: 2,
        paddingBottom: 4,

        color: Colors.WHITE,
        fontSize: 14
    },
    image: {
        aspectRatio: 1,
        width: '100%',
        height: undefined
    }
});