import React from "react";
import { classPrefix } from "./../../../const";
import "./index.less";
import { MyIframe } from "./../../../components";
class Personnel extends React.Component {
  render() {
    return (
      <div className={`${classPrefix}-home-personnel`}>
        <div className={`${classPrefix}-home-personnel-content`}>
          <MyIframe src="http://192.168.1.9:9024/main#/" title="智能人事" />
        </div>
      </div>
    );
  }
}

export default Personnel;
