import { Link } from 'react-router-dom'
import styles from './FormElem.module.css'
import Button from '../UI/Button/Button'
import {useForm} from 'react-hook-form'
import Input from '../UI/Input/Input'
import { useRef } from 'react'

function FormElem(props){

    const {title, link, button, input, infoText, type} = props
    
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        watch
    } = useForm()

    const password = useRef()
    password.current = watch('password', '')


    const emailElem = register('email', {
        required: 'Почта должна быть заполнена',
        pattern: {
            value: /^([A-z])+([0-9-_.])*([A-z0-9-_.])*@([A-z])+([0-9-_.])*([A-z0-9-_.])*[.]([A-z]){2,3}$/,
            message: 'Указана неверная почта'
        }
    })

    const passwordElem = register('password', {
        required: 'Пароль должен быть заполнен',
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Пароль должен содержать 8 букв и 1 цифру'
        }
    })

    const secondPasswordElem = (type === 'reg') ?
    register('secondPassword', {
        required: 'Пароль должен быть заполнен',
        validate: (value) => value === password.current || 'Пароли не соответсвуют друг другу'
    }) : ''

    const onSubmit = (data) => {
        console.log(data)
        reset()
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>{title}</h2>

                <p>{input.email}</p>
                <Input {...emailElem}/>
                <div>
                    {errors.email && <p className={styles.warning_text}>{errors.email.message}</p>}
                </div> 

                {(type !== 'reset') && 
                <>
                    <p>{input.password}</p>
                    <Input {...passwordElem}/>
                    <div>
                        {errors.password && <p className={styles.warning_text}>{errors.password.message}</p>}
                    </div> 
                </>
                }

                {(type === 'reg') && 
                <>
                    <p>{input.secondPassword}</p>
                    <Input {...secondPasswordElem}/>
                    <div>
                        {errors.secondPassword && <p className={styles.warning_text}>{errors.secondPassword.message}</p>}
                    </div>
                </>
                }


                <p className={styles.info_text}>{infoText}</p>

                {(type === 'login') && 
                    <Link to='/reset'>
                        <p className={styles.info_text}>Восстановить доступ</p>
                    </Link>
                }

                <Button title={button.submit} color='yellow'/>
                <Link to={link}>
                    <Button title={button.redirect} color='white'/>
                </Link>
            </form>
        </div>
    )
}
export default FormElem