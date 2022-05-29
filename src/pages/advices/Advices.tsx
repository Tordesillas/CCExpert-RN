import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation, WithTranslation} from 'react-i18next';
import {NavigationProp} from '@react-navigation/native';
import {TouchableCard} from '../../components';
import {Colors, Images} from '../../utils';

interface Props extends WithTranslation {
    navigation: NavigationProp<any>;
}

class Advices extends React.Component<Props> {
    pages: Array<{title: string, icon: number, navigationPage: string}>;

    constructor(props: Props) {
        super(props);

        this.pages = [{
            title: props.t('heroes.title'),
            icon: Images.heroes,
            navigationPage: 'Heroes'
        }, {
            title: props.t('dungeons.title'),
            icon: Images.dungeon_door,
            navigationPage: 'Dungeons'
        }, {
            title: props.t('archdemons.title'),
            icon: Images.archdemon,
            navigationPage: 'Archdemons'
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
