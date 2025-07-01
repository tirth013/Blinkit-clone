import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { fetchUserDetails } from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch} from 'react-redux'
import { Toaster } from "react-hot-toast";

function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      console.log("userData", userData);
      dispatch(setUserDetails(userData.data))
    } catch (err) {
      console.log("Error fetching user details:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
