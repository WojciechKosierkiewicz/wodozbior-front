import HomePage from "./pages/HomePage";
import RiversPage from "./pages/RiversPage";
import StationsPage from "./pages/StationsPage";
import RiverDetailsPage from "./pages/RiverDetailsPage";
import StationDetailsPage from "./pages/StationDetailsPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/rivers", element: <RiversPage /> },
  { path: "/stations", element: <StationsPage /> },
  { path: "/river/:id", element: <RiverDetailsPage /> },
  { path: "/station/:id", element: <StationDetailsPage /> }
];

export default routes;