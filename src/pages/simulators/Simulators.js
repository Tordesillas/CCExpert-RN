// @flow

import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation} from 'react-i18next';
import {TouchableCard} from '../../components';
import {Colors, Images} from '../../utils';

class Simulators extends React.Component {
    constructor(props) {
        super(props);

        this.pages = [{
            title: props.t('guild-war.title'),
            icon: Images.guild_wars,
            navigationPage: "GuildWar"
        }, {
            title: props.t('talent-level.title'),
            icon: Images.shards,
            navigationPage: "TalentLevel"
        }, {
            title: props.t('inscription.title'),
            icon: Images.crystal,
            navigationPage: "Inscription"
        }, {
            title: props.t('equipment.title'),
            icon: Images.aetherock,
            navigationPage: "Equipment"
        }, {
            title: props.t('dodge.title'),
            icon: Images.lightning_rock,
            navigationPage: "Dodge"
        }, {
            title: props.t('accuracy.title'),
            icon: Images.eye_of_garuda,
            navigationPage: "Accuracy"
        }, {
            title: props.t('attack-speed.title'),
            icon: Images.blitz_scroll,
            navigationPage: "AttackSpeed"
        }, {
            title: props.t('destiny.title'),
            icon: Images.karmic_rock4,
            navigationPage: "Destiny"
        }, {
            title: props.t('protectors.title'),
            icon: Images.saint,
            navigationPage: "Protectors"
        }, {
            title: props.t('skin-level.title'),
            icon: Images.dove_keeper4,
            navigationPage: "SkinLevel"
        }, {
            title: props.t('roll-simulator.title'),
            icon: Images.roll,
            navigationPage: "RollSimulator"
        }, {
            title: props.t('pet-level.title'),
            icon: Images.piblob,
            navigationPage: "PetLevel"
        }, {
            title: props.t('breakthrough-levels.title'),
            icon: Images.breakthrough_levels,
            navigationPage: "BreakthroughLevels"
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
