/**
 * SERVIÇOS:
 * Receber code(string)
 * Recuperar o access_token no github
 * Recupera as informações dentro do Github
 * Verificar se usuario existe no Banco de dados
 * ---SIM => Gera um toke
 * ---NÃO -> Cria no BD, e Gera um Toke
 * Retorna um token com as infor dos user
 */

import axios from "axios";
//mport prismaClient from "../prisma/"
//import { sign } from 'jsonwebtoken'

interface IAccessTokenResponse {
    access_token: string,
  }

  interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string,
  }
  
  interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string,
  }
  


class AuthenticateUserService{

    async execute(code:string){
        //chamada externas com axios
        //passando null como paramentro pois não tera o body
        const url = "https://github.com/login/oauth/access_token";
          const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null,{
            params:{
                client_id:process.env.GITHUB_CLIENT_ID,
                client_secret:process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers:{
                "Accept":"application/json"
            }

        })    //Se tiver token válido 
          const response = await axios.get("https://api.github.com/user",{
              headers:{
                  authorization: `Bearer ${accessTokenResponse.access_token}`
              }
          })
        return response.data
    }

}

export{AuthenticateUserService}