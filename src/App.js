import './App.css';
import Sidebar from './components/Sidebar';
import ChatComponent from './components/Chat';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login';
import { useStateValue } from './StateProvider';


function App() {


  //Here we pull the user from useStateValue (StateProvider)
  const [{ user }] = useStateValue();

  return (

    <div className="app  ">
      {/* if there are no user then show the login screen else show the App screen */}

      {!user ? (
        <Login />
      ) : (



        <div className="app__body">

          <Router>
            <Sidebar />

            <Switch>


              <Route path="/rooms/:roomId">
                <ChatComponent />
              </Route>

              <Route path="/">
                <ChatComponent />
              </Route>


            </Switch>
          </Router>

        </div>

      )
      }


    </div>
  );
}

export default App;
