// @flow

import React from 'react';
import {Dimensions, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {HeroCard, TextField} from '../../components';
import Sets from '../../models/Sets';
import {Colors} from '../../utils';

class Heroes extends React.Component {
    constructor(props) {
        super(props);

        this.heroes = Sets.get().heroes;
        this.cardSize = Dimensions.get('window').width / 3 - 6;
        this.filterMode = 'id';

        this.state = {
            heroSearch: "",
            heroDisplayed: this.heroes.sort((h1, h2) => h2.id - h1.id)
        };
    }

    filterHeroes() {
        if (this.filterMode === 'id') {
            this.setState({heroDisplayed: this.heroes.sort((h1, h2) => h2.id - h1.id)});
        } else {
            this.setState({heroDisplayed: this.heroes.sort((h1, h2) => h1.nameFR.localeCompare(h2.nameFR))});
        }
    }

    render() {
        const {heroSearch, heroDisplayed} = this.state;

        return (
            <SafeAreaView style={styles.main_container}>
                <View style={styles.search_bar}>
                    <TextField
                        style={{flex: 1}}
                        value={heroSearch}
                        placeholder={"Chercher un héros"}
                        keyboardType="default"
                        returnKeyType="done"
                        onChangeText={(text) => this.setState({heroSearch: text}, () => this.filterHeroes())}
                    />
                    <TouchableOpacity
                        style={styles.filter_button}
                        onPress={() => {this.filterMode = this.filterMode === 'id' ? 'name' : 'id'}}
                    />
                </View>

                <FlatList
                    data={heroDisplayed}
                    contentContainerStyle={styles.heroes}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    renderItem={({item}) => (
                        <HeroCard
                            hero={item}
                            size={this.cardSize}
                            onPress={() => this.props.navigation.navigate("Heroes")}
                        />
                    )}
                />
            </SafeAreaView>
        );
    }
}

export default withTranslation()(Heroes);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    search_bar: {
        padding: 10,
        marginTop: 2,
        flexDirection: "row"
    },
    filter_button: {
        aspectRatio: 1,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.ORANGE_SHINY
    },
    heroes: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingVertical: 2
    }
});