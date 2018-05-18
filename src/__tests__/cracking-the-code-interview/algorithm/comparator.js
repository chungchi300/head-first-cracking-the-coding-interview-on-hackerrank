// Write your Checker class here
import _ from 'lodash';
class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}
describe('All', () => {
  it('Full question', () => {
    let players = [];
    players.push(new Player('amy', 100));
    players.push(new Player('david', 100));
    players.push(new Player('heraldo', 50));
    players.push(new Player('aakansha', 75));
    players.push(new Player('aleksa', 150));
    players.sort((player1, player2) => {
      if (player1.score != player2.score) {
        if (player1.score - player2.score > 0) {
          //By default sort order is  ascending,it should return 1(player 1 is bigger then player 2) if we but we want descending,so we reverse the result
          return -1;
        } else {
          return 1;
        }
      } else {
        //player1 name ascii code - player2 name ascii code,,it should return 1(player 1 is bigger then player 2) if we but we want descending,so we reverse the result
        if (player1.name.localeCompare(player2.name) <= 0) {
          return -1;
        } else {
          return 1;
        }
      }
    });
    expect(players).toEqual([
      { name: 'aleksa', score: 150 },
      { name: 'amy', score: 100 },
      { name: 'david', score: 100 },
      { name: 'aakansha', score: 75 },
      { name: 'heraldo', score: 50 },
    ]);
  });
});
//
// class Checker implements Comparator<Player> {
//    @Override
//    public int compare(Player player1,Player player2){

//     }
// }
