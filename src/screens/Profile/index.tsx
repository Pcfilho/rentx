import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { useNavigate } from "../../hooks/navigate";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";

type optionType = "data" | "password";

const Profile = () => {
  const theme = useTheme();

  const { user } = useAuth();
  const { goBack } = useNavigate();
  const [option, setOption] = useState<optionType>("data");

  const isDataEdit = () => option === "data";
  const isPasswordEdit = () => option === "password";

  const changeOption = (optionSelected: optionType) => {
    if (optionSelected === option) return;
    setOption(optionSelected);
  };

  const handleSignOut = () => {};

  return (
    <KeyboardAvoidingView behavior="position" enabled style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={goBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo source={{ uri: "https://github.com/Pcfilho.png" }} />
              <PhotoButton onPress={() => {}}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content>
            <Options>
              <Option
                active={isDataEdit()}
                onPress={() => changeOption("data")}
              >
                <OptionTitle active={isDataEdit()}>Dados</OptionTitle>
              </Option>

              <Option
                active={isPasswordEdit()}
                onPress={() => changeOption("password")}
              >
                <OptionTitle active={isPasswordEdit()}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {isDataEdit() ? (
              <Section>
                <Input iconName="user" placeholder="nome" autoCorrect={false} defaultValue={user.name} />

                <Input iconName="mail" editable={false} defaultValue={user.email} />

                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />

                <PasswordInput iconName="lock" placeholder="Nova senha" />

                <PasswordInput
                  iconName="lock"
                  placeholder="Confirmar nova senha"
                />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Profile;
