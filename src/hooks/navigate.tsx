import { useNavigation } from '@react-navigation/native';
import React from 'react';


export function useNavigate() {
  const navigation = useNavigation();
  const goTo = (route: string) => navigation.navigate(route);
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

  return { goTo, clearNavigation, goBack };
}