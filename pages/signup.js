import React, { useState } from 'react'

const SignUp = () => {
 

    const handleSignUp = async () => {
        // setLoading(true)
        // const db = getFirestore(app)
        // const auth = getAuth()
        console.log(email)
        console.log(password)
    }
    function validateFormWithJS() {
        //onsubmit={validateFormWithJS()}
        //const [email, setEmail] = useState()
        //const [password, setPassword] = useState()
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
    
        if (!email) {
          alert('Please enter your email.')
          return false
        }
    
        if (password.length < 3) {
          alert('Password should be at least 3 digits long.')
          return false
        }
      }
    return (
        <div className="flex items-center justify-center h-screen mb-12">
        <h1 className='text-2xl font-bold text-center p-4'>Crie um Usuário Novo!!</h1>
        <form className='max-w-[600px] m-auto' >
            <div className='max-w-[1240px] m-auto flex justify-between items-center p-4'>
                <label for="email">Email:</label>
                <input className='border shadow-lg p-3' type="email" id='email' />
                <label for="password">Senha:</label>
                <input className='border shadow-lg p-3' type="password" id='password' />
            </div>
            <button className='border shadow-lg p-3 w-full mt-2' >Submit</button>
        </form>
    </div>
    )
  }
  
  export default SignUp