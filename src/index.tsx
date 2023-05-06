import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './components/app/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);
root.render(<App />);


