import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';

import {
   Container,
   IconContainer,
   InputText
} from './styles';

interface InputProps extends TextInputProps {
   iconName: React.ComponentProps<typeof Feather>['name'],
   placeholder: string,
   value: string,
}

export function Input({
   iconName,
   value,
   ...rest
}: InputProps) {
   const theme = useTheme();
   const [isFocused, setIsFocused] = useState(false);
   const [isFilled, setIsFilled] = useState(false);

   const handleIsFocused = () => {
      setIsFocused(true)
   }

   const handleIsBlured = () => {
      setIsFocused(false)
      setIsFilled(!!value)
   }

   return (
      <Container>
         <IconContainer isFocused={isFocused}>
            <Feather 
               name={iconName}
               size={24}
               color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_details}
            />
         </IconContainer>

         <InputText 
            {...rest}
            onFocus={handleIsFocused}
            onBlur={handleIsBlured}
            isFocused={isFocused}
         />
      </Container>
   );
};