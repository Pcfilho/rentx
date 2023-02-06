import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
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
import { Button } from "../../components/Button";

type optionType = "data" | "password";

const Profile = () => {
  const theme = useTheme();
  const { user, signOut, updateUser } = useAuth();
  const { goBack } = useNavigate();

  const [option, setOption] = useState<optionType>("data");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const isDataEdit = () => option === "data";
  const isPasswordEdit = () => option === "password";

  const changeOption = (optionSelected: optionType) => {
    if (optionSelected === option) return;
    setOption(optionSelected);
  };

  const handleSelectAvatar = async () => {
    try {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });


    if (result.canceled) {
      return;
    }

    if (result.assets[0].uri) {
      setAvatar(result.assets[0].uri);
    }
  } catch(error) {
    console.log(error)
  }
  };

  const handleProfileUpdate = async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório'),
      })

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        avatar,
        name,
        driver_license: driverLicense,
        token: user.token,
      })
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        console.log("YUP: " + error.message);
      } else {
        console.log("Não foi possível atualizar");
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={goBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={signOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              { !!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleSelectAvatar}>
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
                <Input
                  iconName="user"
                  placeholder="nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                  value={name}
                />

                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />

                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                  value={driverLicense}
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

            <Button 
              title="Salvar alterações"
              onPress={handleProfileUpdate}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Profile;
