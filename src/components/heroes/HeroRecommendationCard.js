// @flow

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../utils';

export default class HeroRecommendationCard extends React.Component {
    render() {
        const {title, images} = this.props;

        return (
            <View style={styles.main_container}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <View style={styles.images_container}>
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            source={image}
                            style={styles.image}
                            resizeMode="contain"
                            fadeDuration={0}
                        />
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'column',
        margin: 2,
        backgroundColor: Colors.BLACK_LIGHT,
        borderRadius: 2,
        elevation: 2,
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        shadowOffset: {width: 0, height: 1}
    },
    title: {
        padding: 5,

        color: Colors.WHITE,
        fontSize: 14
    },
    images_container: {
        padding: 5,
        paddingTop: 0,
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        margin: 2
    }
});