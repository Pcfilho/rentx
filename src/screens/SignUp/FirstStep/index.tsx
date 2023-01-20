import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useNavigate } from '../../../hooks/navigate';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';

import {
   Container,
   Header,
   Steps,
   Title,
   SubTitle,
   Form,
   FormTitle
 } from './styles';
import { Button } from '../../../components/Button';
import { routesNames } from '../../../routes/routesEnum';


export function FirstStep() {
    const theme = useTheme();
    const { goBack, goTo } = useNavigate();

    const handleNextStep = () => {
        goTo(routesNames.SECOND_STEP)
    }

    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
            style={{ flex: 1, backgroundColor: theme.colors.background_primary }}
            keyboardVerticalOffset={Platform.select({ios: 0})}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        <Input 
                            iconName='user'
                            placeholder='Nome'
                            value=''
                        />

                        <Input 
                            iconName='mail'
                            placeholder='Email'
                            value=''
                            
                            keyboardType='email-address'
                        />

                        <Input 
                            iconName='credit-card'
                            placeholder='CNH'
                            value=''
                            
                            keyboardType='numeric'
                        />
                    
                    </Form>

                    <Button 
                        title='Próximo'
                        onPress={handleNextStep}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};