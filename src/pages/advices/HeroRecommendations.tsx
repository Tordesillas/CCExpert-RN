import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {withTranslation, WithTranslation} from 'react-i18next';
import {RouteProp} from '@react-navigation/native';
import {HeroRecommendationCard} from '../../components';
import {Avatar} from '../../components/icons';
import Sets from '../../models/Sets';
import Hero from '../../models/Hero';
import {Colors} from '../../utils';

interface Props extends WithTranslation {
    route: RouteProp<{params: {hero: Hero}}>;
}

interface State {
    appearance: number;
}

class HeroRecommendations extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            appearance: 2
        };
    }

    nextAppearance(hero: Hero) {
        let newAppearance = this.state.appearance + 1;
        if (!hero.getPicture(newAppearance)) {
            newAppearance = 2;
        }
        this.setState({appearance: newAppearance});
    }

    render() {
        const {route, t} = this.props;
        const {appearance} = this.state;
        const {hero} = route.params;

        return (
            <SafeAreaView style={styles.main_container}>
                <ScrollView style={styles.main_container}>
                    <View style={styles.talents_wrapper}>
                        <View style={styles.wrapper}>
                            <HeroRecommendationCard
                                title={t('heroes.recommendations.gw-attack')}
                                images={[Sets.get().getTalent(hero.talentGWAttack).getPicture(), Sets.get().getTalent(hero.crestGWAttack).getCrestPicture()]}
                            />
                            <HeroRecommendationCard
                                title={t('heroes.recommendations.gw-defence')}
                                images={[Sets.get().getTalent(hero.talentGWDefense).getPicture(), Sets.get().getTalent(hero.crestGWDefense).getCrestPicture()]}
                            />
                        </View>
                        <View style={styles.wrapper}>
                            <HeroRecommendationCard
                                title={t('heroes.recommendations.dungeon')}
                                images={[Sets.get().getTalent(hero.talentDungeon).getPicture(), Sets.get().getTalent(hero.crestDungeon).getCrestPicture()]}
                            />
                            <HeroRecommendationCard
                                title={t('heroes.recommendations.enchantments')}
                                images={hero.enchantments.map((enchantment) => Sets.get().getTalent(enchantment).getPicture())}
                            />
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <Image
                            source={hero.getPicture(appearance)}
                            style={styles.hero_image}
                            resizeMode="contain"
                        />
                        <View style={styles.pet_wrapper}>
                            <View style={styles.pet_container}>
                                <Image
                                    source={Sets.get().getPet(hero.pet).getPicture()}
                                    style={styles.pet_image}
                                    resizeMode="contain"
                                    fadeDuration={0}
                                />
                            </View>
                            <View style={styles.button_container}>
                                <TouchableOpacity style={styles.button} onPress={() => this.nextAppearance(hero)}>
                                    <Avatar/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default withTranslation()(HeroRecommendations);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    talents_wrapper: {
        padding: 2
    },
    wrapper: {
        flexDirection: 'row'
    },
    hero_image: {
        flex: 3,
        marginHorizontal: 4,
        aspectRatio: 0.8
    },
    pet_wrapper: {
        flex: 2,
        flexDirection: 'column',
        marginHorizontal: 4
    },
    pet_container: {
        width: '100%',
        aspectRatio: 1
    },
    pet_image: {
        flex: 1,
        aspectRatio: 1,
        height: '100%'
    },
    button_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        aspectRatio: 1,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.GREY_DARK,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    }
});
