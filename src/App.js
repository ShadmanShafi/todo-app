import BrowserRoutes from "./BrowserRoutes"
import { Provider } from "react-redux";
import store from "./Redux/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRoutes />
    </Provider>
  );
}

export default App;
