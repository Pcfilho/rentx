import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { FlatList } from "react-native";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { useNavigate } from "../../hooks/navigate";
import { CarModel } from "../../models/CarModel";
import { api } from "../../services/api";
import theme from "../../styles/theme";
import { AntDesign } from "@expo/vector-icons";
import { Load } from "../../components/Load";

import {
  Container,
  Header,
  Title,
  SubTitle,
  TitleWrapper,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";

interface CarProps {
  id: string;
  user_id: string;
  car: CarModel;
  startDate: string;
  endDate: string;
}

const MyCars = () => {
  const { goBack } = useNavigate();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = () => {
      api
        .get("/schedules_byuser?user_id=1")
        .then((response) => {
          setCars(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <BackButton color={theme.colors.shape} onPress={goBack} />
        <TitleWrapper>
          <Title>Seus agendamentos, {"\n"} estão aqui.</Title>
          <SubTitle>Conforto, segurança e praticidade.</SubTitle>
        </TitleWrapper>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} enabled={false} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      color={theme.colors.title}
                      style={{
                        marginHorizontal: 10,
                      }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};

export default MyCars;
