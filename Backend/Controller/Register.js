import Usermodel from "../Model/Usermodel.js";
import Candidatemodel from "../Model/Candidatemodel.js";
const Register = async (req, res) => {
    try {
        const existingUser = await Usermodel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already exists",
            });
        }
        const user = new Usermodel(req.body);
        await user.save();
        return res.status(201).send({
            message: "Registered successfully",
            user,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error in register API",
            error,
        });
    }
};



const Login = async (req, res) => {
    try {
        const user = await Usermodel.findOne({ email:req.body.email});
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

if(user.role!=req.body.role){
    return res.status(500).send({
        success:false,
        message:"Role does not match"
    })
}
       
        
        if (user.password !== req.body.password) {
            return res.status(404).send({
                success: false,
                message: "Password is incorrect",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Login successful",
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login API",
            error:error.message
        });
    }
};

//vote

// const voting =async(req,res)=>{

//     const existing=await Candidatemodel.findOne({candidate:req.body.candidate})
//     try {
        
    
//     if(existing){
//         return res.status(200).send({
//             success: false,
//             message: "User ALready voted",
//           });
//         }
//         const vote=new Candidatemodel(req.body)
//         await vote.save();
//         return res.status(201).send({
//             success: true,
//             message: "User voted Successfully",
//             vote,
//           });
//         }
//         catch (error) {
//             console.log(error)
//             res.status(500).send({
//                 success: false,
//                 message: "Error in Vote API",
//                 error: error.message,
//             });}}
//this one is working Vote
            const vote = async (req, res) => {
                try {
                    const userId = req.body.user;
            
                    const existingUser = await Usermodel.findById(userId);
                   
            
                    if (existingUser && existingUser.hasVoted) {

                        return res.status(500).send({
                            success: false,
                            message: "User has already voted",
                        });
                    }
    
                    // Save the vote
                    const candidateVote = new Candidatemodel({
                        candidate: req.body.candidate,
                        user: userId,
                    });
                    await candidateVote.save();
            
                    if (existingUser) {
                        existingUser.hasVoted = true;
                        await existingUser.save();
                    }
            
                    return res.status(201).send({
                        success: true,
                        message: "User voted successfully",
                        vote: candidateVote,
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: "Error in Vote API",
                        error: error.message,
                    });
                }
            };
            const getVote=async(req,res)=>{
                try {
                    const vote=await Candidatemodel.find({}).populate('user')
                    if(!vote){
                        return res.status(404).send({
                            success:false,
                            message:'no vote found'
                        })
                    }
                    return res.status(201).send({
                        success:true,
                        votecount:vote.length,
                        message:"all vote list",
                        vote
                    })
                } catch (error) {
                  console.log(error)
                  return res.status(401).send({
                    success:false,
                    message:error.message
                  })  
                }
            }
            
            export { Register, Login ,vote,getVote};
