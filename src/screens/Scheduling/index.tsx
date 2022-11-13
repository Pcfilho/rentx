import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components/native";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
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
import { useNavigate } from "../../hooks/navigate";

export function Scheduling() {
    const theme = useTheme();
    const { goTo, goBack } = useNavigate();

    function handleConfirmRental() {
        goTo('SchedulingDetails');
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
                        <DateValueContainer selected={false}>
                            <DateValue></DateValue>
                        </DateValueContainer>
                    </DateInfo>
                    
                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValueContainer selected={false}>
                            <DateValue>22/06/2021</DateValue>
                        </DateValueContainer>
                    </DateInfo>

                </RentalPeriod>

            </Header>
            
            <Content>
                <Calendar />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    )
}