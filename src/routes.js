import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/StageMatches",
    name: "StageMatches",
    component: () => import("./pages/StageMatchesPage")
  },
  {
    path: "/FavoritesMatches",
    name: "FavoritesMatches",
    component: () => import("./pages/FavoritesMatchesPage")
  },
  {
    path: "/AssociationMember",
    name: "AssociationMember",
    component: () => import("./pages/AssociationMemberPage")
  },
  {
    path: "/AssociationMember/UpdteScore/:id",
    name: "AssociationMemberUpdateScore",
    component: () => import("./pages/AssociationMemberUpdateScorePage")
  },
  {
    path: "/AssociationMember/AddEvent/:id/:date/:hour",
    name: "AssociationMemberAddEvent",
    component: () => import("./pages/AssociationMemberAddEventPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
