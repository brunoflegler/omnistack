'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserTeam extends Model {
  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }

  roles () {
    return this.belongsToMany('adonis/Acl/Role')
  }

  permission () {
    return this.belongsToMany('adonis/Acl/Permission')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = UserTeam
