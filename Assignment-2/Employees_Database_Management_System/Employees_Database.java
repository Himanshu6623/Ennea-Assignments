import java.util.*;

public class Employees_Database {
        static class Employee_details
        {
            String name;
            Integer salary;
            String Position;
            String Phone_No;
            String Email_id;
            public Employee_details(String N,String C,String E,Integer S,String P)
            {
                this.name=N;
                this.Phone_No=C;
                this.Email_id=E;
                this.salary=S;
                this.Position=P;
            }
            public Employee_details(Integer S,String P)
            {
                this.salary=S;
                this.Position=P;
            }
            public Employee_details(String C,String E)
            {
                this.Phone_No=C;
                this.Email_id=E;
            }
            public Employee_details(String Value)
            {
                if(Value.length()==9)
                {
                    this.Phone_No=Value;
                }
                else
                {
                    this.Email_id=Value;
                }
            }
        }
        public HashMap<String,Employee_details> Employees_details=new HashMap<>();
        public Employees_Database()
        {
            Employees_details.put("6623",new Employee_details("Himanshu Parida","123456789","21311A6623@gmail.com", 600000, "Intern"));
            Employees_details.put("6649",new Employee_details("Karthik","123456789","21311A6649@gmail.com", 500000, "Intern"));
            Employees_details.put("6601",new Employee_details("Moiz pasha","123456789","21311A6601@gmail.com", 800000, "Intern"));
            Employees_details.put("6629",new Employee_details("Mittapalli pavan","123456789","21311A6629@gmail.com", 700000, "Intern"));
            Employees_details.put("6635",new Employee_details("Hemanth","123456789","21311A6635@gmail.com", 725000, "Intern"));
            Employees_details.put("6633",new Employee_details("Abdul Azeez","123456789","21311A6633@gmail.com", 700000, "Intern"));
            Employees_details.put("6606",new Employee_details("Warlu","123456789","21311A6606@gmail.com", 1600000, "Intern"));
            Employees_details.put("6622",new Employee_details("Sravani","123456789","21311A6622@gmail.com", 750000, "Intern"));
            Employees_details.put("6614",new Employee_details("Ashritha","123456789","21311A6614@gmail.com", 850000, "Intern"));
            Employees_details.put("6619",new Employee_details("Vidya","123456789","21311A6619@gmail.com", 900000, "Intern"));
        }

}
