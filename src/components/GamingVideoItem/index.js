import {Link} from 'react-router-dom'
import './index.css'

const GamingVideoItem = props => {
  const {GamingVideoItemData} = props
  const {thumbnailUrl, title, viewCount, id} = GamingVideoItemData
  return (
    <Link to={`/videos/${id}`} className="nav-link2">
      <li className="new-Gaming-list-item1">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="Gaming-thumbnail-style"
        />
        <div>
          <p className="Gaming-list-heading">{title}</p>
          <p className="Gaming-list-description ">
            {viewCount} Watching Worldwide
          </p>
        </div>
      </li>
    </Link>
  )
}

export default GamingVideoItem
