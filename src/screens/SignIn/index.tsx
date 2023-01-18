import React, { useState } from 'react';
import { 
    StatusBar,
    KeyboardAvoidingView, 
    Platform,
    TouchableWithoutFeedback,
    Keyboard

} from 'react-native';
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};