import React from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useParams } from "react-router-dom";

initMercadoPago("TEST-c642f671-50cd-4061-9a9d-629c0cf079b4");

const Pay = () => {
  const { id } = useParams();

  return (
    <>
      <p>Efectivo</p>
      <p>Transferencia</p>
      <Wallet initialization={{ preferenceId: id }} />
    </>
  );
};

export default Pay;
