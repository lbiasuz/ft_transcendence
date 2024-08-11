import Auth from "./spa/Auth.js";
import Context from "./spa/Context.js";
import Router from "./spa/Router.js";
import LoginView from "./spa/views/LoginView.js"
import NotFoundView from "./spa/views/NotFoundView.js";
import PongFinalScoreView from "./spa/views/PongFinalScoreView.js";
import PongGameModeView from "./spa/views/PongGameModeView.js";
import PongGameView from "./spa/views/PongGameView.js";
import PongTeamSetupView from "./spa/views/PongTeamSetupView.js";
import PongSingleSetupView from "./spa/views/PongSingleSetupView.js";
import PongTournamentMatchListView from "./spa/views/PongTournamentMatchListView.js";
import PongTournamentSetupView from "./spa/views/PongTournamentSetupView.js";

Router.addRoute("/", PongGameModeView);
Router.addRoute("/pong", PongSingleSetupView);
Router.addRoute("/pongx", PongTeamSetupView);
Router.addRoute("/pong-tournament", PongTournamentSetupView);
Router.addRoute("/pong-tournament-match-list", PongTournamentMatchListView);

Router.notFoundView = NotFoundView;
Router.authView = LoginView;

Router.authMiddleware = async () => {

    const userData = await Auth.getUser();

    if (!userData) {  return false;  }

    Context.setItem("user", userData);

    return true;
}

Router.start();
