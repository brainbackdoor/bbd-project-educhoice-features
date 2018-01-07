import React from "react";
import { func } from "prop-types";
import Script from "react-load-script";

const apiKey = "[Put In Your Kakao App Key]";
const url = `http://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;

const DaumMapAPI = ({
  handleScriptCreate,
  handleScriptError,
  handleScriptLoad
}) => (
  <Script
    url={url}
    onCreate={handleScriptCreate}
    onError={handleScriptError}
    onLoad={handleScriptLoad}
  />
);

DaumMapAPI.propTypes = {
  handleScriptCreate: func,
  handleScriptError: func,
  handleScriptLoad: func.isRequired
};

DaumMapAPI.defaultProps = {
  handleScriptCreate: () => {},
  handleScriptError: () => {}
};

export default DaumMapAPI;
