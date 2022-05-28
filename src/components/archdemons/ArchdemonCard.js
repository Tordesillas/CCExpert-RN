// @flow

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Sets from '../../models/Sets';
import {Colors} from '../../utils';

type Props = {
    archdemonSuggestion: {hero: string, talent: string, crest: string}
}

export default class ArchdemonCard extends React.Component<Props> {
    render() {
        const {archdemonSuggestion} = this.props;

        return (
            <View style={styles.main_container}>
                <Image
                    source={Sets.get().getHero(archdemonSuggestion.hero).getPicture()}
                    style={styles.image}
                    resizeMode="contain"
                    fadeDuration={0}
                />
                <Image
                    source={Sets.get().getTalent(archdemonSuggestion.talent).getPicture()}
                    style={styles.image}
                    resizeMode="contain"
                    fadeDuration={0}
                />
                <Image
                    source={Sets.get().getTalent(archdemonSuggestion.crest).getCrestPicture()}
                    style={styles.image}
                    resizeMode="contain"
                    fadeDuration={0}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'row',
        margin: 2,
        backgroundColor: Colors.BLACK_LIGHT,
        borderRadius: 2,
        elevation: 3,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    image: {
        aspectRatio: 1,
        flex: 1,
        margin: 4
    }
});