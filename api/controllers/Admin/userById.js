import User from "../../models/UserModal.js"

 const userById = async (req,res) => {
   try {
      const userId = req.params.id
      console.log("user id -->",userId)
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      console.log(user)
      return res.status(200).json({user})
   } catch (error) {
     // Handle errors appropriately
     console.error(error);
     res.status(500).json({ message: "Internal Server Error" });
   }
}

export default userById