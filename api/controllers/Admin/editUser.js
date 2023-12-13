import User from "../../models/UserModal.js";

const editUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body; // Assuming your updated data is sent in the request body

        // Ensure that only non-empty fields are updated
        const filteredUserData = {};
        for (const key in updatedUserData) {
            if (updatedUserData[key] !== undefined) {
                filteredUserData[key] = updatedUserData[key];
            }
        }

        const updateUser = await User.findByIdAndUpdate(userId, filteredUserData, { new: true });

        if (updateUser) {
            console.log('User updated successfully:', updateUser);
            res.status(200).json(updateUser);
        } else {
            console.error('User not found or update failed');
            res.status(404).json({ error: 'User not found or update failed' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default editUser;
