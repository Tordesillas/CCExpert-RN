// @flow

import React from 'react';
import {Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation} from 'react-i18next';
import {PetCard} from '../../components';
import Sets from '../../models/Sets';
import {Colors} from '../../utils';

class Pets extends React.Component {
    constructor(props) {
        super(props);

        this.pets = Sets.get().pets
            .sort((p1, p2) => p1.getName().localeCompare(p2.getName()));
        this.cardSize = Dimensions.get('window').width / 4 - 6;
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <FlatList
                    data={this.pets}
                    contentContainerStyle={styles.pets}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({item}) => (
                        <PetCard
                            pet={item}
                            size={this.cardSize}
                            onPress={() => this.props.navigation.navigate('Pet', {Pet: item})}
                        />
                    )}
                />
            </SafeAreaView>
        );
    }
}

export default withTranslation()(Pets);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    pets: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingVertical: 4
    }
});