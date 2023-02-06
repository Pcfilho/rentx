import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';

import {
   Container,
   IconContainer,
   InputText,
   PasswordEyeButton
} from './styles';

interface InputProps extends TextInputProps {
   iconName: React.ComponentProps<typeof Feather>['name'],
   placeholder: string,
   value?: string,
}

export function PasswordInput({
   iconName,
   value,
   ...rest
}: InputProps) {
   const theme = useTheme();
   const [isPasswordVisible, setIsPasswordVisible] = useState(true);

   const [isFocused, setIsFocused] = useState(false);
   const [isFilled, setIsFilled] = useState(false);

   const handleIsFocused = () => {
      setIsFocused(true)
   }

   const handleIsBlured = () => {
      setIsFocused(false)
      setIsFilled(!!value)
   }

   const handlePasswordVisibility = () => {
      setIsPasswordVisible(oldState => !oldState)
   }

   return (
      <Container>
         <IconContainer isFocused={isFocused}>
            <Feather
               name={iconName}
               size={24}
               color={(isFilled || isFocused) ? theme.colors.main : theme.colors.text_details} 
            />
         </IconContainer>

         <InputText
            onFocus={handleIsFocused}
            onBlur={handleIsBlured}
            secureTextEntry={isPasswordVisible} 
            {...rest}
            isFocused={isFocused}
            autoCorrect={false}
         />

         <PasswordEyeButton onPress={handlePasswordVisibility} isFocused={isFocused}>
            <Feather
               name={isPasswordVisible ? 'eye' : 'eye-off'}
               size={24}
               color={theme.colors.text_details}     
            />
         </PasswordEyeButton>
      </Container>
   );
};