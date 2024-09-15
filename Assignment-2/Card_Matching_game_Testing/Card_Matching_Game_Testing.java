import java.util.*;

public class Card_Matching_Game_Testing
{
    Card_Matching_Game game=new Card_Matching_Game();
    public boolean Testsuccessfull_matches()
    {
        int first_flip=1;
        Character first_flip_value=game.getCardMap().get(0);
        int second_flip=Arrays.asList(game.getCardMap().values().toArray()).lastIndexOf(first_flip_value)+1;
        game.flipping_cards(first_flip);
        game.deck();
        game.flipping_cards(second_flip);
        game.deck();
        if(game.getFlippedCards().size()==2)
        {
            return true;
        }
        return false;
    }
    public boolean Testunsuccessfull_matches()
    {
        int first_flip=1;
        Character first_flip_value=game.getCardMap().get(0);
        int second_flip=1;
        Character second_flip_value;
        while(true)
        {
            second_flip++;
            second_flip_value=game.getCardMap().get(second_flip);
            if(first_flip_value!=second_flip_value)
            {
                break;
            }
        }
        game.flipping_cards(first_flip);
        game.deck();
        game.flipping_cards(second_flip);
        game.deck();
        if(game.getFlippedCards().size()!=2)
        {
            return true;
        }
        return false;
    }
    public boolean Test_card_is_already_flipped()
    {
        int flip=1;
        game.flipping_cards(flip);
        game.deck();
        if(!game.flipping_cards(flip))
        {
            game.deck();
            return true;
        }
        return false;
    }
    public boolean Test_game_is_not_over()
    {
        game.deck();
        return game.isGameOver();
    }
    public boolean Test_game_is_over()
    {
        char arr[]={'A','B','C','D','E','F'};
        for(int i=0;i<arr.length;i++)
        {
            game.flipping_cards((game.card_deck.indexOf(arr[i])+1));
            game.flipping_cards((game.card_deck.lastIndexOf(arr[i])+1));
            game.deck();
        }
        return game.isGameOver();
    }
    public static void main(String args[])
    {
        Card_Matching_Game_Testing testing=new Card_Matching_Game_Testing();
        if(testing.Testunsuccessfull_matches())
        {
            System.out.println("Successfull tested of flipping to unidentical cards");
        }
        else
        {
            System.out.println("Failed in testing of unsuccessfull matches");
        }
        System.out.println();
        if(testing.Testsuccessfull_matches())
        {
            System.out.println("Successfull tested of flipping to identical cards");
        }
        else
        {
            System.out.println("Failed in testing of successfull matches");
        }
        System.out.println();
        if(!testing.Test_game_is_not_over())
        {
            System.out.println("Successfully tested that Game is Not over");
        }
        else
        {
            System.out.println("Failed in tested that Game is Not over");
        }
        System.out.println();
        if(testing.Test_game_is_over())
        {
            System.out.println("Game is successfull completed");
        }
        else
        {
            System.out.println("Failed");
        }
        System.out.println();
        if(testing.Test_card_is_already_flipped())
        {
            System.out.println("Successfull to check that card is Flipped already");
        }
        else
        {
            System.out.println("Failed to check that card is Flipped already");
        }
    }
}