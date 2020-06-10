import React from "react";

class Mail extends React.Component {
  componentDidMount() {
    Request.post(`/dept/data`).then((res) => {
      console.log(res);
    });
  }
  render() {
    return <div>通讯录</div>;
  }
}

export default Mail;
