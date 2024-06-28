"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({amount, orderId}:Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const rountedAmount = (Math.round(amount * 100)) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded mt-2"></div>
      </div>
    );
  }
  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {

    const transactionId = await actions.order.create({
      intent:'CAPTURE',
      purchase_units: [
        {
          
          amount: {
            value: `${rountedAmount}`,
            currency_code:'USD'
          }
        }
      ]
    });

    console.log({transactionId});

    return "";
  };

  return <PayPalButtons createOrder={createOrder} />;
};
