import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import CreateWorkspace from "./pages/CreateWorkspace";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { userCurrentuserStore } from "./modules/auth/current-user.status";
import { authRepository } from "./modules/auth/auth.repository";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentUser } = userCurrentuserStore();

  useEffect(() => {
    featchCurrentUser();
  }, []);

  const featchCurrentUser = async () => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div></div>;
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<CreateWorkspace />} />
          <Route path="/:workspaceId/:channelId" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
