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

export function AppStackRoutes() {
    const {
        HOME,
        CAR_DETAILS,
        SCHEDULING,
        SCHEDULING_COMPLETE,
        SCHEDULING_DETAILS,
        MY_CARS,
        SPLASH,
        CONFIRMATION
    } = routesNames;

    return(
        <Navigator screenOptions={{
            headerShown: false,
        }}
            initialRouteName={SPLASH}
        >
            <Screen 
                name={HOME}
                component={Home}
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