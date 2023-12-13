import User from "../../models/UserModal.js";

const getAllUsers = async (req,res) => {
    console.log('successfully reached inside gellallusers')
    try {
        const allUsers = await User.find()
        // console.log(allUsers)
        return res.json(allUsers)
    } catch (error) {
        console.error(error);
    }
} 

export default getAllUsers;