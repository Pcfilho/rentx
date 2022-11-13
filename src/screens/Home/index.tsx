import React, { useEffect, useState } from 'react';
import { StatusBar, Text, Button } from 'react-native';
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
  CarList
} from './styles';
import { Load } from '../../components/Load';


export function Home() {
  const { goTo, goToWithCar } = useNavigate();
  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      api.get('/cars').then(({ data }) => {
        console.log(data);
        setCars(data);
      })
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
    </Container>
  );
};

