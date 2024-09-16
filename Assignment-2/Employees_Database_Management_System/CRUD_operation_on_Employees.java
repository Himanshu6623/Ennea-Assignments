import java.util.*;

public class CRUD_operation_on_Employees extends Employees_Database{
    Employees_Database emp=new Employees_Database();
    public void Add_New_Employee(String Employee_ID,String Name,String Phone_No,String Email_id,Integer Salary,String Position)
    {
        emp.Employees_details.put(Employee_ID,new Employee_details(Name, Phone_No, Email_id, Salary, Position));
    }
    public void Delete_Employee(String Employee_ID)
    {
        emp.Employees_details.remove(Employee_ID);
    }
    public void Update_Employee_Position_and_Salary(String Employee_ID,String Position,Integer Salary)
    {
        String name=emp.Employees_details.get(Employee_ID).name;
        String Email_ID=emp.Employees_details.get(Employee_ID).Email_id;
        String Phone_No=emp.Employees_details.get(Employee_ID).Phone_No;
        emp.Employees_details.put(Employee_ID,new Employee_details(name,Phone_No,Email_ID,Salary,Position));
    }
    public void Update_Employee_Phone_no(String Employee_ID,String Phone_No)
    {
        String name=emp.Employees_details.get(Employee_ID).name;
        String Email_ID=emp.Employees_details.get(Employee_ID).Email_id;
        String Position=emp.Employees_details.get(Employee_ID).Position;
        Integer salary=emp.Employees_details.get(Employee_ID).salary;
        emp.Employees_details.put(Employee_ID,new Employee_details(name,Phone_No,Email_ID,salary,Position));
    }
    public void Update_Employee_Email_Id(String Employee_ID,String Email_ID)
    {
        String name=emp.Employees_details.get(Employee_ID).name;
        String Phone_No=emp.Employees_details.get(Employee_ID).Phone_No;
        String Position=emp.Employees_details.get(Employee_ID).Position;
        Integer salary=emp.Employees_details.get(Employee_ID).salary;
        emp.Employees_details.put(Employee_ID,new Employee_details(name,Phone_No,Email_ID,salary,Position));
    }
    public void Update_Employee_Phone_no_and_Email_id(String Employee_ID,String Phone_No,String Email_ID)
    {
        String name=emp.Employees_details.get(Employee_ID).name;
        String Position=emp.Employees_details.get(Employee_ID).Position;
        Integer salary=emp.Employees_details.get(Employee_ID).salary;
        emp.Employees_details.put(Employee_ID,new Employee_details(name,Phone_No,Email_ID,salary,Position));
    }
    public void View_Database(HashMap<String,Employee_details> map)
    {
        for(String i: map.keySet())
        {
            System.out.println("Employee_ID: "+i);
            System.out.println("Name: "+map.get(i).name);
            System.out.println("Phone Number: "+map.get(i).Phone_No);
            System.out.println("Email ID: "+map.get(i).Email_id);
            System.out.println("Salary: "+map.get(i).salary);
            System.out.println("Position: "+map.get(i).Position);
            System.out.println();
        }
    }
    public void View_Employee_detail(HashMap<String,Employee_details> map,String i)
    {
        System.out.println("Employee_ID: "+i);
        System.out.println("Name: "+map.get(i).name);
        System.out.println("Phone Number: "+map.get(i).Phone_No);
        System.out.println("Email ID: "+map.get(i).Email_id);
        System.out.println("Salary: "+map.get(i).salary);
        System.out.println("Position: "+map.get(i).Position);
        System.out.println();
    }
    public static void main(String args[])
    {
        CRUD_operation_on_Employees op=new CRUD_operation_on_Employees();
        Scanner sc=new Scanner(System.in);

        System.out.println("Operations: ");
        System.out.println("1. Add new Employee to the Database");
        System.out.println("2. View the database");
        System.out.println("3. Update the Employee datails"); 
        System.out.println("4. Delete an Employee from the Database");

        System.out.print("Choose from the option: ");
        int ch=sc.nextInt();
        System.out.println();

        switch(ch)
        {
            case 1:
                System.out.print("Enter the Employee ID: ");
                String Employee_ID=sc.next();
                System.out.println();

                if(op.emp.Employees_details.containsKey(Employee_ID))
                {
                    System.out.println("Employee id already exist");
                    break;
                }
                System.out.print("Enter the Employee Name: ");
                String Name=sc.next();
                System.out.println();

                System.out.print("Enter the Employee Phone_no: ");
                String Phone_No=sc.next();
                System.out.println();

                System.out.print("Enter the Employee Email_ID: ");
                String Email_ID=sc.next();
                System.out.println();

                System.out.print("Enter the Employee Position: ");
                String New_Position=sc.next();
                System.out.println();

                System.out.print("Enter the Employee Salary: ");
                Integer New_Salary=sc.nextInt();
                System.out.println();
                op.Add_New_Employee(Employee_ID, Name, Phone_No, Email_ID, New_Salary, New_Position);
                System.out.println("The newly add Employee: ");
                op.View_Employee_detail(op.emp.Employees_details,Employee_ID);
                break;

            case 2:
                System.out.println("                     EMPLOYEE DATABASE");
                op.View_Database(op.emp.Employees_details);
                break;
            
            case 3:
                System.out.print("Enter the Employee ID: ");
                String Emp_ID_Update=sc.next();
                System.out.println();

                if(!op.emp.Employees_details.containsKey(Emp_ID_Update))
                {
                    System.out.println("The Employee ID "+Emp_ID_Update+" is not present in the Datbase");
                    break;
                }
                System.out.println("Options: ");
                System.out.println("1. Contact_details");
                System.out.println("2. Salary and Position");

                System.out.print("Choose what to update: ");
                int update=sc.nextInt();
                System.out.println();

                switch(update)
                {
                    case 1:
                        System.out.println("Contacts: ");
                        System.out.println("1. Phone Number");
                        System.out.println("2. Email ID");
                        System.out.println("3. Phone number and Email ID");

                        System.out.print("Choose the Contact detail to Update: ");
                        int n=sc.nextInt();
                        System.out.println();

                        switch(n)
                            {
                                case 1:
                                    System.out.print("Enter the new Phone Number: ");
                                    String Phone_no=sc.next();
                                    System.out.println();
                                    op.Update_Employee_Phone_no(Emp_ID_Update, Phone_no);
                                case 2:
                                    System.out.println("Enter the new Email ID");
                                    String Email_id=sc.next();
                                    System.out.println();
                                    op.Update_Employee_Email_Id(Emp_ID_Update, Email_id);
                                    break;
                                case 3:
                                    System.out.print("Enter the new Phone_no: ");
                                    String Phone=sc.next();
                                    System.out.println();
                                
                                    System.out.print("Enter the new Email_ID: ");
                                    String Email=sc.next();
                                    System.out.println();
                                    op.Update_Employee_Phone_no_and_Email_id(Emp_ID_Update, Phone, Email);
                                    break;
                                default:
                                    System.out.println("Invalid input");
                                    break;
                            }
                            break;
                    case 2:
                        System.out.println("Enter the new Position: ");
                        String new_Position=sc.next();
                        System.out.println();
                        
                        System.out.println("Enter the new Salary: ");
                        Integer new_Salary=sc.nextInt();
                        System.out.println();
                        
                        op.Update_Employee_Position_and_Salary(Emp_ID_Update,new_Position,new_Salary);
                        break;
                    default:
                        System.out.println("Invalid input");
                        break;
                }
                System.out.println("The Employee after Update: ");
                op.View_Employee_detail(op.emp.Employees_details,Emp_ID_Update);
                break;
            case 4:
                System.out.println("Enter the Employee Id to Delete from Database: ");
                String Employee_Id_delete=sc.next();
                System.out.println();
                if(op.emp.Employees_details.containsKey(Employee_Id_delete))
                {
                    System.out.println("The Deleted Employee: ");
                    op.View_Employee_detail(op.emp.Employees_details,Employee_Id_delete);
                    op.Delete_Employee(Employee_Id_delete);
                }
                else
                {
                    System.out.println("The Employee ID "+Employee_Id_delete+" is not present in the Datbase");
                }
                break;
            default:
                System.out.println("Invalid input");
                break;
        }
    }
}
