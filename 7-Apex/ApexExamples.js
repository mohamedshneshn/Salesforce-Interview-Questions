/*
1- Write an Apex class and a test class to to create one account.

Apex class:
------------
public class CreateNewAccounts {
    
    public static Account createOneAccount(string name){
        
        Account newAcc = new Account();
        newAcc.Name = name;     
        try{
            insert newAcc;
            System.debug('New Account Inserted'+newAcc);
            
        }catch(Exception e){
            System.debug('Inserted Failed'+e.getmessage());
        }
        return newAcc;
    }
}
Test class:
-----------
@isTest
public class TestCreateNewAccounts {

    @isTest
    private static void testCreateOneAccount_success(){
        Test.startTest();
        Account insertedAcc = CreateNewAccounts.createOneAccount('ethar');
        Test.stopTest();
        System.assertEquals(insertedAcc.Name,'ethar','Account name should be ethar');
    }
    
    @isTest
    private static void testCreateOneAccount_faliure(){
        Test.startTest();
        Account insertedAcc = CreateNewAccounts.createOneAccount('');
        Test.stopTest();
        System.assertEquals(insertedAcc.Name,'','Account name should be null');
        
    }
}
----------------------------------------------------------------------------------------------------------------------------
2- Write an Apex class and a test class to create multiple accounts.

Apex class:
------------
public class CreateNewAccounts {
    public static list<Account> createThreeAccounts(list<string> names){
        
        list<Account> newAccounts = new list<Account>(); 
        for(String name:names){
            Account newAcc = new Account();
            newAcc.Name = name;
            newAccounts.add(newAcc);
        }
        try{
            insert newAccounts;
            System.debug('new Accounts Inserted' + newAccounts);
        }catch(Exception e){
            System.debug('Failed Inserted' + e.getmessage());
        }
        return newAccounts;
    } 
}
Test class:
-----------
@isTest
private class TestCreateNewAccounts {
        @isTest
    private static void testCreateThreeAccounts_success(){
        
        list<string> accNames = new list<string>{'abc','def','hig'};
        Test.startTest();
        list<Account> insertedAccounts = CreateNewAccounts.createThreeAccounts(accNames);
        Test.stopTest();
        
        for(Account acc:insertedAccounts){
            System.assert(accNames.contains(acc.Name),'names doesnt match');
        }
    }
    
    @isTest
    private static void testCreateThreeAccounts_failure(){
        
        list<string> accNames = new list<string>{'','',''};
        Test.startTest();
        list<Account> createdAccounts = CreateNewAccounts.createThreeAccounts(accNames);
        Test.stopTest();
        
           // Verify no accounts were created
        System.assertEquals(createdAccounts.size(), 0, 'No accounts should be created for an empty input list');
        
    }
}
----------------------------------------------------------------------------------------------------------------------------
3-Write an Apex class and a test class to update the Status to Closed for the 5 most recently modified Case record.

Apex class:
------------
public class UpdateCaseStatus {
    
    public void updateCaseStatus(){
        List<Case> cases = [SELECT Id, Status FROM Case ORDER BY LastModifiedDate DESC LIMIT 5];
        
        for(Case c:cases){
            c.Status = 'Closed';
        }
        try{
            Update cases;
            System.debug('Cases updated successfully');
        }catch(Exception e){
            System.debug('Failed to update cases ' + e.getmessage());
        }
    }
}

Test class:
-----------
@isTest
private class TestUpdateCaseStatus {
    @isTest
    static void testUpdateCaseStatus() {
        List<Case> cases = new List<Case>();
        for(Integer i=0; i<5; i++){
            cases.add(new Case(Status = 'Open'));
        }
        Insert cases;
        
        Test.startTest();
        UpdateCaseStatus.updateCaseStatus();
        Test.stopTest();
        
        List<Case> updatedCases = [SELECT Id, Status FROM Case WHERE Id IN :cases];
        for(Case c:updatedCases){
            System.assertEquals('Closed', c.Status, 'Case Status should be Closed');
        }
    }
}

----------------------------------------------------------------------------------------------------------------------------
4-Write an Apex class and a test class to delete the 3 oldest Account records.

Apex class:
------------
public class DeleteOldAccounts {
    
    public void deleteOldAccounts(){
        List<Account> accounts = [SELECT Id FROM Account ORDER BY CreatedDate ASC LIMIT 3];
        
        try{
            Delete accounts;
            System.debug('Accounts deleted successfully');
        }catch(Exception e){
            System.debug('Failed to delete accounts ' + e.getmessage());
        }
    }
}

Test class:
-----------
@isTest
private class TestDeleteOldAccounts {
    @isTest
    static void testDeleteOldAccounts() {
        List<Account> accounts = new List<Account>();
        for(Integer i=0; i<3; i++){
            accounts.add(new Account());
        }
        Insert accounts;
        
        Test.startTest();
        DeleteOldAccounts.deleteOldAccounts();
        Test.stopTest();
        
        List<Account> deletedAccounts = [SELECT Id FROM Account WHERE Id IN :accounts];
        System.assertEquals(0, deletedAccounts.size(), 'Three accounts should be deleted');
    }
}

----------------------------------------------------------------------------------------------------------------------------




*/
