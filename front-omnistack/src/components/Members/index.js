import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import api from '../../services/api';

import Modal from '../Modal';
import Can from '../Can';
import { MembersList, Member, Invite } from './styles';
import Button from '../../styles/components/Button';
import MembersActions from '../../store/ducks/members';

class Members extends Component {
  static propTypes = {
    setMembersModalClose: PropTypes.func.isRequired,
    getMembersRequest: PropTypes.func.isRequired,
    setUpdateMemberRequest: PropTypes.func.isRequired,
    setInviteMemberRequest: PropTypes.func.isRequired,
    member: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          roles: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              name: PropTypes.string,
            }),
          ),
        }),
      ),
    }).isRequired,
  };

  state = {
    roles: [],
    invite: '',
  };

  async componentDidMount() {
    const { getMembersRequest } = this.props;
    getMembersRequest();

    const response = await api.get('roles');

    this.setState({
      roles: response.data,
    });
  }

  handleSelectedRoles = (id, roles) => {
    const { setUpdateMemberRequest } = this.props;
    setUpdateMemberRequest(id, roles);
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleInviteSubmit = (e) => {
    e.preventDefault();

    const { setInviteMemberRequest } = this.props;
    const { invite } = this.state;

    setInviteMemberRequest(invite);
  };

  render() {
    const { setMembersModalClose, member } = this.props;
    const { roles, invite } = this.state;
    return (
      <Modal size="big">
        <h1>Membros</h1>

        <Can checkPermission="invites_create">
          <Invite onSubmit={this.handleInviteSubmit}>
            <input
              name="invite"
              placeholder="Convidar para o time"
              value={invite}
              onChange={this.handleInputChange}
            />
            <Button type="submit"> Enviar </Button>
          </Invite>
        </Can>
        <form>
          <MembersList>
            {member.data.map(m => (
              <Member key={m.id}>
                <strong>{m.user.name}</strong>
                <Can checkRole="administrator">
                  {can => (
                    <Select
                      isMulti
                      isDisabled={!can}
                      value={m.roles}
                      options={roles}
                      placeholder="Selecione uma permissão"
                      getOptionLabel={role => role.name}
                      getOptionValue={role => role.id}
                      onChange={value => this.handleSelectedRoles(m.id, value)}
                    />
                  )}
                </Can>
              </Member>
            ))}
          </MembersList>

          <Button onClick={setMembersModalClose} filled={false} color="gray">
            Fechar
          </Button>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  member: state.member,
});

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);
