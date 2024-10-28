/*

1. What is Apex?
----------------
- is a programming language like JS used to write custom business logic and create automated tasks in Salesforce.
- used to write complex business logic like if you want to update a field on a record based on some conditions.
- used to integerate Salesforce with external systems.



2- Apex Triggers:
-----------------
    - Apex triggers are used to perform custom actions before or after specific events on Salesforce records.
    - Triggers can be used to perform complex validations, update related records, or automate business processes.
    - Trigger Events
       Before: to run a logice before the record is saved to the database like validation rules.
       After: to run a logic after the record is saved to the database like sending an email notification.
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
        


       




*/