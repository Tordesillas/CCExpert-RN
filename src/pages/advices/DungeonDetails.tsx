import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation} from 'react-i18next';
import {Colors} from '../../utils';

class DungeonDetails extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.main_container}>

            </SafeAreaView>
        );
    }
}

export default withTranslation()(DungeonDetails);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    }
});