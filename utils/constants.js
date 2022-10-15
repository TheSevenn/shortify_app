// setup env variables config
import dotenv from "dotenv";
dotenv.config();

const node_env = process.env.NODE_ENV;
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
const base_url = process.env.BASE_URL;

export { node_env, port, mongo_uri, base_url };