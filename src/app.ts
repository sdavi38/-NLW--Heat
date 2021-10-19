import  "dotenv/config"
import express from 'express'
import { router } from "./routes/routes"
const PORT = 3000

const app = express()
app.use(express.json())
app.use(router)

//ROTA DE AUTENTICAÇÃO NO GITHUB

app.get("/github", (request, response)=>{
    response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    )
})

//ROTA DE CALLBACK
app.get("/signin/callback",(request, response)=>{
    const{code} = request.query
    
    return response.json(code)
})

app.listen(PORT , () => console.log( `Server is running on ${PORT}`))
