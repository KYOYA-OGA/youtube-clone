import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import ChannelScreen from './screens/channelScreen/ChannelScreen'
import HomeScreen from './screens/homeScreen/HomeScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import SearchScreen from './screens/SearchScreen'
import SubscriptionsScreen from './screens/subscriptionsScreen/SubscriptionsScreen'
import WatchScreen from './screens/watchScreen/WatchScreen'

import './_app.scss'

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = React.useState(false)

  const handleToggleSidebar = () => toggleSidebar(!sidebar)
  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main">
          {children}
        </Container>
      </div>
    </>
  )
}

export default function App() {
  const { accessToken, loading } = useSelector((state) => state.auth)

  const history = useHistory()

  useEffect(() => {
    if (!loading && !accessToken) {
      history.push('/auth')
    }
  }, [accessToken, loading, history])

  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route path="/auth">
        <LoginScreen />
      </Route>
      <Route path="/search/:query">
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route path="/watch/:id">
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>
      <Route path="/feed/subscriptions">
        <Layout>
          <SubscriptionsScreen />
        </Layout>
      </Route>
      <Route path="/channel/:channelId">
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}
