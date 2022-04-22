import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import { likeArticle } from '../../redux/action/actionCreator'

import style from './Like.module.scss'

const Like = ({ slug, favorited, favoritesCount }) => {
  const dispatch = useDispatch()
  const { isAuth, token } = useSelector(({ isAuth, token }) => ({
    isAuth,
    token,
  }))

  const [like, setLike] = useState(favorited)
  const [likeCount, setLikeCount] = useState(favoritesCount)

  useEffect(() => {
    setLike(favorited)
    setLikeCount(favoritesCount)
  }, [favorited, favoritesCount])

  const onChange = () => {
    dispatch(likeArticle(token, slug, like))
    setLike((prev) => !prev)
    setLikeCount((prev) => (like ? prev - 1 : prev + 1))
  }

  return (
    <label>
      <input type="checkbox" name="like" disabled={!isAuth} checked={like && isAuth} onChange={onChange} />
      {!like ? <HeartOutlined className={style.heart} /> : <HeartFilled className={style.heart} />}
      {likeCount || null}
    </label>
  )
}

export default Like
