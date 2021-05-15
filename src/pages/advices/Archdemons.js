// @flow

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {withTranslation} from 'react-i18next';
import ArchdemonFragment from './ArchdemonFragment';
import {Colors} from '../../utils';
import Sets from '../../models/Sets';

const Tab = createMaterialTopTabNavigator();

class Archdemons extends React.Component {
    constructor(props) {
        super(props);

        const archdemons = Sets.get().archdemons;

        this.tabScreens = archdemons.map((archdemon, index) =>
            <Tab.Screen
                key={index}
                name={`${props.t('archdemons.suggestion')} ${index+1}`}
                component={ArchdemonFragment}
                initialParams={{archdemon}}
            />
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: Colors.ORANGE,
                        inactiveTintColor: Colors.WHITE,
                        style: {
                            borderTopWidth: 0,
                            backgroundColor: Colors.BLACK_LIGHT
                        },
                        indicatorStyle: {
                            backgroundColor: Colors.ORANGE
                        },
                        scrollEnabled: true
                    }}
                    backBehavior='none'
                >
                    {this.tabScreens}
                </Tab.Navigator>
            </SafeAreaView>
        );
    }
}

export default withTranslation()(Archdemons);

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Colors.GREY
    }
});
