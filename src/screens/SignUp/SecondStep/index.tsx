import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useTheme } from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { api } from '../../../services/api';


import { useNavigate, useRouteParams } from '../../../hooks/navigate';
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
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { routesNames } from '../../../routes/routesEnum';


interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function SecondStep() {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
   
    const theme = useTheme();
    const { user } = useRouteParams<Params>(); 
    const { goBack, goWithParams } = useNavigate();

    const handleRegister = async () => {
        if(!password || !repeatPassword) {
            return Alert.alert('Informe a sua senha e a confirmação dela.')
        }

        if(password != repeatPassword) {
            return Alert.alert('As senhas não são iguais.')
        }

        const { name, email, driverLicense } = user;
        const postUser = {
            name,
            email,
            driver_license: driverLicense,
            password
        }
        await api.post('/users', postUser)
        .then(() => {
            goWithParams(routesNames.CONFIRMATION, {
                title: 'Conta Criada!', 
                message: 'Agroa é só fazer o login\ne aproveitar', 
                nextScreen: routesNames.SIGN_IN 
            })
        })
        .catch(err => {
            Alert.alert('Opa,', 'Não foi possível cadastrar. Error: ' + err.message);
            console.log(postUser);
        });
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
                            value={password}
                            onChangeText={setPassword}
                        />
        
                        <PasswordInput 
                            iconName='lock'
                            placeholder='Repetir senha'
                            value={repeatPassword}
                            onChangeText={setRepeatPassword}
                        />
                    </Form>

                    <Button 
                        title='Cadastrar'
                        color={theme.colors.success}
                        onPress={handleRegister}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};