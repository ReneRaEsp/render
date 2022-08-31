import { Router } from 'express'

import teamController from '../controllers/team.controller'

const router = Router()

const {
  addTeam,
  listTeams,
  listAllTeams,
  getTeamById,
  updateTeam,
  addElement,
  removeElement,
  activateTeam,
  deactivateTeam,
  removeTeam,
} = teamController

router.get('/team', listTeams)

router.get('/team_all', listAllTeams)

router.post('/team', addTeam)

router.get('/team/:id', getTeamById)

router.put('/team/:id', updateTeam)

router.patch('/team_add_element', addElement)

router.patch('/team_remove_element', removeElement)

router.patch('/team_activate/:id', activateTeam)

router.patch('/team_deactivate/:id', deactivateTeam)

router.delete('/team/:id', removeTeam)

export default router
