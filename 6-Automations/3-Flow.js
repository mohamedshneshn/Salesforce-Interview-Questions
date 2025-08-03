/*
🟥Flows in salesforce:
---------------------
- automation tool in salesforce that allows you to automate your business process easily using a visual design 
  interface without writing code.

-Example:
    - business need to send an email to the manager when a case is closed

Types of flows:
----------------
🟥 1-Screen flow
    ------------
    - used to guide the user through a process or collect data from the user.
    - used to created multiple different records on the same page.
    - runs when the user interacts with the flow

        Trigger: manually triggered by the user
        Use case: guide the user through a process or collect data from the user
        Execution: runs when the user interacts with the flow  

🟥 2- Record-triggered flow:
     -----------------------
     - used to execute logic when a record is created or updated or deleted
     - runs before or after the record is saved
     - runs in the background without user interaction
     - before-save(Fast field updates) : for quick field updates on the same record or validation rules
     - after-save(Actions On Related Record): for updates on related records or send an email
     - use case: send an email when a case is closed


        
⬜ 3-Autolaunched flow(subflow)
------------------------------
- it is a subflow that can be called from other flows or processes
- used to create reusable logic that can be used in multiple flows
- takes input and returns output like a function in programming
- example: autolaunched flow to send an email.
           -can be used in multiple flows.


🟥 4-Scheduled flow
-------------------
- used to run a logic at a specific time frequently(once, daily, weekly).
            
                Trigger: runs at a specific time
                Use case: send a birthday email to the contact or
                          send a notification to the opportunity owner before 2 days from the close date


🟥 platform event triggered flow
-------------------------------
- used to execute logic when a platform event is published in salesforce like
   1- Flow Execution Error Event
   2- Flow Interview Event
   3- Flow Pause Event
- use case: to save all the flow errors in a custom object to help the admin to track the errors


🟥 orchestration flow
---------------------
- used to coordinate multiple flows and processes to automate a complex business process
- it can be used to call multiple flows in a specific order
- it can be used to handle errors in a flow

--------------------------------------------------------------------------------------------------------------------------
🟥 How do you trigger a flow in Salesforce?
-------------------------------------------
- Record-triggered flow: when a record is created or updated or deleted
- Screen flow: manually triggered by the user
- Autolaunched flow: manually triggered by the user or by a process
- Scheduled flow: runs at a specific time


--------------------------------------------------------------------------------------------------------------------------

🟥 Flow elements: are the building blocks of a flow that perform specific actions or operations in the flow 
----------------
- Data (Create Records, Update Records, Get Records, Delete Records)
- Logic 
    * Decision (If/Else) used to check a condition and take different paths based on the result
    * Loop (For Loop, While Loop)
    * Assignment : used to assign a value to a variable 
                 : example: when we loop over the records and assign the record id to a variable
                 : we can use the record id in the next element in the flow to send an email to the record owner
- Integration (Apex, Callout)
- UI (Screen, Input, Output)
- Actions (Send Email, Post to Chatter, Submit for Approval)

--------------------------------------------------------------------------------------------------------------------------

🟥 Flow resources:
------------------
✅- Variables (Text, Number, Date, Boolean, SObject), used to store data that can be used in the flow
    - picklist choice set: used to display dynamically picklist values from an object field
    - text template: used to create a text template to include the record details in the email

✅- Constants (Text, Number, Date, Boolean, SObject)
✅- Formula: used to calculate the value based on the formula( Formula: {!$Flow.CurrentDateTime} + 2)
✅- SObject Collection (List of records)
✅- Apex Class (Custom logic)

--------------------------------------------------------------------------------------------------------------------------
⬜ How to handle errors in a flow?
---------------------------------
- Use a fault path to handle errors in a flow when an error occurs in an element 
- you can use the {!$Flow.FaultMessage} global variable to display the error message
- You can use the {!$Flow.CurrentDateTime} global variable to display the current date and time
Actions:
 1-Add a screen element to display the error message
 2- send an email to the user or the admin
 3- create a case record to track the error
--------------------------------------------------------------------------------------------------------------------------
⬜ What are the connectors in a flow?
------------------------------------
- Connectors are used to connect elements in a flow to define the flow of execution.

--------------------------------------------------------------------------------------------------------------------------
⬜ What is the Global record variable and the Flow variable in a flow?
----------------------------------------------------------------------
- Record variable: used to store the record data in a record-triggered flow
- Flow variable: used to store data in a flow that can be used across the flow like current date and time
                 , error message.

--------------------------------------------------------------------------------------------------------------------------
⬜ how to pass the record id from the record page?
------------------------------------------------
-in the screen flow: you have to create a variable to store the record id 
                   : type- text
                   : API name- recordId
                   : Check the box "Available for input"
                   :in the lightning app builder: you have to check the box "Pass record ID into this variable"

- in the record-triggered flow: you can use the {!Record.Id} global variable to get the record id

Note: In Screen Flows, Salesforce doesn’t automatically provide the record context. 

--------------------------------------------------------------------------------------------------------------------------
⬜ what is the differnce between the ownerId and the userId in a flow?
---------------------------------------------------------------------
- ownerId: used to store the owner id of the record
- userId: used to store the user id of the current user
ownerId = userId if the record owned by individual user
ownerId != userId if the record owned by a queue or a public group
Note: to check the owner type of the record
      -you can check the Owner.Type field in the record 
      If Owner.Type = User → The record is owned by a User.
      If Owner.Type = Queue → The record is owned by a Queue.

-Queue: used to hold the records that don't have a specific owner
      : multiple users can be members of the queue
      : use case: to assign the case to the support team to handle the case


--------------------------------------------------------------------------------------------------------------------------
⬜ how to send custom notifications in a flow?
---------------------------------------------
- used to send custom notifications to the users in salesforce
- first, you have to create a custom notification type in the setup to use it in the flow

--------------------------------------------------------------------------------------------------------------------------
🟥Flow Best Practices:
----------------------
1- Use descriptive names for elements, variables, and resources
2- Use comments to explain complex logic or decision points
3- Use fault paths to handle errors and provide meaningful error messages
4- Use subflows to reuse logic across multiple flows
5- Use constants and formulas to simplify complex calculations
6- Test your flows in a sandbox environment before deploying to production
7- Document your flows and process for future reference
8- Use screen flows to guide users through a process or collect data from the user
9- Use record-triggered flows to automate business processes based on record changes
10- Use scheduled flows to run logic at a specific time or interval
11- Use autolaunched flows to create reusable logic that can be called from other flows or processes
--------------------------------------------------------------------------------------------------------------------------
Example:
--------
🟥1- Screen flow to allow the user to create a new Account and related Contact record and 
     related Opportunity record on the Home page.(Create Account_Account_Opportunity)

1- Create a new flow
2- Add a screen element
   - Add input fields for the account
    -input fields: name, industry, phone
3- Add a create record element
    - select the account object
    - map the input fields to the screen component fields

4- add fault path to the create record element
    - add a screen element to display the error message

5- Add a screen element
   - Add input fields for the contact
   -input fields: first name, last name, email, phone
6- Add a create record element
     - select the contact object
     - map the input fields to the screen component fields
   ✅- map the account id to the AccountId field from create account record

7- Add fault path to the create record element
    - add a screen element to display the error message

8- Add a screen element
    - Add input fields for the opportunity
    -input fields: name, amount, close date, stage
   ✅- add a picklist choice set to select the stage from the object
9- Add a create record element
    - select the opportunity object
    - map the input fields to the screen component fields
    ✅- map the account id to the AccountId field from create account record

10- Add fault path to the create record element
    - add a screen element to display the error message

11- add screen element to display the confirmation message
    -select display text
    ✅- add a text message "Account, Contact, and Opportunity created successfully"
12- Activate the flow



--------------------------------------------------------------------------------------------------------------------------
🟥2-screen flow to create a new contact on the account record using screen flow(Create Contact)
---------------------------------------------------------------------------------------------------------
1- Create a new flow
2- Add a screen element
   - Add input fields for the contact
   -input fields: first name, last name, email, phone

3- create recordId variable to store the account record id
    ✅- Resource Type: Variable
    ✅- Api Name: recordId   "must match this exactly for Salesforce to pass the record ID automatically ""
    - Data Type: Text
    - Available for input: true

    ✅Note: when you add flow to the lightning app builder you must check the box "Available for input" to pass the record ID automatically
          Check the box "Pass record ID into this variable.

4- Add a create record element
    - select the contact object
    - map the input fields to the screen component fields
    - map the recordId variable to the accountId field

 5- Activate the flow
 ✅6- Add the flow to the lightning app builder and check the box "Pass record ID into this variable"

 ✅Note: to check if the contact is created ?
      - the flow will automatically create a new contact id variable 
      - we can use this variable to display the confirmation message

------------------------------------------------------------------------------------------------------------------------
🟥3-Screen flow to allow the user to create a feedback record to improve the process (Feedback)
----------------------------------------------------------------------------------------------
1- Create a new flow
2- Add a screen element
   - Add input fields for the feedback
   -input fields: rating, comments
3- Add a create record element
    - select the feedback object
    - map the input fields to the screen component fields
4- Activate the flow
5- Add the flow to the lightning app builder

------------------------------------------------------------------------------------------------------------------------
🟥4- Fast Field Update flow to update the periority of the opportunity record based on the amount field 
    if the amount is greater than 10000 then set the priority to high otherwise set the priority to low (UpdateOpportunityPriority)

   
1- Create a new flow
2- Add a record-triggered element
    - select the opportunity object
    - select the record is created or updated

3- Add Enter criteria
    - set the criteria to check if the amount is greater than 0

4- Add a decision element
    - check if the amount is greater than 10000
    - Add update record element
        - select the opportunity object
        - set the priority field to high
    - default path
        - Add update record element
        - select the opportunity object
        - set the priority field to low
5- Activate the flow
------------------------------------------------------------------------------------------------------------------------
🟥5-After Save flow to send an email when a new opportunity is created with amount greater than 100000
    (SendEmailOpportunity)
1- Create a new flow
2- Add a record-triggered element
    - select the opportunity object
    - select the record is created
3- Add Enter criteria
    - set the criteria to check if the amount is greater than 100000
4- Add a action element
    - select the send email action
    - set the body(create a text template to include the opportunity details)
       Hello Everyone,
        There is new High priority opportunity is created
        {!$Record.Name} with amount {!$Record.Amount} is created
        thanks
    - set the recipient address list(Who will receive the email)
    - set the subject 
    - set Rich-Text-Formatted Body to true to use the text template


5- Activate the flow
------------------------------------------------------------------------------------------------------------------------
🟥6-After Save flow When an Account's Active field is set to "No", 
   update all related open Cases to "Closed" with a reason "Account Inactive".(UpdateCasesStatus)
1- Create a new flow
2- Add a record-triggered element
    - select the account object
    - select the record is created or updated
3- Add Enter criteria
    - set the criteria to check if the active field is set to "No"
4- Add a get records element
    - select the case object
    - set the filter to get all related open cases
5- Add a loop element
    - set the loop to iterate over the records from the get records element
6- Add a decision element
    - check if the status is open
    - Add update record element
        - select the case object
        - set the status to closed
        - set the reason to "Account Inactive"
7- Activate the flow
------------------------------------------------------------------------------------------------------------------------
🟥7-Scheduled flow to send a custom notification to the opportunity owner
    sales rep before the opportunity close date two days before the close date (SendEmailOpportunityCloseDate)

1- Create a new flow
2- Add a scheduled-triggered element
    - set the schedule to run two days before the close date
3- Add a get records element
    - select the opportunity object
    - set the filter to get all opportunities with close date two days from now
    ✅ Note: you can use the formula to get the close date two days from now {!$Flow.CurrentDateTime} + 2

4- Get Records
    -select the custom notification type

4- Add a loop element
    - set the loop to iterate over the records from the get records element
5- add assignment element to set the opportunity owner id to a variable(collection variable)
    - set the variable type to text
    - set the value to the owner id from the opportunity record

6- Add a action element
    - select the send custom notification action
    - set the custome notification type id(Select the custom notification type)
    - Set Notification Body
    - Set Notification Title
   ✅  - Set Recipient Ids(should be the opportunity owner id in the collection variable)
   ✅  - Set the target Id(should be the opportunity id from the loop element) when the notification is clicked

7- Activate the flow
------------------------------------------------------------------------------------------------------------------------
🟥8- platform event flow to save all the flow errors in a custom object to help the admin to track the errors(FlowErrorEvent)
1- Create a new flow
2- Add a platform event-triggered element
    - select the flow error event
3- Add a create record element
    - select the custom object to store the flow errors
    - map the fields from the platform event to the custom object
    - Description: {!$Flow.FaultMessage}
    - Flow Name: {!$Flow.FlowName}
4- Activate the flow
------------------------------------------------------------------------------------------------------------------------

*/
