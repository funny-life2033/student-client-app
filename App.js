import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./store";
import Pages from "./pages";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Pages />
      </PaperProvider>
    </Provider>
  );
}
