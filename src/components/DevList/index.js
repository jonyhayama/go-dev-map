import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as DevActions } from '../../store/ducks/devs';

import { Container, UserInfo } from './styles';

const DevList = ({ devs, removeDevRequest }) => (
  <Container className={devs.data.length === 0 ? 'empty' : ''}>
    <ul>
      {devs.data.map(dev => (
        <li key={dev.id}>
          <img src={dev.avatar} alt="User Avatar" />
          <UserInfo>
            <strong>{dev.name}</strong>
            {dev.login}
          </UserInfo>
          <button type="button" onClick={() => removeDevRequest(dev.id)}>
            <i className="fas fa-times-circle" />
          </button>
        </li>
      ))}
    </ul>
  </Container>
);

DevList.propTypes = {
  removeDevRequest: PropTypes.func.isRequired,
  devs: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
    error: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  devs: state.devs,
});

const mapDispatchToProps = dispatch => bindActionCreators(DevActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevList);
