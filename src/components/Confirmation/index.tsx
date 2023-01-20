import React from "react";
import { StatusBar, useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from "../ConfirmButton";

import {
    Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles';
import { useNavigate, useRouteParams } from "../../hooks/navigate";

interface Props {
   title?: string;
   message?: string;
   nextScreen?: string; 
}

export function Confirmation({
    title,
    message,
    nextScreen
} : Props) {
    const { width } = useWindowDimensions();
    const { clearToExclusiveScreen } = useNavigate();
    const {
        title : routeTitle,
        message : routeMessage,
        nextScreen : routeNextScreen,
    } = useRouteParams<Props>();

    const handleConfirm = () => {
        clearToExclusiveScreen(nextScreen || routeNextScreen);
    }

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
                <Title>{title || routeTitle}</Title>
                <Message>{message || routeMessage}</Message>
            </Content>

            <Footer>
                <ConfirmButton title={'OK'} onPress={handleConfirm}/>
            </Footer>
        </Container>
    );
};