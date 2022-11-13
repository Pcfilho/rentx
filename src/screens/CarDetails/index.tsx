import React from 'react';

import {
    Container,
    Header,
    CarImages,
    Content,
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

interface Params {
    car: CarModel;
}

export function CarDetails() {
    const { goTo, goBack, goWithParams } = useNavigate();
    const route = useRoute();
    const { car } = route.params as Params;

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
            <Header>
                <BackButton onPress={goBack}/>
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>

            <Content>
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
                </About>

            </Content>  

            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    );
};