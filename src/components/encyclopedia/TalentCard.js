// @flow

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Talent from '../../models/Talent';
import {Colors} from '../../utils';

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
                <RectButton style={[styles.main_container, style]} onPress={onPress}>
                    <Image
                        source={talent.getPicture()}
                        style={styles.image}
                        resizeMode="contain"
                        fadeDuration={0}
                    />
                    <Text style={styles.title}>
                        {talent.getName()}
                    </Text>
                </RectButton>
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
        elevation: 2,
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
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
    image: {
        marginVertical: 8,
        aspectRatio: 1,
        width: '80%',
        height: undefined
    }
});