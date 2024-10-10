/*

What is SOQL and SOSL in Salesforce , and how are they different from SQL?
-----------------------------------------------------------------------------
- SOQL 
  - Salesforce Object Query Language.
  - Used to query the records from a single object or related objects
  
  - Types of SOQL queries:

     1- Child to Parent: (usiing Dot notation)
        - Example: SELECT Name, Account.Name FROM Contact (query to retrieve the records from Contact object)

     2- Parent to Child: (using Subquery)
        - Example: SELECT Name, (SELECT LastName FROM Contacts) FROM Account (query to retrieve the records from Account object)

    
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
    - Used to search the records from multiple objects
    - Used to retrieve data from multiple objects in a single query
    - it is used to search for a specific term in multiple objects and fields
    - returns a list of lists of sObjects
    - Example: 
      FIND {test}
      IN ALL FIELDS
      RETURNING Account(Name), Contact(LastName)

      output: => [Account:{Name=Test Account}, Contact:{LastName=Test Contact}]


----------------------------------------------------------------------------------------------------------------------------


- How to Create one account and accounts using apex code?

   public class createNewAccounts {
    
    public void createOneAccount(String name){
        
        Account newAcc = New Account();  // create an instance of account class
        newAcc.Name = name;              //assign reqired fields
        try{
            Insert newAcc;
            System.debug('a new Account has inserted');
            
        }catch(Exception e){
            System.debug('Failed Inserted ' + e.getmessage());
            
        }
    }
    
    
    public void createMultipleAccounts(List<String> accountNames){
        List<Account> newAccounts = New List<Account>(); // create list to hold the all new accounts
        
        for(String accountName:AccountNames){
            Account newAcc = New Account();
            newAcc.Name = accountName;
            newAccounts.add(newAcc);
        }
        try{
            Insert newAccounts;
            System.debug('newAccounts Inserted');
            
        }catch(Exception e){
            
            System.debug('Failed ' + e.getmessage());
        }
        
    }
    
}

to execute the above code:
---------------------------
createNewAccounts newAcc = New createNewAccounts();
newAcc.createOneAccount('Test Account');
newAcc.createMultipleAccounts(new List<String>{'Account1','Account2','Account3'});

----------------------------------------------------------------------------------------------------------------------------

what is the Governor Limits in Salesforce?
------------------------------------------
- used to determine the maximum number of DML operations that can be performed in a single transaction to
  ensure the stability and performance of the Salesforce platform.
- and to prevent one application from taking up too many resources and impacting other applications.

- governor limits encourage developers to write efficient code and avoid long-running or resource-intensive operations.




                                         Syncronous Apex            Asyncronous Apex

No of SOQL queries per transaction            100                         100
No of records retrieved per transaction       50,000                      50,000

No of SOSL queries per transaction             20                          20
No of records retrieved per transaction        2000                        2000

No of DML operations:                          150                         150     

Heap size limit:                              6 MB                        12 MB
(Memory limit during execution)

Execution time:                               10 sec                      60 min(Batch Apex), 5 min(Future method),24 hours(Scheduled Apex)

- If the governor limits are exceeded, Salesforce will throw a LimitException and the transaction will be rolled back.

----------------------------------------------------------------------------------------------------------------------------

what is the SOQL injection and how to prevent it?
---------------------------------------------------

- is a type of attack where the attacker can insert code into soql query to get unauthorized access to the data.

- Example:
    - SELECT Id, Name FROM Account WHERE Name = ' + name + '
    - if the attacker enters the value as ' OR '1' = '1, the query will become:
      SELECT Id, Name FROM Account WHERE Name = '' OR '1' = '1'

- To prevent SOQL injection:
    - Use bind variables in the query to avoid concatenating the query string.
    - Example:
        String name = 'Test Account';
        Account acc = [SELECT Id, Name FROM Account WHERE Name = :name LIMIT 1];

- Use the escapeSingleQuotes() method to escape single quotes in the input string.
    - Example:
        String name = 'Test Account';
        name = String.escapeSingleQuotes(name);
        Account acc = [SELECT Id, Name FROM Account WHERE Name = :name LIMIT 1];

- Use the Database.query() method to execute dynamic SOQL queries.
    - Example:
        String query = 'SELECT Id, Name FROM Account WHERE Name = \'' + name + '\' LIMIT 1';
        Account acc = Database.query(query);
*/