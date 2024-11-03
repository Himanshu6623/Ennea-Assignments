import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import store from './Redux/store.js'
import { Provider } from 'react-redux'
import Button from './Practice/Button.js'
import UseStatePractice from './Practice/UseStatePractice.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <Button />
            <UseStatePractice />
        </Provider>
    </React.StrictMode>
)


//Use to Wrap the whole react code into Redux