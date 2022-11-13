import { useNavigation, useRoute } from '@react-navigation/native';
import { CarModel } from '../models/CarModel';


export function useNavigate() {
  const navigation = useNavigation();

  const goTo = (route: string) => navigation.navigate(route);

  const goToWithCar = (route: string, car: CarModel) => {
    navigation.navigate(route, { car });
  }

  const goWithParams = (route: string, params: any) => {
    navigation.navigate(route, {...params });
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

  return { goTo, goToWithCar, clearNavigation, goBack, goWithParams };
};

export function useRouteParams<Type>() {
  const route = useRoute();
  return route.params as Type;
};
