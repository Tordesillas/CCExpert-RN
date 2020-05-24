import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import i18next from 'i18next';
import SimulatorsStackScreen from './simulatorsStack';
import EncyclopediaStackScreen from './encyclopediaStack';
import AdvicesStackScreen from './advicesStack';
import {Book, HeadBulb, Simulation} from '../components/icons';
import {Colors} from '../utils';

function renderTabBarIcon(routeName, focused, color, size) {
    switch (routeName) {
        case "Advices":
            return <HeadBulb width={size} height={size} color={color}/>;
        case "Encyclopedia":
            return <Book width={size} height={size} color={color}/>;
        case "Simulators":
            return <Simulation width={size} height={size} color={color}/>;
    }
}

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => renderTabBarIcon(route.name, focused, color, size)
                })}
                tabBarOptions={{
                    activeTintColor: Colors.ORANGE,
                    inactiveTintColor: Colors.WHITE,
                    style: {
                        borderTopWidth: 0,
                        backgroundColor: Colors.BLACK
                    }
                }}
            >
                <Tab.Screen
                    name="Advices"
                    component={AdvicesStackScreen}
                    options={{title: i18next.t('menu.advices')}}
                />
                <Tab.Screen
                    name="Encyclopedia"
                    component={EncyclopediaStackScreen}
                    options={{title: i18next.t('menu.encyclopedia')}}
                />
                <Tab.Screen
                    name="Simulators"
                    component={SimulatorsStackScreen}
                    options={{title: i18next.t('menu.simulators')}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
