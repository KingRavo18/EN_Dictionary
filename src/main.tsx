import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Dictionary from './Dictionary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Dictionary/>
  </StrictMode>,
)
