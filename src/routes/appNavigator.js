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
        case "AdvicesStack":
            return <HeadBulb width={size} height={size} color={color}/>;
        case "EncyclopediaStack":
            return <Book width={size} height={size} color={color}/>;
        case "SimulatorsStack":
            return <Simulation width={size} height={size} color={color}/>;
    }
}

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => renderTabBarIcon(route.name, focused, color, size),
                    headerShown: false,
                    tabBarActiveTintColor: Colors.ORANGE,
                    tabBarInactiveTintColor: Colors.WHITE,
                    tabBarStyle: {
                        borderTopWidth: 0,
                        backgroundColor: Colors.BLACK
                    }
                })}
            >
                <Tab.Screen
                    name="AdvicesStack"
                    component={AdvicesStackScreen}
                    options={{title: i18next.t('menu.advices')}}
                />
                <Tab.Screen
                    name="EncyclopediaStack"
                    component={EncyclopediaStackScreen}
                    options={{title: i18next.t('menu.encyclopedia')}}
                />
                <Tab.Screen
                    name="SimulatorsStack"
                    component={SimulatorsStackScreen}
                    options={{title: i18next.t('menu.simulators')}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
