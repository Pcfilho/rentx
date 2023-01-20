import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routesNames } from './routesEnum';

import { AppStackRoutes } from './app.stack.routes';

import { Home } from '../screens/Home';
import MyCars from '../screens/MyCars';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
    const {
        HOME,
        MY_CARS,
        PROFILE
    } = routesNames;

    return(
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >

            <Screen 
                name={HOME}
                component={AppStackRoutes}
            />

            <Screen 
                name={MY_CARS}
                component={MyCars}
            />

            <Screen 
                name={PROFILE}
                component={Home}
            />
            
        </Navigator>
    )
}