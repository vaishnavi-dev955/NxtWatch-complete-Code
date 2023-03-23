import {HiOutlineFire} from 'react-icons/hi'
import NxtWatchContext from '../../Context/NxtWatchContext'
import Header from '../Header'
import AllOptions from '../AllOptions'
import SavedVideoItem from '../SavedVideoItem'

import './index.css'

const SavedVideos = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkBtnTheme, savedVideosList} = value
      const overflowContainer = isDarkBtnTheme
        ? 'dark-saved-videos-overflow'
        : 'light-saved-videos-overflow'
      const SavedVideoHeader = isDarkBtnTheme
        ? 'Dark-saved-video-Header1'
        : 'light-saved-video-Header1'
      const savedlogobackground = isDarkBtnTheme
        ? 'dark-saved-video-logo-background'
        : 'light-saved-video-logo-background'
      const savedVideoHeading = isDarkBtnTheme
        ? 'dark-saved-video-heading'
        : 'light-saved-video-heading'
      console.log(savedVideosList)
      const EmptyView = savedVideosList.length === 0
      return (
        <>
          <Header />
          <div className="container4">
            <AllOptions />
            <div className={overflowContainer} data-testid="savedVideos">
              <div>
                {EmptyView ? (
                  <div className="no-saved-video-item-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                      className="no-saved-video-logo"
                    />
                    <h1
                      className={
                        isDarkBtnTheme
                          ? 'dark-no-saved-video-heading'
                          : 'light-no-saved-video-heading'
                      }
                    >
                      No saved videos found
                    </h1>
                    <p
                      className={
                        isDarkBtnTheme
                          ? 'dark-no-saved-video-para'
                          : 'light-no-saved-video-para'
                      }
                    >
                      You can save your videos while watching them
                    </p>
                  </div>
                ) : (
                  <>
                    <div className={SavedVideoHeader}>
                      <div className={savedlogobackground}>
                        <HiOutlineFire className="saved-logo-logo-style1" />
                      </div>
                      <h1 className={savedVideoHeading}>Trending</h1>
                    </div>
                    <ul className="main-saved-list-container">
                      {savedVideosList.map(eachItem => (
                        <SavedVideoItem
                          SavedVideoItemData={eachItem}
                          key={eachItem.id}
                        />
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SavedVideos
