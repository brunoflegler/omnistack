import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import TeamsActions from '../../store/ducks/teams';
import AuthActions from '../../store/ducks/auth';

import {
  Container, TeamList, Team, NewTeam, Logout,
} from './styles';
import Modal from '../Modal';
import Button from '../../styles/components/Button';

class TeamSwitcher extends Component {
  static propTypes = {
    getTeamsRequest: PropTypes.func.isRequired,
    setTeamActive: PropTypes.func.isRequired,
    setTeamModalOpen: PropTypes.func.isRequired,
    setTeamModalClose: PropTypes.func.isRequired,
    postNewTeamRequest: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    teamActive: PropTypes.shape({
      id: PropTypes.number,
    }),
    team: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  static defaultProps = {
    teamActive: null,
  };

  state = {
    newTeam: '',
  };

  componentDidMount() {
    const { getTeamsRequest } = this.props;
    getTeamsRequest();
  }

  handleTeamSelect = (team) => {
    const { setTeamActive } = this.props;
    setTeamActive(team);
  };

  handleInputOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitNewTeam = (e) => {
    e.preventDefault();

    const { newTeam } = this.state;
    const { postNewTeamRequest } = this.props;

    if (!newTeam) return;

    postNewTeamRequest(newTeam);
  };

  handleNewTeam = () => {
    const { setTeamModalOpen } = this.props;

    this.setState({
      newTeam: '',
    });

    setTeamModalOpen();
  };

  handleLogout = () => {
    const { signOut } = this.props;

    signOut();
  };

  render() {
    const { team, teamActive, setTeamModalClose } = this.props;
    const { newTeam } = this.state;

    return (
      <Container>
        <TeamList>
          {team.data.map(t => (
            <Team key={t.id} onClick={() => this.handleTeamSelect(t)}>
              <img
                alt="rocketseat"
                src={`https://ui-avatars.com/api/?font-size=0.33&background=${
                  teamActive && t.id === teamActive.id ? '3E316A' : '7159c1'
                }&color=fff&name=${t.name}`}
              />
            </Team>
          ))}
          <NewTeam onClick={this.handleNewTeam}>Novo</NewTeam>
          {team.modal && (
            <Modal>
              <h1>Criar Time</h1>
              <form onSubmit={this.handleSubmitNewTeam}>
                <span>Nome:</span>
                <input
                  autoComplete="off"
                  name="newTeam"
                  value={newTeam}
                  onChange={this.handleInputOnchange}
                />

                <Button type="submit" size="big">
                  Salvar
                </Button>
                <Button onClick={setTeamModalClose} size="small" color="gray">
                  Cancelar
                </Button>
              </form>
            </Modal>
          )}
        </TeamList>
        <Logout onClick={this.handleLogout}> Sair </Logout>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  team: state.team,
  teamActive: state.team.teamActive,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...TeamsActions,
    ...AuthActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamSwitcher);
