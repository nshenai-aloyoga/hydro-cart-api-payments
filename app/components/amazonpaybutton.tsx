import { useEffect } from "react";

const AmazonPayButton: React.FC = () => {
  useEffect(() => {
    if (window.amazon) {
      window.amazon.Pay.renderButton("#amazon-pay-button", {
        merchantId: "YOUR_AMAZON_PAY_MERCHANT_ID", // Replace with your actual Merchant ID
        createCheckoutSessionConfig: {
          payloadJSON: "YOUR_PAYLOAD_JSON", // Dynamically generated payload
          signature: "YOUR_SIGNATURE", // Generated using your private key
          publicKeyId: "YOUR_PUBLIC_KEY_ID",
        },
      });
    }
  }, []);

  return <div id="amazon-pay-button"></div>;
};

export default AmazonPayButton;
