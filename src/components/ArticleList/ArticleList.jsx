import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Spin } from 'antd'

import { getArticles } from '../../redux/action/actionCreator'
import { Articles } from '../Articles'
import './ArticleList.scss'
import spinStyle from '../Spin/Spin.module.scss'

const ArticleList = () => {
  const dispatch = useDispatch()

  const { articles, articlesCount, currentPage, loading } = useSelector(
    ({ articles, articlesCount, currentPage, loading }) => ({
      articles,
      articlesCount,
      currentPage,
      loading,
    })
  )

  useEffect(() => {
    dispatch(getArticles(1))
  }, [])

  const DataList = articles.map((item, i) => (
    <li key={i}>
      <Articles id={i} data={item} />
    </li>
  ))

  return (
    <>
      {loading ? (
        <div className={spinStyle.spin}>
          <Spin size="large" />
        </div>
      ) : (
        <ul className="atricle-list">{DataList}</ul>
      )}
      <Pagination
        size="small"
        pageSize={5}
        current={currentPage}
        total={articlesCount}
        className="pagination"
        onChange={(page) => {
          dispatch(getArticles(page))
        }}
        showSizeChanger={false}
      />
    </>
  )
}

export default ArticleList
