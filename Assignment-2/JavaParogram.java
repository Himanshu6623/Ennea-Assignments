import java.util.*;
public class Main{
    public static void main(String args[])
    {
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter a String: ");
        HashMap<Character,Integer> map=new HashMap<>();
        HashSet<Character> set=new HashSet<>();
        ArrayList<Character> list=new ArrayList<>();
        String str=sc.nextLine();
        //Insert each character from the string into map,list and set
        for(int i=0;i<str.length();i++)
        {
            list.add(str.charAt(i));
            set.add(str.charAt(i));
            map.put(str.charAt(i),map.getOrDefault(str.charAt(i), 0)+1);
        }
        //Set helps to remove duplicate elements and only provide unique elements and we cannot retrive element directly from the HashSet we have to convert it into ArrayList
        ArrayList<Character> set_list=new ArrayList<>(set);
        System.out.println("set: "+set_list);
        System.out.println("first and last index of repeating character: ");
        for(char i:map.keySet())
        {
            if(map.get(i)>1)//get value of a key
            {
                System.out.println(i+" = "+list.indexOf(i)+" - "+list.lastIndexOf(i));
            }
        }
        //For searching element
        System.out.print("Give the character to search: ");
        char s=sc.next().charAt(0);
        if(map.containsKey(s))//searching in HashMap take O(1)
        {
            System.out.println("map contains a key: "+s);
        }
        else
        {
            System.out.println("Element is not available");
        }
        if(list.contains(s))//searching in ArrayList take O(n)
        {
            System.out.println("list contain a element: "+s);
        }
        
        //deleting element or key
        System.out.print("Give the character to delete: ");
        char ch=sc.next().charAt(0);
        if(map.containsKey(ch))
        {
            map.remove(ch);
        }
        else
        {
            System.out.println("Element is not available");
        }
        if(list.contains(ch))
        {
            list.remove(Character.valueOf(ch));//remove first occurance of ch
            System.out.println("index should be between 0 and "+Integer.toString(list.size()-1));
            int index=sc.nextInt();
            list.remove(index);//removing element based index
        }
        //Setting element in list
        System.out.print("Enter the index and element to set the element: ");
        int index=sc.nextInt();
        char element_to_set=sc.next().charAt(0);
        list.set(index,element_to_set);
        System.out.println(map);
        System.out.println(list);
    }
}
