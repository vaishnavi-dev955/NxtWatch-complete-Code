import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const TrendingVideoItem = props => {
  const {TrendingVideoItemData} = props
  const {
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    id,
  } = TrendingVideoItemData
  const {name} = channel
  const newdate = new Date(publishedAt)
  const date = formatDistanceToNow(new Date(newdate))

  return (
    <Link to={`/videos/${id}`} className="nav-link4">
      <li className="new-Trending-list-item1">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="trending-thumbnail-style"
        />
        <div>
          <p className="trending-list-heading">{title}</p>
          <p>{name}</p>
          <div className="sub-list-trending2">
            <p className="trending-list-description">{viewCount} Views</p>
            <p className="trending-list-description">{date}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingVideoItem
