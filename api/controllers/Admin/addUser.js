import User from "../../models/UserModal.js";
import bcryptjs from "bcrypt";



 const addUser = async(req, res) => {
    try {
        console.log('reached inside addUser')
        console.log('req.boyd', req.body)
        const {username, email, password, role} = req.body 

    const existingUser = await User.findOne({ email });
    console.log('exitsting user', existingUser)

    if (existingUser) {
      // If a user with the email already exists, send an error response
      return res.status(400).json({ message: "User with this email already exists" });
    }

         // Set role to 'Customer' if it is empty
    const finalRole = role || 'Customer';

        const hashedPassword =  bcryptjs.hashSync(password, 10)
        console.log('hashedPasword, ', hashedPassword)
        const newUser = new User({ username, email, password: hashedPassword, role:finalRole });
        console.log('new user ', newUser)
        try {
          await newUser.save();
          console.log('user created successfully')
          res.status(201).json({ message: "User created successflly" });
        } catch (error) {
          next(error);
        }




    } catch (error) {
        
    }
}

export default addUser