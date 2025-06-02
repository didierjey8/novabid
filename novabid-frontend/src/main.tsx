import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Providers } from './components';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);


root.render(
  <StrictMode>  
    <BrowserRouter>
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </StrictMode>
);
