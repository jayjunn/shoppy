import { QueryClientProvider, QueryClient } from "react-query";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { CartContextProvider } from "./context/CartContext";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
        </QueryClientProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
