// @flow

import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
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
                            onPress={() => this.props.navigation.navigate('Talent', {talentName: item.nameFR})}
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
        padding: 2
    }
});