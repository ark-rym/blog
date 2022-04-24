import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Spin } from 'antd'

import { editProfileValidation } from '../../subsidiary/validation'
import { editProfile } from '../../redux/action/actionCreator'
import style from '../Form/Form.module.scss'
import spinStyle from '../Spin/Spin.module.scss'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, isAuth, loadingUser, token } = useSelector(
    ({ error, isAuth, loadingUser, token }) => ({
      error,
      isAuth,
      loadingUser,
      token,
    })
  )

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(editProfileValidation),
    defaultValues: {
      username: isAuth ? JSON.parse(localStorage.getItem('user')).username : '',
      email: isAuth ? JSON.parse(localStorage.getItem('user')).email : '',
      password: '',
      image: isAuth ? JSON.parse(localStorage.getItem('user')).image : '',
    },
  })

  useEffect(() => {
    if (!isAuth) {
      navigate('/sign-in')
    }

    if (isAuth && isSubmitSuccessful) {
      navigate('/articles')
    }

    if (error?.image) {
      setError('image', {
        type: 'server',
        message: 'Input correct image URL',
      })
    }
  }, [isAuth, isSubmitSuccessful, error])

  const onSubmit = (formData) => {
    dispatch(editProfile(formData, token))
  }

  return (
    <div className={style.form}>
      <h1 className={style.title}>Edit Profile</h1>
      {loadingUser ? (
        <div className={spinStyle.spin}>
          <Spin size="large" />
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
        <div className={style.field}>
          <label htmlFor="username" className={style.label}>
            Username
          </label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                id="username"
                type="text"
                className={!errors.username ? style.inputText : style.error}
                placeholder="Username"
                {...field}
              />
            )}
          />
          <div>
            {errors.username && (
              <span className={style.errorMassage}>{errors.username.message}</span>
            )}
          </div>
        </div>

        <div className={style.field}>
          <label htmlFor="email" className={style.label}>
            Email address
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                id="email"
                type="text"
                className={!errors.email ? style.inputText : style.error}
                placeholder="Email address"
                {...field}
              />
            )}
          />
          <div>
            {errors.email && <span className={style.errorMassage}>{errors.email.message}</span>}
          </div>
        </div>

        <div className={style.field}>
          <label htmlFor="password" className={style.label}>
            New password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                id="password"
                type="password"
                className={!errors.password ? style.inputText : style.error}
                placeholder="New password"
                {...field}
              />
            )}
          />
          <div>
            {errors.password && (
              <span className={style.errorMassage}>{errors.password.message}</span>
            )}
          </div>
        </div>

        <div className={style.field}>
          <label htmlFor="image" className={style.label}>
            Avatar image (url)
          </label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                id="image"
                type="url"
                className={!errors.image ? style.inputText : style.error}
                placeholder="Avatar image"
                {...field}
              />
            )}
          />
          <div>
            {errors.image && <span className={style.errorMassage}>{errors.image.message}</span>}
          </div>
        </div>

        <div>
          <button type="submit" className={style.button}>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile
