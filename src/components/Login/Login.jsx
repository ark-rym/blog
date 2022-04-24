import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Spin } from 'antd'

import { signInValidation } from '../../subsidiary/validation'
import { login } from '../../redux/action/actionCreator'
import style from '../Form/Form.module.scss'
import spinStyle from '../Spin/Spin.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, isAuth, loadingUser } = useSelector(({ error, isAuth, loadingUser }) => ({
    error,
    isAuth,
    loadingUser,
  }))

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    // mode: 'onChange',
    mode: 'onBlur',
    resolver: yupResolver(signInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (!error && isAuth) {
      navigate('/articles')
    }
    if (error?.['email or password']) {
      setError('email', {
        type: 'server',
        message: '',
      })
      setError('password', {
        type: 'server',
        message: '',
      })
    }
  }, [error, isAuth])

  const onSubmit = (formData) => {
    dispatch(login(formData))
  }

  return (
    <div className={style.form}>
      <h1 className={style.title}>Sign In</h1>

      {loadingUser && (
        <div className={spinStyle.spin}>
          <Spin size="large" />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
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
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                id="password"
                type="password"
                className={!errors.email ? style.inputText : style.error}
                placeholder="Password"
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

        {errors && errors.email && errors.email.type === 'server' && (
          <div className={style.errorMassage}>The email address or password is incorrect</div>
        )}

        <div>
          <button type="submit" className={style.button}>
            Login
          </button>
        </div>
        <Link to="/sign-up" className={style.link}>
          Don’t have an account?
          <span className={style.span}> Sign Up. </span>
        </Link>
      </form>
    </div>
  )
}

export default Login
