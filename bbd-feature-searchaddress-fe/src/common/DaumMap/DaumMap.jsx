import React, { Component } from "react";
import { number } from "prop-types";

import DaumMapAPI from "./DaumMapAPI";

import "./DaumMap.scss";

class DaumMap extends Component {
  static propTypes = {
    longitude: number.isRequired,
    latitude: number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      scriptLoaded: false
    };

    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.mapGenerator = this.mapGenerator.bind(this);
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }

  // http://apis.map.daum.net/web/guide/#step3
  mapGenerator(el) {
    const { daum } = window;
    const { longitude, latitude } = this.props;

    // 지도를 생성할 때 필요한 기본 옵션
    const options = {
      center: new daum.maps.LatLng(longitude, latitude), // 지도의 중심좌표.
      level: 3 // 지도의 레벨(확대, 축소 정도)
    };

    /* eslint-disable no-unused-vars */
    const map = new daum.maps.Map(el, options);
  }

  render() {
    const { scriptLoaded } = this.state;

    return (
      <div className="map-wrapper">
        {scriptLoaded && <div id="map" ref={this.mapGenerator} />}
        <DaumMapAPI handleScriptLoad={this.handleScriptLoad} />
      </div>
    );
  }
}

export default DaumMap;
