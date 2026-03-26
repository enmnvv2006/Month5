import cls from "./Form.module.css";
import { useState } from "react";

export const Form = () => {
  const [name, setName] = useState({ name: "", age: "" });
  const [users, setUsers] = useState([]);

  const CreateUser = () => {
    name.name.trim() && name.age.trim();
    setUsers([...users, { name: name.name, age: name.age }]);
    setName({ name: "", age: "" });
  };

  return (
    <div className={cls.form}>
      <h2>Form</h2>
      <input
        type="text"
        placeholder="name.."
        value={name.name}
        onChange={(e) => setName({ ...name, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="age.."
        value={name.age}
        onChange={(e) => setName({ ...name, age: e.target.value })}
      />
      <button type="submit" onClick={CreateUser}>
        Submit
      </button>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name}, {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};
