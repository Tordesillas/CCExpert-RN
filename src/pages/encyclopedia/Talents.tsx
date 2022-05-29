import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation, WithTranslation} from 'react-i18next';
import {NavigationProp} from '@react-navigation/native';
import {TalentCard} from '../../components';
import Sets from '../../models/Sets';
import Talent from '../../models/Talent';
import {Colors} from '../../utils';

interface Props extends WithTranslation {
    navigation: NavigationProp<any>;
}

class Talents extends React.Component<Props> {
    talents: Array<Talent>;

    constructor(props: Props) {
        super(props);

        this.talents = Sets.get().talents
            .filter(talent => !talent.isEnchantment)
            .sort((t1, t2) => t1.getName().localeCompare(t2.getName()));
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <FlatList
                    data={this.talents}
                    contentContainerStyle={styles.talents}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({item}) => (
                        <TalentCard
                            talent={item}
                            onPress={() => this.props.navigation.navigate('Talent', {talentName: item.nameFR})}
                        />
                    )}
                />
            </SafeAreaView>
        );
    }
}

export default withTranslation()(Talents);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    talents: {
        padding: 2
    }
});