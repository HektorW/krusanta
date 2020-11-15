const { getById, getAll, addAssignedId } = require('../../db/models/user')
const { BadRequest, InternalError } = require('../../utils/httpErrors')
const log = require('../../log')('server/api/admin/assignSantas')

module.exports = function* assignSantas(req) {
  const includedUserIds = req.body.users

  if (includedUserIds.length < 3) {
    throw new BadRequest('Not enough ids submitted')
  }

  const users = yield Promise.all(
    includedUserIds.map(id => getById(id))
  )

  if (users.length !== includedUserIds.length) {
    throw new BadRequest('Some invalid ids submitted')
  }

  const alreadyHasAssignment = users.filter(user => !!user.assignee)
  if (alreadyHasAssignment.length > 0) {
    throw new BadRequest('Some users already has assignment', alreadyHasAssignment)
  }

  const allUsers = yield getAll()
  const alreadyIsAssigned = users.filter(
    user => allUsers.some(_user => _user.assignedId === user.id)
  )
  if (alreadyIsAssigned.length > 0) {
    throw new BadRequest('Some users are already assigned', alreadyIsAssigned)
  }

  const assignments = randomizeAssignments(includedUserIds)
  if (assignments.length !== users.length) {
    throw new InternalError('Something went wrong when assigning users', assignments)
  }

  yield Promise.all(
    assignments.map(({ id, assignedId }) => addAssignedId(id, assignedId))
  )
}


const randIndex = length => Math.floor(Math.random() * length)

function randomizeAssignments(userIds, tryCount = 1) {
  if (tryCount > 1000) {
    throw new InternalError('Failed to randomize assignments in 1000 tries')
  }

  const usersIdsLeft = userIds.slice(0)
  const assignments = []
  userIds.forEach(id => {
    let assignedId
    let tries = 0
    while (tries++ < 1000) {
      const index = randIndex(usersIdsLeft.length)
      assignedId = usersIdsLeft[index]
      if (assignedId === id) {
        continue
      }
      
      const assignedIdAssignment = assignments.find(assignment => assignment.id === assignedId)
      if (assignedIdAssignment && assignedIdAssignment.assignedId === id) {
        continue 
      }

      break
    }
    
    usersIdsLeft.splice(usersIdsLeft.indexOf(assignedId), 1)
    assignments.push({ id, assignedId })
  })

  if (!verifyNoCrossOvers(assignments)) {
    return randomizeAssignments(userIds, tryCount + 1)
  }

  log.info({ tryCount, assignments }, 'Succesfully randomized assignments')
  return assignments
}

function verifyNoCrossOvers(assignments) {
  return assignments.every(({ id, assignedId }) => {
    const assigned = assignments.find(assignment => assignment.id === assignedId)
    return assigned && assigned.assignedId !== id
  })
}
