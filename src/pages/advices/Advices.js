// @flow

import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation} from 'react-i18next';
import {TouchableCard} from '../../components';
import {Colors, Images} from '../../utils';

class Advices extends React.Component {
    constructor(props) {
        super(props);

        this.pages = [{
            title: props.t('heroes.title'),
            icon: Images.heroes,
            navigationPage: "Heroes"
        }, {
            title: props.t('dungeons.title'),
            icon: Images.dungeon_door,
            navigationPage: "Dungeons"
        }, {
            title: props.t('archdemons.title'),
            icon: Images.archdemon,
            navigationPage: "Archdemons"
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

export default withTranslation()(Advices);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    }
});
