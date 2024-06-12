import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import { Provider } from 'react-redux';
import { configStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './context/ThemeContext';
import { ContactProvider } from './context/ContactContext';

function App() {
  const { store, persistor } = configStore();
  return (
    <ContactProvider>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route exact path='/*' element={<UserRoutes />} />
              <Route element={<PrivateRoutes />}>
                <Route exact path='/admin/*' element={<AdminRoutes />} />
              </Route>
            </Routes>
          </PersistGate>
        </Provider >
      </ThemeProvider>
    </ContactProvider>
  );
}

export default App;