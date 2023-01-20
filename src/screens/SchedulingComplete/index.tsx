import React from "react";
import { Confirmation } from "../../components/Confirmation";
import { routesNames } from "../../routes/routesEnum";

export function SchedulingComplete() {
    return <Confirmation 
                title={'Carro alugado!'} 
                message={`Agora você só precisar ir \n até a concessionária da RentX \n pegar o seu automóvel.`} 
                nextScreen={routesNames.HOME}
            />;
};

