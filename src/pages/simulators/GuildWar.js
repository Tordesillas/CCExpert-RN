// @flow

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {TextField} from '../../components';
import {GuildWarProcessor} from '../../services';
import {Colors} from '../../utils';

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
                            style={styles.text_field}
                            placeholder={t('guild-war.power-placeholder')}
                            placeholderTextColor={Colors.GREY_LIGHT}
                            value={power}
                            onChangeText={text => this.setState({power: text})}
                        />
                    </View>
                    <View style={styles.field_container}>
                        <Text style={styles.field_title}>{t('guild-war.score-field')}</Text>
                        <TextField
                            style={styles.text_field}
                            placeholder={t('guild-war.score-placeholder')}
                            placeholderTextColor={Colors.GREY_LIGHT}
                            value={score}
                            onChangeText={text => this.setState({score: text})}
                        />
                    </View>
                </View>
                <View style={styles.result_container}>
                    <Text>{GuildWarProcessor.printStats(t, power, score)}</Text>
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
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Colors.BLACK_LIGHT,
        borderRadius: 2,
        elevation: 2,
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        shadowOffset: {width: 0, height: 1}
    },
    field_container: {
        flexDirection: 'column',
        paddingVertical: 15
    },
    field_title: {
        fontSize: 14,
        color: Colors.WHITE
    },
    text_field: {
        color: Colors.WHITE
    },
    result_container: {

    }
});
