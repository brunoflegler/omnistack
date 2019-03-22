import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AuthActions from '../../../store/ducks/auth';
import { Container, Form } from '../styles';
import Button from '../../../styles/components/Button';

class SignUp extends Component {
  static propTypes = {
    signUpRequest: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    email: '',
    password: '',
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;
    const { signUpRequest } = this.props;

    if (!(email || password || name)) return;

    signUpRequest(name, email, password);
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h1>Boas Vindas</h1>

          <span>Nome:</span>
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
          />

          <span>E-Mail:</span>
          <input
            autoComplete="off"
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />

          <span>Senha:</span>
          <input
            autoComplete="new-password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />

          <Button type="submit" size="big">
            Entrar
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
