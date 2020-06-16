import React from "react";
import { classPrefix } from "./../../../../const";
import PropTypes from "prop-types";
import { Form, Row, Col, Cascader, Button, Radio, DatePicker } from "antd";
import "./index.less";
import areaOptions from "./../area";
const spanCol = 12;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};
class OrtherChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onFinish = (e) => {
    console.log(e);
  };

  render() {
    const { loading } = this.state;
    const { data } = this.props;
    console.log(data);
    return (
      <div className={`${classPrefix}-home-user-orther-change`}>
        <div className={`${classPrefix}-home-user-orther-change-content`}>
          <Form {...layout} name="bind-mail-dialog" onFinish={this.onFinish}>
            <Row>
              <Col span={spanCol}>
                <Form.Item label="性别" name="sex">
                  <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={spanCol}>
                <Form.Item label="地区" name="region">
                  <Cascader options={areaOptions} />
                </Form.Item>
              </Col>
              <Col span={spanCol}>
                <Form.Item label="生日" name="birthday">
                  <DatePicker placeholder="请选择" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div className="clearfix">
                  <div className="r-right ">
                    <Button type="primary" htmlType="submit" loading={loading}>
                      保存
                    </Button>
                  </div>
                  <div className="r-right p-r-10">
                    <Button>取消</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

OrtherChange.propTypes = {
  data: PropTypes.object,
};

export default OrtherChange;