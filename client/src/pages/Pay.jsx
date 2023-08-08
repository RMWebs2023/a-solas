import React from "react";
import { useParams } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago("TEST-c642f671-50cd-4061-9a9d-629c0cf079b4");

const Pay = () => {
  const { id } = useParams();

  return (
    <>
      <p>Transferencia</p>
      <Wallet initialization={{ preferenceId: id }} />
    </>
  );
};

export default Pay;
