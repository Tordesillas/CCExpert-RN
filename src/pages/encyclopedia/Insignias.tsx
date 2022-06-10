import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation, WithTranslation} from 'react-i18next';
import {NavigationProp} from '@react-navigation/native';
import {TalentCard} from '../../components';
import Sets from '../../models/Sets';
import Insignia from '../../models/Insignia';
import {Colors} from '../../utils';

interface Props extends WithTranslation {
    navigation: NavigationProp<any>;
}

class Insignias extends React.Component<Props> {
    private readonly insignias: Array<Insignia>;

    constructor(props: Props) {
        super(props);

        this.insignias = Sets.get().insignias
            .sort((i1, i2) => i1.getName().localeCompare(i2.getName()));
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <FlatList
                    data={this.insignias}
                    contentContainerStyle={styles.insignias}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({item}) => (
                        <TalentCard
                            talent={item as any}
                            onPress={() => this.props.navigation.navigate('Insignia', {insigniaName: item.nameFR})}
                        />
                    )}
                />
            </SafeAreaView>
        );
    }
}

export default withTranslation()(Insignias);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    insignias: {
        padding: 2
    }
});