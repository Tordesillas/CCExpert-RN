// @flow

import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {HeroCard, TextField} from '../../components';
import {SortByAlphabet, SortByNumber} from '../../components/icons';
import Sets from '../../models/Sets';
import {Colors} from '../../utils';

class Heroes extends React.Component {
    constructor(props) {
        super(props);

        this.heroes = Sets.get().heroes;

        this.state = {
            heroSearch: "",
            heroDisplayed: this.heroes.sort((h1, h2) => h2.id - h1.id),
            filterMode: 'id'
        };

        this.filterHeroesDelayed = _.debounce(this.filterHeroes, 300);
    }

    filterHeroes() {
        let filteredHeroes = [...this.heroes];
        let filter = this.state.heroSearch;

        if (filter && filter.length > 0) {
            filter = filter.toLowerCase();
            filteredHeroes = filteredHeroes.filter((hero) => hero.getName().toLowerCase().includes(filter));
        }

        if (this.state.filterMode === 'id') {
            this.setState({heroDisplayed: filteredHeroes.sort((h1, h2) => h2.id - h1.id)});
        } else {
            this.setState({heroDisplayed: filteredHeroes.sort((h1, h2) => h1.getName().localeCompare(h2.getName()))});
        }
    }

    render() {
        const {t} = this.props;
        const {heroSearch, heroDisplayed, filterMode} = this.state;

        return (
            <SafeAreaView style={styles.main_container}>
                <View style={styles.search_bar_container}>
                    <TextField
                        style={styles.search_bar}
                        value={heroSearch}
                        placeholder={t('heroes.hero-search')}
                        keyboardType='default'
                        returnKeyType='done'
                        onChangeText={(text) => this.setState({heroSearch: text}, () => this.filterHeroesDelayed())}
                    />
                    <TouchableOpacity
                        style={styles.filter_button}
                        onPress={() => this.setState({filterMode: filterMode === 'id' ? 'name' : 'id'}, () => this.filterHeroesDelayed())}
                    >
                        {filterMode === 'id' ? (
                            <SortByNumber/>
                        ) : (
                            <SortByAlphabet/>
                        )}
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={heroDisplayed}
                    contentContainerStyle={styles.heroes}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    renderItem={({item}) => (
                        <HeroCard
                            hero={item}
                            onPress={() => this.props.navigation.navigate('HeroRecommendations', {hero: item})}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.no_result_container}>
                            <Text style={styles.no_result_text}>{t('heroes.no-result')}</Text>
                        </View>
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
    search_bar_container: {
        padding: 10,
        marginTop: 2,
        flexDirection: 'row'
    },
    search_bar: {
        flex: 1,
        marginRight: 10,
        paddingLeft: 10,
        backgroundColor: Colors.GREY_LIGHT,
        borderRadius: 5
    },
    filter_button: {
        aspectRatio: 1,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.GREY_DARK,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    heroes: {
        paddingHorizontal: 2
    },
    no_result_container: {
        height: 200,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    no_result_text: {
        textAlign: 'center'
    }
});