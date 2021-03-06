import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect } from 'react'
import ShowMoreText from 'react-show-more-text'
import { useDispatch, useSelector } from 'react-redux'

import './_videoMetaData.scss'

import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from '../../redux/actions/channel.action'
import HelmetCustom from '../HelmetCustom'

const VideoMetaData = ({ video: { snippet, statistics } }, videoId) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet
  const { viewCount, likeCount, dislikeCount } = statistics

  const dispatch = useDispatch()

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel)

  const { subscriptionStatus } = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  )

  useEffect(() => {
    dispatch(getChannelDetails(channelId))
    dispatch(checkSubscriptionStatus(channelId))
  }, [dispatch, channelId])

  return (
    <div className="videoMetadata py-2">
      <HelmetCustom title={title} description={description} />
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <div>
            {numeral({ viewCount }).format('0.a')} views・
            {moment({ publishedAt }).fromNow()}
          </div>
          <div className="d-flex">
            <div className="px-3">
              <MdThumbUp size={26} />
              {numeral(likeCount).format('0.a')}
            </div>
            <div>
              <MdThumbDown size={26} />
              {numeral(dislikeCount).format('0.a')}
            </div>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            alt="avatar"
            width="50px"
            height="50px"
            className="rounded-circle me-3"
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>
              {' '}
              {numeral(channelStatistics?.subscriberCount).format('0.a')}{' '}
              Subscribers
            </span>
          </div>
        </div>
        <button
          className={`btn border-0 p-2 m-2 ${subscriptionStatus && 'btn-gray'}`}
        >
          {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOE LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  )
}

export default VideoMetaData
