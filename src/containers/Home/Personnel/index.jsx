import React from "react";
import { classPrefix } from "./../../../const";
import "./index.less";
class Personnel extends React.Component {
  render() {
    return (
      <div className={`${classPrefix}-home-personnel`}>
        <div className={`${classPrefix}-home-personnel-content`}>personnel</div>
      </div>
    );
  }
}

export default Personnel;
