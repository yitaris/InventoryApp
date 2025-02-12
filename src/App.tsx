import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';

import Login from './pages/(auth)/Login';
import Layout from './pages/Layout';
import Branch from './pages/(tabs)/Branch';
import Team from './pages/(tabs)/Team';
import Inventory from './pages/(tabs)/Inventory';
import Setting from './pages/(tabs)/Setting';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Branch />} />
              <Route path="/team" element={<Team />} />
              <Route path="/Inventory" element={<Inventory />} />
              <Route path="/Setting" element={<Setting />} />
              {/* sayfa ekleye bilirsin */}
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;