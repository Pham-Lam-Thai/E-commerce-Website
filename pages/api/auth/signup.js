import nc from "next-connect";
import db from " ../../../utils/db";
const handler = nc();
handler.post(async( req, res) => {
    try {
        db.connectDb();
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default handler;