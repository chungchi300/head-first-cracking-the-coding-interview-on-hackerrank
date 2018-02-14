// Write your Checker class here

class Checker implements Comparator<Player> {
   @Override
   public int compare(Player player1,Player player2){
       if(player1.score!=player2.score){
           if((player1.score-player2.score)>0){
               //By default is lower to upper,it should return 1(player 1 is bigger then player 2) if we but we want upper to lower,so we reverse the result
               return -1;
           }else{
               return 1;
           }
       }else{
         //player1 name ascii code - player2 name ascii code,,it should return 1(player 1 is bigger then player 2) if we but we want upper to lower,so we reverse the result
         if(player1.name.compareTo(player2.name)<=0){
             return -1;
         }else{
             return 1;
         }
       }

    }
}
