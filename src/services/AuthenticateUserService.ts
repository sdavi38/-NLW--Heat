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
import prismaClient from "../prisma"
import { sign } from 'jsonwebtoken'

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
          const response = await axios.get<IUserResponse>("https://api.github.com/user",{
              headers:{
                  authorization: `Bearer ${accessTokenResponse.access_token}`
              }
          })
         
          const { login, id, avatar_url, name } = response.data;

          //procurar no banco por um id 
          let user = await prismaClient.user.findFirst({
            where: {
              github_id: id,
            },
          });
            //Se não existir usuario, crie um user
          if (!user) {
            user = await prismaClient.user.create({
              data: {
                github_id: id,
                login,
                avatar_url,
                name,
              },
            });
          }
      
          const token = sign(
            {
              user: {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id,
              },
            },
            process.env.JWT_SECRET,
            {
              subject: user.id,
              expiresIn: "2d",
            }
          );
      
      
          return { token, user }
        }
      }
      

export{AuthenticateUserService}