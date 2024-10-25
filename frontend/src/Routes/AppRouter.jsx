import { Routes, Route } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import Cartscreen from '../screens/CartScreen';
import Signinscreen from '../screens/SigninScreen';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import OrderScreen from '../screens/OrderScreen/OrderScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen/OrderHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Signupscreen from '../screens/SignupScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../screens/AdminPages/Dashboard/Dashboard';
import AdminRoute from './AdminRoutes';
import ProductList from '../screens/AdminPages/ProductList/ProductList';

function AppRouter() {
  return (
    <Routes>
      <Route path="/product/:slug" element={<ProductScreen />} />
      <Route path="/cart" element={<Cartscreen />} />
      <Route path="/search" element={<SearchScreen />} />
      <Route path="/signin" element={<Signinscreen />} />
      <Route path="/signup" element={<Signupscreen />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        }
      />
      <Route path="/shipping" element={<ShippingAddressScreen />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/payment" element={<PaymentScreen />} />
      <Route path="/placeorder" element={<PlaceOrderScreen />} />
      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <OrderScreen />
          </ProtectedRoute>
        }
      />
      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ProductList />
          </AdminRoute>
        }
      />
      <Route
        path="/orderhistory"
        element={
          <ProtectedRoute>
            <OrderHistoryScreen />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
