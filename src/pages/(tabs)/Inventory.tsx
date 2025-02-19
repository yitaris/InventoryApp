import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface ProductType {
  id: string;
  name: string;
  image_url: string;
  barcode: string;
  miktar: string;
  skt: string; // Timestamp olarak geliyor
}

const Inventory = () => {
  const { fetchInventory } = useAuth();
  const [inventoryData, setInventoryData] = useState<ProductType[]>([]);

  // SKT değerini işleme ve kalan gün sayısını hesaplama
  const calculateRemainingDays = (sktTimestamp: string) => {
    const sktDate = new Date(sktTimestamp); // SKT tarihini Date nesnesine dönüştür
    const currentDate = new Date(); // Günümüz tarihi
    const timeDifference = sktDate.getTime() - currentDate.getTime(); // Milisaniye cinsinden fark
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Gün cinsine çevir

    if (daysDifference < 0) {
      return "Süresi doldu!";
    } else if (daysDifference > 0 && daysDifference < 7) {
      return `SKT'Sİ YAKLAŞIYOR!!! ${daysDifference}`;
    }
    else {
      return `${daysDifference} Gün kaldı`;
    }
  };

  const handleFetchInventory = async () => {
    try {
      const data = await fetchInventory();
      if (data) {
        setInventoryData(data);
      } else {
        console.error("Veri bulunamadı veya boş döndü.");
      }
    } catch (error) {
      console.error("Ürünleri çekerken hata oluştu:", error);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen text-white p-6">
      {/* Başlık ve Buton */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">📦 Inventory</h1>
        <button
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition-all shadow-md text-white mt-4 sm:mt-0"
          onClick={handleFetchInventory}
        >
          Ürünleri Çek
        </button>
      </div>

      {/* Ürün Listesi */}
      {inventoryData.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          📭 Stokta ürün bulunmamaktadır. Lütfen ürünleri çekiniz.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[1000px]">
          {inventoryData.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-lg shadow-lg flex flex-col gap-4 transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{product.name}</h2>
                <h2 className="text-lg font-semibold text-white">{product.miktar} Adet</h2>
                <h2 className="text-lg font-semibold text-white">
                {calculateRemainingDays(product.skt)}
                </h2>
              </div>
              
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;