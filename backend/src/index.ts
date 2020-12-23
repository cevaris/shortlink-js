import { app } from "./app";

const port = process.env.PORT || 3000;
app.listen(
    process.env.PORT || 3000,
    () => console.log(`Server is running port=${port}...`)
);