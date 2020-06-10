import React from "react";
import { classPrefix } from "./../../../const";
import "./index.less";
class Message extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className={`${classPrefix}-home-message`}>
        <div className={`${classPrefix}-home-message-content`}>消息</div>
      </div>
    );
  }
}

export default Message;
