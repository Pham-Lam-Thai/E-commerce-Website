import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { address } = req.body;
    const user = User.findById(req.user);
    console.log('user', user)
    await user.updateOne({
      $push: {
        address: address,
      }
    });
    db.disconnectDb();
    console.log(user.address)
    console.log('{ addresses: user.address }', { addresses: user.address })
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;