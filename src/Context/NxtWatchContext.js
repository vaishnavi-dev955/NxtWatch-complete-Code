import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkBtnTheme: false,
  isHomeBtnClick: false,
  isTrendingClick: false,
  isGamingClick: false,
  isSavedVideosClick: false,
  onHomeBtn: () => {},
  onTrendingBtn: () => {},
  onGamingBtn: () => {},
  onSavedBtn: () => {},
  onToggleTheme: () => {},
  onAddVideo: () => {},
  savedVideosList: [],
})

export default NxtWatchContext
