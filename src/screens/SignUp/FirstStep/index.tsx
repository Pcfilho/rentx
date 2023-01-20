import React from 'react';
import { useNavigate } from '../../../hooks/navigate';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

import {
   Container,
   Header,
   Steps,
   Title,
   SubTitle,
   Form,
   FormTitle
 } from './styles';

export function FirstStep() {
    const { goBack } = useNavigate();

    return (
        <Container>
            <Header>
                <BackButton 
                    onPress={goBack}
                />
                <Steps>
                    <Bullet active/>
                    <Bullet />
                </Steps>
            </Header>

            <Title>
                Crie sua{'\n'}conta
            </Title>
            <SubTitle>
                Faça seu cadastro de{'\n'}
                forma rápida e fácil.
            </SubTitle>
            
            <Form>
                <FormTitle>
                    1. Dados
                </FormTitle>

            </Form>
        </Container>
    );
};