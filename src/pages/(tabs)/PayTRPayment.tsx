import { useEffect, useState } from "react";
import { PayTRClient } from "paytr-react";
import { Buffer } from "buffer";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PayTRPayment: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const { session, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.Buffer = Buffer;
    
    const initializePayment = async () => {
      try {
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

        const response = await paytr.getToken({
          merchant_oid: `ORDER_${Date.now()}`,
          payment_amount: 1000,
          currency: "TL",
          email: session?.user?.email || "",
          user_ip: "192.168.1.1",
          user_name: user?.name || "",
          user_phone: "05555555555",
          user_address: "Müşteri Adresi",
          user_basket: [{
            name: "Ürün Adı",
            price: "1000",
            quantity: 1,
          }],
          merchant_ok_url: `${window.location.origin}/success`,
          merchant_fail_url: `${window.location.origin}/fail`,
        });

        if (response?.token) {
          setToken(response.token);
        }
      } catch (error) {
        console.error("Payment token fetch error:", error);
      }
    };

    initializePayment();
  }, [session?.user?.email, user?.name]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    if (status === "success") navigate("/success");
    if (status === "fail") navigate("/fail");
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black fixed top-0 left-0">
      {token ? (
        <iframe
          src={`https://www.paytr.com/odeme/guvenli/${token}`}
          width="100%"
          height="100%"
          allowTransparency={true}
          style={{ border: "none", background: "transparent" }}
        />
      ) : (
        <p className="text-2xl text-white">Ödeme sayfası yükleniyor...</p>
      )}
    </div>
  );
};

export default PayTRPayment;