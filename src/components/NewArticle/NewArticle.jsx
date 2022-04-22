import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { editAtricleValidation } from '../../subsidiary/validation'
import { createArticle } from '../../redux/action/actionCreator'
import { Tags } from '../Tags'
import style from '../Form/Form.module.scss'

const NewArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug, edit } = useParams()

  const { isAuth, token, fullArticle, error } = useSelector(({ isAuth, token, fullArticle, error }) => ({
    isAuth,
    token,
    fullArticle,
    error,
  }))

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(editAtricleValidation),
    defaultValues: {
      title: edit ? fullArticle.title : '',
      description: edit ? fullArticle.description : '',
      textarea: edit ? fullArticle.body : '',
      tagList: !edit ? [{ name: '' }] : fullArticle.tagList.map((item) => ({ name: item })),
    },
  })

  useEffect(() => {
    if (!isAuth) {
      navigate('/sign-in')
    }
    if (isAuth && !error && isSubmitSuccessful) {
      navigate('/articles')
    }
    if (slug !== fullArticle.slug && edit) {
      navigate('/articles')
    }
  }, [isAuth, error, isSubmitSuccessful])

  const onSubmit = (formData) => {
    dispatch(createArticle(slug, token, formData, edit))
  }

  return (
    <div className={style.formArt}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
        <div className={style.field}>
          <label htmlFor="title" className={style.label}>
            Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                id="title"
                type="text"
                className={!errors.title ? style.inputText : style.error}
                placeholder="Title"
                {...field}
              />
            )}
          />
          <div>{errors.title && <span className={style.errorMassage}>{errors.title.message}</span>}</div>
        </div>

        <div className={style.field}>
          <label htmlFor="description" className={style.label}>
            Short description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                id="description"
                type="text"
                placeholder="Short description"
                {...field}
                className={!errors.title ? style.inputText : style.error}
              />
            )}
          />
          <div>{errors.description && <span className={style.errorMassage}>{errors.description.message}</span>}</div>
        </div>

        <div className={style.field}>
          <label htmlFor="textarea" className={style.label}>
            Text
          </label>
          <Controller
            name="textarea"
            control={control}
            render={({ field }) => (
              <textarea
                id="textarea"
                placeholder="Text"
                {...field}
                className={!errors.textarea ? style.textarea : style.error}
              />
            )}
          />
          <div>{errors.textarea && <span className={style.errorMassage}>{errors.textarea.message}</span>}</div>
        </div>

        <div>
          <label htmlFor="tags" className={style.label}>
            Tags
          </label>
          <div>
            <Tags control={control} />
          </div>
        </div>
        <input type="submit" className={style.button} value="Send" />
      </form>
    </div>
  )
}

export default NewArticle
