import {
  GET_ARTICLES,
  GET_FULL_ARTICLE,
  LOADING_ARTICLE,
  LOADING_ARTICLES,
  ERROR,
  OTHER_ERRORS,
  SET_NEW_USER,
  LOGIN_USER,
  LOGOUT_USER,
  EDIT_USER,
  LOADING_USER,
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  LIKE_ARTICLE,
} from '../action/actionType'

const initialState = {
  articles: [],
  articlesCount: 0,
  currentPage: 1,
  error: null,
  loadingArticles: false,
  fullArticle: {
    author: {},
    loadingFullArticle: false,
  },
  loading: false,
  createArtLoading: true,
  otherErrors: false,

  email: null,
  token: null,
  username: null,
  pic: null,
  isAuth: false,
  loadingUser: false,
  isDeleted: false,
}

if (localStorage.getItem('user')) {
  initialState.isAuth = true
  initialState.token = JSON.parse(localStorage.getItem('user')).token
  initialState.username = JSON.parse(localStorage.getItem('user')).username
  initialState.pic = JSON.parse(localStorage.getItem('user')).image
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.payload.currentPage,
        error: null,
        loadingArticles: false,
      }
    case LOADING_ARTICLES:
      return {
        ...state,
        loadingArticles: true,
      }
    case OTHER_ERRORS:
      return {
        ...state,
        otherErrors: true,
      }
    case GET_FULL_ARTICLE:
      return {
        ...state,
        fullArticle: { ...action.payload.article, loadingFullArticle: false },
        error: null,
      }
    case LOADING_ARTICLE:
      return {
        ...state,
        fullArticle: { ...state.fullArticle, loadingFullArticle: true },
      }
    case CREATE_ARTICLE:
      return {
        ...state,
        createArtLoading: false,
      }
    case DELETE_ARTICLE:
      return {
        ...state,
        isDeleted: true,
      }
    case LIKE_ARTICLE:
      const index = state.articles.findIndex((item) => item.slug === action.payload.slug)
      state.articles[index] = action.payload
      return {
        ...state,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loadingUser: false,
      }
    case SET_NEW_USER:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        username: action.payload.username,
        pic: action.payload.image,
        isAuth: true,
        loadingUser: false,
        error: null,
      }

    case LOGIN_USER:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        username: action.payload.username,
        pic: action.payload.image,
        isAuth: true,
        loadingUser: false,
        error: null,
      }

    case LOGOUT_USER:
      return {
        ...state,
        email: null,
        token: null,
        username: null,
        pic: null,
        isAuth: false,
        loadingUser: false,
      }

    case LOADING_USER:
      return {
        ...state,
        loadingUser: true,
      }

    case EDIT_USER:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        username: action.payload.username,
        pic: action.payload.image,
        isAuth: true,
      }

    default:
      return state
  }
}

export default rootReducer
