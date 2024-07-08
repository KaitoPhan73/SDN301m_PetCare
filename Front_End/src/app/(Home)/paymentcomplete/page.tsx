import React from "react";
import PaymentCompletePage from "./PaymentComplete";

export default async function PaymentComplete(props: any) {
  const data = {
    status: props.searchParams.status,
    total: props.searchParams.amount,
  };
  return <PaymentCompletePage data={data} />;
}
