import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'

import NxtWatchContext from './Context/NxtWatchContext'

import LoginForm from './components/LoginForm'

import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDarkBtnTheme: false,
    isHomeBtnClick: false,
    isTrendingClick: false,
    isGamingClick: false,
    isSavedVideosClick: false,
    savedVideosList: [],
  }

  onAddVideo = video =>
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, video],
    }))

  onToggleTheme = () => {
    this.setState(prevState => ({isDarkBtnTheme: !prevState.isDarkBtnTheme}))
  }

  onHomeBtn = () => {
    this.setState(prevState => ({
      isHomeBtnClick: !prevState.isHomeBtnClick,
    }))
  }

  onTrendingBtn = () => {
    this.setState(prevState => ({
      isTrendingClick: !prevState.isTrendingClick,
    }))
  }

  onGamingBtn = () => {
    this.setState(prevState => ({
      isGamingClick: !prevState.isGamingClick,
    }))
  }

  onSavedBtn = () => {
    this.setState(prevState => ({
      isSavedVideosClick: !prevState.isSavedVideosClick,
    }))
  }

  render() {
    const {
      isDarkBtnTheme,
      isHomeBtnClick,
      isTrendingClick,
      isGamingClick,
      isSavedVideosClick,
      savedVideosList,
    } = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          isDarkBtnTheme,
          isHomeBtnClick,
          isTrendingClick,
          isGamingClick,
          isSavedVideosClick,
          savedVideosList,
          onToggleTheme: this.onToggleTheme,
          onHomeBtn: this.onHomeBtn,
          onTrendingBtn: this.onTrendingBtn,
          onGamingBtn: this.onGamingBtn,
          onSavedBtn: this.onSavedBtn,
          onAddVideo: this.onAddVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
