import type { Request, Response } from "express";

export async function adminLogin(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    const expectedUser = process.env.ADMIN_USER || "admin";
    const expectedPass = process.env.ADMIN_PASS || "pylonadmin";

    if (username === expectedUser && password === expectedPass) {
      // Return a mock JWT session token
      res.json({
        success: true,
        token: `mock_session_token_${Buffer.from(username).toString("base64")}_${Date.now()}`,
        message: "Authenticated successfully as Admin",
      });
    } else {
      res.status(401).json({ error: "Invalid username or password credentials" });
    }
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
