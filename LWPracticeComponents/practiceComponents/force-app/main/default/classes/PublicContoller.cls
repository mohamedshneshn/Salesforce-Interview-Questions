public with sharing class PublicContoller {

    @AuraEnabled
    public static void createContact(String firstName , String lastName,String email) {
       try{
           Contact con = new Contact();
           con.FirstName = firstName;
           con.LastName = lastName;
           con.Email = email;
           insert con;
         }catch(Exception e){
                System.debug('Error in createContact method: '+e.getMessage());
            }

    }

    @AuraEnabled
    public static List<Contact> getContacts(){
       return [SELECT Id ,FirstName,Email,Phone FROM Contact LIMIT 10] ;
    }

    @AuraEnabled
    public static List<Product2> getProducts(){
        return [ SELECT Id, Name,Price__c FROM Product2 ORDER BY CreatedDate DESC LIMIT 2] ;
    }

    @AuraEnabled
    public static Product2 getProductDetails(Id productId){
        return [SELECT Id ,Name,Price__c FROM Product2 WHERE Id= :productId];
    }
}