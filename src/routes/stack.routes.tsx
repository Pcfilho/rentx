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

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
    const {
        HOME,
        CAR_DETAILS,
        SCHEDULING,
        SCHEDULING_COMPLETE,
        SCHEDULING_DETAILS,
        MY_CARS,
        SPLASH,
        SIGN_IN,
        FIRST_STEP
    } = routesNames;

    return(
        <Navigator screenOptions={{
            headerShown: false,
        }}
            initialRouteName={SIGN_IN}
        >
            <Screen 
                name={SIGN_IN}
                component={SignIn}
            />

            <Screen 
                name={FIRST_STEP}
                component={FirstStep}
            />

            <Screen 
                name={SPLASH}
                component={Splash}
            />

            <Screen 
                name={HOME}
                component={Home}
                options={{
                    gestureEnabled: false,
                }}
            />
            
            <Screen 
                name={CAR_DETAILS}
                component={CarDetails}
            />            
            
            <Screen 
                name={SCHEDULING}
                component={Scheduling}
            />            
        
            <Screen 
                name={SCHEDULING_DETAILS}
                component={SchedulingDetails}
            />                
    
            <Screen 
                name={SCHEDULING_COMPLETE}
                component={SchedulingComplete}
            />

            <Screen 
                name={MY_CARS}
                component={MyCars}
            />
        </Navigator>
    )
}