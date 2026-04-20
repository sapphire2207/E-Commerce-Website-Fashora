import dotenv from "dotenv";
dotenv.config();

import { server } from "./app.js";
import connectToDB from "./db/dbConnect.js";

const port = process.env.PORT || 3000;

connectToDB()
.then(() => {
    server.listen(port, () => {
        console.log(`Server Is Listening On: ${port}`);
        console.log(`Socket.io Initialized`);
    })
})
.catch((error) => console.log("MONGODB Connection FAILED!!!: ", error))