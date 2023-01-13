import React from 'react';

import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import { useRoute } from '@react-navigation/native';
import { useNavigate } from '../../hooks/navigate';
import { routesNames } from '../../routes/routesEnum';
import { CarModel } from '../../models/CarModel';
import { StatusBar } from 'react-native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Button } from '../../components/Button';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface Params {
    car: CarModel;
}

export function CarDetails() {
    const { goBack, goWithParams } = useNavigate();
    const route = useRoute();
    const { car } = route.params as Params;

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    })

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    })

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    
    });

    function handleConfirmRental() {
        goWithParams(routesNames.SCHEDULING, { car });
    }

    return (
        <Container>
            <StatusBar 
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <Animated.View
                style={[headerStyleAnimation, {
                    marginTop: getStatusBarHeight() + 32,
                }]}
            >
                <Header>
                    <BackButton onPress={goBack}/>
                </Header>

                <Animated.View style={sliderCarsStyleAnimation}>
                    <ImageSlider imagesUrl={car.photos} />
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    padding: 24,
                    alignItems: 'center'
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map((accessory, index) => {
                            return (
                                <Accessory 
                                    key={`${accessory.name}${index}`}
                                    name={accessory.name}
                                    icon={getAccessoryIcon(accessory.type)}
                                />
                            )
                        })
                    }
                </Accessories>

                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>

            </Animated.ScrollView>  

            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    );
};