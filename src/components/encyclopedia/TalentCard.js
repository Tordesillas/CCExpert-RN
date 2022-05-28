// @flow

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Talent from '../../models/Talent';
import {Colors, Fonts} from '../../utils';

type Props = {
    talent: Talent,
    onPress: () => void,
    style?: StyleSheet.style
}

export default class TalentCard extends React.Component<Props> {
    render() {
        const {talent, onPress, style} = this.props;

        return (
            <View style={styles.wrapper}>
                <Pressable
                    style={[styles.main_container, style]}
                    android_ripple={{color: 'rgba(255,163,26,0.12)'}}
                    onPress={onPress}
                >
                    <Image
                        source={talent.getPicture()}
                        style={styles.image}
                        resizeMode="contain"
                        fadeDuration={0}
                    />
                    <Text style={styles.title}>
                        {talent.getName()}
                    </Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        maxWidth: '25%',
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
        marginVertical: 8,
        aspectRatio: 1,
        width: '80%',
        height: undefined
    }
});