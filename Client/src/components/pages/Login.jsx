import logo from '/images/logo.png'
const Login = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-12">
        <div className='flex flex-col items-center gap-3'>
           <img src={logo} className='h-[80px]' alt="" />
            <h1 className='text-3xl'>CotiZen</h1> 
        </div>
        
        <form action="" className='w-[20%] flex flex-col gap-5' style={{minWidth:'320px'}}>
            <input type="email" className='font-light p-3 py-3 bg-gray-100 rounded-lg focus:outline-none ' placeholder='Email'  />
            <input type="password" className='font-light p-3 py-3 bg-gray-100 rounded-lg focus:outline-none ' placeholder='Password'  />
            <p>forget Password ?</p>
            <button className='bg-gray-700 py-3 rounded-lg text-white active:scale-[0.98]'>Login</button>
        </form>
    </div>
  )
}

export default Login