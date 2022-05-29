import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {withTranslation, WithTranslation} from 'react-i18next';
import {Colors} from '../../utils';

interface Props extends WithTranslation {}

class PetLevel extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>

            </SafeAreaView>
        );
    }
}

export default withTranslation()(PetLevel);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    }
});
