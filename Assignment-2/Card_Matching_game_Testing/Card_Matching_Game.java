import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Stack;

public class Card_Matching_Game{
    public ArrayList<Character> card_deck;
    public HashMap<Integer,Character> card_map;
    public ArrayList<Integer> flipped_cards;
    public Stack<ArrayList<Integer>> stack;
    public int successfull_matches;
    public int total_moves;
    public void deck()
    {
        for (int i=0; i<card_map.size(); i++) 
        {
            if(flipped_cards.contains(i))
            {
                System.out.print(card_map.get(i) + " ");
            }
            else
            {
                System.out.print(0 + " ");
            }
            if ((i + 1) % 4 == 0) {
                System.out.println();
            }
        }
        System.out.println();
    }
    public Card_Matching_Game()
    {
        card_deck = new ArrayList<>(Arrays.asList('A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'));
        Collections.shuffle(card_deck);
        card_map = new HashMap<>();
        for (int i = 0; i < card_deck.size(); i++) {
            card_map.put(i, card_deck.get(i));
        }
        flipped_cards = new ArrayList<>();
        stack = new Stack<>();
        total_moves = 0;
        successfull_matches = 0;
    }
    public  boolean flipping_cards(int choice)
    {
        if(flipped_cards.contains(choice-1))
        {
            return false;
        }
        if(stack.isEmpty())
        {
            stack.push(new ArrayList<>(Arrays.asList(choice-1,(int)card_map.get(choice-1))));
            flipped_cards.add(choice-1);
            successfull_matches++;
        }
        else
        {
            flipped_cards.add(choice-1);
            if((int)card_map.get(choice-1)==stack.peek().get(1))
            {
                stack.pop();
                successfull_matches++;
            }
            else
            {
                flipped_cards.remove(flipped_cards.size()-1);
                flipped_cards.remove(flipped_cards.size()-1);
                stack.pop();
                successfull_matches--;
            }
            total_moves++;
        }
        return true;
    }
    public boolean isGameOver() {
        return successfull_matches == card_deck.size();
    }

    public int getTotalMoves() {
        return total_moves;
    }

    public List<Integer> getFlippedCards() {
        return flipped_cards;
    }

    public HashMap<Integer, Character> getCardMap() {
        return card_map;
    }
}

