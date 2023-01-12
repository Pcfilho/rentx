import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car'
import { useNavigate } from '../../hooks/navigate';
import { api } from '../../services/api';
import { CarModel } from '../../models/CarModel';
import { routesNames } from '../../routes/routesEnum';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarButton,
} from './styles';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';


export function Home() {
  const { goToWithCar, goWithParams } = useNavigate();
  const [cars, setCars] = useState<CarModel[]>([]);
  const theme = useTheme()

  function handleOpenMyCars() {
    goWithParams('MyCars', {})
  }

  useEffect(() => {
      api.get('/cars').then(({ data }) => {
        setCars(data);
      })
  }, []);

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      
      <CarList 
        data={cars}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Car data={item} onPress={() => {
          goToWithCar(routesNames.CAR_DETAILS, item);
        }} />}
        ListEmptyComponent={<Load />}
      />

      <MyCarButton onPress={handleOpenMyCars}>
        <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape}/>
      </MyCarButton>
    </Container>
  );
};

