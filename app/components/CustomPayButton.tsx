import { useEffect } from "react";
import  "../assets/styles.css"; 

declare global {
  interface Window {
    amazon?: any;
  }
}

interface CustomPayButtonProps {
  url: string;
}

const CustomPayButton: React.FC<CustomPayButtonProps> = ({ url }) => {
  useEffect(() => {
    // Ensure script is not added multiple times
    if (!document.getElementById("amazon-pay-script")) {
      const script = document.createElement("script");
      script.src = "https://static-na.payments-amazon.com/checkout.js"; // Amazon Pay script
      script.id = "amazon-pay-script";
      script.async = true;
      script.onload = () => {
        console.log("Amazon Pay SDK Loaded");

        if (window.amazon) {
          window.amazon.Pay.renderButton("#amazon-pay-button", {
            merchantId: "YOUR_AMAZON_PAY_MERCHANT_ID", // Replace with actual Merchant ID
            createCheckoutSessionConfig: {
              payloadJSON: "YOUR_PAYLOAD_JSON", // Dynamically generated payload
              signature: "YOUR_SIGNATURE", // Generated using your private key
              publicKeyId: "YOUR_PUBLIC_KEY_ID",
            },
          });
        }
      };
      document.body.appendChild(script); // Append to body instead of a div
    }
  }, []);

  const handleRedirect = () => {
    if (url) {
      const reviewUrl = `${url}?step=review`; // Modify URL to go to review step
      window.location.href = reviewUrl;
    } else {
      alert("Error: No checkout URL available.");
    }
  };

  return (
    <div id="amazon-pay-button" className="custom-pay-button">
      <a onClick={handleRedirect}>
        <img 
          src="https://m.media-amazon.com/images/G/01/AmazonPay/Maxo/amazonpay-logo-rgb_drk_1.svg" 
          alt="Amazon Pay"
        />
      </a>
    </div>
  );
};

export default CustomPayButton;

// import { useEffect } from "react";

// const CustomPayButton: React.FC = () => {
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

// export default CustomPayButton;
