import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { url } from "../config/server";
import { Alert } from "@mui/joy";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <div>{content}</div>;
}

function Paypal({ name, amount, date, type, details, success }) {
  const [content, setContent] = useState("");
  console.log(amount);
  
  if (!amount) return null;
  const initialOptions = {
    "client-id": "Afgnr4u04HGd4lrqQjBNkd9tjx3xyc1ZBvZ8cYHOR81CT_8im1Tw2N31Z_TyIHdDQymuapou6od5UFLi",
    "enable-funding": "card",
    "disable-funding": "paylater",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };


  return (
    <div className="App" style={{ margin: "5px auto" }}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons

          style={{
            shape: "rect",
            layout: "horizontal",
          }}
          createOrder={async () => {
            try {

              const response = await fetch(url + "/payments/paypal", {
                method: "POST",
                credentials: 'include',
                headers: {
                  "cookie": document.cookie,
                  "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                  cart: [
                    { name, amount, date, type }
                  ]
                }),
              });
              const orderData = await response.json();
              console.log("order", orderData);
              if (orderData.id) {
                return orderData.id;
              } else {
                setContent(orderData)
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(orderData);
              }
            } catch (error) {

              console.log("error", error);
            }
          }}
          onError={(err) => { console.log("err", err) }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                url + `/orders/${data.orderID}/capture`,
                {
                  body: JSON.stringify({ amount, date, name, details, type }),
                  method: "POST",
                  credentials: 'include',
                  headers: {
                    "cookie": document.cookie,
                    "Content-Type": "application/json"
                  },
                },
              );

              const orderData = await response.json();
              success(orderData);
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`,
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setContent(

                  <Alert variant="success">
                    `התשלום בוצע בהצלחה! קוד אישור: ${transaction?.id}`
                  </Alert>
                );
                // console.log(
                //   "Capture result",
                //   orderData,
                //   JSON.stringify(orderData, null, 2),
                // );
              }
            } catch (error) {
              console.error(error);
              setContent(
                `Sorry, your transaction could not be processed...`,
              );
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={content} />

    </div>
  );
}

export default Paypal;
