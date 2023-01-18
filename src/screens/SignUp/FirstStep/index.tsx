import React from 'react';
import { BackButton } from '../../../components/BackButton';
import { useNavigate } from '../../../hooks/navigate';

import {
   Container,
   Header
 } from './styles';

export function FirstStep() {
    const { goBack } = useNavigate();

    return (
        <Container>
            <Header>
                <BackButton 
                    onPress={goBack}
                />
            </Header>
        </Container>
    );
};