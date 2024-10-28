/*

What is the salesforce order of execution?
------------------------------------------
- descripes the events that occur in salesforce when a record is saved

the order of execution
-----------------------
1- load the record from the database if it is an update or delete operation
    or create a new record if it is an insert operation using UI or API.


2- system validation rules
  ex: required fields, unique fields, field format, max length, etc.


3- before save flow 
    - before the record is saved to the database, the before triggers, validatio


4- before triggers(before insert, before update, before delete)
    -because these triggers can modify the record before it is saved to the database

   ex: Ensure the Account Name is in uppercase before saving the record.
     : add a default value to a field if it is blank before saving the record.

5- custom validation rules and system validation rules
    - run again because the record may have been modified by the before triggers.
    ex: prevent users from entering an email address without the @ symbol.
      : prevent users from entering a phone number without the correct format.

6-Duplicate rules
    -to prevent duplicate records from being saved to the database.

                        -------------------------------------------

7- (Record saved + Id )but not yet committed to the database
    - to allow all after triggers to run before the record is saved to the database.
    - if there are any errors, the record is not saved to the database and it will rollback the transaction.

                      --------------------------------------------

8- after triggers(after insert, after update, after delete)
    - used to perform operations after the record is saved to the database.

   ex: send an email notification after a new oppointment is created.


9- Assignment rules
    - if the record is a lead or case, the assignment rules are executed to assign the record to a user or queue.

10- auto-response rules
    - if the record is a lead or case, the auto-response rules are executed to send an automatic email response.

11- workflow rules
    - used to automate standard internal procedures and processes to save time across your org.

12- process builder and flows
    - used to automate business processes and workflows.

13- escalation rules    
    - used to escalate cases based on certain criteria.

14- entitlement rules
    - used to enforce service level agreements (SLAs) for cases.

15- Recorder triggered flows(after save flow)
    - after the record is saved to the database, the after save flow is executed.

16- Roll-up summary fields
    - used to calculate the sum, minimum, or maximum value of a field in related records.

17- Criteria-based sharing rules
    - used to share records with users based on certain criteria.


18- commit DML operation to the database
    - if all operations are successful, the record is saved to the database.

19- post-commit logic
    - used to perform operations after the record is saved to the database.
    Ex: send an email notification after a new record is created.


----------------------------------------------------------------------------------------------------------------------------

Note:
-----
- if the after trigger creates a new record, the entire process is repeated for the new record.

- if the workflow rule updates the record, 4 steps are repeated (validation and triggers will run again)
        (before triggers, custom validation rules, save the record, after triggers)


Q- What will happen if we update value of the same field in before trigger and in before flow, which value will be saved in the database?
A- The value updated in the before trigger will be saved in the database because the before trigger runs before the before flow.


*/