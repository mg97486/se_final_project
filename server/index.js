import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

async function getToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET,
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
}

app.get("/spotify-token", async (req, res) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET,
        ).toString("base64"),

      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  res.json(data);
});

let users = [];

app.post("/signup", (req, res) => {
  const { email, password, name, avatar } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = { id: Date.now(), email, password, name, avatar };
  users.push(newUser);

  res.json({ message: "User created", user: newUser });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
