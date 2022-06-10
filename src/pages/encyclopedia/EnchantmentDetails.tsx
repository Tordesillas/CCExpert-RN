import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import {withTranslation, WithTranslation} from 'react-i18next';
import {RouteProp} from '@react-navigation/native';
import {HorizontalWheelPicker} from '../../components';
import Sets from '../../models/Sets';
import Talent from '../../models/Talent';
import {Colors, Fonts} from '../../utils';

interface Props extends WithTranslation {
    route: RouteProp<{params: {enchantmentName: string}}>;
}

interface State {
    descriptionShown: number;
}

class EnchantmentDetails extends React.Component<Props, State> {
    enchantment: Talent;
    levels: Array<number>;

    constructor(props: Props) {
        super(props);

        this.enchantment = Sets.get().getTalent(props.route.params.enchantmentName);
        this.levels = _.range(this.enchantment.getMinimumLevel(), this.enchantment.getMaximumLevel()+1);

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
                    <View style={styles.enchantment_name_container}>
                        <Image
                            source={this.enchantment.getPicture()}
                            style={styles.image}
                            resizeMode="contain"
                            fadeDuration={0}
                        />
                        <Text style={styles.enchantment_name}>
                            {this.enchantment.getName()}
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
                            <Text style={styles.description}>{this.enchantment.getDescription(descriptionShown)}</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default withTranslation()(EnchantmentDetails);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    enchantment_name_container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
        backgroundColor: Colors.BLACK_LIGHT,
        borderRadius: 2,
        elevation: 2,
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        shadowOffset: {width: 0, height: 1}
    },
    image: {
        maxWidth: 100,
        aspectRatio: 1,
        marginVertical: 10,
        marginLeft: 20
    },
    enchantment_name: {
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
        height: 200,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE
    }
});