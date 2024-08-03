import Router from "./spa/Router.js";
import LoginView from "./spa/views/LoginView.js"
import PongFinalScoreView from "./spa/views/PongFinalScoreView.js";
import PongGameModeView from "./spa/views/PongGameModeView.js";
import PongGameView from "./spa/views/PongGameView.js";
import PongSingleSetupView from "./spa/views/PongSingleSetupView.js";
import PongTournamentMatchListView from "./spa/views/PongTournamentMatchListView.js";
import PongTournamentSetupView from "./spa/views/PongTournamentSetupView.js";

Router.addRoute("/", LoginView);
Router.addRoute("/pong-mode", PongGameModeView);
Router.addRoute("/pong-single", PongSingleSetupView);
Router.addRoute("/pong", PongGameView);
Router.addRoute("/pong-final-score", PongFinalScoreView);
Router.addRoute("/pong-tournament", PongTournamentSetupView);
Router.addRoute("/pong-tournament-match-list", PongTournamentMatchListView);

Router.start();