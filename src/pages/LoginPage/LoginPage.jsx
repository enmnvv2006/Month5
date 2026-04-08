import { Card, Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth.slice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    dispatch(loginUser(values));
  };

  return (
    <Card title="Login" style={{ width: 400, margin: "100px auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name={"email"} rules={[{ required: true }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name={"password"} rules={[{ required: true }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default LoginPage;
