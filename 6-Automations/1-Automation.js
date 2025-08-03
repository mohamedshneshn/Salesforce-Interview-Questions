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



⬜-What is the difference between workflow task and alert?
-------------------------------------------------------
- Workflow Task: used to assign a task to a user or queue.
- Workflow Alert: used to send an email to a user or queue.

---------------------------------------------------------------------------------------------------------------------------------------------
 ⬜- Approval Processes:
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
    🟥 - actions can be[ Field Update, Email Alert, Outbound Message, Task, Custom Action]
       - approvers can be[ User, Role, Role Hierarchy, Public Group, Custom Hierarchy]
    ⬜ -Note you can send SMS using external services like Twilio or Plivo.

---------------------------------------------------------------------------------------------------------------------------------------------
 

---------------------------------------------------------------------------------------------------------------------------------------------









*/
