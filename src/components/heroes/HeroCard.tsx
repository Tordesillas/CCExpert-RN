import React from 'react';
import {Image, Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Hero from '../../models/Hero';
import {Colors, Fonts} from '../../utils';

interface Props {
    hero: Hero;
    onPress: () => void;
    style?: ViewStyle;
}

export default class HeroCard extends React.Component<Props> {
    render() {
        const {hero, onPress, style} = this.props;

        return (
            <View style={styles.wrapper}>
                <Pressable
                    style={[styles.main_container, style]}
                    android_ripple={{color: 'rgba(255,163,26,0.12)'}}
                    onPress={onPress}
                >
                    <Image
                        source={hero.getPicture()}
                        style={styles.image}
                        resizeMode="contain"
                        fadeDuration={0}
                    />
                    <Text style={styles.title}>
                        {hero.getName()}
                    </Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        maxWidth: '33.3%',
        padding: 2
    },
    main_container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.BLACK_LIGHT,
        elevation: 3,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    title: {
        textAlign: 'center',
        marginTop: -6,
        paddingHorizontal: 2,
        paddingBottom: 4,

        fontSize: 12,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE
    },
    image: {
        aspectRatio: 1,
        width: '95%',
        height: undefined
    }
});