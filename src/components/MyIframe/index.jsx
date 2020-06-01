import React from "react";
import { classPrefix } from "../../const";
import PropTypes from "prop-types";
import "./index.less";
class MyIframe extends React.Component {
  render() {
    const { src, className, ...rest } = this.props;
    return (
      <div className={`${classPrefix}-component-iframe`}>
        <div className={`${classPrefix}-component-iframe-content`}>
          <iframe
            id="my-iframe"
            className={`${className} iframe-content`}
            src={src}
            {...rest}
          ></iframe>
          {/* <div className="iframe-content"></div> */}
        </div>
      </div>
    );
  }
}

MyIframe.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
};

export default MyIframe;
