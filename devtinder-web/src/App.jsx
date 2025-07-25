import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import {Provider} from "react-redux"
import { appStore } from "./utils/appStore";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter>
      <Routes>
       <Route path="/login" element={<Login />} />
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/chat/:totargetUserId" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
