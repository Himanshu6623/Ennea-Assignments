import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './Redux/Store.js';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create an instance of QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
