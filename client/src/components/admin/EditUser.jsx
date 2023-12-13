import  { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


export const EditUser = ({userId, setDataUpdate}) => {
    const [storeUserId, setStoreUserId] = useState(userId);
    console.log(userId)
    console.log(storeUserId)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({
      username: '',
      email: '',
      password: '',
      role: '',
    });
  
    useEffect(() => {
      // Update storeUserId whenever userId changes
      setStoreUserId(userId);
    }, [userId]);
  
    const toggleModal = () => {
        fetchUserData(storeUserId)
      setIsModalOpen(!isModalOpen);
    };

    
    useEffect(() => {
        if (isModalOpen) {
          fetchUserData(storeUserId);
        }
      }, [isModalOpen, storeUserId]);

    console.log(storeUserId)
    const fetchUserData = async (storeUserId) => {
    console.log(storeUserId)

      try {
        const response = await axios.get(`/api/admin/userById/${storeUserId}`);
        if (response.status === 200) {
          const data = response.data;
          console.log(data)
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
  
    useEffect(() => {
        fetchUserData();
    }, [ storeUserId]);
    console.log(userData);
  
    const editUser = async () => {
      try {
        console.log(storeUserId);
    
        const updatedUserData = {
          userId: userData.user._id,
          username: userData.username || userData.user.username,
          email: userData.email || userData.user.email,
          password: userData.password || userData.user.password,
          role: userData.role || userData.user.role,
          // Add more fields if needed
        };
    
        console.log(updatedUserData);
    
        const response = await axios.put(`/api/admin/editUser/${storeUserId}`, updatedUserData);
    
        if (response.status === 200) {
          console.log('User updated successfully');
          toggleModal();
          setDataUpdate(2)
          toast.success('User updated successfully')
        } else {
          console.error('Failed to update user');
          toast.error('Failed to update user')

        }
      } catch (error) {
        console.error('Error updating user: ', error);
        toast.error('Error updating user')

      }
      
    };
  return (
    <div>
    
         <span
                  onClick={toggleModal}
            
                  id="editUser"
                  className="text-blue-600 hover:underline hover:cursor-pointer"
                >
                  Edit
                </span>

                {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="bg-black bg-opacity-50 absolute inset-0"
              onClick={toggleModal}
            ></div>
            <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal content */}
              <div className="relative">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add a new user
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={toggleModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username 
  
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        // value={}
                        onChange={(e) => setUserData({...userData, username: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter username"
                        defaultValue={userData.user? userData.user.username:''}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        // value={}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter email"
                        defaultValue={userData.user? userData.user.email:''}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        // value={''}
                        onChange={(e) => setUserData({...userData, password: e.target.value})}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="role"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        // value={}
                        onChange={(e) => setUserData({...userData, role: e.target.value})}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        defaultValue={userData.user? userData.user.role:''}
                        required
                      >
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                      </select>
                    </div>

                    {/* Add more fields as needed */}
                    {/* Role, profilePicture, status, isActive, etc. */}
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={editUser}
                    >
                      Update User
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
