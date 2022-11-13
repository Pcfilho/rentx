import { useNavigation } from '@react-navigation/native';
import React from 'react';


export function useNavigate() {
  const navigation = useNavigation();
  const goTo = (route: string) => navigation.navigate(route);
  const clearNavigation = () => navigation.reset({
    index: 0,
    routes: [{ name: 'Home'}]
  });


  return { goTo, clearNavigation };
}