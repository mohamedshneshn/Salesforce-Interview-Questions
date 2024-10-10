/*

1. What is Automation in Salesforce?
-------------------------------------
- used to automate the business processes in Salesforce like sending an email, updating a field, creating a record, etc.
- It reduces manual efforts and improves efficiency.
- Automation can be achieved using:
  1- Process Builder
  2- Workflow Rules
  3- Approval Processes
  4- Flow
  5- Apex Triggers





---------------------------------------------------------------------------------------------------------------------------------------------
- Approval Processes:
    - Approval processes are used to automate the approval of records in Salesforce .
    - Ex: when the sales rep needs to make a discount more than 10%, the manager needs to approve it.

    - Steps to create an Approval Process:
        1- select the object for which you want to create an approval process.
        2- Define the entry criteria. (when the approval process should be triggered)
             ex: when the discount is more than 10%

        3- Define the approval steps:
           ex: 1- First step: Manager approval (discount more than 10%)
               2- Second step: Director approval (discount more than 20%)
               3- Third step: VP approval (discount more than 30%)

        4- Define the approvers for each step.
        5- Define the actions to be taken after approval or rejection).
        6- Activate the approval process.

    Note:
    - actions can be[ Field Update, Email Alert, Outbound Message, Task, Custom Action]
    - approvers can be[ User, Role, Role Hierarchy, Public Group, Custom Hierarchy]

---------------------------------------------------------------------------------------------------------------------------------------------
- Apex Triggers:
    - Apex triggers are used to perform custom actions before or after specific events on Salesforce records.
    - Triggers can be used to perform complex validations, update related records, or automate business processes.
    - Trigger Events
        1- Before Insert : Trigger fires before the record is inserted into the database.
        2- After Insert : Trigger fires after the record is inserted into the database.
        3- Before Update : Trigger fires before the record is updated.
        4- After Update : Trigger fires after the record is updated.
        5- Before Delete : Trigger fires before the record is deleted.
        6- After Delete : Trigger fires after the record is deleted.
        7- After Undelete : Trigger fires after a record is recovered from the Recycle Bin.


    - Trigger Context Variables:

        1- Trigger.new : Returns a list of the new versions of the sObject records.
        2- Trigger.old : Returns a list of the old versions of the sObject records.
        3- Trigger.newMap : Returns a map of the new versions of the sObject records.
        4- Trigger.oldMap : Returns a map of the old versions of the sObject records.
        5- Trigger.isInsert : Returns true if the trigger was fired due to an insert operation.
        6- Trigger.isUpdate : Returns true if the trigger was fired due to an update operation.
        7- Trigger.isDelete : Returns true if the trigger was fired due to a delete operation.
        8- Trigger.isBefore : Returns true if the trigger was fired before the record was saved.
        9- Trigger.isAfter : Returns true if the trigger was fired after the record was saved.
        10- Trigger.isExecuting : Returns true if the trigger is currently executing.
        11- Trigger.isUndelete : Returns true if the trigger was fired due to an undelete operation.


    - Trigger Example:
        ex: create a trigger to update the account name to uppercase before inserting the record.

    trigger AccountTrigger on Account (before insert) {
      if(Trigger.isBefore && Trigger.isInsert) {
            for(Account acc : Trigger.new) {
                acc.Name = acc.Name.toUpperCase();
            }
        
    }



        @isTest
        public class accountTriggerTest {

        @isTest                                      // Annotation to define the method as a test method and it should be static.
            static void accountTriggerTestMothod(){
                
                Account newAcc = New Account();
                newAcc.Name='test';
                insert newAcc;
                
                Account newAccInserted = [Select Name From Account Where Id = :newAcc.Id ] ;
                System.assertEquals('TEST',newAccInserted.Name);
            }

        }

        Note:
        - @isTest annotation is used to define the method as a test method.
        - System.assertEquals() method is used to verify the expected and actual values.
        - :newAcc.Id  we use colon(:) to reference the variable in the query. it is called bind variable.
        - use bind variables in the query when you don't know the value of the variable at compile time.
        


        

---------------------------------------------------------------------------------------------------------------------------------------------









*/