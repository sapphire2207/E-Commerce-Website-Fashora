import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectToDB from "./db/dbConnect.js";

connectToDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server Is Listening On: ${process.env.PORT}`);
        console.log(`Socket.io Initialized`);
    })
})
.catch((error) => console.log("MONGODB Connection FAILED!!!: ", error))