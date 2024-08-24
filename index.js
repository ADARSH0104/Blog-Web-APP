let express = require("express");
let path=require("path")
let { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

const port =3000;
const app=express();
app.use(methodOverride('_method'))
app.set("view engine","ejs")
app.set("views",(path.join(__dirname,"views")))

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// app.use(methodOverride('X-HTTP-Method-Override'))
let posts=[
    {
        id:uuidv4(),
        username:"Adarsh",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        id:uuidv4(),
        username:"Adam",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {   
        id: uuidv4(),
        username:"John",
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];
app.get("/posts",(req,res)=>{
res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params
    let post=  posts.find((p)=>p.id===id)
    // console.log("ID:", id);
    // console.log("Post:", post);

    if(!post){
        res.send("post not found")
    }
    res.render("show.ejs",{post})
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body
    let id=uuidv4();
    posts.push({id,username,content});
res.redirect("/posts")
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content
    let post=posts.find((p)=>p.id===id);
    post.content=newcontent
    if(!post)
    {
        res.send("Post not ");
    }
    res.redirect("/posts")

});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    // let newcontent=req.body.content
    let post=posts.find((p)=>p.id===id)
    res.render("edit.ejs",{post})
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>p.id!==id)
   
    res.redirect("/posts")
})
app.listen(port,()=>{
console.log(`Server running on ${port}`);
// console.log(posts[0].id)
})

