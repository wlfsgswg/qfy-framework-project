import React from "react";
import { classPrefix } from "./../../../const";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.less";
import { Row, Col } from "antd";
const colSpan = 8;
class Work extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    Request.post(`/qfypc/work/home`).then((res) => {
      if (res.status === 200) {
        this.setState({
          data: res.data && res.data.data && res.data.data,
        });
      }
    });
  }

  render() {
    const { data } = this.state;
    // const { history, addMenu, changeFocus } = this.props;
    console.log(data.mApps);
    return (
      <div className={`${classPrefix}-home-work`}>
        <div className={`${classPrefix}-home-work-content`}>
          <div className="title">基础应用</div>
          {data.bApps &&
            data.bApps.length !== 0 &&
            data.bApps.map((it) => {
              return <div key={it.appId}>{it.appName}</div>;
            })}
          <div className="title">应用中心</div>
          <Row>
            {data.mApps &&
              data.mApps.length !== 0 &&
              data.mApps.map((it) => {
                return (
                  <Col span={colSpan} key={it.appId}>
                    <div className="clearfix app-item">
                      <div className="l-left m-r-20 app-item-img">
                        {/* <img src={it.appImg} alt="图片出错" /> */}
                        <img
                          src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1068497470,486042733&fm=26&gp=0.jpg"
                          alt="图片出错"
                        />
                      </div>
                      <div className="l-left app-item-text">
                        <div className=" app-item-text-title">{it.appName}</div>
                        <div className="app-item-text-desc">{it.appDesc}</div>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
          {/* <div className="top clearfix">
            <div className="l-left p-r-30">
              <Link to={"/#"}>慧云名片</Link>
            </div>
            <div className="l-left p-r-30">
              <div
                onClick={() => {
                  history.push("/personnel");
                  addMenu({ title: "智能人事", link: "/personnel", focus: 5 });
                  changeFocus(5);
                }}
              >
                智能人事
              </div>
            </div>
            <div className="l-left">虚拟号码管家</div>
          </div>
        */}
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
