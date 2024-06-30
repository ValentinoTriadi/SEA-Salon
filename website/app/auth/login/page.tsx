import { LoginForm } from "./login-form"
import { NextPage } from 'next'

interface Props {}

const LoginPage: NextPage<Props> = () => {
  return (
    <div className='w-full min-h-screen md:p-24 p-10 pt-24 flex items-start justify-center'>
      <LoginForm />
    </div>
  )
}

export default LoginPage
