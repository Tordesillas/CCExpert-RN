import {createStackNavigator} from '@react-navigation/stack';
import {Advices, Archdemons, Dungeons, Heroes} from '../pages';
import {containerWithTriangle, defaultNavigationOptions} from './navigationHelper';
import i18next from 'i18next';
import React from 'react';

const AdvicesStack = createStackNavigator();

export default function AdvicesStackScreen() {
    return (
        <AdvicesStack.Navigator>
            <AdvicesStack.Screen
                name="Advices"
                component={Advices}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('menu.advices'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <AdvicesStack.Screen
                name="Heroes"
                component={Heroes}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('heroes.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <AdvicesStack.Screen
                name="Dungeons"
                component={Dungeons}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('dungeons.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <AdvicesStack.Screen
                name="Archdemons"
                component={Archdemons}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('archdemons.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
        </AdvicesStack.Navigator>
    );
}
