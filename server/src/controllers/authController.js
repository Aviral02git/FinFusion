const {PrismaClient}=require("@prisma/client")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const prisma=new PrismaClient();
// require('dotenv').config();
// console.log(process.env.JWT_SECRET);

const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await prisma.user.findUnique({where:{email}});
      if (existingUser) {
        return res.status(400).json({ message:'User already exists'});
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
const loginUser= async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user= await prisma.user.findUnique({
            where:{email},
        });

        if (!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if (!isMatch){
            return res.status(400).json({message:"Invalid password"});
        }
        const token=jwt.sign({userId:user.id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.json({message:"Login successful", token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
            }
        });

    }
    catch(error){
        console.error("Login error:",error)
        res.status(500).json({ message: 'Server error' })
    }
}
module.exports={loginUser,registerUser};
