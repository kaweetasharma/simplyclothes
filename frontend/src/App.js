import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from 'react';
import { Store } from './store';
import axios from 'axios';
import { getError } from './utils/utils';
import Container from 'react-bootstrap/Container';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import AppRouter from './Routes/AppRouter';
import Footer from './components/Footer';

const App = () => {
  const {
    state: { userInfo },
  } = useContext(Store);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Handle overlay click to close the sidebar
  const handleOverlayClick = () => {
    setSidebarIsOpen(false);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <Header
          setSidebarIsOpen={setSidebarIsOpen}
          sidebarIsOpen={sidebarIsOpen}
          categories={categories}
        />
        <Sidebar
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
          categories={categories}
        />
        {sidebarIsOpen && (
          <div className="overlay" onClick={handleOverlayClick}></div>
        )}
        <main>
          <Container className="mt-3">
            <AppRouter />
          </Container>
        </main>
        <Footer categories={categories} />
      </div>
    </BrowserRouter>
  );
};

export default App;
