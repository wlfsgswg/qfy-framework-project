import React from "react";
import { Layout } from "antd";
import { classPrefix } from "./../../../const";
import "./index.less";
import { Tree, Spin } from "antd";
import { Table } from "./../../../components";
import ImgFilesNo from "./../../../public/images/roster-files-no.jpg";
import MailNo from "./../../../public/images/mail-no.png";
const { Sider, Content } = Layout;
class Mail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableObj: {
        pageSize: 10,
        page: 1,
        totalRecord: "",
      },
      list: [],
      loading: false,
      id: "",
    };
  }
  componentDidMount() {
    Request.post(`/dept/data`).then((res) => {
      if (res.status === 200) {
        const data =
          res.data && res.data.data && res.data.data.length && res.data.data[0];
        this.setState({ data: [data] });
      }
    });
  }

  handleData = (e = []) => {
    if (e.length !== 0) {
      e.map((it) => {
        it.title = it.deptName;
        it.key = it.deptId;
        if (it.children && it.children.length !== 0)
          this.handleData(it.children);
      });
    }
    return e;
  };
  onSelect = (e) => {
    this.setState({ id: e[0] }, () => this.handleGetTableList());
  };

  // 默认请求列表
  handleGetTableList = () => {
    const { tableObj, id } = this.state;
    this.setState({ loading: true });
    Request.post(`/aeAcct/list`, {
      ...tableObj,
      deptId: id,
    })
      .then((res) => {
        if (res.status === 200) {
          res.data.data.list.map((it, i) => (it.key = i));
          this.setState({
            list: res.data.data.list,
            loading: false,
            tableObj: {
              ...tableObj,
              totalRecord: res.data.data.page.dataTotal,
            },
          });
        }
      })
      .catch(() => this.setState({ loading: false }));
  };
  render() {
    const { data, loading, list, tableObj } = this.state;
    const treeData = this.handleData(data);
    const columns = [
      {
        title: "姓名",
        dataIndex: "qfyAcctName",
        key: "qfyAcctName",
        width: 120,
      },
      {
        title: "手机号",
        dataIndex: "qfyAcct",
        key: "qfyAcct",
        width: 150,
        render: (text) => {
          return <div>{text ? text : "--"}</div>;
        },
      },
      {
        title: "职务",
        dataIndex: "deptName",
        key: "deptName",
        width: 130,
        render: (text) => {
          return <div>{text ? text : "--"}</div>;
        },
      },
    ];
    return (
      <div className={`${classPrefix}-home-mail`}>
        <div className={`${classPrefix}-home-mail-content`}>
          <Layout className="layout-mail">
            <Sider className="layout-mail-sider">
              <div className={`${classPrefix}-home-mail-content-sider`}>
                {data.length !== 0 ? (
                  <Tree
                    defaultExpandAll={true}
                    onSelect={this.onSelect}
                    treeData={treeData}
                  />
                ) : (
                  <div className="content-sider-content">
                    <img src={ImgFilesNo} alt="" />
                    <p className="c999">你还未加入任何企业</p>
                  </div>
                )}
              </div>
            </Sider>
            <Content className="layout-mail-content">
              <div className={`${classPrefix}-home-mail-content-content`}>
                <Spin spinning={loading}>
                  {list.length !== 0 ? (
                    <Table
                      columns={columns}
                      list={list}
                      tableObj={tableObj}
                      current={(e) => {
                        this.setState(
                          {
                            tableObj: {
                              ...tableObj,
                              page: e.current,
                              pageSize: e.pageSize,
                            },
                          },
                          () => this.handleGetTableList()
                        );
                      }}
                    />
                  ) : (
                    <div className="content-no">
                      <img src={MailNo} alt="" />
                      <p className="c999">暂无联系人</p>
                    </div>
                  )}
                </Spin>
              </div>
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

export default Mail;
