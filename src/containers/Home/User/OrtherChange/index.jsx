import React from "react";
import { classPrefix } from "./../../../../const";
import PropTypes from "prop-types";
import {
  Form,
  Row,
  Col,
  Cascader,
  Button,
  Radio,
  DatePicker,
  Modal,
  message,
} from "antd";
import "./index.less";
import areaOptions from "./../area";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";

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
    const { birthday, region, sex } = e;
    const data = {};
    if (birthday) data.birthday = moment(birthday).format("YYYY-MM-DD");
    if (region && region.length !== 0) data.region = region;
    if (sex) data.sex = sex;
    // 请求
    this.setState({ loading: true });
    Request.post(`/aAcct/updOInfo`, data)
      .then((res) => {
        if (res.data.code === "00000") {
          const { onSuccess } = this.props;
          this.setState({ loading: false });
          onSuccess({ ...data });
          message.success("修改成功");
        }
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { loading } = this.state;
    const { data } = this.props;
    data.birthday = data.birthday ? moment(data.birthday) : null;
    return (
      <div className={`${classPrefix}-home-user-orther-change`}>
        <div className={`${classPrefix}-home-user-orther-change-content`}>
          <Form
            {...layout}
            name="bind-mail-dialog"
            initialValues={data}
            onFinish={this.onFinish}
          >
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
                <Form.Item label="生日" name="birthday">
                  <DatePicker placeholder="请选择" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={spanCol}>
                <Form.Item label="地区" name="region">
                  <Cascader options={areaOptions} />
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
                    <Button
                      onClick={() =>
                        Modal.confirm({
                          title: "提示",
                          icon: <ExclamationCircleOutlined />,
                          content: "信息还未保存，是否返回？",
                          okText: "确认",
                          cancelText: "取消",
                          onOk: () => {
                            this.props.onCancel();
                          },
                        })
                      }
                    >
                      取消
                    </Button>
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
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default OrtherChange;
