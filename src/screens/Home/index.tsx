import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car'
import { useNavigate } from '../../hooks/navigate';
import { api } from '../../services/api';
import { CarModel } from '../../models/CarModel';
import { routesNames } from '../../routes/routesEnum';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';


const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const { goToWithCar, goWithParams } = useNavigate();
  const [cars, setCars] = useState<CarModel[]>([]);
  const theme = useTheme()

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);


  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionY.value = withSpring(0);
      positionX.value = withSpring(0);
    },
  });

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
            Total de {cars.length} carros
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
      <PanGestureHandler onGestureEvent={onGestureEvent} >
        <Animated.View
          style={[myCarsButtonStyle, {
            position: 'absolute',
            bottom: 13,
            right: 22,
          }]}
          >
          <ButtonAnimated onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            >
            <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape}/>
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

