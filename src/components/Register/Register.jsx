import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Spin } from 'antd'

import { signUpValidation } from '../../subsidiary/validation'
import { register } from '../../redux/action/actionCreator'
import style from '../Form/Form.module.scss'
import spinStyle from '../Spin/Spin.module.scss'

const Register = () => {
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
    resolver: yupResolver(signUpValidation),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      password2: '',
      agreement: true,
    },
  })

  useEffect(() => {
    if (isAuth && !error) {
      navigate('/articles')
    }

    if (error?.username) {
      setError('username', {
        type: 'server',
        message: 'sorry, this username has already been taken',
      })
    }
    if (error?.email) {
      setError('email', {
        type: 'server',
        message: 'sorry, this email has already been taken',
      })
    }
  }, [isAuth, error])

  const onSubmit = (formData) => {
    dispatch(register(formData))
  }

  return (
    <div className={style.form}>
      <h1 className={style.title}>Create new account</h1>

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
          <div>{errors.username && <span className={style.errorMassage}>{errors.username.message}</span>}</div>
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
          <div>{errors.email && <span className={style.errorMassage}>{errors.email.message}</span>}</div>
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
                className={!errors.password ? style.inputText : style.error}
                placeholder="Password"
                {...field}
              />
            )}
          />
          <div>{errors.password && <span className={style.errorMassage}>{errors.password.message}</span>}</div>
        </div>

        <div className={style.field}>
          <label htmlFor="password2" className={style.label}>
            Repeat password
          </label>
          <Controller
            name="password2"
            control={control}
            render={({ field }) => (
              <input
                id="password2"
                type="password"
                className={!errors.password2 ? style.inputText : style.error}
                placeholder="Password"
                {...field}
              />
            )}
          />
          <div>{errors.password2 && <span className={style.errorMassage}>{errors.password2.message}</span>}</div>
        </div>

        <div className={style.field}>
          <label htmlFor="agreement" className={style.labelCheckbox}>
            I agree to the processing of my personal information
          </label>
          <Controller
            name="agreement"
            control={control}
            render={({ field }) => (
              <input
                id="agreement"
                type="checkbox"
                checked
                className={!errors.agreement ? style.inputCheckbox : style.error}
                placeholder="Password"
                {...field}
              />
            )}
          />
        </div>

        <div>
          <button type="submit" className={style.button}>
            Create
          </button>
        </div>
        <Link to="/sign-up" className={style.link}>
          Already have an account?
          <span className={style.span}> Sign In. </span>
        </Link>
      </form>
    </div>
  )
}

export default Register
