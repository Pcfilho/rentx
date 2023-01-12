import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigate, useRouteParams } from '../../hooks/navigate';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

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
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValueContainer,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { routesNames } from '../../routes/routesEnum';
import { CarModel } from '../../models/CarModel';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface Params {
    car: CarModel;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}


export function SchedulingDetails() {
    const theme = useTheme();
    const { goTo, goBack } = useNavigate();
    const { car, dates } = useRouteParams<Params>();
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const rentTotal = Number(dates.length * car.rent.price);

    const putNewScheduleByCar = (unavailable_dates: any[]) => {
        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
        .then(() => goTo(routesNames.SCHEDULING_COMPLETE))
        .catch(() => Alert.alert('Não foi possível realizar o aluguel'))   
    }

    const handleConfirmRental = async () => {
        await api.post('schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        });

        api.get(`/schedules_bycars/${car.id}`).then(response => {
            putNewScheduleByCar([
                [
                    ...response.data.unavailable_dates,
                    ...dates,
                ]
            ])
        })
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, []);

    return (
        <Container>
            <Header>
                <BackButton onPress={goBack}/>
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={['https://www.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_34841510442727128.webp?s=fill&w=236&h=135&q=70&t=true']} />
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

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather 
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValueContainer>
                            <DateValue>{rentalPeriod.start}</DateValue>
                        </DateValueContainer>
                    </DateInfo>

                    <Feather 
                            name="chevron-right"
                            size={RFValue(24)}
                            color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValueContainer>
                            <DateValue>{rentalPeriod.end}</DateValue>
                        </DateValueContainer>
                    </DateInfo>

                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>

            </Content>  

            <Footer>
                <Button title="Alugar agora" color={theme.colors.success} onPress={() => handleConfirmRental()}/>
            </Footer>
        </Container>
    );
};