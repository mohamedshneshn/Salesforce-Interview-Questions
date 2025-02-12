/*

 🟥 What is Apex Triggers?
----------------------
- it is an automation tool in Salesforce that allows you to perform custom actions before or after DML operations like insert, update, delete, or undelete.
- is a piece of apex code that executes before or after DML operations to perform custom actions like validation,
   updating related records, or automating business processes.


🟥 Types of Triggers:
------------------
- Before Triggers: used to perform custom actions before the record is saved to the database like validation rules.
- After Triggers: used to perform custom actions after the record is saved to the database like sending an email notification
                  or updating related records.

🟥 Trigger Events:
-----------------
        1- Before Insert : Trigger fires before the record is inserted into the database.
        2- Before Update : Trigger fires before the record is updated in the database.
        3- Before Delete : Trigger fires before the record is deleted from the database.
        4- After Insert : Trigger fires after the record is inserted into the database.
        5- After Update : Trigger fires after the record is updated in the database.
        6- After Delete : Trigger fires after the record is deleted from the database.
        7- After Undelete : Trigger fires after the record is recovered from the recycle bin.

 🟥 Note: There is no before undelete trigger event in Salesforce
          - because the record is not active when it is in the recycle bin.
          - there is no context to perform actions before the record is recovered.
          - you can use after undelete trigger event to perform actions after the record is recovered like updating related records.
          - When a record is recovered from the recycle bin, it is considered as an insert operation.
          - When a record is deleted, it is moved to the recycle bin and can be recovered within 15 days.

🟥 Trigger Context Variables:
----------------------------
- holds information about the trigger context like the new and old versions of the records, trigger events, etc.
- used to control the trigger logic based on the trigger events.

        🟥 1- Trigger.new :list of the new versions of the records being inserted or updated.
                          :Available in before insert, before update, after insert, and after update triggers.
                          :Not available in before delete, after delete because the record is being deleted.
                          : [ {Id=Id1, Name=R1}, {Id=Id2, Name=R2}, {Id=Id3, Name=R3} ]

        🟥 2- Trigger.old : list of the old versions of the records being updated or deleted.
                          : Available in before update, after update, before delete, and after delete triggers.
                          : Not available in before insert, after insert because the record is not saved yet.
                          : [ {Id=Id1, Name=R1}, {Id=Id2, Name=R2}, {Id=Id3, Name=R3} ]

      

        🟥 3- Trigger.newMap :map of key-value pairs where the key is the record ID and the value is the record itself.
                            :Available in before insert, before update, after insert, and after update triggers.
                            :Not available in before delete, after delete because the record is being deleted.
                            : [ {Id1=Record1}, {Id2=Record2}, {Id3=Record3} ]
                            : used to store and update related records.
                            : quick access to the record using the record ID.
                            : used to compare the old and new versions of the records.
        
             Example: Map<Id, Account> newAccountMap = Trigger.newMap;
          
        🟥 4- Trigger.oldMap : Returns a map of the old versions of the sObject records.
        🟥 5- Trigger.isInsert : Returns true if the trigger was fired due to an insert operation.
        🟥 6- Trigger.isUpdate : Returns true if the trigger was fired due to an update operation.
        🟥 7- Trigger.isDelete : Returns true if the trigger was fired due to a delete operation.
        🟥 8- Trigger.isBefore : Returns true if the trigger was fired before the record was saved.
        🟥 9- Trigger.isAfter : Returns true if the trigger was fired after the record was saved.
        🟥  10- Trigger.isExecuting : Returns true if the trigger is currently executing.
        🟥 11- Trigger.isUndelete : Returns true if the trigger was fired due to an undelete operation.


🟥 Availability of Trigger.newMap and Trigger.oldMap Across Events
-------------------------------------------------------------
Trigger Event	Trigger.new		    Trigger.old		Modifiable?
                Trigger.newMap      Trigger.oldMap

before insert	✅ Available	       ❌ Not Available	✅ Yes, you can modify Trigger.new because the record is not saved yet
after insert	✅ Available		   ❌ Not Available	❌ No because the record is already saved

before update	✅ Available		   ✅ Available	    ✅ Yes, you can modify Trigger.new
after update	✅ Available		   ✅ Available		❌ No

before delete	❌ Not Available	   ✅ Available		❌ No 
after delete	❌ Not Available	   ✅ Available		❌ No

after undelete	✅ Available	       ❌ Not Available	❌ No


----------------------------------------------------------------------------------------------------------------------------
🟥 add error method:
-----------------
- apex method used to prevent DML operations like insert, update, delete, or undelete if the record does not meet certain criteria.

- Example:
    if(opp.CloseDate < Date.today()){
        opp.CloseDate.addError('Closing date cannot be in the past');
    }
    
----------------------------------------------------------------------------------------------------------------------------
🟥 Best Practices for Triggers:
----------------------------
1- Bulkify the Code: 
    - handle multiple records at once to avoid hitting the governor limits.
    - Use collections like lists, sets, and maps to process records in bulk instead of one by one.
    - Avoid SOQL queries and DML operations inside loops.
    - use map to store and update related records.
2- Use Trigger Handler Classes:
   - Separate the trigger logic into seprate classe to make the code more reusable and easier to maintain.
3- Avoid SOQL Queries in Loops: Avoid querying the database inside loops to improve performance.
4- Use Context Variables to Control the Trigger Logic: Use trigger context variables to control the trigger logic based on the trigger events.
5- Write Unit Tests: Write unit tests to cover at least 75% of the trigger code to ensure it works as expected.
----------------------------------------------------------------------------------------------------------------------------
🟥 AggregateResult in Salesforce:
------------------------------
- is a data type used to store the result of an aggregate query like SUM, AVG, MIN, MAX, COUNT.
- stores the result of the aggregate query in a key-value pair format where the key is the alias of the aggregate function and the value is the result.
- behaves like a list of maps where each map represents the result of an aggregate query.
- should use .get() method to access the value of the aggregate result.
- should cast the value to the appropriate data type before using it.
-Snippet of the result of an aggregate query:
  {{totalAmount=1000.0}, {totalAmount=2000.0}, {totalAmount=3000.0}}

- Example:
    List<AggregateResult> results = [SELECT SUM(Amount) totalAmount FROM Opportunity];
    for(AggregateResult ar : results){
        Decimal totalAmount = (Decimal)ar.get('totalAmount');
    }


----------------------------------------------------------------------------------------------------------------------------
🟥 When would you use a Trigger instead of Workflow, Process Builder, or Flows?
---------------------------------------------------------------------------
- When you need to perform complex logic and handle multiple records at once.
- When you need to update related records or perform cross-object operations.
- When you need to validate the data before saving it to the database.


----------------------------------------------------------------------------------------------------------------------------
🟥 Examples of Apex Trigger:
------------------------
🟥 1- Create a trigger to update the account name to uppercase before inserting the record.
    
Apex Trigger:
-------------
trigger AccountTrigger on Account (before insert){
    if(Trigger.isBefore && Trigger.isInsert){
        AccountTriggerHandler.convertAccountNameToUpper(Trigger.new);
    }
}
Apex Trigger Handler Class:
----------------------------
public class AccountTriggerHandler {
    public static void convertAccountNameToUpper(List<Account> accounts){
        for(Account acc : accounts){
            acc.Name = acc.Name.toUpperCase();
        }
    }
}
Apex Trigger Test Class:
-------------------------
@isTest
public class AccountTriggerTest {
    @isTest
    private static void testConvertAccountNameToUpper(){   
        Account newAcc = new Account();
        newAcc.Name = 'youmna';
        Test.startTest();
        insert newAcc;
        Test.stopTest();
        Account insertedAcc = [SELECT name, id FROM Account WHERE id = :newAcc.id];
        System.assertEquals(insertedAcc.name,'YOUMNA','account name should be YOUMNA');
    }
}
----------------------------------------------------------------------------------------------------------------------------
🟥 2-A sales team wants to ensure that no Opportunity is created with a closing date in the past.
   How would you enforce this with a trigger?

Apex Trigger:
-------------
trigger OpportunityTrigger on Opportunity (before insert, before update){
    if(Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate)){
        OpportunityTriggerHandler.validateClosingDate(Trigger.new);
    }
}
Apex Trigger Handler Class:
----------------------------
public class OpportunityTriggerHandler {
    public static void validateClosingDate(List<Opportunity> opps){
        for(Opportunity opp : opps){
            if(opp.CloseDate < Date.today()){
                opp.closeDate.addError('Closing date cannot be in the past');  // add error message to the record
            }
        }
    }
}
Apex Trigger Test Class:
-------------------------
@isTest
public class OpportunityTriggerTest {
    @isTest
    private static void testValidateClosingDate(){
        
        Opportunity newOpp = new Opportunity();
        newOpp.Name = 'Test Opportunity';
        newOpp.CloseDate = Date.today().addDays(-1);  // Set closing date in the past
        
        Test.startTest();
        try{
            insert newOpp;
            System.assert(false, 'Opportunity with past closing date should not be inserted');
        }catch(DmlException e){
            System.assert(e.getMessage().contains('Closing date cannot be in the past'));
        }
        Test.stopTest();
    }
}
----------------------------------------------------------------------------------------------------------------------------
🟥 3- When an Account’s status changes to ‘Inactive’, all related Opportunities should be marked as ‘Closed Lost’.
   How would you accomplish this?

Apex Trigger:
-------------
trigger AccountTrigger on Account (after update){
    if(Trigger.isAfter && Trigger.isUpdate){
        AccountTriggerHandler.updateRelatedOpportunities(Trigger.newMap, Trigger.oldMap);
    }
}
Apex Trigger Handler Class:
----------------------------
public class AccountTriggerHandler {
    public static void updateRelatedOpportunities(Map<Id, Account> newAccounts, Map<Id, Account> oldAccounts){
       
        set<Id> inactiveAccountIds = new set<Id>();
        for(Id accId : newAccounts.keySet()){
            if(newAccounts.get(accId).Status__c == 'Inactive' && oldAccounts.get(accId).Status__c != 'Inactive'){
                inactiveAccountIds.add(accId);
            }
        }    
        if(!inactiveAccountIds.isEmpty()){
            List<Opportunity> oppsToUpdate = [SELECT Id, StageName FROM Opportunity WHERE AccountId IN :inactiveAccountIds AND StageName != 'Closed Lost'];
            for(Opportunity opp : oppsToUpdate){
                opp.StageName = 'Closed Lost';
            }
            if(!oppsToUpdate.isEmpty()){
                update oppsToUpdate;
            }            
        }  
}
Apex Trigger Test Class:
-------------------------
@isTest
public class AccountTriggerTest {
    @isTest
    private static void testUpdateRelatedOpportunities(){  
        Account newAcc = new Account();
        newAcc.Name = 'Test Account';
        newAcc.Status__c = 'Active';
        insert newAcc;  
        Opportunity newOpp = new Opportunity();
        newOpp.Name = 'Test Opportunity';
        newOpp.AccountId = newAcc.Id;
        newOpp.StageName = 'Prospecting';
        insert newOpp;     
        newAcc.Status__c = 'Inactive';
        update newAcc;      
        Opportunity updatedOpp = [SELECT StageName FROM Opportunity WHERE Id = :newOpp.Id];
        System.assertEquals(updatedOpp.StageName, 'Closed Lost', 'Opportunity stage should be Closed Lost');
    }
}   
----------------------------------------------------------------------------------------------------------------------------
🟥 4-A company wants to prevent the deletion of Account records that have related Opportunities.
  How would you implement this using a trigger?

Apex Trigger:
-------------
trigger AccountTrigger on Account (before delete){
    if(Trigger.isBefore && Trigger.isDelete){
        AccountTriggerHandler.preventAccountDeletion(Trigger.old);
    }
}
Apex Trigger Handler Class:
----------------------------
public class AccountTriggerHandler{  
    public static void preventDelteAccountWithRelatedOpps(map<Id, Account> oldAccounts){ 
        set<Id> accIds = oldAccounts.keySet();   
        List<Opportunity> RelatedOpps = [SELECT  AccountId FROM Opportunity WHERE AccountId In:accIDs]; 
        List<Id> accWithRelatedOpp = new list<Id>();
        for(Opportunity opp:RelatedOpps){
            accWithRelatedOpp.add(opp.AccountId);
        }
        for(Id accId:accIds){
            if(accWithRelatedOpp.contains(accId)){
                oldAccounts.get(accId).addError('cant delete this account because there is related opportunity');
                
            }
        }
    }
}
Apex Trigger Test Class:
-------------------------
@isTest
public class AccountTriggerTest {

    @isTest
    private static void testPreventAccountDeletion(){ 
        Account newAcc = new Account();
        newAcc.Name = 'Test Account';
        insert newAcc;
        
        Opportunity newOpp = new Opportunity();
        newOpp.Name = 'Test Opportunity';
        newOpp.AccountId = newAcc.Id;
        insert newOpp;
        
        Test.startTest();
        try{
            delete newAcc;
        }catch(DmlException e){
            System.assert(e.getMessage().contains('Cannot delete account with related opportunities'));
        }
        Test.stopTest();
    }
}
----------------------------------------------------------------------------------------------------------------------------
🟥 5- Write an Apex trigger to update the Account Rating to 'Hot' if the Account has more than 5 Opportunities.
   How would you test this trigger?

Apex Trigger:
-------------
trigger OpportunityTrigger on Opportunity(after insert, after update, after delete , after undelete){ 
    if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate || Trigger.isDelete || Trigger.isUndelete)){
        OpportunityTriggerHandler.updateAccountRating(Trigger.isDelete ? Trigger.old : Trigger.new);
    } 
}
Apex Trigger Handler Class:
----------------------------
public class OpportunityTriggerHandler {
    public static void updateAccountRating(list<Opportunity> opps){
        list<Id> accIds= new List<Id>();
        for(Opportunity opp:Opps){
            accIds.add(opp.AccountId);
        } 
        //object k-v pairs
        list<AggregateResult> relatedOpps = [SELECT AccountId , COUNT(Id)
                                               FROM Opportunity
                                               WHERE AccountId IN:accIds
                                               AND Account.Rating != 'Hot'
                                               GROUP BY AccountId
                                               HAVING COUNT(Id) > 5];
        if(!relatedOpps.isEmpty()){
        list<Id> accIdsToUpdate = new list<Id>();
        for(AggregateResult ar:relatedOpps){
            accIdsToUpdate.add((Id) ar.get('AccountId'));
        }     
        List<Account> accountsToUpdate = [SELECT name, Rating, Id FROM Account WHERE Id IN:accIdsToUpdate];    
        for(Account acc:accountsToUpdate){
            acc.Rating = 'Hot';
        }     
        update accountsToUpdate; 
       }
    }
}

Apex Trigger Test Class:
-------------------------
@isTest
public class OpportunityTriggerTest {
    @isTest
    private static void testUpdateAccountRating(){ 
        Account newAcc = new Account();
        newAcc.Name = 'Test Account';
        insert newAcc;
        
        for(Integer i=0; i<6; i++){
            Opportunity newOpp = new Opportunity();
            newOpp.Name = 'Test Opportunity ' + i;
            newOpp.AccountId = newAcc.Id;
            insert newOpp;
        }
        
        Test.startTest();
        List<Account> updatedAccount = [SELECT Rating FROM Account WHERE Id = :newAcc.Id];
        System.assertEquals(updatedAccount.Rating, 'Hot', 'Account rating should be Hot');
        Test.stopTest();
    }
}
----------------------------------------------------------------------------------------------------------------------------
🟥 6- Write an Apex trigger to update the Account Rating to 'Cold' if the Account has no related Opportunities.
   How would you test this trigger?

Apex Trigger:
-------------
trigger OpportunityTrigger on Opportunity(after insert, after update, after delete , after undelete){
    if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate || Trigger.isDelete || Trigger.isUndelete)){
        OpportunityTriggerHandler.updateAccountRating(Trigger.isDelete ? Trigger.old : Trigger.new);
    }
}
Apex Trigger Handler Class:
----------------------------
public class OpportunityTriggerHandler {
    
    public static void updateAccountRating(List<Opportunity> Opps){
        // Step 1: Collect Account Ids (Ignoring NULL values)
      Set<Id> accIds = new Set<Id>();
        for(Opportunity opp:opps){
            accIds.add(opp.AccountId);
        } 
        // Exit if no valid AccountIds
         if (accIds.isEmpty()) {
            return; 
        }
        
         // Step 2: Get the number of related Opportunities per Account
        List<AggregateResult> RelatedOppsCount = [SELECT AccountId, COUNT(Id) numOfOpp
                                                  FROM Opportunity
                                                  WHERE AccountId IN:accIds
                                                  GROUP BY AccountId];
        
        // Step 3: Map AccountId to Opportunity Count
        map<Id, Integer> RelatedOppsCountMap = new Map<Id,Integer>();
        for(AggregateResult ar:RelatedOppsCount){
            Id accId = (Id) ar.get('AccountId');
            Integer oppCount = (Integer) ar.get('numOfOpp');
            RelatedOppsCountMap.put(accId,oppCount);
        }
            
         // Step 4: Fetch Accounts and Update Rating Only If Needed
        list<Account> relatedAccs = [SELECT name, id ,Rating FROM Account WHERE id IN:accIds];
        for(Account acc:relatedAccs){
            Integer count = RelatedOppsCountMap.get(acc.Id);
            String newRating;
            if(count == 0 || count == null){
                newRating = 'COLD';
            }
            else if (count >=1 && count <=5){
                newRating = 'WARM';
            }else{
                newRating = 'HOT';
            }
            // Only update if the Rating is different
            if (acc.Rating != newRating) {
                acc.Rating = newRating;
            }

        }
        update relatedAccs;
    }          
}



----------------------------------------------------------------------------------------------------------------------------
🟥 7- Write an Apex trigger to update the Account Rating to 'Warm' if the Account has between 1 and 5 Opportunities.   
  
Apex Trigger:
-------------
trigger OpportunityTrigger On Opportunity (after insert, after update, after delete ,after undelete){
    
    if(Trigger.isAfter && (Trigger.isInsert || Trigger.isDelete || Trigger.isUpdate || Trigger.isUndelete)){
        OpportunityTriggerHandler.updateAccountRating(Trigger.isDelete? Trigger.old : Trigger.new);
    }
}

Apex Trigger Handler Class:
----------------------------
public class OpportunityTriggerHandler {
    public static void updateAccountRating(List<Opportunity> Opps){  
      //get the accIds for each opportunity
      //calculate the num of opp per each account and get only 1>n>5
      //update the account.rating to 'warm'
      
      Set<Id> AccIds = new Set<Id>();
        for(Opportunity opp:opps){
            AccIds.add(opp.AccountId);
        }
      List<AggregateResult> numOfRelatedOpps = [SELECT AccountId, COUNT(Id)
                                                FROM Opportunity
                                                WHERE AccountId IN:AccIds 
                                                GROUP BY AccountId
                                                HAVING COUNT(Id) >= 1
                                                AND COUNT(Id) <= 5];
        
      map<Id, Account> accsToUpdate = new map<Id ,Account>();
        for(AggregateResult ar:numOfRelatedOpps){
            Id accId = (id) ar.get('AccountId');
            accsToUpdate.put(accId, new Account(Id = accId, Rating ='Warm'));
        }
        update accsToUpdate.values();  
  }
}
Apex Trigger Test Class:
-------------------------
@isTest
public class OpportunityTriggerTest {
    @isTest
    private static void testUpdateAccountRating(){ 
        Account newAcc = new Account();
        newAcc.Name = 'Test Account';
        insert newAcc;
        
        for(Integer i=0; i<3; i++){
            Opportunity newOpp = new Opportunity();
            newOpp.Name = 'Test Opportunity ' + i;
            newOpp.AccountId = newAcc.Id;
            insert newOpp;
        }
        
        Test.startTest();
        List<Account> updatedAccount = [SELECT Rating FROM Account WHERE Id = :newAcc.Id];
        System.assertEquals(updatedAccount.Rating, 'Warm', 'Account rating should be Warm');
        Test.stopTest();
    }
}  

----------------------------------------------------------------------------------------------------------------------------

    


*/
