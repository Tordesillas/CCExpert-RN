import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import {withTranslation, WithTranslation} from 'react-i18next';
import {RouteProp} from '@react-navigation/native';
import {HorizontalWheelPicker} from '../../components';
import Sets from '../../models/Sets';
import Pet from '../../models/Pet';
import {Colors, Fonts, Images} from '../../utils';

interface Props extends WithTranslation {
    route: RouteProp<{params: {petName: string}}>;
}

interface State {
    descriptionShown: number;
}

class PetDetails extends React.Component<Props, State> {
    pet: Pet;
    levels: Array<number>;

    constructor(props: Props) {
        super(props);

        this.pet = Sets.get().getPet(props.route.params.petName);
        this.levels = _.range(1, 11);

        this.state = {
            descriptionShown: this.levels[0]
        };
    }

    render() {
        const {t} = this.props;
        const {descriptionShown} = this.state;

        return (
            <SafeAreaView style={styles.main_container}>
                <ScrollView>
                    <View style={styles.pet_name_container}>
                        <Image
                            source={this.pet.getPicture()}
                            style={styles.pet_image}
                            resizeMode="contain"
                            fadeDuration={0}
                        />
                        <Text style={styles.pet_name}>
                            {this.pet.getName()}
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.card_title}>{t('talents.level')}</Text>
                        <HorizontalWheelPicker
                            data={this.levels}
                            selectedItem={descriptionShown}
                            onChange={(position) => this.setState({descriptionShown: this.levels[position]})}
                        />
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.card_title}>{t('talents.description')}</Text>
                        <View style={styles.description_wrapper}>
                            <Text style={styles.description}>{this.pet.getDescription(descriptionShown)}</Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.card_title}>{t('pets.recommended-modes')}</Text>
                        <View style={styles.modes_container}>
                            <Image
                                source={Images.guild_wars}
                                style={[styles.mode_image, {opacity: this.pet.isRecommendedForThisMode(0) ? 1 : 0}]}
                                resizeMode="contain"
                                fadeDuration={0}
                            />
                            <Image
                                source={Images.dungeon_logo}
                                style={[styles.mode_image, {opacity: this.pet.isRecommendedForThisMode(1) ? 1 : 0}]}
                                resizeMode="contain"
                                fadeDuration={0}
                            />
                            <Image
                                source={Images.arena}
                                style={[styles.mode_image, {opacity: this.pet.isRecommendedForThisMode(2) ? 1 : 0}]}
                                resizeMode="contain"
                                fadeDuration={0}
                            />
                            <Image
                                source={Images.battlefield}
                                style={[styles.mode_image, {opacity: this.pet.isRecommendedForThisMode(3) ? 1 : 0}]}
                                resizeMode="contain"
                                fadeDuration={0}
                            />
                            <Image
                                source={Images.wave}
                                style={[styles.mode_image, {opacity: this.pet.isRecommendedForThisMode(4) ? 1 : 0}]}
                                resizeMode="contain"
                                fadeDuration={0}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default withTranslation()(PetDetails);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    pet_name_container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
        backgroundColor: Colors.BLACK_LIGHT,
        borderRadius: 2,
        elevation: 3,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    pet_image: {
        maxWidth: 150,
        aspectRatio: 1,
        marginVertical: 5,
    },
    pet_name: {
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 5,

        fontSize: 20,
        fontFamily: Fonts.SirinStencil,
        color: Colors.WHITE
    },
    card: {
        flexDirection: 'column',
        marginHorizontal: 4,
        marginBottom: 4,
        backgroundColor: Colors.BLACK_LIGHT,
        borderRadius: 2,
        elevation: 3,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    card_title: {
        padding: 5,

        fontSize: 14,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.ORANGE
    },
    description_wrapper: {
        height: 160,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE
    },
    modes_container: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    mode_image: {
        marginHorizontal: 4,
        flex: 1,
        aspectRatio: 1
    }
});