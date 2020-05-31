import React from 'react';
import {StatusBar} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AppNavigator from './src/routes/appNavigator';
import Database from './src/models/Database';
import {LocalizationService, Registry} from './src/services';
import {Colors} from './src/utils';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.localizationService = Registry.getInstance(LocalizationService.className);

        this.state = {
            loading: true
        };
    }

    async componentDidMount() {
        await Database.get().initDB();

        const language = await this.localizationService.getLanguageSafe();
        await this.localizationService.setLanguage(language);

        this.setState({loading: false});
        setTimeout(() => RNBootSplash.hide(), 10);
    }

    render() {
        const {loading} = this.state;

        if (loading) return <StatusBar backgroundColor={Colors.BLACK_LIGHT} barStyle="light-content"/>;

        return (
            <>
                <StatusBar backgroundColor={Colors.BLACK} barStyle="light-content"/>
                {AppNavigator()}
            </>
        );
    }
}