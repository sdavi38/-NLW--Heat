import {Router} from   'express'
import { AuthenticateUserController } from '../controllers/AuthenticateUserController'
import { ensureAuthenticated } from '../middllewere/ensureAuthenticated'
import { CreateMessageController } from '../controllers/CreateMenssagesController'
import { GetLast3MessagesController } from "../controllers/GetLast3MessagesController";
import { ProfileUserController } from "../controllers/ProfileUserController";


const router = Router()

router.post('/authenticate', new AuthenticateUserController().handle)

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle)

router.get("/messages/last3", new GetLast3MessagesController().handle)

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle)

export {router}