import { toLocalStorage } from '../../subsidiary/localStorage'
import { makeTags } from '../../subsidiary/subs'

import {
  GET_ARTICLES,
  GET_FULL_ARTICLE,
  LOADING_ARTICLES,
  LOADING_ARTICLE,
  OTHER_ERRORS,
  SET_NEW_USER,
  LOGIN_USER,
  LOGOUT_USER,
  EDIT_USER,
  LOADING_USER,
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  LOADING,
  ERROR,
  LIKE_ARTICLE,
} from './actionType'

export const getArticles =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING_ARTICLES,
      })
      const result = await fetch(`https://kata.academy:8021/api/articles?limit=5&offset=${(page - 1) * 5}`)
      const resData = await result.json()
      if (result.ok) {
        dispatch({
          type: GET_ARTICLES,
          payload: { ...resData, currentPage: page },
        })
      }
    } catch (e) {
      dispatch({
        type: OTHER_ERRORS,
      })
    }
  }

export const getFullArticle =
  (slug = '', token = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING_ARTICLE,
      })

      const result = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: token ? `Token ${token}` : null,
        },
      })

      const resData = await result.json()
      if (result.ok) {
        dispatch({
          type: GET_FULL_ARTICLE,
          payload: { ...resData },
        })
      }
    } catch (e) {
      dispatch({
        type: OTHER_ERRORS,
      })
    }
  }

export const likeArticle = (token, slug, like) => async (dispatch) => {
  try {
    const result = await fetch(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
      method: !like ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token ? `Token ${token}` : null,
      },
    })

    const resData = await result.json()
    if (result.ok) {
      dispatch({
        type: LIKE_ARTICLE,
        payload: { ...resData },
      })
    }
  } catch {
    dispatch({
      type: OTHER_ERRORS,
    })
  }
}

export const createArticle = (slug, token, data, edit) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    })

    const { title, description, textarea, tagList } = data
    const result = await fetch(`https://kata.academy:8021/api/articles/${edit ? slug : ''}`, {
      method: edit ? 'PUT' : 'POST',
      body: JSON.stringify({
        article: {
          title,
          description,
          body: textarea,
          tagList: tagList ? makeTags(tagList) : undefined,
        },
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token ? `Token ${token}` : null,
      },
    })

    const resData = await result.json()
    if (result.ok) {
      dispatch({
        type: CREATE_ARTICLE,
      })
    }

    if (result.status === 422) {
      dispatch({
        type: ERROR,
        payload: resData.errors,
      })
    }
  } catch (e) {
    dispatch({
      type: OTHER_ERRORS,
    })
  }
}

export const deleteArticle = (token, slug) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    })

    const result = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token ? `Token ${token}` : null,
      },
    })

    if (result.ok) {
      dispatch({
        type: DELETE_ARTICLE,
      })
    }
  } catch (e) {
    dispatch({
      type: OTHER_ERRORS,
    })
  }
}

export const register = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_USER,
    })

    const result = await fetch('https://kata.academy:8021/api/users', {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })

    const resData = await result.json()

    if (result.ok) {
      toLocalStorage(resData)
      dispatch({
        type: SET_NEW_USER,
        payload: resData.user,
      })
    }

    if (result.status === 422) {
      dispatch({
        type: ERROR,
        payload: resData.errors,
      })
    }
  } catch (e) {
    dispatch({
      type: OTHER_ERRORS,
    })
  }
}

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_USER,
    })

    const result = await fetch('https://kata.academy:8021/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })

    const resData = await result.json()

    if (result.ok) {
      toLocalStorage(resData)
      dispatch({
        type: LOGIN_USER,
        payload: resData.user,
      })
    }

    if (result.status === 422) {
      dispatch({
        type: ERROR,
        payload: resData.errors,
      })
    }
  } catch (e) {
    dispatch({
      type: OTHER_ERRORS,
    })
  }
}

export const editProfile = (data, token) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_USER,
    })

    const { username, email, password, image } = data
    const result = await fetch('https://kata.academy:8021/api/user', {
      method: 'PUT',
      body: JSON.stringify({
        user: {
          email,
          username,
          image: image || undefined,
          password: password || undefined,
        },
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token ? `Token ${token}` : null,
      },
    })

    const resData = await result.json()

    if (result.ok) {
      toLocalStorage(resData)
      dispatch({
        type: EDIT_USER,
        payload: resData.user,
      })
    }

    if (result.status === 422) {
      dispatch({
        type: ERROR,
        payload: resData.errors,
      })
    }
  } catch (e) {
    dispatch({
      type: OTHER_ERRORS,
    })
  }
}

export const logout = () => {
  localStorage.clear()
  return {
    type: LOGOUT_USER,
  }
}
