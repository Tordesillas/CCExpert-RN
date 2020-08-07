// @flow

import React from 'react';
import {Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation} from 'react-i18next';
import {TalentCard} from '../../components';
import Sets from '../../models/Sets';
import {Colors} from '../../utils';

class Talents extends React.Component {
    constructor(props) {
        super(props);

        this.talents = Sets.get().talents
            .filter(talent => !talent.isEnchantment)
            .sort((t1, t2) => t1.getName().localeCompare(t2.getName()));
        this.cardSize = Dimensions.get('window').width / 4 - 6;
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <FlatList
                    data={this.talents}
                    contentContainerStyle={styles.talents}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({item}) => (
                        <TalentCard
                            talent={item}
                            size={this.cardSize}
                            onPress={() => this.props.navigation.navigate('Talent', {talent: item})}
                        />
                    )}
                />
            </SafeAreaView>
        );
    }
}

export default withTranslation()(Talents);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    talents: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingVertical: 4
    }
});