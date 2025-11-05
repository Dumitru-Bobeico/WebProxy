import express from "express";
import { connectCassandra } from "./cassandraClient";
import router from "./routes";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const instanceId = process.env.INSTANCE_ID || "unknown";
app.get("/ping", (req, res) => {
  console.log(`Ping received on instance ${instanceId}`);
  res.send(`Hello from instance ${instanceId}`);
});

connectCassandra().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
