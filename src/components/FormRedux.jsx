import cls from "./Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CreateUser, setUserName, setUserAge } from "../formSlice";

export const FormRedux = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.formSlice.users);
  const name = useSelector((state) => state.formSlice.user);

  return (
    <div className={cls.form}>
      <h2>Form Redux</h2>
      <input
        type="text"
        placeholder="name.."
        value={name.name}
        onChange={(e) => dispatch(setUserName(e.target.value))}
      />
      <input
        type="text"
        placeholder="age.."
        value={name.age}
        onChange={(e) => dispatch(setUserAge(e.target.value))}
      />
      <button
        type="submit"
        onClick={() => dispatch(CreateUser({ name: name.name, age: name.age }))}
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
