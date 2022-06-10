import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import i18next from 'i18next';
import {
    AttackSpeed, BreakthroughLevels, Destiny, Dodge, Equipment, GuildWar, Inscription, PetLevel, Protectors, Relic,
    RollSimulator, Simulators, SkinLevel, TalentLevel
} from '../pages';
import {containerWithTriangle, defaultNavigationOptions} from './navigationHelper';

const SimulatorsStack = createStackNavigator();

export default function SimulatorsStackScreen() {
    return (
        <SimulatorsStack.Navigator>
            <SimulatorsStack.Screen
                name="Simulators"
                component={Simulators}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('menu.simulators'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="GuildWar"
                component={GuildWar}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('guild-war.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="TalentLevel"
                component={TalentLevel}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('talent-level.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="Inscription"
                component={Inscription}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('inscription.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="Equipment"
                component={Equipment}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('equipment.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="Dodge"
                component={Dodge}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('dodge.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="AttackSpeed"
                component={AttackSpeed}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('attack-speed.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="Destiny"
                component={Destiny}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('destiny.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="Protectors"
                component={Protectors}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('protectors.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="SkinLevel"
                component={SkinLevel}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('skin-level.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="RollSimulator"
                component={RollSimulator}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('roll-simulator.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="PetLevel"
                component={PetLevel}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('pet-level.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="BreakthroughLevels"
                component={BreakthroughLevels}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('breakthrough-levels.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
            <SimulatorsStack.Screen
                name="Relic"
                component={Relic}
                options={{
                    ...defaultNavigationOptions,
                    title: i18next.t('relic.title'),
                    headerRight: () => containerWithTriangle()
                }}
            />
        </SimulatorsStack.Navigator>
    );
}