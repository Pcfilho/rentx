import { useNavigation, useRoute } from '@react-navigation/native';
import { Car as CarModel } from '../database/models/Car';
import { routesNames } from '../routes/routesEnum';

type routeName = keyof typeof routesNames;
interface Navigation {
  navigate: (value: string, param?: Object) => void;
  reset: (object: Object) => void;
  canGoBack: boolean;
  goBack: () => void;
}

export function useNavigate() {
  const navigation = useNavigation<Navigation>();

  const goTo = (route: routeName) => navigation.navigate(route);

  const goToWithCar = (route: routeName, car: CarModel) => {
    navigation.navigate(route, { car });
  }

  const goWithParams = (route: routeName, params: any) => {
    navigation.navigate(route, {...params });
  }

  const clearNavigation = () => navigation.reset({
    index: 0,
    routes: [{ name: 'Home'}]
  });

  const clearToExclusiveScreen = (name : routeName) => navigation.reset({
    index: 0,
    routes: [{ name }],
  });

  const goBack = () => {
    if (navigation.canGoBack) {
      navigation.goBack();
    } else {
      console.log("Can't go back!!");
    }
  };

  return { goTo, goToWithCar, clearNavigation, goBack, goWithParams, clearToExclusiveScreen };
};

export function useRouteParams<Type>() {
  const route = useRoute();
  return route.params as Type;
};
