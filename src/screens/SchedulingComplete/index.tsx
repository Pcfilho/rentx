import React from "react";
import { StatusBar, useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from "../../components/ConfirmButton";

import {
    Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles';
import { useNavigate } from "../../hooks/navigate";

export function SchedulingComplete() {
    const { width } = useWindowDimensions();
    const { clearNavigation } = useNavigate();

    return(
        <Container>
            <StatusBar 
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg width={width}/>

            <Content>
                <DoneSvg width={80} height={80}/>
                <Title>Carro alugado!</Title>
                <Message>
                    Agora você só precisar ir {'\n'}
                    até a concessionária da RentX {'\n'}
                    pegar o seu automóvel.
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title={'OK'} onPress={clearNavigation}/>
            </Footer>
        </Container>
    );
};
