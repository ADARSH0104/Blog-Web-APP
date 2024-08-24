import {dirname} from "path";
import express from "express";
import { fileURLToPath } from "url";

let __dirname=dirname(fileURLToPath(import.meta.url));

const port =3000;
const app=express();

app.get("/",(req,res)=>{
res.render("index.ejs");
});
app.listen(port,()=>{
console.log(`Server running on ${port}`);
})

