import { useState } from "react";
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

export const AddNewUser = ({setDataUpdate}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Customer',
  })

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
  
    try {
      const response = await axios.post("/api/admin/addUser", newUser);
      console.log(response);
  
      if (response.status === 201) {
        console.log('User created successfully');
        setDataUpdate(2) // to update the table
        toast.success('User created successfully');
      } else {
        console.log('Unexpected status code:', response.status);
        toast.error('Unexpected error occurred');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Error creating user');
    }
  
    setFormData({
      username: '',
      email: '',
      password: '',
      role: '',
    });
    toggleModal();
  };
  

  return (
    <div>
      <button
        className="block text-black shadow-md hover:shadow-lg bg-yellow-400 hover:bg-yellow-500 font-medium rounded-full text-sm px-5 py-2.5 text-center mx-auto mb-4"
        type="button"
        onClick={toggleModal}
      >
        Add User
      </button>
      <Toaster />

      {/* Main modal */}
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
                  <form className="space-y-4" onSubmit={handleSubmit}>
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
                        value={formData.username }
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter username"
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
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter email"
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
                        value={formData.password}
                        onChange={handleInputChange}
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
                        value={formData.role }
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

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
                    >
                      Add User
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
