import { Form, Input, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../helpers/const";
import cls from "./CreatePosts.module.css";

export const CreatePosts = () => {
  const [form] = Form.useForm();

  const CreatePost = async (values) => {
    try {
      const post = {
        title: values.title,
        body: values.body,
        userId: 1,
      };
      const response = await axios.post(API_BASE_URL + "/add", post);
      console.log(response.data);
      toast.success("Post created successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post.");
    }
  };

  return (
    <div className={cls.createPostContainer}>
      <h2>Create Posts</h2>
      <Form layout="vertical" form={form} onFinish={CreatePost}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the post title!" }]}
        >
          <Input placeholder="Post Title" />
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: "Please input the post body!" }]}
        >
          <Input.TextArea placeholder="Post Body" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
