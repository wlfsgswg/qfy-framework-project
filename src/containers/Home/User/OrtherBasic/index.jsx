import React from "react";
import { classPrefix } from "./../../../../const";
import "./index.less";
import PropTypes from "prop-types";

class OrtherBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={`${classPrefix}-home-user-orther-basic`}>
        <div className={`${classPrefix}-home-user-orther-basic-content`}></div>
      </div>
    );
  }
}

OrtherBasic.propTypes = {
  data: PropTypes.object,
};

export default OrtherBasic;
