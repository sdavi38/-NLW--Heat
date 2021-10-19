import  "dotenv/config"
import express from 'express'
const PORT = 3000

const app = express()

//ROTA DE AUTENTICAÇÃO NO GITHUB

app.get("/github", (request, response)=>{
    response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.
    GITHUB_CLIENT_ID}`
    )
})

app.listen(PORT , () => console.log( `Server is running on ${PORT}`))
