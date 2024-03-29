'use strict'

const Mail = use('Mail')

class InvitationEmail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'InvitationEmail-job'
  }

  async handle ({ user, team, email }) {
    console.log('handle kue', email)
    try {
      await Mail.send(
        ['emails.invitation'],
        { team: team.name, user: user.name },
        message => {
          message
            .to(email)
            .from('bruno@omnistack.com.br', 'Bruno | Omnistack')
            .subject(`Convite para o time ${team.name}`)
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = InvitationEmail
