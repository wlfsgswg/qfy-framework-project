import React from "react";
import { classPrefix } from "./../../../const";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.less";
import { Row, Col, Button, Spin } from "antd";
import { FixMenu, Title } from "./../../../components";
import { handleGetIframe } from "./../../../utils";
const colSpan = 8;
class Work extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.handleGetOrginData();
  }

  // 原始信息
  handleGetOrginData = () => {
    this.setState({ loading: true });
    Request.post(`/work/home`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            data:
              res.data && res.data.data && res.data.data
                ? res.data && res.data.data && res.data.data
                : [],
            loading: false,
          });
        }
      })
      .catch(() => this.setState({ loading: false }));
  };

  handleBintang = (e) => {
    const { addMenu, changeFocus } = this.props;
    Request.post(`/work/getAppUrl`, { appId: e.appId }).then((res) => {
      addMenu({ title: e.appName, focus: e.appId });
      changeFocus(e.appId);
      handleGetIframe(res.data.data, e.appName, e.appId);
    });
  };

  render() {
    const { data, loading } = this.state;
    const { myFocus } = this.props;
    return (
      <div className={`${classPrefix}-home-work`}>
        <div className={`${classPrefix}-home-work-content`}>
          <FixMenu onRefresh={() => this.handleGetOrginData()} />
          {myFocus === 1 && (
            <div className={`${classPrefix}-home-work-content-work`}>
              <div className="item">
                <Title>基础应用</Title>
                <Spin spinning={loading}>
                  {data.bApps ? (
                    <Row>
                      {data.bApps.length !== 0 &&
                        data.bApps.map((it) => {
                          return (
                            <Col span={colSpan} key={it.appId}>
                              <div className="clearfix app2-item">
                                <div
                                  className="l-left app2-item-img"
                                  onClick={() => this.handleBintang(it)}
                                >
                                  ICON
                                </div>
                                <div className="l-left app2-item-text p-l-10">
                                  {it.appName}
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                    </Row>
                  ) : (
                    <div style={{ height: "80px" }}></div>
                  )}
                </Spin>
              </div>
              <div className="diver"></div>
              <div className="item">
                <div className="p-t-20">
                  <Title>应用中心</Title>
                </div>
                <Spin spinning={loading}>
                  {data.mApps ? (
                    <Row>
                      {data.mApps.length !== 0 &&
                        data.mApps.map((it) => {
                          return (
                            <Col span={colSpan} key={it.appId}>
                              <div className="clearfix app-item">
                                <div className="l-left m-r-10 app-item-img">
                                  <img src={it.appImg} alt="图片出错" />
                                </div>
                                <div className="l-left app-item-text">
                                  <div className=" app-item-text-title">
                                    {it.appName}
                                  </div>
                                  <div
                                    className="app-item-text-desc line-2"
                                    title={it.appDesc}
                                  >
                                    {it.appDesc}
                                  </div>
                                  {it.isLogin && (
                                    <div>
                                      <Button type="primary">进入应用</Button>
                                    </div>
                                  )}
                                  {it.acctState && (
                                    <div>
                                      <Button disabled={true}>
                                        {it.acctState === 1
                                          ? "未激活"
                                          : it.acctState === 3
                                          ? "已到期"
                                          : it.acctState === 4
                                          ? "已停用"
                                          : it.acctState === 5
                                          ? "已冻结"
                                          : "--"}
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                    </Row>
                  ) : (
                    <div style={{ height: "255px" }}></div>
                  )}
                </Spin>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Work.propTypes = {
  addMenu: PropTypes.func,
  changeFocus: PropTypes.func,
  menu: PropTypes.array,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
    myFocus: state.focus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMenu: (e) => {
      dispatch({ type: "ADD-MENU", data: e });
    },
    changeFocus: (e) => {
      dispatch({ type: "CHANGE-FOCUS", focus: e });
    },
  };
};

const WorkStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Work));

export default WorkStore;
