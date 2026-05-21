import { Router } from "express";
import clientsController from "../Controller/clientsController";

const router = Router();

// 1º Rotas fixas e específicas

router.get('/', clientsController.index)
router.get('/sobre', clientsController.sobre )
router.get('/create', clientsController.create )
router.get('/search', clientsController.search)



// 2º Rotas com parâmetros (curingas)

router.get('/:id', clientsController.show)
router.get('/edit/:id', clientsController.edit )
router.get('/del/:id', clientsController.del)

// Rotas de envio de formulário (POST)

router.post('/create', clientsController.store)
router.post('/edit/:id', clientsController.update)

export default router;