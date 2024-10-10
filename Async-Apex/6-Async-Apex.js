/*

 How do you handle bulk processing in Salesforce?
-------------------------------------------------
- Bulk processing like inserting large amounts of data, updating large amounts of data, and deleting large amounts of data in Salesforce.
- bulk processing in Salesforce is handled using Batch Apex.

- Note some best practices for bulk processing in Salesforce:
  1- perform the SOQL query in the start() method outside the for loop.
  2- Perform DML operations outside the for loop to avoid hitting governor limits.

  Example:
 ---------
 Account List<Account> accList = [SELECT Id, Name FROM Account WHERE Name = 'Test Account'];
 for(Account acc : accList){
        acc.Name = 'Updated Account';
    }
    update accList;


- Batch Apex:
-------------
- Used to handle large amounts of data in Salesforce by breaking the data into batches rather than processing all the data at once.
  to avoid hitting governor limits.

- batch apex is an asynchronous process that is executed in the background without blocking the user interface.




- Batch Apex consists of three methods:
    1- start(): used to query the records to be processed.
    2- execute(): used to execute the logic on the batch records. like updating the records, deleting the records, etc.
    3- finish(): used to perform final actions after the batch job is completed.

Note:
-----
- the batch size is 200 records by default, and can be changed using the scope parameter in the Database.executeBatch() method.
- we can run 5 batch jobs concurrently in an org.


- Example:

global class AccountBatch implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext bc) {                              //bc: batchable context
        return Database.getQueryLocator([SELECT Id, Name FROM Account WHERE Name = 'Test Account']);
    }

    global void execute(Database.BatchableContext bc, List<Account> scope) {    //scope: batch records
        for(Account acc : scope){
            acc.Name = 'Updated Account';
        }
        update scope;
    }

    global void finish(Database.BatchableContext bc) {
        System.debug('Batch job completed successfully.');
    }

}

- To run the batch job:
    AccountBatch batch = new AccountBatch();
    Database.executeBatch(batch);

- To run the batch job with a specific batch size:
    AccountBatch batch = new AccountBatch();
    Database.executeBatch(batch, 100);

- To run the batch job with a specific batch size and scope:
    AccountBatch batch = new AccountBatch();
    Database.executeBatch(batch, 100, [SELECT Id, Name FROM Account WHERE Name = 'Test Account']);


----------------------------------------------------------------------------------------------------------------------------




*/