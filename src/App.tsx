import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { lazy, Suspense } from 'react';

import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';
import Layout from './pages/Layout';


// Lazy loading ile sayfa bileşenlerini yükleme right
const Login = lazy(() => import('./pages/(auth)/Login'));
const Branch = lazy(() => import('./pages/(tabs)/Branch'));
const Team = lazy(() => import('./pages/(tabs)/Team'));
const Inventory = lazy(() => import('./pages/(tabs)/Inventory'));
const Setting = lazy(() => import('./pages/(tabs)/Setting'));
const PayTRPayment = lazy(() => import('./pages/(tabs)/PayTRPayment'));
const Success = lazy(() => import('./pages/(payment)/Success'));
const Fail = lazy(() => import('./pages/(payment)/Fail'));
 
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Branch />} />
                <Route path="/team" element={<Team />} />
                <Route path="/Inventory" element={<Inventory />} />
                <Route path="/Setting" element={<Setting />} />
                <Route path="/paytr" element={<PayTRPayment />} />
                <Route path="/success" element={<Success />} />
                <Route path="/fail" element={<Fail />} />
                {/* sayfa ekleye bilirsin */}
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;