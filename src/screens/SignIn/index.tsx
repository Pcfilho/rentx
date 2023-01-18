import React, { useState } from 'react';
import { 
    StatusBar,
    KeyboardAvoidingView, 
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import * as Yup from 'yup';

import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input/index';
import { PasswordInput } from '../../components/PasswordInput';

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('Email obrigatório.')
                    .email('Digite um email válido.'),
                password: Yup.string()
                    .required('Senha obrigatória.')
            });

            await schema.validate({ email, password })

            // TODO: Fazer login
        } catch (err) {
            if(err instanceof Yup.ValidationError) {
                Alert.alert('Opa, ', err.message)
            } 
        }
    };

    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
            style={{ flex: 1, backgroundColor: theme.colors.background_primary }}
            keyboardVerticalOffset={Platform.select({ios: 0})}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            placeholder='Email'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput 
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button 
                            title='Login'
                            onPress={handleSignIn}
                            enabled={true}
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};