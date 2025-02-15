import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface Member {
    id: string;
    name: string;
    title: string;
    avatar_url: string;
    shifts?: Record<string, string>;
}

const Team = () => {
    const { team, user, setTeamShift } = useAuth();
    const [editingMember, setEditingMember] = useState<Member | null>(null);
    const [weeklyShifts, setWeeklyShifts] = useState<Record<string, string>>({});

    const handleEdit = (member: Member) => {
        setEditingMember(member);
        setWeeklyShifts(member.shifts || {});
    };

    const handleShiftChange = (day: string, shift: string) => {
        setWeeklyShifts((prev) => ({ ...prev, [day]: shift }));
    };

    const handleSave = async () => {
        if (!editingMember || !editingMember.id) return;

        for (const [day, shift] of Object.entries(weeklyShifts)) {
            await setTeamShift(editingMember.id, day, shift);
        }
        setEditingMember(null);
    };

    if (!team || team.length === 0) {
        return <p className="text-center text-gray-400 mt-10">Takım bilgisi yükleniyor veya mevcut değil...</p>;
    }

    return (
        <div className="flex flex-col w-full h-screen p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Takımın</h1>
            <ul className="grid grid-cols-1 gap-6">
                {team.filter(member => member.id !== user?.id).map(member => (
                    <li key={member.id} className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex gap-6 items-start">
                            <div className="text-center">
                                <img
                                    src={member.avatar_url}
                                    alt={member.name}
                                    className="w-24 h-24 object-cover rounded-full border-2 border-[#ffffff50]"
                                />
                                <h2 className="text-lg font-semibold text-white mt-4">{member.name}</h2>
                                <p className="text-sm text-gray-400">{member.title}</p>
                            </div>
                            {editingMember?.id === member.id ? (
                                <div className="flex flex-col w-full">
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
                                        {["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"].map((day) => (
                                            <div key={day} className="flex flex-col items-center bg-gray-800 p-3 rounded-lg shadow">
                                                <span className="text-white font-semibold">{day}</span>
                                                <select
                                                    className="mt-2 p-2 bg-gray-700 text-white rounded w-full"
                                                    value={weeklyShifts[day] || ""}
                                                    onChange={(e) => handleShiftChange(day, e.target.value)}
                                                >
                                                    <option value="08:00 - 17:00">08:00 - 17:00</option>
                                                    <option value="16:00 - 01:00">16:00 - 01:00</option>
                                                    <option value="12:00 - 20:00">12:00 - 20:00</option>
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                            onClick={handleSave}
                                        >
                                            Kaydet
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                            onClick={() => setEditingMember(null)}
                                        >
                                            İptal
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    onClick={() => handleEdit(member)}
                                >
                                    Vardiyasını Düzenle
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Team;
