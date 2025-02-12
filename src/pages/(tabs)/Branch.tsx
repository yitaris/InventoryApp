import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const salesData = [
    { month: "Ocak", sales: 4000, profit: 2400 },
    { month: "Şubat", sales: 3000, profit: 1398 },
    { month: "Mart", sales: 5000, profit: 2800 },
    { month: "Nisan", sales: 7000, profit: 3908 },
    { month: "Mayıs", sales: 6000, profit: 4800 },
    { month: "Haziran", sales: 7500, profit: 5000 },
];

const topProducts = [
    { name: "Ürün A", sales: 1200 },
    { name: "Ürün B", sales: 950 },
    { name: "Ürün C", sales: 800 },
    { name: "Ürün D", sales: 600 },
    { name: "Ürün E", sales: 400 },
];

const Branch = () => {
    return (
        <div className="flex flex-col w-full h-screen text-white gap-8">
            {/* Başlık */}
            <h1 className="font-bold text-3xl">Mağaza Özeti</h1>

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#242424] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-300">SKT Yaklaşan Ürün</h2>
                    <p className="text-2xl font-bold text-[#00c896]">Monin Yuzu 1L</p>
                </div>
                <div className="bg-[#242424] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-300">Toplam Envanter Stoğu</h2>
                    <p className="text-2xl font-bold text-[#ffa600]">120 Adet</p>
                </div>
                <div className="bg-[#242424] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-300">Mağaza Ortalama Gelen Kişi Sayısı</h2>
                    <p className="text-2xl font-bold text-[#6c5ce7]">253</p>
                </div>
                <div className="bg-[#242424] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-lg font-semibold text-gray-300">En Çok Harcanılan Ürün</h2>
                    <p className="text-2xl font-bold text-[#ff7675]">Monin Caramel</p>
                </div>
            </div>

            {/* Grafikler */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Satış ve Kar Grafiği */}
                <div className="bg-[#242424] p-6 rounded-xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-4 text-gray-300">Aylık En Çok Harcanan Ürün</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <XAxis dataKey="month" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip wrapperStyle={{ backgroundColor: "#333", color: "#fff" }} />
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <Line type="monotone" dataKey="sales" stroke="#00c896" strokeWidth={3} dot={{ r: 5 }} />
                            <Line type="monotone" dataKey="profit" stroke="#ffa600" strokeWidth={3} dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* En Çok Satılan Ürünler */}
                <div className="bg-[#242424] p-6 rounded-xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-4 text-gray-300">SKT'si En Çok Biten Ürün</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topProducts}>
                            <XAxis dataKey="name" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip wrapperStyle={{ backgroundColor: "#333", color: "#fff" }} />
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <Bar dataKey="sales" fill="#6c5ce7" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Son İşlemler Tablosu */}
            <div className="bg-[#242424] p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-300">Son İşlemler</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-3">Kullanıcı</th>
                                <th className="p-3">Ürün</th>
                                <th className="p-3">Miktar</th>
                                <th className="p-3">İşlem</th>
                                <th className="p-3">Tarih</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-[#333] transition-colors duration-200">
                                <td className="p-3">Yiğit Bayır</td>
                                <td className="p-3">Monin Caramel </td>
                                <td className="p-3">2</td>
                                <td className="p-3">Alındı</td>
                                <td className="p-3">2023-10-01</td>
                            </tr>
                            <tr className="hover:bg-[#333] transition-colors duration-200">
                                <td className="p-3">Asım</td>
                                <td className="p-3">Yoğunlaştırılmış Süt</td>
                                <td className="p-3">2</td>
                                <td className="p-3">Alındı</td>
                                <td className="p-3">2023-10-02</td>
                            </tr>
                            <tr className="hover:bg-[#333] transition-colors duration-200">
                                <td className="p-3">Osman</td>
                                <td className="p-3">Soya Sütü</td>
                                <td className="p-3">3</td>
                                <td className="p-3">Alındı</td>
                                <td className="p-3">2023-10-03</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Branch;