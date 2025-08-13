import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

let lastDamagedSystem: string | null = null;
const SYSTEM_CODES: Record<string, string> = {
    navigation: "NAV-01",
    communications: "COM-02",
    life_support: "LIFE-03",
    engines: "ENG-04",
    deflector_shield: "SHLD-05",
};

const SYSTEM_KEYS = Object.keys(SYSTEM_CODES); // ["navigation", "communications", ...]


app.get("/status", (_req: Request, res: Response) => {
    const pick = SYSTEM_KEYS[Math.floor(Math.random() * SYSTEM_KEYS.length)];
    lastDamagedSystem = pick;
    res.json({ damaged_system: pick });
});

app.get("/repair-bay", (_req: Request, res: Response) => {
    if (!lastDamagedSystem) {
        return res
            .status(400)
            .send("No existe status, debes llamarlo primero antes de proceder.");
    }
    const code = SYSTEM_CODES[lastDamagedSystem];

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Repair</title></head>
<body>
  <div class="anchor-point">${code}</div>
</body>
</html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
});


app.post("/teapot", (_req: Request, res: Response) => {
    res.status(418).send("I'm a teapot");
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API lista :${PORT}`));
