import React, { useState, useEffect } from 'react'
import { AiFillEye } from 'react-icons/ai'
import moment from 'moment'
import numeral from 'numeral'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './_videoHorizontal.scss'
import request from '../../api'
import { useHistory } from 'react-router-dom'

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      description,
      thumbnails: { medium },
      publishedAt,
      resourceId,
    },
  } = video

  const isVideo = !(id.kind === 'youtube#channel' || subScreen)

  const [views, setViews] = useState(null)
  const [duration, setDuration] = useState(null)
  const [channelIcon, setChannelIcon] = useState(null)
  const seconds = moment.duration(duration).asSeconds()
  const _duration = moment.utc(seconds * 1000).format('mm:ss')

  useEffect(() => {
    const get_video_details = async () => {
      const { data } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: id.videoId,
        },
      })
      setDuration(data.items[0].contentDetails.duration)
      setViews(data.items[0].statistics.viewCount)
    }
    if (isVideo) get_video_details()
  }, [id, isVideo])

  useEffect(() => {
    const get_channel_icon = async () => {
      const { data } = await request('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        },
      })
      setChannelIcon(data.items[0].snippet.thumbnails.default)
    }
    get_channel_icon()
  }, [channelId])

  const history = useHistory()
  const _channelId = resourceId.channelId || channelId
  const handleClick = () => {
    isVideo
      ? history.push(`/watch/${id.videoId}`)
      : history.push(`/channel/${_channelId}`)
  }

  const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel'

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={handleClick}
      // TODO refactor grid
    >
      <Col
        xs={6}
        md={searchScreen || subScreen ? 4 : 6}
        className="videoHorizontal__left"
      >
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videoHorizontal__thumbnail ${thumbnail}`}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>
      <Col
        xs={6}
        md={searchScreen || subScreen ? 8 : 6}
        className="videoHorizontal__right p-0"
      >
        <p className="videoHorizontal__title mb-1">{title}</p>

        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format('0.a')} views・
            {moment(publishedAt).fromNow()}
          </div>
        )}

        {searchScreen ||
          (subScreen && (
            <p className="mt-1 videoHorizontal__desc">{description}</p>
          ))}

        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect="blur" />}
          <p className="mb-0">{channelTitle}</p>
        </div>
        {<p className="mt-2">{video.contentDetails.totalItemCount} videos</p>}
      </Col>
    </Row>
  )
}

export default VideoHorizontal
