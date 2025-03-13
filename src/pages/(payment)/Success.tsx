import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const merchantOid = urlParams.get("merchant_oid");
    const paymentAmount = urlParams.get("payment_amount");
    
    console.log("Payment successful:", {
      merchantOid,
      paymentAmount,
      timestamp: new Date().toISOString(),
      paymentId: urlParams.get("payment_id"),
    });

    const timer = setTimeout(() => {
      console.log("Redirecting to home page after successful payment");
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl mb-4">Ödeme Başarılı!</h1>
      <p className="text-lg mb-8">İşleminiz başarıyla tamamlandı.</p>
      <p className="text-sm">5 saniye içinde ana sayfaya yönlendirileceksiniz...</p>
    </div>
  );
}
