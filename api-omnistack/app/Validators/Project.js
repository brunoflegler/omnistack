'use strict'

class Project {
  get validationAll () {
    return true
  }

  get rules () {
    return {
      title: 'required'
    }
  }
}

module.exports = Project
