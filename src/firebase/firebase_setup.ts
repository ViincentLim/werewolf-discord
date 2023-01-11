import * as admin from "firebase-admin";
import {database} from "firebase-admin";
import Database = database.Database;
import * as dotenv from "dotenv";

function setUpFirebase() {
    dotenv.config();
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || "")),
        // credential: applicationDefault(),
        databaseURL: "https://were-wolves-default-rtdb.firebaseio.com"
    });
}

setUpFirebase();
const db: Database = admin.database()
export const gameStatesPath = db.ref('games');
export const wwChannelPath = db.ref('wwChannels');