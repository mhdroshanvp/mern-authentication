import { useEffect, useState,  } from "react";
import MakeAdminButton from "./admin/MakeAdminButton";
import { AddNewUser } from "./admin/AddNewUser";
import { EditUser } from "./admin/EditUser";


export const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const [copyUserData, setCopyUserData] = useState([]);
  const [searchText, setSearchText] = useState('');

console.log(copyUserData)
  const [dataUpdate, setDataUpdate] = useState(1) // to update the table (for add, edit ....)
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/admin/getAllUsers");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setCopyUserData(data)
        } else {
          console.error("Error fetching data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchUserData();
    setDataUpdate(1) // to update the table
  }, [dataUpdate]);

 

  const blockUser = async (userId, isActive) => {
    try {
      const response = await fetch(`/api/admin/blockUser/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: isActive }),
      });

      if (response.ok) {
        setUserData((prevData) =>
          prevData.map((user) =>
            user._id === userId ? { ...user, isActive: !isActive } : user
          )
        );
      } else {
        console.error("Error updating user isVerified status");
      }
    } catch (error) {
      console.error("Error updating user isVerified status: ", error);
    }
  };

  const changeRole = async (userId, isAdmin) => {
    // console.log(isAdmin);
    try {
      const response = await fetch(`/api/admin/changeRole/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin }),
      });
      // console.log(response.body)
      if (response.ok) {
        const responseData = await response.json();
      const updatedRole = responseData.data;
        setUserData((prevData) =>
        prevData.map((user) =>
          user._id === userId ? { ...user, role: updatedRole } : user
        )
      );
      } else {  
        console.error("Error updating user role");
      }
    } catch (error) {
      console.error("Error updating user role: ", error);
    }
  };

  return (
    <>
      <AddNewUser setDataUpdate={setDataUpdate} />
        {/* <SearchUser copyUserData={copyUserData} setCopyUserData={setCopyUserData}/> */}
        <div className="search p-2 mx-[400] flex items-center justify-center">
        <input
          type="text"
          className="search-box p-2 border border-gray-400 rounded-l-md bg-gray-100 focus:outline-none focus:border-blue-500"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search user"
        />
        <button
          type="button"
          onClick={() => {
            console.log('button clicked')
            const filteredData = copyUserData.filter((user) => user.username.toLowerCase().includes(searchText.toLowerCase()))
            console.log('filterdData ', filteredData)
            setUserData(filteredData)
          }}
          className="search-button p-2 bg-green-400 text-gray-900 rounded-r-md border-none cursor-pointer hover:bg-green-500"
        >
          Search
        </button>
      </div>

    <div className="mx-auto max-w-2xl overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">User Name</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Actions</th>
            <th className="px-6 py-3">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through userData and render table rows dynamically */}
          {userData.map((user) => (
            <tr
              key={user._id}
              className="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                {user.username}
              </td>
              <td className="px-6 py-3">{user.role}</td>
              <td className="px-6 py-3 uppercase">{user.status}</td>
              <td className="px-6 py-3 text-right">
                <EditUser userId={user._id} setDataUpdate={setDataUpdate}/>
                <span className="mx-2 text-gray-500 dark:text-gray-400">|</span>
                
                <span
                  onClick={() => blockUser(user._id, user.isActive)}
                  id="blockUser"
                  className="text-red-600 hover:underline hover:cursor-pointer"
                >
                  {user.isActive ? "Block" : "UnBlock"}
                </span>
              </td>
              <td className="px-6 py-4">
                <MakeAdminButton
                  userId={user._id}
                  isAdmin={user.role}
                  onChangeRole={changeRole}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};
