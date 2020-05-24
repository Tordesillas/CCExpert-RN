import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import i18next from 'i18next';
import {Enchantments, Encyclopedia, Pets, Talents} from '../pages';
import {containerWithTriangle, defaultNavigationOptions} from './navigationHelper';

const EncyclopediaStack = createStackNavigator();

export default function EncyclopediaStackScreen() {
    return (
        <EncyclopediaStack.Navigator>
            <EncyclopediaStack.Screen
                name="Encyclopedia"
                component={Encyclopedia}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('menu.encyclopedia'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <EncyclopediaStack.Screen
                name="Talents"
                component={Talents}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('talents.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <EncyclopediaStack.Screen
                name="Enchantments"
                component={Enchantments}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('enchantments.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <EncyclopediaStack.Screen
                name="Pets"
                component={Pets}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('pets.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
        </EncyclopediaStack.Navigator>
    );
}
