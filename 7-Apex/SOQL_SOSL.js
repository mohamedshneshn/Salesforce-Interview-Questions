/*

1-What is SOQL and SOSL in Salesforce , and how are they different from SQL?
-----------------------------------------------------------------------------
- SOQL 
  - Salesforce Object Query Language.
  - Used to query the records from a single object or related objects
  
  - Types of SOQL queries:

     1- Child to Parent: (using Dot notation)
        - Example: SELECT Name, Account.Name FROM Contact (query to retrieve the records from Contact object)

     2- Parent to Child: (using Subquery) and the name of object in plural because it returns a list of records
        - Example: SELECT Name, (SELECT LastName FROM Contacts) FROM Account (query to retrieve the records from Account object)

     Note:
     -----
    1-  we can't filter in the subquery because it returns a list of records not a single record
        EX: SELECT Name, (SELECT LastName FROM Contacts WHERE LastName = 'Smith') FROM Account // Error
    solution:
    ---------
    - we have to filter in the main query not in the subquery
    - use the IN operator to filter the records
    SELECT Name, (SELECT LastName FROM Contacts)
    FROM Account WHERE Id IN (SELECT AccountId FROM Contact WHERE LastName = 'Smith')


    2- we can't compare fields from different objects in SOQL query directly because the fields 
       are not available in the same context,
    
        EX: SELECT Name, Account.BillingState FROM Contact WHERE Account.BillingState = 'California' // Error
    solution:
    ---------
    - we have to fetch the data and compare it in the apex code
    List<Contact> contacts = [SELECT Id, Name, Account.BillingState FROM Contact];
    for(Contact con : contacts) {
        if(con.Account.BillingState == 'California') {
            System.debug(con.Name);
        }
    }
    
    3- we can't use aggregate functions in subqueries 
        EX: SELECT Name, (SELECT COUNT(Id) FROM Contacts) FROM Account 
    solution:
    ---------
    - we have to use the aggregate functions in the root query not in the subquery
    SELECT AccountId, COUNT(Id) 
    FROM Contact
    GROUP BY AccountId

    4-the name of object in plural in the subquery
        EX: SELECT Name, (SELECT LastName FROM Contact) FROM Account // Error
    solution:
    ---------
    SELECT Name, (SELECT LastName FROM Contacts) FROM Account

    5- the name of the object in the subquery should be in singular when used in the WHERE clause
        EX: SELECT Name 
           FROM Account
           WHERE Id IN (SELECT AccountId FROM Contact)

    6- to get the related opportunities of the account ,query on the parent
        EX: SELECT Name, (SELECT Name FROM Opportunities) FROM Account

    7- to get the total number of opportunities for each account, query on the child
        EX: SELECT AccountId, COUNT(Id) FROM Opportunity GROUP BY AccountId

    8- AccountId exists in the child object that refers to the parent object

  - Returns a list of records of single sObject 
  - it is read-only and can't perform DML operations
  - To Perform DML operations, we use Apex language
     Example:
       // Create a new account
         Account acc = new Account();      // Create a new instance of Account object
         acc.Name ="Test Account";         // Set the required fields
         acc.Industry = "Technology";
         insert acc;                    // Insert the record into Account object


        // create Multiple accounts
        List<Account> accList = new List<Account>();   // Create a list of Account objects
        for(Integer i=0; i<5; i++) {
            Account acc = new Account();    // Create a new instance of Account object
            acc.Name = 'Test Account ' + i;  // Set the required fields
            acc.Industry = 'Technology';
            accList.add(acc);                // Add the Account object to the list
        }
        insert accList;                      // Insert the records into Account object

        // Update an existing account
        Account acc = [SELECT Id, Name FROM Account WHERE Name = 'Test Account' LIMIT 1];   // Query the record to update
        acc.Name = 'Updated Account';     // Update the Name field
        update acc;                       // Update the record in Account object

        // Delete an existing account
        Account acc = [SELECT Id, Name FROM Account WHERE Name = 'Test Account' LIMIT 1];   // Query the record to delete
        delete acc;                       // Delete the record from Account object


- Functions of SOQL:
    - SELECT, FROM, WHERE, GROUP BY, ORDER BY, LIMIT, OFFSET, COUNT(), SUM(), AVG(), MAX(), MIN(), etc.

-Group By:
    - Used to group the records based on a field
    - you have to use an aggregate function like COUNT(), SUM(), AVG(), MAX(), MIN() with GROUP BY
    - you only can group by fields that are in the SELECT statement
    - Example: 
        SELECT Industry, COUNT(Id) 
        FROM Account 
        GROUP BY Industry

- Aggregate Functions:
    - COUNT(): Returns the number of records , COUNT(Id) it is common to use Id field to count all records even if it is null
    - SUM(): Returns the sum of the field values
    - AVG(): Returns the average of the field values
    - MAX(): Returns the maximum field value
    - MIN(): Returns the minimum field value
    - Only can be used inside the root query not in subqueries
    - used with GROUP BY when selecting non-grouped fields
    - Example: 
        SELECT Industry, COUNT(Id) 
        FROM Account 
        GROUP BY Industry

- In Operator:
    - Used to filter records based on a list of values(Hardcoded values)
    - Example: 
        SELECT Name 
        FROM Account 
        WHERE Industry IN ('Technology', 'Finance')
- In :values
    - Used to filter records using apex variables(List, Set, Map)(Dynamic values)
    - Example: 
        List<String> industries = new List<String>{'Technology', 'Finance'};
        SELECT Name 
        FROM Account 
        WHERE Industry IN :industries

- Like Operator:
    - Used to filter records based on a pattern
    - Example: 
        SELECT Name 
        FROM Account 
        WHERE Name LIKE 'Test%'  (starts with Test)

        SELECT Name
        FROM Account
        WHERE Name LIKE '%Test'  (ends with Test) 
        
-WHERE Clause:
    - Used to filter the records before grouping them or applying aggregate functions
    - Filtering individual records
    - Example: 
        SELECT Name, Industry 
        FROM Account 
        WHERE Industry = 'Technology'

-Having Clause:
    - Used to filter the records after grouping them or applying aggregate functions
    - Filtering aggregated records
    - Example: 
        SELECT Industry, COUNT(Id) 
        FROM Account 
        GROUP BY Industry
        HAVING COUNT(Id) > 5

    
---------------------------------------------------------------------------------------------------------------------------- 
-SQL
    - Structured Query Language
    - Used to query the records from a database
    - it can perform DML operations
    - Example: 
        SELECT Name, Address FROM Employee   (query to retrieve the records from Employee table)
        INSERT INTO Employee(Name, Address) VALUES('John', 'New York') (query to insert the records into Employee table)
    
----------------------------------------------------------------------------------------------------------------------------
- SOSL
    - Salesforce Object Search Language
    - Used to retrieve data from multiple objects in a single query
    - Used to perform text search on multiple objects
    - Used When you don't know in which object the data exists
    - returns a list of lists of sObjects
    - Example: 
      FIND {test}
      IN ALL FIELDS
      RETURNING Account(Name), Contact(LastName)

      output: => [Account:{Name=Test Account}, Contact:{LastName=Test Contact}]

----------------------------------------------------------------------------------------------------------------------------
Date Literals in SOQL:

- TODAY: Represents the current date
- TOMORROW: Represents the next day
- YESTERDAY: Represents the previous day
- THIS_WEEK: Represents the current week starting from Sunday
- LAST_WEEK: Represents the previous week
- NEXT_WEEK: Represents the next week
- THIS_MONTH: Represents the current month
- LAST_MONTH: Represents the previous month
- NEXT_MONTH: Represents the next month
- THIS_QUARTER: Represents the current quarter
- LAST_QUARTER: Represents the previous quarter
- NEXT_QUARTER: Represents the next quarter
- THIS_YEAR: Represents the current year
- LAST_YEAR: Represents the previous year
- NEXT_YEAR: Represents the next year
- LAST_N_DAYS:n: Represents the last n days
- NEXT_N_DAYS:n: Represents the next n days

Example:
- SELECT Name FROM Account WHERE CreatedDate = TODAY
- SELECT Name FROM Account WHERE CreatedDate = LAST_WEEK
- SELECT Name FROM Account WHERE CreatedDate = NEXT_MONTH
- SELECT Name FROM Account WHERE CreatedDate = LAST_N_DAYS:7

NOTE:
- Date literals are case-insensitive
- we can't use IN operator with date literals we have to use = operator
Example:
- SELECT Name FROM Account WHERE CreatedDate = LAST_N_DAYS:7  // correct
- SELECT Name FROM Account WHERE CreatedDate IN LAST_N_DAYS:7  // incorrect

- Date literals in Apex are represented as Date class
Example:
- Date today = Date.today();
- Date tomorrow = Date.today().addDays(1);
- Date yesterday = Date.today().addDays(-1);
- Date thisWeek = Date.today().toStartOfWeek();
- Date lastWeek = Date.today().toStartOfWeek().addDays(-7);
- Date nextWeek = Date.today().toStartOfWeek().addDays(7);

----------------------------------------------------------------------------------------------------------------------------


Examples:
1- Write a SOQL query to retrieve the top 5 Accounts with the highest Annual Revenue, ordered in descending order.
  SELECT Name, AnnualRevenue
  FROM Account
  ORDER BY AnnualRevenue
  DESC
  LIMIT 5

2- Write a SOQL query to retrieve the Contacts whose Account Industry is 'Technology'.
    SELECT Id, Name 
    FROM Contact 
    WHERE Account.Industry = 'Technology'

3- Write a SOQL query to retrieve the Accounts whose contacts have the email domain 'example.com'.
    SELECT Id, Name 
    FROM Account 
    WHERE Id IN (SELECT AccountId FROM Contact WHERE Email LIKE '%example.com')

4- Write a SOQL query to retrieve the Opportunities with the amount greater than 10000 and closed date is in the current year.
    SELECT Id, Name 
    FROM Opportunity 
    WHERE Amount > 10000 
    AND CloseDate = THIS_YEAR       // THIS_YEAR, LAST_YEAR, NEXT_YEAR, LAST_N_DAYS:30, NEXT_N_DAYS:30


5- Write a SOQL query to retrieve the Opportunities grouped by the Account Industry and showing the total amount for each group.
    
    SELECT Account.Industry, SUM(Amount)
    FROM Opportunity
    GROUP BY Account.Industry

6- Write a SOQL query to retrieve the Opportunities with the highest amount for each Account.
    SELECT AccountId, MAX(Amount)
    FROM Opportunity
    GROUP BY AccountId

7-Retrieve all Account names and their corresponding Industry from Salesforce.
    SELECT Name, Industry
    FROM Account

8-Find the total number of Opportunities for each Account.
    SELECT AccountId, COUNT(Id)
    FROM Opportunity
    GROUP BY AccountId

9-Retrieve the names of Contacts associated with an Opportunity named “XYZ Opportunity.”
    SELECT Contact.Name
    FROM OpportunityContactRole
    WHERE Opportunity.Name = 'XYZ Opportunity'

    Note: OpportunityContactRole is a junction object between Opportunity and Contact objects.
        : junction object is a child object with two master-detail relationships to two parent objects.


10-List all closed Won Opportunities along with their amounts.
    SELECT Name, Amount
    FROM Opportunity
    WHERE StageName = 'Closed Won'

11-Identify the five most recently created Leads.
    SELECT Name
    FROM Lead
    ORDER BY CreatedDate DESC
    LIMIT 5

12-Retrieve Account names and their associated Opportunities where the Opportunity Amount is greater than $50,000.
    SELECT Account.Name, Name
    FROM Opportunity
    WHERE Amount > 50000


13-Find the average amount of all closed Won Opportunities.
    SELECT AVG(Amount)
    FROM Opportunity
    WHERE StageName = 'Closed Won'

14-List the Opportunities that are due to close in the next 7 days.
    SELECT Name
    FROM Opportunity
    WHERE CloseDate = NEXT_N_DAYS:7


15-Retrieve the names and email addresses of all Contacts associated with Opportunities that are in the “Proposal” stage.
    SELECT Contact.Name, Contact.Email
    FROM OpportunityContactRole
    WHERE Opportunity.StageName = 'Proposal'


16-Find the Account with the maximum number of Opportunities.
    SELECT AccountId, COUNT(Id)
    FROM Opportunity
    GROUP BY AccountId
    ORDER BY COUNT(Id) DESC
    LIMIT 1

17-List the Opportunities that have a Close Date in the current month.
    SELECT Name
    FROM Opportunity
    WHERE CloseDate = THIS_MONTH


18-Retrieve the names of all Accounts that have both Opportunities and Cases associated with them.
    SELECT Name 
    FROM Account
    WHERE Id IN (SELECT AccountId FROM Opportunity) AND Id IN (SELECT AccountId FROM Case)
    

19-Identify the Opportunities that have not been updated in the last 30 days.
    SELECT Name
    FROM Opportunity
    WHERE LastModifiedDate < LAST_N_DAYS :30


20-Find the total number of Leads in each Lead Source category.
    SELECT LeadSource, COUNT(Id)
    FROM Lead
    GROUP BY LeadSource

21-Retrieve the names of Accounts that have Billing Postal Code starting with “9”.
   SELECT Name
   FROM Account
   WHERE BillingPostalCode LIKE '9%'


22-List the Contacts whose Mailing State is not equal to their Billing State.
    SELECT Name
    FROM Contact
    WHERE MailingState != Account.BillingState

 NOte we can't compare fields from different objects in SOQL query directly, we have fetch the data and compare
      it in the apex code

solution:
---------
    List<Contact> contacts = [SELECT Id, Name, Account.BillingState, MailingState FROM Contact];
    for(Contact con : contacts) {
        if(con.MailingState != con.Account.BillingState) {
            System.debug(con.Name);
        }
    }   


23-Find the Opportunities with a Stage of “Negotiation” and an Amount greater than $100,000.
    SELECT Name
    FROM Opportunity
    WHERE StageName = 'Negotiation'
    AND Amount > 100000

24-Retrieve the names of Accounts along with the total amount of all their associated Opportunities.
    SELECT Account.Name, SUM(Amount)
    FROM Opportunity
    GROUP BY Account.Name

25-Find the Opportunities with a Close Date in the next 14 days and sort them by Close Date in ascending order.
    SELECT Name
    FROM Opportunity
    WHERE CloseDate = NEXT_N_DAYS:14
    ORDER BY CloseDate ASC


26-Retrieve the top 3 Opportunities with the highest Amount for each Account.
    SELECT name, (SELECT name, amount FROM Opportunities order by amount desc limit 3)
    FROM Account
    WHERE id IN (SELECT AccountId FROM Opportunity)


27-Identify the Opportunities that have a custom field “Approval_Status__c” set to “Pending.”
    SELECT Name
    FROM Opportunity
    WHERE Approval_Status__c = 'Pending'

28-Find the Accounts that have not been modified in the last 60 days.
    SELECT Name
    FROM Account
    WHERE LastModifiedDate < LAST_N_DAYS:60

29-List the Opportunities with a Stage of “Closed/Won” and a Close Date in the last quarter.
    SELECT Name 
    FROM Opportunity
    WHERE StageName = 'Closed/Won'
    AND CloseDate = LAST_QUARTER

30-Retrieve the names of Accounts along with the total number of Contacts associated with each Account.
    SELECT Account.Name, COUNT(Id)
    FROM Contact
    GROUP BY Account.Name


31-List the Opportunities with a Stage of “Prospecting” that have not been modified in the last 15 days.
    SELECT Name
    FROM Opportunity
    WHERE StageName = 'Prospecting'
    AND LastModifiedDate < LAST_N_DAYS:15

32-Find the Opportunities with a Close Date in the next 90 days and an amount between $50,000 and $100,000.
    SELECT Name
    FROM Opportunity
    WHERE CloseDate = NEXT_N_DAYS:90
    AND Amount > 50000
    AND Amount < 100000

33-Identify the Accounts with more than 5 Opportunities in the “Closed/Won” stage.
    SELECT AccountId, COUNT(Id)
    FROM Opportunity
    WHERE StageName = 'Closed/Won'
    GROUP BY AccountId
    HAVING COUNT(Id) > 5


34-Retrieve the names of Accounts that have at least one Opportunity with a Stage of “Prospecting.”
    SELECT Name 
    FROM Account
    WHERE Id IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Prospecting')

    OR

    SELECT account.name , COUNT(Id)
    FROM Opportunity
    WHERE stageName = 'Prospecting'
    GROUP BY account.name

35-List the Opportunities created in the last 7 days with an Amount greater than $50,000.
    SELECT Name
    FROM Opportunity
    WHERE CreatedDate = LAST_N_DAYS:7
    AND Amount > 50000

36-Retrieve the names of Accounts along with the count of Opportunities, grouped by Industry.
    SELECT Account.Name, Account.Industry, COUNT(Id)
    FROM Opportunity
    GROUP BY Account.Name, Account.Industry


Find the Opportunities created by a specific User.
List the Opportunities with a custom field “Priority__c” set to “High” and an Amount greater than $50,000.
Retrieve the names of Accounts that have at least one Opportunity with a Stage of “Prospecting.”
Find the Contacts who are associated with Opportunities in the “Closed/Won” stage and have not been contacted in the last 30 days.
List the Opportunities with a custom field “Type__c” set to “New Business” and an Amount greater than $75,000.
Retrieve the names of Accounts along with the count of Opportunities, grouped by Industry.
Identify the Opportunities with a Close Date in the next 30 days and an Amount greater than $100,000, sorted by Amount in descending order.
Find the Contacts associated with Opportunities in the “Negotiation” stage that have not been updated in the last 15 days.
List the Opportunities that have Products with a Quantity greater than 10.
Retrieve the names of Accounts with the Billing Country set to “United States” and Annual Revenue greater than $1 million.
Find the Opportunities with a custom field “Approval_Status__c” set to “Approved” and a Close Date in the next 60 days.
Identify the Opportunities with a Stage of “Closed/Lost” and a custom field “Reason_for_Loss__c” set to “Price.”
Retrieve the names of Contacts who are associated with multiple Opportunities.
Find the Opportunities with a Stage of “Proposal” and an Amount greater than the average Opportunity Amount.
List the Opportunities that have at least one associated Task with a status of “Completed.”
Retrieve the names of Accounts that do not have any associated Contacts.
Identify the Opportunities that have a Close Date within the current fiscal quarter.
Retrieve the names of Accounts with Billing City containing the word “Tech.”






*/
