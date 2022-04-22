import React from 'react'
import { useFieldArray, Controller } from 'react-hook-form'

import style from './Tags.module.scss'

const Tags = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  return (
    <ul className={style.ul}>
      {fields.map((item, index) => (
        <li key={item.id} className={style.li}>
          <Controller
            name={`tagList.${index}.name`}
            control={control}
            defaultValue={item.name}
            render={({ field }) => <input {...field} placeholder="Tag" type="text" className={style.input} />}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
            className={style.buttonDel}
          >
            Delete
          </button>
          {index === fields.length - 1 && (
            <button type="button" onClick={() => append({ name: '' })} className={style.buttonAdd}>
              Add tag
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

export default Tags
