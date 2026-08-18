import express, { Application, Request, Response } from "express";
const app: Application = express();
// app.use()
// app.enable();
console.log(app.settings);

app.get("/", (req: Request, res: Response) => {

    return res.status(200).json({
        Status: 1,
        Name: "Anurag",
        Position: "Frontend Developer",
        GirlFriend: "All"
    }) as Response;
})
app.get("/word", (req: Request, res: Response) => {

    return res.status(200).send({
        Status: 1,
        Name: "Anurag",
        Position: "Frontend Developer",
        GirlFriend: "All"
    }) as Response;
})
app.listen(3000, "0.0.0.0", (e) => {
    if (e) {
        process.exit(1);
    }
    console.log(`serer is listening on port 3000`)
})
