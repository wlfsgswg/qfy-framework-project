import React from "react";
import { classPrefix } from "./../../../../const";
import { Row, Col } from "antd";
import "./index.less";
import PropTypes from "prop-types";
const spanCol = 12;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};
class OrtherBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <div className={`${classPrefix}-home-user-orther-basic`}>
        <div className={`${classPrefix}-home-user-orther-basic-content`}>
          <Row>
            <Col span={spanCol}>
              <div className="content-item">
                <Row>
                  <Col span={layout.labelCol.span}>
                    <div className="content-item-left">性别：</div>
                  </Col>
                  <Col span={layout.wrapperCol.span}>
                    {data.sex ? data.sex : "--"}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={spanCol}>
              <div className="content-item">
                <Row>
                  <Col span={layout.labelCol.span}>
                    <div className="content-item-left">生日：</div>
                  </Col>
                  <Col span={layout.wrapperCol.span}>
                    {data.birthday ? data.birthday : "--"}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={spanCol}>
              <div className="content-item">
                <Row>
                  <Col span={layout.labelCol.span}>
                    <div className="content-item-left">地区：</div>
                  </Col>
                  <Col span={layout.wrapperCol.span}>
                    {data.region ? data.region : "--"}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

OrtherBasic.propTypes = {
  data: PropTypes.object,
};

export default OrtherBasic;
