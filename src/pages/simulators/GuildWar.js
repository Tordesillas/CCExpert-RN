// @flow

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {TextField} from '../../components';
import {GuildWarProcessor} from '../../services';
import {Colors, Fonts} from '../../utils';

class GuildWar extends React.Component {
    state = {
        power: "",
        score: ""
    };

    render() {
        const {t} = this.props;
        const {power, score} = this.state;

        return (
            <SafeAreaView style={styles.main_container}>
                <View style={styles.fields_container}>
                    <View style={styles.field_container}>
                        <Text style={styles.field_title}>{t('guild-war.power-field')}</Text>
                        <TextField
                            placeholder={t('guild-war.power-placeholder')}
                            value={power}
                            onChangeText={text => this.setState({power: text})}
                            keyboardType='number-pad'
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.scoreField.focus()}
                        />
                    </View>
                    <View style={styles.field_container}>
                        <Text style={styles.field_title}>{t('guild-war.score-field')}</Text>
                        <TextField
                            placeholder={t('guild-war.score-placeholder')}
                            value={score}
                            onChangeText={text => this.setState({score: text})}
                            ref={(input) => this.scoreField = input}
                            keyboardType='number-pad'
                        />
                    </View>
                </View>
                <View style={styles.result_container}>
                    <Text style={styles.result_text}>{GuildWarProcessor.printStats(t, power, score)}</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default withTranslation()(GuildWar);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    },
    fields_container: {
        margin: 4,
        padding: 10,
        backgroundColor: Colors.BLACK_LIGHT,
        borderRadius: 2,
        elevation: 3,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22
    },
    field_container: {
        flexDirection: 'column',
        paddingVertical: 10
    },
    field_title: {
        marginBottom: 3,

        fontSize: 12,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.ORANGE
    },
    result_container: {
        marginHorizontal: 8,
        marginVertical: 10
    },
    result_text: {
        fontSize: 14,
        fontFamily: Fonts.Comfortaa.Regular,
        color: Colors.ORANGE
    }
});
