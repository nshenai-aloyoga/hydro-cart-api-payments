import { useEffect } from "react";

declare global {
  interface Window {
    amazon?: any;
  }
}

const AmazonPayButton: React.FC = () => {
  useEffect(() => {
    // Check if the script is already added
    if (!document.getElementById("amazon-pay-script")) {
      const script = document.createElement("script");
      script.src = "https://static-na.payments-amazon.com/checkout.js";
      script.id = "amazon-pay-script";
      script.async = true;
      script.onload = () => {
        console.log("Amazon Pay SDK Loaded");
      };
      document.body.appendChild(script);
    }
  }, []);

  return <div id="amazon-pay-button"><a href="#">AmazonPay</a></div>;
};

export default AmazonPayButton;


// import { useEffect } from "react";

// const AmazonPayButton: React.FC = () => {
//   useEffect(() => {
//     if (window.amazon) {
//       window.amazon.Pay.renderButton("#amazon-pay-button", {
//         merchantId: "YOUR_AMAZON_PAY_MERCHANT_ID", // Replace with your actual Merchant ID
//         createCheckoutSessionConfig: {
//           payloadJSON: "YOUR_PAYLOAD_JSON", // Dynamically generated payload
//           signature: "YOUR_SIGNATURE", // Generated using your private key
//           publicKeyId: "YOUR_PUBLIC_KEY_ID",
//         },
//       });
//     }
//   }, []);

//   return <div id="amazon-pay-button"></div>;
// };

// export default AmazonPayButton;
