import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation, WithTranslation} from 'react-i18next';
import {NavigationProp} from '@react-navigation/native';
import {TouchableCard} from '../../components';
import {Colors, Images} from '../../utils';

interface Props extends WithTranslation {
    navigation: NavigationProp<any>;
}

class Simulators extends React.Component<Props> {
    pages: Array<{title: string, icon: number, navigationPage: string}>;

    constructor(props: Props) {
        super(props);

        this.pages = [{
            title: props.t('guild-war.title'),
            icon: Images.guild_wars,
            navigationPage: 'GuildWar'
        }, {
            title: props.t('talent-level.title'),
            icon: Images.talent_chest,
            navigationPage: 'TalentLevel'
        }, {
            title: props.t('inscription.title'),
            icon: Images.inscription,
            navigationPage: 'Inscription'
        }, {
            title: props.t('equipment.title'),
            icon: Images.equipment,
            navigationPage: 'Equipment'
        }, {
            title: props.t('dodge.title'),
            icon: Images.lightning_rock,
            navigationPage: 'Dodge'
        }, {
            title: props.t('attack-speed.title'),
            icon: Images.blitz_scroll,
            navigationPage: 'AttackSpeed'
        }, {
            title: props.t('destiny.title'),
            icon: Images.fate,
            navigationPage: 'Destiny'
        }, {
            title: props.t('protectors.title'),
            icon: Images.protectors,
            navigationPage: 'Protectors'
        }, {
            title: props.t('skin-level.title'),
            icon: Images.dove_keeper4,
            navigationPage: 'SkinLevel'
        }, {
            title: props.t('roll-simulator.title'),
            icon: Images.roll,
            navigationPage: 'RollSimulator'
        }, {
            title: props.t('pet-level.title'),
            icon: Images.piblob,
            navigationPage: 'PetLevel'
        }, {
            title: props.t('breakthrough-levels.title'),
            icon: Images.breakthrough_levels,
            navigationPage: 'BreakthroughLevels'
        }];
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <FlatList
                    data={this.pages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <TouchableCard
                            title={item.title}
                            icon={item.icon}
                            onPress={() => this.props.navigation.navigate(item.navigationPage)}
                        />
                    )}
                />
            </SafeAreaView>
        );
    }
}

export default withTranslation()(Simulators);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    }
});
