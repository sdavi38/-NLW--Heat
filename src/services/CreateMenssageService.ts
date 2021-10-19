import prismaClient from '../prisma/index'
import { io } from '../app'

class CreateMessageService {
	async execute(text: string, user_id: string) {
		const mens = await prismaClient.message.create({
			data: {
				text,
				user_id,
			},
    
     
      //incluido user no front  
			include: {
				user: true,
			},
		})
    

		const infoWebSocket = {
			text: mens.text,
			user_id: mens.user_id,
			created_at: mens.created_at,
			user: {
				name: mens.user.name,
				avatar_url: mens.user.avatar_url,
			},
		}

		//passando mensagens e informações em tempo real para os usuários

		io.emit('new_message', infoWebSocket)
		return mens
	}
}

export { CreateMessageService }