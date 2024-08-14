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
import PongTeamGameView from "./spa/views/PongTeamGameView.js";

Router.addRoute({ path: "/", view: PongGameModeView });
Router.addRoute({ path: "/pong", view: PongSingleSetupView });
Router.addRoute({ path: "/pong-game", view: PongGameView, internal: true });
Router.addRoute({ path: "/pong-final-score", view: PongFinalScoreView, internal: true });
Router.addRoute({ path: "/pongx",  view: PongTeamSetupView });
Router.addRoute({ path: "/pongx-game",  view: PongTeamGameView, internal: true });
Router.addRoute({ path: "/pong-tournament", view: PongTournamentSetupView });
Router.addRoute({ path: "/pong-tournament-match-list", view:  PongTournamentMatchListView, internal: true });

Router.notFoundView = NotFoundView;
Router.authView = LoginView;

Router.authMiddleware = async () => {

    const userData = await Auth.getUser();

    if (!userData) {  return false;  }

    Context.setItem("user", userData);

    return true;
}

Router.start();
