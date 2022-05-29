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

class Enchantments extends React.Component<Props> {
    enchantments: Array<Talent>;

    constructor(props: Props) {
        super(props);

        this.enchantments = Sets.get().talents
            .filter(talent => talent.isEnchantment)
            .sort((e1, e2) => e1.getName().localeCompare(e2.getName()));
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <FlatList
                    data={this.enchantments}
                    contentContainerStyle={styles.enchantments}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({item}) => (
                        <TalentCard
                            talent={item}
                            onPress={() => this.props.navigation.navigate('Enchantment', {enchantmentName: item.nameFR})}
                        />
                    )}
                />
            </SafeAreaView>
        );
    }
}

export default withTranslation()(Enchantments);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    enchantments: {
        padding: 2
    }
});