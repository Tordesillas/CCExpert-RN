import React from 'react';
import {StatusBar} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {LocalizationService, Registry} from './src/services';
import {Colors} from './src/utils';
import AppNavigator from './src/routes/appNavigator';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.localizationService = Registry.getInstance(LocalizationService.className);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.localizationService.getLanguageSafe().then(language => {
            this.localizationService.setLanguage(language).then(() => {
                this.setState({loading: false});
                setTimeout(() => RNBootSplash.hide(), 10);
            });
        });
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
