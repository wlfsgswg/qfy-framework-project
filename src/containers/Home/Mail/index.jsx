import React from "react";

class Mail extends React.Component {
  componentDidMount() {
    Request.post(`/qfypc/dept/data`).then((res) => {
      console.log(res);
    });
  }
  render() {
    return <div>111</div>;
  }
}

export default Mail;
