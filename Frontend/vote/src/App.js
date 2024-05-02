import Admin from './Pages/Admin';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Vote from './Pages/Vote';
import {Routes,Route} from "react-router-dom";
import ProtectedRoute from './Routes/Protectedroutes';
function App() {
  return (
    <div className="App">
<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/' element={<Register/>}/>
  <Route
          path="/vote"
          element={
            <ProtectedRoute>
              <Vote />
            </ProtectedRoute>
          }
        />                <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin/>
          </ProtectedRoute>
        }
      />
</Routes>
       </div>
  );
}

export default App;
