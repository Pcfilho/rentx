import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input/index';

import {
   Container,
   Header,
   SubTitle,
   Title,
   Footer,
   Form
 } from './styles';

export function SignIn() {
    const theme = useTheme();
    
 return (
    <Container>
        <StatusBar 
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
        />

        <Header>
            <Title>
                Estamos{'\n'}quase lá.
            </Title>
            <SubTitle>
                Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
        </Header>
        
        <Form>
            <Input 
                iconName='mail'
            />
        </Form>

        <Footer>
            <Button 
                title='Login'
                onPress={() => {}}
                enabled={false}
                loading={false}
            />

            <Button 
                title='Criar contra gratuita'
                onPress={() => {}}
                enabled={false}
                loading={false}
                color={theme.colors.background_secondary}
                light
            />
        </Footer>

    </Container>
 );
};