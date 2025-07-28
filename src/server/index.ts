import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import tasksRouter from "./routes/tasks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const frontendPath = path.resolve(__dirname, "../../dist");
app.use(express.static(frontendPath));

app.use("/tasks", tasksRouter);

app.get("/*splat", (_, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from: ${frontendPath}`);
});
