import React from "react";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Provider store={store}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 7500 }}
      />
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/:action" Component={Home} />
        </Routes>
      </Router>
    </Provider>
  );
}
