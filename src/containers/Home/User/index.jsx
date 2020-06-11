import React from "react";
import { classPrefix } from "./../../../const";
import { Title } from "./../../../components";
import "./index.less";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      detail: {},
    };
  }

  componentDidMount() {
    console.log(111);
    this.handleGetUserDetail();
  }

  handleGetUserDetail = () => {
    Request.post(`/aAcct/bInfo`).then((res) => {
      console.log(res.data, res.data.data);
    });
  };
  render() {
    return (
      <div className={`${classPrefix}-home-user`}>
        <div className={`${classPrefix}-home-user-content`}>
          <Title>个人信息</Title>
          <div className={`${classPrefix}-home-user-content-top`}></div>
        </div>
      </div>
    );
  }
}

export default User;
