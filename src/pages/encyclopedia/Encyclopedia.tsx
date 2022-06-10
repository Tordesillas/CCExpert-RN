import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation, WithTranslation} from 'react-i18next';
import {NavigationProp} from '@react-navigation/native';
import {TouchableCard} from '../../components';
import {Colors, Images} from '../../utils';

interface Props extends WithTranslation {
    navigation: NavigationProp<any>;
}

class Encyclopedia extends React.Component<Props> {
    pages: Array<{title: string, icon: number, navigationPage: string}>;

    constructor(props: Props) {
        super(props);

        this.pages = [{
            title: props.t('talents.title'),
            icon: Images.talents,
            navigationPage: 'Talents'
        }, {
            title: props.t('insignias.title'),
            icon: Images.insignias,
            navigationPage: 'Insignias'
        }, {
            title: props.t('enchantments.title'),
            icon: Images.enchantments,
            navigationPage: 'Enchantments'
        }, {
            title: props.t('pets.title'),
            icon: Images.pets,
            navigationPage: 'Pets'
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
