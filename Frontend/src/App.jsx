import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./components/Home.jsx"
import UserLogin from "./Components/UserLogin.jsx";
import FaLogin from "./Components/FaLogin.jsx";
import HodLogin from "./Components/HodLogin.jsx"
import Form from "./Components/Form.jsx";
import FaApp from "./Components/FaApplication.jsx"

function App() {
  useEffect(() => {
    // Scroll to the top on component mount
    window.scrollTo(0, 0);

    // Add event listener to scroll to the top on history change
    const handleHistoryChange = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleHistoryChange);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('popstate', handleHistoryChange);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/UserLogin" element={<UserLogin></UserLogin>}></Route>
          <Route path="/FA" element={<FaLogin></FaLogin>}></Route>
          <Route path="/HOD" element={<HodLogin></HodLogin>}></Route>
          <Route path="/Form" element={<Form></Form>}></Route>
          <Route path="/FaApplication" element={<FaApp></FaApp>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
