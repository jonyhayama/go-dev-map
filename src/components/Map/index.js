import React, { Component, Fragment } from 'react';
import MapGL, { Marker } from 'react-map-gl';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as DevActions } from '../../store/ducks/devs';

import { Modal, ModalForm, ModalFormActions } from './styles';

import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14,
    },
    modalIsOpened: false,
    formData: {
      user: '',
      latitude: 0,
      longitude: 0,
    },
  };

  static propTypes = {
    addDevRequest: PropTypes.func.isRequired,
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

  componentDidMount() {
    window.addEventListener('resize', this.resizeMap);
    this.resizeMap();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeMap);
  }

  resizeMap = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  openModal = () => {
    this.setState({ modalIsOpened: true });
  };

  closeModal = () => {
    const { formData } = this.state;
    this.setState({ modalIsOpened: false, formData: { ...formData, user: '' } });
  };

  handleMapClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    const { formData } = this.state;
    this.setState({ formData: { ...formData, latitude, longitude } });
    this.openModal();
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { addDevRequest } = this.props;
    const { formData } = this.state;
    addDevRequest(formData);
    this.closeModal();
  };

  render() {
    const { viewport: stateViewport, modalIsOpened, formData } = this.state;
    const { devs } = this.props;
    return (
      <Fragment>
        <Modal className={modalIsOpened ? 'opened' : 'closed'}>
          <ModalForm onSubmit={this.handleFormSubmit}>
            <h3>Add new user</h3>
            <input
              type="text"
              placeholder="Github User"
              onChange={e => this.setState({ formData: { ...formData, user: e.target.value } })}
              value={formData.user}
              required
            />
            <ModalFormActions>
              <button type="button" onClick={() => this.closeModal()}>
                Cancel
              </button>
              <button type="submit">OK</button>
            </ModalFormActions>
          </ModalForm>
        </Modal>

        <MapGL
          {...stateViewport}
          onClick={this.handleMapClick}
          mapStyle="mapbox://styles/mapbox/basic-v9"
          mapboxApiAccessToken="pk.eyJ1Ijoiam9ueWhheWFtYSIsImEiOiJjanRlMnlxbXIwamtuM3lwN2V2anloM2x3In0.rz7donSZH-nkkB4e769Yqw"
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {devs.data.map(dev => (
            <Marker
              key={dev.id}
              latitude={dev.latitude}
              longitude={dev.longitude}
              onClick={this.handleMapClick}
              captureClick
            >
              <img
                style={{
                  borderRadius: 100,
                  width: 48,
                  height: 48,
                }}
                src={dev.avatar}
                alt="DevMap"
              />
            </Marker>
          ))}
        </MapGL>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  devs: state.devs,
});

const mapDispatchToProps = dispatch => bindActionCreators(DevActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
