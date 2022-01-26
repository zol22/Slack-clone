import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header';
import styled from 'styled-components'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from 'react-spinkit' //  react-spinkit spinner when refreshing page (is loading)

function App() {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://aem.dropbox.com/cms/content/dam/dropbox/www/en-us/business/app-integrations/slack/Slack_logo_new.png" alt="" />

          <Spinner 
            name="ball-pulse-rise"
            color="fuchsia"
            fadeIn="none"
          />
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="app">
    <Router>
    { !user ? (
      <Login />
    ) : (
      <>
      <Header />
      <AppBody>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Chat/>}/>
          </Routes>
      </AppBody>
      </>
    )}
    </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display:flex;
  height:100vh;
`

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width:100%;
`
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding:20px;
    margin-bottom: 40px;
  }
  `