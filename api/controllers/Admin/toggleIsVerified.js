import User from "../../models/UserModal.js";

const toggleIsVerified = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('user id ', userId)
    console.log('isActive --> ',req.body.isActive); // Make sure you are sending isActive in the request body

    // Use req.body.isActive instead of req.body.isVerified
    let updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive: !req.body.isActive }, // Update based on isActive
      
    );
    console.log('updatedUser ', updatedUser.isActive);
    console.log(updatedUser)

    if (!updatedUser  === null) {
        console.log('error in updatedUser')
      res.status(404).json({ message: "Update user failed!" });
    } else {
      res.status(200).json(updatedUser);
      await updatedUser.save(); // Save the changes explicitly

    }
  } catch (error) {
    console.error('Error toggling user isActive status: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default toggleIsVerified;
