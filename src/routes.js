import HomePage from "./pages/HomePage";
import RiversPage from "./pages/RiversPage";
import StationsPage from "./pages/StationsPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/rivers", element: <RiversPage /> },
  { path: "/stations", element: <StationsPage /> } 
];

export default routes;