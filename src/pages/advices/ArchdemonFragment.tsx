import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {RouteProp} from '@react-navigation/native';
import {ArchdemonCard} from '../../components';
import Archdemon from '../../models/Archdemon';
import {Colors, Fonts, Images} from '../../utils';

interface Props {
    route: RouteProp<{params: {archdemon: Archdemon}}>;
}

class ArchdemonFragment extends React.Component<Props> {
    render() {
        const {archdemon} = this.props.route.params;

        return (
            <ScrollView style={styles.main_container}>
                <View style={styles.archdemon_card}>
                    <View style={styles.archdemon_description_container}>
                        <Text style={styles.archdemon_description}>
                            {archdemon.getDescription()}
                        </Text>
                    </View>
                    <Image
                        source={Images.archdemon}
                        style={styles.archdemon_picture}
                        resizeMode="contain"
                        fadeDuration={0}
                    />
                </View>

                <FlatList
                    contentContainerStyle={{margin: 2}}
                    data={archdemon.getHeroesSuggestion()}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({item}) => (
                        <ArchdemonCard
                            archdemonSuggestion={item}
                        />
                    )}
                />
            </ScrollView>
        );
    }
}

export default withTranslation()(ArchdemonFragment);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    archdemon_card: {
        height: 175,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: Colors.BLACK_LIGHT,
        elevation: 2,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1}
    },
    archdemon_description_container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        padding: 10
    },
    archdemon_description: {
        width: '100%',
        textAlign: 'center',

        fontSize: 14,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.WHITE
    },
    archdemon_picture: {
        height: '100%',
        width: undefined,
        aspectRatio: 1
    }
});