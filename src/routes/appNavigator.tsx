import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import i18next from 'i18next';
import SimulatorsStackScreen from './simulatorsStack';
import EncyclopediaStackScreen from './encyclopediaStack';
import AdvicesStackScreen from './advicesStack';
import {Book, HeadBulb, Simulation} from '../components/icons';
import {Colors, Fonts} from '../utils';

function renderTabBarIcon(routeName: string, focused: boolean, color: string, size: number) {
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
                screenOptions={({route}: any) => ({
                    tabBarIcon: ({focused, color, size}: {focused: boolean, color: string, size: number}) =>
                        renderTabBarIcon(route.name, focused, color, size),
                    headerShown: false,
                    tabBarActiveTintColor: Colors.ORANGE,
                    tabBarInactiveTintColor: Colors.WHITE,
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontFamily: Fonts.Comfortaa.Regular
                    },
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
