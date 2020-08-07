// @flow

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Pet from '../../models/Pet';
import {Colors} from '../../utils';

type Props = {
    pet: Pet,
    size: number,
    onPress: () => void,
    style?: StyleSheet.style
}

export default class PetCard extends React.Component<Props> {
    render() {
        const {pet, size, onPress, style} = this.props;

        return (
            <RectButton style={[styles.main_container, {width: size}, style]} onPress={onPress}>
                <View style={styles.image_container}>
                    <Image
                        source={pet.getPicture()}
                        style={styles.image}
                        resizeMode="contain"
                        fadeDuration={0}
                    />
                </View>
                <Text style={styles.title}>
                    {pet.getName()}
                </Text>
            </RectButton>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        margin: 2,
        alignItems: 'center',
        backgroundColor: Colors.BLACK_LIGHT,
        elevation: 2,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1}
    },
    title: {
        textAlign: 'center',
        marginTop: -6,
        paddingHorizontal: 2,
        paddingBottom: 4,

        color: Colors.WHITE,
        fontSize: 14
    },
    image_container: {
        flex: 1,
        padding: 5
    },
    image: {
        aspectRatio: 1,
        width: '100%',
        height: undefined
    }
});