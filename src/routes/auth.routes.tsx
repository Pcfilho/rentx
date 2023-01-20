import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routesNames } from './routesEnum';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import MyCars from '../screens/MyCars';
import Splash from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { FirstStep } from '../screens/SignUp/FirstStep';
import { SecondStep } from '../screens/SignUp/SecondStep';
import { Confirmation } from '../components/Confirmation';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
    const {
        SPLASH,
        SIGN_IN,
        FIRST_STEP,
        SECOND_STEP,
        CONFIRMATION
    } = routesNames;

    return(
        <Navigator screenOptions={{
            headerShown: false,
        }}
            initialRouteName={SPLASH}
        >
            <Screen 
                name={SPLASH}
                component={Splash}
            />

            <Screen 
                name={SIGN_IN}
                component={SignIn}
            />

            <Screen 
                name={FIRST_STEP}
                component={FirstStep}
            />

            <Screen 
                name={SECOND_STEP}
                component={SecondStep}
            />

            <Screen 
                name={CONFIRMATION}
                component={Confirmation}
            />
        </Navigator>
    )
}