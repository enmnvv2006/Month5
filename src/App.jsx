import { Form } from "./components/Form";
import { Provider } from "react-redux";
import { store } from "./store";
import { FormRedux } from "./components/FormRedux";
import { FormZustand } from "./components/FormZustand";

export const App = () => {
  return (
    <Provider store={store}>
      <h1>Vite App</h1>
      <Form />
      <FormRedux />
      <FormZustand />
    </Provider>
  );
};
