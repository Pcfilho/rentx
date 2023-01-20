import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routesNames } from './routesEnum';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';


import { AppStackRoutes } from './app.stack.routes';

import { Home } from '../screens/Home';
import MyCars from '../screens/MyCars';
import { useTheme } from 'styled-components/native';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
    const theme = useTheme();

    const {
        HOME,
        MY_CARS,
        PROFILE
    } = routesNames;

    return(
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: theme.colors.text_details,
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingVertical: Platform.select({ios: 20, android: 0}),
                    height: 78,
                    backgroundColor: theme.colors.background_primary
                }
            }}
        >

            <Screen 
                name={HOME}
                component={AppStackRoutes}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg width={24} height={24} fill={color}/>
                    )
                }}
            />

            <Screen 
                name={MY_CARS}
                component={MyCars}
                options={{
                    tabBarIcon: ({ color }) => (
                        <CarSvg width={24} height={24} fill={color}/>
                    )
                }}
            />

            <Screen 
                name={PROFILE}
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <PeopleSvg width={24} height={24} fill={color}/>
                    )
                }}
            />
            
        </Navigator>
    )
}