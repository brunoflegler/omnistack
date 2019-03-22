import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ProjectsActions from '../../store/ducks/projects';
import MembersActions from '../../store/ducks/members';

import { Container, Project } from './styles';

import Button from '../../styles/components/Button';
import Modal from '../Modal';
import Members from '../Members';
import Can from '../Can';

class Projects extends Component {
  static propTypes = {
    teamActive: PropTypes.shape({
      name: PropTypes.string,
    }),
    project: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }).isRequired,
    member: PropTypes.shape({
      modal: PropTypes.bool,
    }).isRequired,
    getProjectsRequest: PropTypes.func.isRequired,
    setProjectModalOpen: PropTypes.func.isRequired,
    setProjectModalClose: PropTypes.func.isRequired,
    postNewProjectRequest: PropTypes.func.isRequired,
    setMembersModalOpen: PropTypes.func.isRequired,
  };

  static defaultProps = {
    teamActive: null,
  };

  state = {
    newProject: '',
  };

  componentDidMount() {
    const { teamActive, getProjectsRequest } = this.props;

    if (teamActive) {
      getProjectsRequest();
    }
  }

  handleNewProject = () => {
    const { setProjectModalOpen } = this.props;

    this.setState({
      newProject: '',
    });

    setProjectModalOpen();
  };

  handleListMembers = () => {
    const { setMembersModalOpen } = this.props;
    setMembersModalOpen();
  };

  handleInputOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitNewProject = (e) => {
    e.preventDefault();

    const { newProject } = this.state;
    const { postNewProjectRequest } = this.props;

    if (!newProject) return;

    postNewProjectRequest(newProject);
  };

  render() {
    const {
      teamActive, project, setProjectModalClose, member,
    } = this.props;
    const { newProject } = this.state;

    if (!teamActive) return null;

    return (
      <Container>
        <header>
          <h1>{teamActive.name}</h1>
          <div>
            <Can checkPermission="projects_create">
              <Button onClick={this.handleNewProject}>+ Novo</Button>
            </Can>
            <Button onClick={this.handleListMembers}>Membros</Button>
          </div>
        </header>

        {project.data.map(p => (
          <Project key={p.id}>
            <p>{p.title}</p>
          </Project>
        ))}

        {project.modal && (
          <Modal>
            <h1>Criar Projeto</h1>
            <form onSubmit={this.handleSubmitNewProject}>
              <span>Título:</span>
              <input
                autoComplete="off"
                value={newProject}
                name="newProject"
                onChange={this.handleInputOnchange}
              />

              <Button type="submit" size="big">
                Salvar
              </Button>
              <Button onClick={setProjectModalClose} size="small" color="gray">
                Cancelar
              </Button>
            </form>
          </Modal>
        )}

        {member.modal && <Members />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  teamActive: state.team.teamActive,
  project: state.project,
  member: state.member,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...ProjectsActions,
    ...MembersActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);
