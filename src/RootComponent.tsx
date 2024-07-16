import App from "./App";
import { AppProvider } from "./Providers/AppProvider";

function RootComponent() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

export default RootComponent;
