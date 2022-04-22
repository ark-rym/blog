import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Tag, Spin, Popconfirm, Button } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

import { Avatar } from '../Avatar'
import { getFullArticle, deleteArticle } from '../../redux/action/actionCreator'
import style1 from '../Articles/Articles.module.scss'
import spinStyle from '../Spin/Spin.module.scss'

import style from './Article.module.scss'

const Article = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuth, token, fullArticle, isDeleted } = useSelector(({ isAuth, token, fullArticle, isDeleted }) => ({
    isAuth,
    token,
    fullArticle,
    isDeleted,
  }))

  useEffect(() => {
    if (isAuth && !isDeleted) {
      dispatch(getFullArticle(slug, token))
    } else if (!isAuth && !isDeleted) {
      dispatch(getFullArticle(slug))
    }
    if (isDeleted) {
      navigate('/articles')
    }
  }, [slug, isAuth, isDeleted])

  const confirmDelete = () => {
    dispatch(deleteArticle(token, slug))
  }

  const { title, author, createdAt, tagList, description, favoritesCount } = fullArticle

  return !fullArticle.loadingFullArticle ? (
    <div className={style.wrapper}>
      <header className={style1.header}>
        <div>
          <div className={style1.info}>
            <Link to={`/articles/${slug}`} className={style1.link}>
              {title}
            </Link>
            <HeartOutlined className={style1.like} />
            {favoritesCount || null}
          </div>
          <div className={style1.tags}>
            {tagList &&
              tagList.map((item, i) => {
                if (item.trim()) {
                  return <Tag key={i}>{item}</Tag>
                }
                return null
              })}
          </div>
          <main className={style1.description}>{description}</main>
        </div>
        <div>
          <Avatar data={author} date={createdAt} />
          {isAuth && author.username === JSON.parse(localStorage.getItem('user')).username ? (
            <>
              <Popconfirm
                placement="rightTop"
                title="Are you sure you want to Delete?"
                onConfirm={confirmDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button className={style.del} danger>
                  Delete
                </Button>
              </Popconfirm>
              <Link to={`/articles/${slug}/edit`}>
                <Button className={style.edit}>Edit</Button>
              </Link>
            </>
          ) : null}
        </div>
      </header>

      <div className={style.body}>
        <ReactMarkdown remarkPlugins={[gfm]}>{fullArticle.body}</ReactMarkdown>
      </div>
    </div>
  ) : (
    <div className={spinStyle.spin}>
      <Spin size="large" />
    </div>
  )
}

export default Article
