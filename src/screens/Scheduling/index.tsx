import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components/native";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar, DayProps, generateInterval, MarkedDateProps } from "../../components/Calendar";
import ArrowSvg from "../../assets/arrow.svg"; 

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    DateValueContainer,
    Content,
    Footer,
} from './styles';
import { useNavigate, useRouteParams } from "../../hooks/navigate";
import { routesNames } from "../../routes/routesEnum";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarModel } from "../../models/CarModel";

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarModel;
}

export function Scheduling() {
    const theme = useTheme();
    const { car } = useRouteParams<Params>()
    const { goBack, goWithParams } = useNavigate();
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    
    function handleConfirmRental() {
        goWithParams(routesNames.SCHEDULING_DETAILS, {
            car,
            dates: Object.keys(markedDates)
        });
    };

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;
        
        if (start.timestamp > end.timestamp) {
            start = date;
            end = date;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        });
    }

    return(
        <Container>
            <Header>
                <StatusBar 
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />

                <BackButton  color={theme.colors.shape} onPress={goBack}/>

                <Title>
                    Escolha uma {'\n'}
                    data de inicio e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValueContainer selected={!!rentalPeriod.startFormatted}>
                            <DateValue>
                                {rentalPeriod.startFormatted}
                            </DateValue>
                        </DateValueContainer>
                    </DateInfo>
                    
                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValueContainer selected={!!rentalPeriod.endFormatted}>
                            <DateValue>
                                {rentalPeriod.endFormatted}
                            </DateValue>
                        </DateValueContainer>
                    </DateInfo>

                </RentalPeriod>

            </Header>
            
            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button 
                    title="Confirmar"
                    onPress={handleConfirmRental} 
                    enabled={!!(rentalPeriod.startFormatted || rentalPeriod.endFormatted)}
                />
            </Footer>
        </Container>
    )
}