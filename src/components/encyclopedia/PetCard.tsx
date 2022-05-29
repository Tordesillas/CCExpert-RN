import React from 'react';
import {Image, Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Pet from '../../models/Pet';
import {Colors, Fonts} from '../../utils';

interface Props {
    pet: Pet;
    onPress: () => void;
    style?: ViewStyle;
}

export default class PetCard extends React.Component<Props> {
    render() {
        const {pet, onPress, style} = this.props;

        return (
            <View style={styles.wrapper}>
                <Pressable
                    style={[styles.main_container, style]}
                    android_ripple={{color: 'rgba(255,163,26,0.12)'}}
                    onPress={onPress}
                >
                    <Image
                        source={pet.getPicture()}
                        style={styles.image}
                        resizeMode="contain"
                        fadeDuration={0}
                    />
                    <Text style={styles.title}>
                        {pet.getName()}
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
        paddingHorizontal: 2,
        paddingBottom: 4,

        fontSize: 12,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE
    },
    image: {
        marginVertical: 4,
        aspectRatio: 1,
        width: '90%',
        height: undefined
    }
});