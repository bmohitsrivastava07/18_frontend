
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Navbar } from './Layouts/NavbarAndFooter/Navbar';
import { Footer } from './Layouts/NavbarAndFooter/Footer';
import { SearchProductsPage } from './Layouts/SearchProductPage/SearchProductsPage';
import { HomePage } from './Layouts/HomePage/HomePage';
import { ProductCheckoutPage } from './Layouts/ProductCheckoutPage/ProductCheckoutPage';
import LoginWidget from './Auth/LoginWidget';
import { OktaConfig } from './Lib/OktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { ReviewListPage } from './Layouts/ProductCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './Layouts/ShelfPage/ShelfPage';
import { MessagesPage } from './Layouts/MessagesPage/MessagesPage';
import { ManageArtGalleryPage } from './Layouts/ManageArtGalleryPage/ManageArtGalleryPage';
import ProtectedRoute from './ProtectedRoute';

const oktaAuth = new OktaAuth(OktaConfig);

export const App = () => {
  const customAuthHandler = () => {
    navigate('/login');
  }
  const navigate = useNavigate();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/search' element={<SearchProductsPage />}></Route>
            <Route path='/reviewlist/:productId' element={<ReviewListPage />}></Route>
            <Route path='/checkout/:productId' element={<ProductCheckoutPage />}></Route>
            <Route path='/admin' element={<ProtectedRoute><ManageArtGalleryPage/></ProtectedRoute>}/>
            <Route path="/shelf" element={<ProtectedRoute><ShelfPage/></ProtectedRoute>} />
            <Route path='/messages' element={<ProtectedRoute><MessagesPage/></ProtectedRoute>}/>
            <Route path='/login' Component={() => <LoginWidget config={OktaConfig} />} />
            <Route path='/login/callback' Component={LoginCallback} />            
          </Routes>
        </div>
        <Footer />
      </Security>
    </div>
  );
} 