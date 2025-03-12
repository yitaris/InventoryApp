import {  useState } from "react";
import { PayTRClient } from "paytr-react";

const PayTRPayment: React.FC = () => {
  const [token, setToken] = useState<string>("");

    const paytr = new PayTRClient({
      merchant_id: "336146",
      merchant_key: "92dRwN1m5z8y1BZf",
      merchant_salt: "1siJ58H4zsMYYPi4",
      debug_on: true,
      no_installment: true,
      max_installment: 0,
      timeout_limit: 0,
      test_mode: false,
      non_3d: "1",
      lang: "tr",
    });

    paytr
      .getToken({
        merchant_oid: `Sipariş_${Date.now()}`,
        payment_amount: 1000,
        currency: "TL",
        email: "sdaawsdwa@gmail.com",
        user_ip: "192.168.1.1",
        user_name: "",
        user_phone: "05555555555",
        user_address: "Müşteri Adresi",
        user_basket: [
          {
            name: "Ürün Adı",
            price: "1000",
            quantity: 1,
          },
        ],
        merchant_ok_url: "/succes",
        merchant_fail_url: "/fail",
      })
      .then((response: { token: string }) => {
        setToken(response.token);
      })

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundColor: "#1a1a1a", // Arka plan rengini siyah yap
        overflow: "hidden", // Sayfanın scroll'unu kapat
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      {token ? (
        <iframe
          src={`https://www.paytr.com/odeme/guvenli/${token}`}
          width="100%"
          height="100%"
          allowTransparency={true}
          style={{
            border: "none",
            background: "transparent", // Arka planı şeffaf yap
          }}
        />
      ) : (
        <p className="text-2xl text-white">Ödeme sayfası yükleniyor...</p>
      )}
    </div>
  );
};

export default PayTRPayment;