import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import i18next from 'i18next';
import {Advices, Archdemons, Dungeons, Heroes, HeroRecommendations} from '../pages';
import {containerWithTriangle, defaultNavigationOptions} from './navigationHelper';

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
            <AdvicesStack.Screen
                name="HeroRecommendations"
                component={HeroRecommendations}
                options={({route}) => ({
                    ...defaultNavigationOptions,
                    title: route.params.hero.getName(),
                    headerRight: () => containerWithTriangle()
                })}
            />
        </AdvicesStack.Navigator>
    );
}
