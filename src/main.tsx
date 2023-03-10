import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Root from './pages/Root/Root'
import ProRoute from './pages/PrivateRoute/PrivateRoute'
import Passes from './pages/Passes/Passes'
import Login from './pages/Login/Login'
import AuthProvider from './contexts/Auth/Auth';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MyAccount from './pages/MyAccount/MyAccount'
import ShowPasses from './pages/Passes/components/ShowPasses/ShowPasses'
import NewPass from './pages/Passes/components/NewPass/NewPass'
import PassInfo from './pages/Passes/components/PassInfo/PassInfo'
import LoadingProvider from './contexts/Loading/Loading'

ReactDOM.render(
  <BrowserRouter>
  <LoadingProvider>
    <AuthProvider>
      <App>
        <Routes>
          <Route path={"/"} element={<Root/>} />
          <Route path={"/login"} element={<Login/>} />
          <Route path={"/passes"} element={
            <ProRoute> 
              <Passes/>
            </ProRoute>
          } >
            <Route index element={<ShowPasses />} />
            <Route path="new" element={<NewPass />} />
            <Route path=":passId" element={<ShowPasses />}>
              <Route index element={<PassInfo />} />
            </Route>
          </Route>
          <Route path={"/MyAccount"} element={
            <ProRoute>
              <MyAccount />
            </ProRoute>
          } />
        </Routes>
      </App>
    </AuthProvider>
  </LoadingProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
