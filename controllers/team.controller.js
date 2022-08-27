import Team from '../models/team'

const addTeam = async (req, res) => {
  try {
    const team = await Team.create({
      cohortType: req.body.cohortType,
      cohortNumber: req.body.cohortNumber,
      group: req.body.group,
      teamLeader: req.body.teamLeader,
      technologies: req.body.technologies,
    })
    res.status(201).json(team)
  } catch (e) {
    res.status(500).json({
      message: 'Error while adding team',
    })
  }
}
const listTeams = async (req, res) => {
  const { page, limit, team } = req.query
  let query = {}
  const options = {
    page: page ?? 1,
    limit: limit ?? 10,
  }
  const findByTeam = {
    $or: [
      { cohortType: { $regex: team, $options: '-i' } },
      { cohortNumber: { $regex: team, $options: '-i' } },
      { group: { $regex: team, $options: '-i' } },
    ],
  }
  if (team) query = findByTeam

  try {
    const teams = await Team.paginate(query, options)
    res.status(200).json(teams)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate(
      'technologies',
      'name',
    )
    if (!team) {
      res.status(404).json({
        message: 'Team not found',
      })
    } else {
      res.status(200).json(team)
    }
  } catch (e) {
    res.status(500).json({
      message: 'Error while...',
    })
  }
}

const updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        cohortType: req.body.cohortType,
        cohortNumber: req.body.cohortNumber,
        group: req.body.group,
        teamLeader: req.body.teamLeader,
        technologies: req.body.technologies,
      },
    )
    res.status(205).json(team)
  } catch (e) {
    res.status(500).json({
      message: 'Error while updating a team',
    })
  }
}

const removeTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete({
      _id: req.params.id,
    })
    res.status(200).json(team)
  } catch (e) {
    res.status(500).json({
      message: 'Error while...',
    })
  }
}

export default {
  addTeam,
  listTeams,
  getTeamById,
  updateTeam,
  removeTeam,
}
