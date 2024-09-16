public class Employee_Database_Management_testing{
    Employees_Database emp=new Employees_Database();
    CRUD_operation_on_Employees crud=new CRUD_operation_on_Employees();
    public boolean test_adding_new_Employee()
    {
        String Employee_ID="test123";
        String name="test";
        String phone_no="123456789";
        String Email_id="123@gmail.com";
        String Position="employee";
        Integer salary=600000;
        crud.Add_New_Employee(Employee_ID, name, phone_no, Email_id, salary, Position);
        if(crud.emp.Employees_details.containsKey(Employee_ID))
        {
            return true;
        }
        return false;
    }
    public boolean test_delete_Employee()
    {
        String Employee_ID="6629";
        crud.Delete_Employee(Employee_ID);
        if(!crud.emp.Employees_details.containsKey(Employee_ID))
        {
            return true;
        }
        return false;
    }
    public boolean test_update_employee_salary_and_position()
    {
        crud.Update_Employee_Position_and_Salary("6623", "Employee", 700000);
        if(crud.emp.Employees_details.get("6623").Position.equals("Employee") && crud.emp.Employees_details.get("6623").salary==700000)
        {
            return true;
        }
        return false;
    }
    public boolean test_update_employee_Phone_no()
    {
        crud.Update_Employee_Phone_no("6623", "789456123");
        if(crud.emp.Employees_details.get("6623").Phone_No.equals("789456123"))
        {
            return true;
        }
        return false;
    }
    public boolean test_update_employee_Email_Id()
    {
        crud.Update_Employee_Email_Id("6623", "random@gmail.com");
        if(crud.emp.Employees_details.get("6623").Email_id.equals("random@gmail.com"))
        {
            return true;
        }
        return false;
    }
    public boolean test_update_employee_contact_details()
    {
        crud.Update_Employee_Phone_no_and_Email_id("6623", "457891261", "himanshu@gmail.com");
        if(crud.emp.Employees_details.get("6623").Phone_No.equals("457891261") && crud.emp.Employees_details.get("6623").Email_id.equals("himanshu@gmail.com"))
        {
            return true;
        }
        return false;
    }
    public static void main(String args[])
    {
        Employee_Database_Management_testing testing=new Employee_Database_Management_testing();
        if(testing.test_adding_new_Employee())
        {
            System.out.println("Successfully add new Employee");
        }
        else
        {
            System.out.println("Failed to add new Employee");
        }
        if(testing.test_delete_Employee())
        {
            System.out.println("Successfully deleted an Employeee");
        }
        else
        {
            System.out.println("Failed to delete");
        }
        if(testing.test_update_employee_contact_details())
        {
            System.out.println("Successfully updated employee contact details");
        }
        else
        {
            System.out.println("Failed to update employee contact details");
        }
        if(testing.test_update_employee_salary_and_position())
        {
            System.out.println("Successfully update employee position and salary");
        }
        else
        {
            System.out.println("Failed to update employee position and salary");
        }
        testing.crud.View_Database(testing.crud.emp.Employees_details);
    }
}
