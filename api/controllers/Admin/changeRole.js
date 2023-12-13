import User from "../../models/UserModal.js";

const changeRole = async (req, res) => {
  try {
    console.log("successfully reached inside change Role");
    const userId = req.params.id;
    console.log(userId);
    let currentRole = req.body.isAdmin;
    console.log(currentRole);
    let newRole = currentRole === "Admin" ? "Customer" : "Admin";
    console.log(newRole);
    const updateUserRole = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );
    console.log(updateUserRole);
    console.log(updateUserRole.role)
    let updatedRole = updateUserRole.role
    res.status(200).json({ success: true, data: updatedRole})
  } catch (error) {
    console.error(error);
  }
};

export default changeRole;
