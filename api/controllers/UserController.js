import User from "../models/UserModal.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcrypt'

export const test = (req, res) => {
  // console.log('reached')
  res.json({
    message: "Api is working",
  });
};

export const updateUser = async (req,res, next) => {
  // console.log('reached')
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'))
  }
  // console.log('req.body', req.body)
  try {
    if (req.body.password) {
      req.body.password =  bcryptjs.hashSync(req.body.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      {new: true}
      );
      // console.log('updatedUser', updatedUser)
    const {password, ...rest} = updatedUser._doc
    res.status(200).json(rest)
  } catch (error) {
    // console.log(error.message)
    next(error)
  }
}


export const deleteUser = async(req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'))
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'User has been deleted...'})
  } catch (error) {
    next(error)
  }
}