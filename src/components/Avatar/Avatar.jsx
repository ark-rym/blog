import React from 'react'

import { makeDate } from '../../subsidiary/subs'

import style from './Avatar.module.scss'

const Avatar = ({ data, date }) => {
  const { username, image } = data

  return (
    <div className={style.author}>
      <div className={style.info}>
        <div className={style.username}>{username}</div>
        {date && <div className={style.date}>{makeDate(date)}</div>}
      </div>
      <div className={style.avatar}>
        <img src={image} alt="avatar" className={style.img} />
      </div>
    </div>
  )
}

export default Avatar
