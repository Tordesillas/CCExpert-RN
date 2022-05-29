import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation, WithTranslation} from 'react-i18next';
import {NavigationProp} from '@react-navigation/native';
import {PetCard} from '../../components';
import Sets from '../../models/Sets';
import Pet from '../../models/Pet';
import {Colors} from '../../utils';

interface Props extends WithTranslation {
    navigation: NavigationProp<any>;
}

class Pets extends React.Component<Props> {
    pets: Array<Pet>;

    constructor(props: Props) {
        super(props);

        this.pets = Sets.get().pets
            .sort((p1, p2) => p1.getName().localeCompare(p2.getName()));
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
                            onPress={() => this.props.navigation.navigate('Pet', {petName: item.nameFR})}
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
        padding: 2
    }
});