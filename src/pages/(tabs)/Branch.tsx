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
        <div className="flex flex-col w-full min-h-screen bg-gradient-to-br text-white p-6 gap-8">
            {/* Başlık */}
            <h1 className="font-bold text-3xl">
                Mağaza Özeti
            </h1>

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#1e1e1e] backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <h2 className="text-sm font-medium text-gray-400 mb-2">SKT Yaklaşan Ürün</h2>
                    <p className="text-2xl font-bold text-emerald-400">Monin Yuzu 1L</p>
                </div>
                <div className="bg-[#1e1e1e] backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <h2 className="text-sm font-medium text-gray-400 mb-2">Toplam Envanter Stoğu</h2>
                    <p className="text-2xl font-bold text-amber-400">120 Adet</p>
                </div>
                <div className="bg-[#1e1e1e] backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <h2 className="text-sm font-medium text-gray-400 mb-2">Ortalama Müşteri</h2>
                    <p className="text-2xl font-bold text-violet-400">253</p>
                </div>
                <div className="bg-[#1e1e1e] backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <h2 className="text-sm font-medium text-gray-400 mb-2">En Çok Kullanılan</h2>
                    <p className="text-2xl font-bold text-rose-400">Monin Caramel</p>
                </div>
            </div>

            {/* Grafikler */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1e1e1e] backdrop-blur-lg p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-6 text-gray-300">Aylık En Çok Harcanan Ürün</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: "rgba(17, 24, 39, 0.8)", 
                                    border: "none",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                                }} 
                            />
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4, fill: "#8b5cf6" }} />
                            <Line type="monotone" dataKey="profit" stroke="#f472b6" strokeWidth={2} dot={{ r: 4, fill: "#f472b6" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-[#1e1e1e] backdrop-blur-lg p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-6 text-gray-300">SKT'si En Çok Biten Ürün</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topProducts}>
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: "rgba(17, 24, 39, 0.8)", 
                                    border: "none",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                                }} 
                            />
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <Bar dataKey="sales" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Son İşlemler Tablosu */}
            <div className="bg-[#1e1e1e] backdrop-blur-lg p-6 rounded-2xl shadow-lg">
                <h2 className="text-lg font-semibold mb-6 text-gray-300">Son İşlemler</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-4 text-gray-400 font-medium">Kullanıcı</th>
                                <th className="p-4 text-gray-400 font-medium">Ürün</th>
                                <th className="p-4 text-gray-400 font-medium">Miktar</th>
                                <th className="p-4 text-gray-400 font-medium">İşlem</th>
                                <th className="p-4 text-gray-400 font-medium">Tarih</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                                <td className="p-4">Yiğit Bayır</td>
                                <td className="p-4">Monin Caramel</td>
                                <td className="p-4">2</td>
                                <td className="p-4"><span className="px-2 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-sm">Alındı</span></td>
                                <td className="p-4">2023-10-01</td>
                            </tr>
                            <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                                <td className="p-4">Asım</td>
                                <td className="p-4">Yoğunlaştırılmış Süt</td>
                                <td className="p-4">2</td>
                                <td className="p-4"><span className="px-2 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-sm">Alındı</span></td>
                                <td className="p-4">2023-10-02</td>
                            </tr>
                            <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                                <td className="p-4">Osman</td>
                                <td className="p-4">Soya Sütü</td>
                                <td className="p-4">3</td>
                                <td className="p-4"><span className="px-2 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-sm">Alındı</span></td>
                                <td className="p-4">2023-10-03</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Branch;