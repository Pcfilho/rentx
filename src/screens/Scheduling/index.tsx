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

export function Scheduling() {
    const theme = useTheme();

    return(
        <Container>
            <Header>
                <StatusBar 
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />

                <BackButton  color={theme.colors.shape}/>

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
                <Button title="Confirmar" />
            </Footer>
        </Container>
    )
}