import React from 'react'
import { Tag } from 'antd'
import { Link } from 'react-router-dom'

import { Avatar } from '../Avatar'
import { Like } from '../Like'

import style from './Articles.module.scss'

const Articles = ({ data }) => {
  const { title, author, createdAt, tagList, description, favoritesCount, slug, favorited } = data

  return (
    <div>
      <header className={style.header}>
        <div>
          <div className={style.info}>
            <Link to={`/articles/${slug}`} className={style.link}>
              {title}
            </Link>
            <Like slug={slug} favorited={favorited} favoritesCount={favoritesCount} />
          </div>
          <div className={style.tags}>
            {tagList &&
              tagList.map((item, i) => {
                if (item.trim()) {
                  return <Tag key={i}>{item}</Tag>
                }
                return null
              })}
          </div>
        </div>
        <Avatar data={author} date={createdAt} />
      </header>

      <main className={style.description}>{description}</main>
    </div>
  )
}

export default Articles
