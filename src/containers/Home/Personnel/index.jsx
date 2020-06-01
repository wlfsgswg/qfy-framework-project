import React from "react";
import { classPrefix } from "./../../../const";
import "./index.less";
import { MyIframe } from "./../../../components";
class Personnel extends React.Component {
  render() {
    return (
      <div className={`${classPrefix}-home-personnel`}>
        <div className={`${classPrefix}-home-personnel-content`}>
          <MyIframe src="http://www.baidu.com" />
        </div>
      </div>
    );
  }
}

export default Personnel;
