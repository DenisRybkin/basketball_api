import {Team, User,Game, TeamInTournament,Tournament,Location,UserToken} from "../models";


// описываю связи моделей
export async function relatingModels () {

   await Team.hasMany(User, { foreignKey : "teamId", as : "participants"});
   await User.belongsTo(Team, { foreignKey : "teamId", as : 'userTeam'});

   await User.hasMany(Tournament, {foreignKey : 'userId'});
   await Tournament.belongsTo(User, {foreignKey : 'userId'});

   await Team.hasMany(TeamInTournament,{ foreignKey : 'teamId', as : 'team'});
   await TeamInTournament.belongsTo(Team, { foreignKey : 'teamId', as : 'team'});

   await Tournament.hasMany(TeamInTournament, { foreignKey : 'tournamentId' });
   await TeamInTournament.belongsTo(Tournament, { foreignKey : 'tournamentId', as : "teamInTournament" });

   await Tournament.hasMany(Game, { foreignKey : 'tournamentId', as : 'games'});
   await Game.belongsTo(Tournament, { foreignKey : 'tournamentId'});

   await TeamInTournament.hasMany(Game, { foreignKey : 'team1Id'});
   await Game.belongsTo(TeamInTournament, { foreignKey : 'team1Id', as : 'team1'});

   await TeamInTournament.hasMany(Game, { foreignKey : 'team2Id'});
   await Game.belongsTo(TeamInTournament, { foreignKey : 'team2Id', as : 'team2'});

   await TeamInTournament.hasMany(Game, { foreignKey : 'winningTeamId'});
   await Game.belongsTo(TeamInTournament, { foreignKey : 'winningTeamId'});

   await Location.hasMany(Game,{ foreignKey : 'locationId', as : 'games'});
   await Game.belongsTo(Location, { foreignKey : 'locationId'});

   await User.hasMany(UserToken, { foreignKey : 'userId'});
   await UserToken.belongsTo(User, { foreignKey : 'userId'});

}