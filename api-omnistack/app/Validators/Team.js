'use strict'

class Team {
  get validationAll () {
    return true
  }

  get rules () {
    return {
      name: 'required'
    }
  }
}

module.exports = Team
