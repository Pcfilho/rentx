import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { CarModel } from '../models/CarModel';


export function useNavigate() {
  const navigation = useNavigation();
  const goTo = (route: string) => navigation.navigate(route);

  const goToWithCar = (route: string, car: CarModel) => {
    navigation.navigate(route, { car });
  }

  const clearNavigation = () => navigation.reset({
    index: 0,
    routes: [{ name: 'Home'}]
  });



  const goBack = () => {
    if (navigation.canGoBack) {
      navigation.goBack();
    } else {
      console.log("'Can't go back!!'");
    }
  };

  return { goTo, goToWithCar, clearNavigation, goBack };
}