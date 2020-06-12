import React from "react";
import { classPrefix } from "./../../../const";
import { Title, MyIcon } from "./../../../components";
import { Row, Col, Spin } from "antd";
import "./index.less";
import * as HeadChangeDialog from "./HeadChangeDialog";
import * as AttestationDialog from "./AttestationDialog";
import * as BindMailDialog from "./BindMailDialog";
import * as UnboundMailDialog from "./UnboundMailDialog";
import * as SettingPhoneDialog from "./SettingPhoneDialog";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingTop: false,
      loadingBottom: false,
      detail: {
        isRealName: "",
        txLen: 0,
        balancePers: 0,
        jobName: "",
        deptName: "",
        email: "",
        phone: "",
        nickName: "",
        headImg: "",
        sex: "",
        birthday: "",
        region: "",
      },
    };
  }

  componentDidMount() {
    this.handleGetUserDetail();
    this.handleGetUserOrtherDetail();
  }
  // 获取用户基本资料
  handleGetUserDetail = () => {
    this.setState({ loadingTop: true });
    Request.post(`/aAcct/bInfo`)
      .then((res) => {
        const { detail } = this.state;
        const data = res.data && res.data.data && res.data.data;
        for (let i in data) {
          if (data[i] !== undefined && data[i] !== null) {
            detail[i] = data[i];
          }
        }
        this.setState({ detail, loadingTop: false });
      })
      .catch(() => {
        this.setState({ loadingTop: false });
      });
  };
  // 获取用户其他资料
  handleGetUserOrtherDetail = () => {
    this.setState({ loadingBottom: true });
    Request.post(`/aAcct/oInfo`)
      .then((res) => {
        const { detail } = this.state;
        const data = res.data && res.data.data && res.data.data;
        for (let i in data) {
          if (data[i] !== undefined && data[i] !== null) {
            detail[i] = data[i];
          }
        }
        this.setState({ detail, loadingBottom: false });
      })
      .catch(() => {
        this.setState({ loadingBottom: false });
      });
  };
  // 修改头像
  handleChangeHead = () => {
    HeadChangeDialog.open({
      data: {},
      onSuccess: () => {},
    });
  };
  // 立即认证
  handleAttestation = () => {
    AttestationDialog.open({
      data: {},
      onSuccess: () => {},
    });
  };
  // 绑定邮箱
  handleBindMail = () => {
    BindMailDialog.open({
      data: {},
      onSuccess: () => {},
    });
  };
  // 解绑邮箱
  handleUnMail = () => {
    UnboundMailDialog.open({
      data: {},
      onSuccess: () => {},
    });
  };
  // 设置手机号
  handleSetPhone = () => {
    SettingPhoneDialog.open({
      data: {},
      onSuccess: () => {},
    });
  };
  render() {
    const { detail, loadingTop } = this.state;
    return (
      <div className={`${classPrefix}-home-user`}>
        <div className={`${classPrefix}-home-user-content`}>
          <Title>个人信息</Title>
          <div className={`${classPrefix}-home-user-content-top`}>
            <Spin spinning={loadingTop}>
              {detail.nickName ? (
                <div className="content clearfix">
                  <div className="l-left content-left">
                    <div className="content-left-img">
                      <div
                        className="content-left-img-pos"
                        onClick={this.handleChangeHead}
                      >
                        修改头像
                      </div>
                      {detail.headImg ? (
                        <img src={detail.headImg} alt="" />
                      ) : (
                        <div className="content-left-font">
                          {detail.nickName &&
                            (detail.nickName.length > 2
                              ? detail.nickName.substring(
                                  detail.nickName.length - 2
                                )
                              : detail.nickName)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="l-left content-right">
                    <div className="clearfix content-right-top">
                      <div className="l-left p-r-10 name">
                        {detail.nickName}
                      </div>
                      <div className="l-left status">
                        {detail.isRealName && detail.isRealName ? (
                          <div className="status-yes">已实名</div>
                        ) : (
                          <div
                            className="status-no suc pointer"
                            onClick={this.handleAttestation}
                          >
                            立即认证
                          </div>
                        )}
                      </div>
                    </div>
                    <Row>
                      <Col span={8}>
                        <div className="content-right-item">
                          <div className="content-right-item-list clearfix">
                            <div className="l-left p-r-10 list-labal">
                              手机号：
                            </div>
                            <div className="l-left list-value">
                              {detail.phone && detail.phone
                                ? detail.phone
                                : "--"}
                            </div>
                            <div className="l-left m-l-10">
                              <MyIcon
                                type="iconbianji"
                                className="pointer"
                                onClick={this.handleSetPhone}
                              />
                            </div>
                          </div>
                          <div className="content-right-item-list clearfix">
                            <div className="l-left p-r-10 list-labal">
                              所属部门：
                            </div>
                            <div className="l-left list-value">
                              {detail.deptName && detail.deptName
                                ? detail.deptName
                                : "--"}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="content-right-item">
                          <div className="content-right-item-list clearfix">
                            <div className="l-left p-r-10 list-labal list-labal2">
                              邮箱：
                            </div>
                            <div className="l-left list-value">
                              {detail.email && detail.email ? (
                                <span>
                                  <span>{detail.email}</span>
                                  <span
                                    className="m-l-20 suc pointer"
                                    onClick={this.handleUnMail}
                                  >
                                    解绑
                                  </span>
                                </span>
                              ) : (
                                <span
                                  className="pointer suc"
                                  onClick={this.handleBindMail}
                                >
                                  绑定邮箱
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="content-right-item-list clearfix">
                            <div className="l-left p-r-10 list-labal list-labal2">
                              岗位：
                            </div>
                            <div className="l-left list-value">
                              {detail.jobName && detail.jobName
                                ? detail.jobName
                                : "--"}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="content-right-item">
                          <div className="content-right-item-list clearfix">
                            <div className="l-left p-r-10 list-labal">
                              蜂豆余额：
                            </div>
                            <div className="l-left list-value">
                              <span className="red">
                                {detail.txLen && detail.txLen}
                              </span>
                              个
                            </div>
                          </div>
                          <div className="content-right-item-list clearfix">
                            <div className="l-left p-r-10 list-labal">
                              钱包余额：
                            </div>
                            <div className="l-left list-value">
                              <span className="red">
                                {detail.balancePers && detail.balancePers}
                              </span>
                              元
                            </div>
                            <div className="l-left m-l-20 suc pointer">
                              明细
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              ) : (
                <div className="content2"></div>
              )}
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
