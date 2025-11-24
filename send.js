import fs from "fs";
import path from "path";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "POST only" });
    }

    const { user, message } = req.body;

    if (!user || !message)
        return res.status(400).json({ error: "Missing fields" });

    const filePath = path.join(process.cwd(), "data.json");
    const file = JSON.parse(fs.readFileSync(filePath, "utf8"));

    file.messages.push({
        user,
        message,
        time: "0 seconds ago"
    });

    fs.writeFileSync(filePath, JSON.stringify(file, null, 2));

    res.json({ success: true });
}
