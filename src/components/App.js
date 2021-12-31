import React from 'react';

import Layout from "./Layout";
import Home from "./pages/Home";
import "../styles/App.css"
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "../../src/context/AuthContext"
import PrivateRoute from "./route/PrivateRoute";
import PublicRoute from "./route/PublicRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/signup" element={
              <PublicRoute>
                <Signup/>
              </PublicRoute>
              }/>
            <Route exact path="/login" element={
              <PublicRoute>
                <Login/>
              </PublicRoute>
            }/>
            <Route exact path="/quiz/:id" element={
              <PrivateRoute>
                <Quiz/>
              </PrivateRoute>
            } />
            <Route exact path="/result/:id" element={
              <PrivateRoute>
                <Result/>
              </PrivateRoute>
            } />
            
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
