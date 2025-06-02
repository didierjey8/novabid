// server.mjs
import express from "express";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.post("/deploy", (req, res) => {
  const { name, symbol, decimals, initialSupply, initialAddress } = req.body;

  if (
    !name ||
    !symbol ||
    decimals === undefined ||
    !initialSupply ||
    !initialAddress
  ) {
    return res.status(400).send("Missing parameters");
  }

  const scriptPath = path.join(__dirname, "..", "scripts", "deploy-eerc.ts");

  const command = `name="${name}" symbol="${symbol}" decimals=${decimals} initialSupply=${initialSupply} initialAddress="${initialAddress}" npx hardhat run ${scriptPath} --network fuji`;

  exec(
    command,
    { cwd: path.join(__dirname, "..") },
    (error, stdout, stderr) => {
      if (error) {
        console.error("Error:", error);
        return res.status(500).send(stderr || error.message);
      }

      const match = stdout.match(/__DEPLOYMENT_RESULT__(\{.*\})/s);
      if (match) {
        try {
          const resultJson = JSON.parse(match[1]);
          return res.json(resultJson);
        } catch (err) {
          return res.status(500).send("Failed to parse deployment result");
        }
      }

      return res.status(500).send("Deployment result not found");
    },
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
