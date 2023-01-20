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
import { PasswordInput } from '../../../components/PasswordInput';


export function SecondStep() {
    const theme = useTheme();
    const { goBack } = useNavigate();

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
                            <Bullet />
                            <Bullet active/>
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
                            2. Senha
                        </FormTitle>
                        <PasswordInput 
                            iconName='lock'
                            placeholder='Senha'
                            value=''
                        />
        
                        <PasswordInput 
                            iconName='lock'
                            placeholder='Repetir senha'
                            value=''
                        />
                    </Form>

                    <Button 
                        title='Cadastrar'
                        color={theme.colors.success}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};