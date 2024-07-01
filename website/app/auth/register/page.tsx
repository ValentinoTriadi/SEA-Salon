import { NextPage } from 'next'
import { RegisterForm } from './register-form'

interface Props {}

const LoginPage: NextPage<Props> = () => {
  return (
    <div className='w-full min-h-screen md:p-24 p-10 pt-24 flex items-start justify-center'>
      <RegisterForm />
    </div>
  )
}

export default LoginPage
