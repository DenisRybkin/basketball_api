import {Team, User,Game, TeamInTournament,Tournament,Location} from "../models";


// описываю связи моделей
export async function relatingModels () {

   await Team.hasMany(User, { foreignKey : "teamId"});
   await User.belongsTo(Team, { foreignKey : "teamId"});

   await User.hasMany(Tournament, {foreignKey : 'userId'});
   await Tournament.belongsTo(User, {foreignKey : 'userId'});

   await Team.hasMany(TeamInTournament,{ foreignKey : 'teamId'});
   await TeamInTournament.belongsTo(Team, { foreignKey : 'teamId'});

   await Tournament.hasMany(TeamInTournament, { foreignKey : 'tournamentId' });
   await TeamInTournament.belongsTo(Tournament, { foreignKey : 'tournamentId' });

   await Tournament.hasMany(Game, { foreignKey : 'tournamentId'});
   await Game.belongsTo(Tournament, { foreignKey : 'tournamentId'});

   await TeamInTournament.hasMany(Game, { foreignKey : 'team1Id'});
   await Game.belongsTo(TeamInTournament, { foreignKey : 'team1Id'});
   await TeamInTournament.hasMany(Game, { foreignKey : 'team2Id'});
   await Game.belongsTo(TeamInTournament, { foreignKey : 'team2Id'});
   await TeamInTournament.hasMany(Game, { foreignKey : 'winningTeamId'});
   await Game.belongsTo(TeamInTournament, { foreignKey : 'winningTeamId'});

   await Location.hasMany(Game,{ foreignKey : 'locationId'});
   await Game.belongsTo(Location, { foreignKey : 'locationId'});
}