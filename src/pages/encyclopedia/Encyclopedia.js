// @flow

import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation} from 'react-i18next';
import {Colors, Images} from '../../utils';
import {TouchableCard} from '../../components';

class Encyclopedia extends React.Component {
    constructor(props) {
        super(props);

        this.pages = [{
            title: props.t('talents.title'),
            icon: Images.talents,
            navigationPage: "Talents"
        }, {
            title: props.t('enchantments.title'),
            icon: Images.enchantments,
            navigationPage: "Enchantments"
        }, {
            title: props.t('pets.title'),
            icon: Images.pets,
            navigationPage: "Pets"
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

export default withTranslation()(Encyclopedia);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    }
});
