// @flow

import React from 'react';
import {Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation} from 'react-i18next';
import {TalentCard} from '../../components';
import Sets from '../../models/Sets';
import {Colors} from '../../utils';

class Enchantments extends React.Component {
    constructor(props) {
        super(props);

        this.enchantments = Sets.get().talents
            .filter(talent => talent.isEnchantment)
            .sort((e1, e2) => e1.getName().localeCompare(e2.getName()));
        this.cardSize = Dimensions.get('window').width / 4 - 6;
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <FlatList
                    data={this.enchantments}
                    contentContainerStyle={styles.enchantments}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({item}) => (
                        <TalentCard
                            talent={item}
                            size={this.cardSize}
                            onPress={() => this.props.navigation.navigate('Enchantment', {enchantment: item})}
                        />
                    )}
                />
            </SafeAreaView>
        );
    }
}

export default withTranslation()(Enchantments);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    enchantments: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingVertical: 4
    }
});