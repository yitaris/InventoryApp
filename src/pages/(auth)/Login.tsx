import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logoL, ubvideo } from '../../assets';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Giriş başarısız:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] p-6">
      <div className="flex flex-col md:flex-row bg-[#222] rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl relative">
        {/* Left Side - Video */}
        <div className="hidden md:block flex-2">
          <video src={ubvideo} autoPlay loop muted className="w-full h-full object-cover rounded-l-3xl" />
        </div>
        {/* Right Side - Form */}
        <div className="flex-1 flex-col items-center justify-center p-6 relative">
        <img src={logoL} alt="logo" className="w-[150px] h-[50px] object-cover justify-self-center" />
          <form onSubmit={handleSubmit} className="w-full h-full flex flex-1 flex-col gap-5 justify-center">
            
            <h1 className='text-2xl font-bold'>Hoşgeldiniz</h1>
            <input
              type="email"
              placeholder="E-posta"
              className="w-full p-4 rounded-xl bg-[#2c2c2c] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-lime-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Şifre"
              className="w-full p-4 rounded-xl bg-[#2c2c2c] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-lime-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-2/3 self-center cursor-pointer font-bold bg-[#242424] hover:bg-lime-500 text-white p-4 rounded-xl mt-4 transition-all shadow-lg duration-300"
            >
              Devam Et
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;