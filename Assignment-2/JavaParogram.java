import java.util.*;
import java.util.Collections;
class Main
{
    public static void Quiz_Game()
    {
        Scanner sc=new Scanner(System.in);
        HashMap<String,HashMap<Integer,String>> map=new HashMap<>();
        HashMap<Integer,String> temp1=new HashMap<>();
        HashMap<Integer,String> temp2=new HashMap<>();
        temp1.put(1,"1");
        temp1.put(2,"-1");
        temp1.put(3,"0");
        temp1.put(4,"null");
        map.put("What is the default value of an uninitialized int variable in Java?",temp1);
        temp2.put(1,"new");
        temp2.put(2,"class");
        temp2.put(3,"static");
        temp2.put(4,"this");
        map.put("Which of the following is used to create an instance of a class in Java?",temp2);
        ArrayList<String> ans=new ArrayList<>(Arrays.asList("0","new"));
        int index=0,correct=0;
        for(String i:map.keySet())
        {
            System.out.println("Question "+index+1);
            System.out.println(i);
            int ind=1;
            for(int j:map.get(i).keySet())
            {
                System.out.println(ind+"-> "+map.get(i).get(j));
                ind++;
            }
            int ch=sc.nextInt();
            if(map.get(i).get(ch)==ans.get(index))
            {
                correct++;
            }
            index++;
        }
        System.out.println("You have given "+correct+" answers out of "+map.size());
    }
    public static void deck(ArrayList<Integer> flipped_cards,HashMap<Integer,Character> map)
    {
        for (int i=0; i<map.size(); i++) 
        {
            if(flipped_cards.contains(i))
            {
                System.out.print(map.get(i) + " ");
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
    public static void Card_Matching_Game()
    {
        Scanner sc=new Scanner(System.in);
        ArrayList<Character> card_deck=new ArrayList<>(Arrays.asList('A','A','B','B','C','C','D','D','E','E','F','F'));
        Collections.shuffle(card_deck);
        HashMap<Integer,Character> map=new HashMap<>();
        for(int i=0;i<card_deck.size();i++)
        {
            map.put(i,card_deck.get(i));
        }
        int total=0,chances=0;
        ArrayList<Integer> flipped_cards=new ArrayList<>();
        Stack<ArrayList<Integer>> stack=new Stack<>();
        while(total<card_deck.size())
        {
            while(true)
            {
                System.out.print("Enter the card you want to flip: ");
                int choose=sc.nextInt();
                if(flipped_cards.contains(choose-1))
                {
                    System.out.println("Card is already flipped choose another card");
                }
                else
                {
                    if(stack.isEmpty())
                    {
                        stack.push(new ArrayList<>(Arrays.asList(choose-1,(int)map.get(choose-1))));
                        flipped_cards.add(choose-1);
                        total++;
                    }
                    else
                    {
                        flipped_cards.add(choose-1);
                        if((int)map.get(choose-1)==stack.peek().get(1))
                        {
                            stack.pop();
                            total++;
                        }
                        else
                        {
                            deck(flipped_cards,map);
                            flipped_cards.remove(flipped_cards.size()-1);
                            flipped_cards.remove(flipped_cards.size()-1);
                            stack.pop();
                            total--;
                        }
                        chances++;
                    }
                    deck(flipped_cards,map);
                    break;
                }
            }
            
        }
        System.out.println("You took "+chances+" moves to Match all the cards in the deck");
    }
    public static void main(String args[])
    {
        Scanner sc=new Scanner(System.in);
        System.out.println("1->Quiz Game");
        System.out.println("2->Card Matching game");
        System.out.println("Choose the game you want to play: ");
        int ch=sc.nextInt();
        switch (ch) {
            case 1:
                Quiz_Game();
                break;
            
            case 2:
                Card_Matching_Game();
                break;
            default:
                System.out.println("Choose a valid choose");
                break;
        }
    }
}
