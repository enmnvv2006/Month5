import cls from "./Form.module.css";
import { useFormStore } from "../useFormStore";

export const FormZustand = () => {
  const { users, user, setUserName, setUserAge, createUser } = useFormStore();

  return (
    <div className={cls.form}>
      <h2>Form Zustand</h2>
      <input
        type="text"
        placeholder="name.."
        value={user.name}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="age.."
        value={user.age}
        onChange={(e) => setUserAge(e.target.value)}
      />
      <button
        type="submit"
        onClick={() => createUser({ name: user.name, age: user.age })}
      >
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
