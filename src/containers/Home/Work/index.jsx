import React from "react";
import { classPrefix } from "./../../../const";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.less";
import { Row, Col } from "antd";
import { FixMenu } from "./../../../components";
import { handleGetIframe } from "./../../../utils";
const colSpan = 8;
class Work extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    Request.post(`/work/home`).then((res) => {
      if (res.status === 200) {
        this.setState({
          data:
            res.data && res.data.data && res.data.data
              ? res.data && res.data.data && res.data.data
              : [],
        });
      }
    });
  }

  handleBintang = (e) => {
    const { addMenu, changeFocus } = this.props;
    Request.post(`/work/getAppUrl`, { appId: e.appId }).then((res) => {
      addMenu({ title: e.appName, focus: e.appId });
      changeFocus(e.appId);
      handleGetIframe(res.data.data, e.appName, e.appId);
    });
  };

  render() {
    const { data } = this.state;
    const { myFocus } = this.props;
    return (
      <div className={`${classPrefix}-home-work`}>
        <div className={`${classPrefix}-home-work-content`}>
          <FixMenu />
          {myFocus === 1 && (
            <div className={`${classPrefix}-home-work-content-work`}>
              <div className="title">基础应用</div>
              <Row>
                {data.bApps &&
                  data.bApps.length !== 0 &&
                  data.bApps.map((it) => {
                    return (
                      <Col span={colSpan} key={it.appId}>
                        <div
                          className="clearfix app2-item"
                          onClick={() => this.handleBintang(it)}
                        >
                          <div className="l-left app2-item-img">ICON</div>
                          <div className="l-left app2-item-text p-l-10">
                            {it.appName}
                          </div>
                        </div>
                      </Col>
                    );
                  })}
              </Row>
              <div className="title">应用中心</div>
              <Row>
                {data.mApps &&
                  data.mApps.length !== 0 &&
                  data.mApps.map((it) => {
                    return (
                      <Col span={colSpan} key={it.appId}>
                        <div className="clearfix app-item">
                          <div className="l-left m-r-10 app-item-img">
                            {/* <img src={it.appImg} alt="图片出错" /> */}
                            <img
                              src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1068497470,486042733&fm=26&gp=0.jpg"
                              alt="图片出错"
                            />
                          </div>
                          <div className="l-left app-item-text">
                            <div className=" app-item-text-title">
                              {it.appName}
                            </div>
                            <div className="app-item-text-desc">
                              {it.appDesc}
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
              </Row>
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
