/*

Flows in salesforce:
---------------------
-flow is an automation tool in salesforce that allows you to automate business logic without writing code
- used to automate repetitive tasks

Types of flows:
----------------

1- Record-triggered flow
   
    Trigger: when a record is created or updated or deleted
    Use case: send an email when a case is closed
    Execution: runs before or after the record is saved
        before-save: for quick field updates on the same record
                   :
        after-save: for updates on related records



2-Screen flow
    
        Trigger: manually triggered by the user
        Use case: guide the user through a process or collect data from the user
        Execution: runs when the user interacts with the flow  

        
3-Autolaunched flow
        
            Trigger: manually triggered by the user or by a process
            Use case: automate repetitive tasks
            Execution: runs when the flow is called


4-Scheduled flow
            
                Trigger: runs at a specific time
                Use case: send an email to the manager every month



----------------------------------------------------------------------------

Flow elements:
----------------
- Data (Create Records, Update Records, Get Records, Delete Records)
- Logic (Decision, Loop, Assignment)
- Integration (Apex, Callout)
- UI (Screen, Input, Output)
- Actions (Send Email, Post to Chatter, Submit for Approval)

----------------------------------------------------------------------------

Flow resources:
----------------
- Variables (Text, Number, Date, Boolean, SObject)
- Constants (Text, Number, Date, Boolean, SObject)
- Formula (Text, Number, Date, Boolean, SObject)
- SObject Collection (List of records)
- Apex Class (Custom logic)

----------------------------------------------------------------------------

-How to create a new contact on the account record using screen flow
----------------------------------------------------------------------------
1- Create a new flow
2- Add a screen element
   - Add input fields for the contact
   -input fields: first name, last name, email, phone

3- create recordId variable to store the account record id
   - Resource Type: Variable
   - Api Name: recordId   "must match this exactly for Salesforce to pass the record ID automatically ""
    - Data Type: Text
    - Default Value: {!Record.Id}
    - Available for input: true

    Note: when you add flow to the lightning app builder you must check the box "Available for input" to pass the record ID automatically
          Check the box "Pass record ID into this variable.

4- Add a create record element
    - select the contact object
    - map the input fields to the screen component fields
    - map the recordId variable to the accountId field

5- Activate the flow
6- Add the flow to the lightning app builder

Note: to check if the contact is created ?
      - the flow will automatically create a new contact id variable 
      - we can use this variable to display the confirmation message

Note: to handle errors ?
        - add a fault path to the create record element
        - add a screen element to display the error message , ex: "An error occurred: {!$Flow.FaultMessage}"
        - add a finish element to end the flow


----------------------------------------------------------------------------
- Create a screen flow to allow the user to create a feedback record to improve the process 
----------------------------------------------------------------------------
1- Create a new flow
2- Add a screen element
   - Add input fields for the feedback
   -input fields: rating, comments
3- Add a create record element
    - select the feedback object
    - map the input fields to the screen component fields
4- Activate the flow
5- Add the flow to the lightning app builder

----------------------------------------------------------------------------




--------------------------------------------
1- Create a new flow
2- Add a screen element
   - Add input fields for the contact
   -input fields: first name, last name, email, phone
3- Add a create record element
    - select the contact object
    - map the input fields to the screen component fields
4- Activate the flow
5- Add the flow to the lightning app builder

----------------------------------------------------------------------------






*/
