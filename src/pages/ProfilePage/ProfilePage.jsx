import { useEffect } from "react";
import { Card, Spin, Descriptions, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../store/auth.slice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Card title="Profile" style={{ width: 600, margin: "40px auto" }}>
      {loading && (
        <div style={{ textAlign: "center", padding: 20 }}>
          <Spin />
        </div>
      )}

      {error && <Alert type="error" message={String(error)} />}

      {user && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="ID">
            {user.id || user._id || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Username">
            {user.username || user.name || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {user.email || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Raw">
            {JSON.stringify(user)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
};

export default ProfilePage;
