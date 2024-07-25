import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import AddCategory from "./components/Category/addCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import Dashboard from "./components/Users/Dashboard";
import UpdateTransaction from "./components/Transactions/UpdateTransaction";
import UserProfile from "./components/Users/UserProfile";
import AuthRoute from "./components/Auth/AuthRoute";

function App() {
  const user = useSelector(state => state?.auth?.user);
  return (
    <>
      <BrowserRouter>
        {user ? <PrivateNavbar/> : <PublicNavbar/>}
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route 
            path="/add-category"
            element={
              <AuthRoute>
                <AddCategory/>
              </AuthRoute>
            }
          />
          <Route 
            path="/add-transaction"
            element={
              <AuthRoute>
                <TransactionForm/>
              </AuthRoute>
            }
          />
          <Route 
            path="/update-transaction/:id"
            element={
              <AuthRoute>
                <UpdateTransaction/>
              </AuthRoute>
            }
          />
          <Route 
            path="/categories"
            element={
              <AuthRoute>
                <CategoriesList/>
              </AuthRoute>
            }
          />
          <Route 
            path="/update-category/:id"
            element={
              <AuthRoute>
                <UpdateCategory/>
              </AuthRoute>
            }
          />
          <Route 
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard/>
              </AuthRoute>
            }
          />
          <Route 
            path="/profile"
            element={
              <AuthRoute>
                <UserProfile/>
              </AuthRoute>
            }
          />
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App
