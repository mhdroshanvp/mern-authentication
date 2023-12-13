import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom'

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
    //   console.log('provider --> ', provider)
      const auth = getAuth(app)
    //   console.log('auth --> ', auth)

      const result = await signInWithPopup(auth, provider)
      // console.log('result --> ',result)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
        }),
      })  
      // console.log(res)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }

      const data = await res.json();
      // console.log(data)
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      console.error('could not login with google', error);
    }
  }
 return (
  <button type="button" onClick={handleGoogleClick} className='bg-blue-500 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue with Google</button>
 )
}