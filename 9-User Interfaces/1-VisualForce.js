/*
what is visualforce?
--------------------
- is the old way of creating custom user interfaces in salesforce.
- it is server-side rendering which means that the page is rendered on the server and then sent to the client
  so it is slower than lightning web components which are client-side rendering.
- it is slower than lightning web components because of full-page reloads.
- it is page-centric which means that the page is the main unit of development.


Explain the visualforce page lifecycle?
----------------------------------------
1- the user sends a request to the server to view the visualforce page.
2- the server creates an instance of the visualforce page.
3- the server retrieves the data from the database.
4- the server processes the data and renders the visualforce page.
5- the server sends the visualforce page to the client.



Example:
--------

<apex:page controller="AccountController">
    <apex:form>
        <apex:pageBlock title="Account Information">
            <apex:pageBlockSection title="Account Details">
                <apex:inputField value="{!account.Name}"/>
                <apex:inputField value="{!account.Phone}"/>
                <apex:inputField value="{!account.Industry}"/>
            </apex:pageBlockSection>
            <apex:pageBlockButtons>
                <apex:commandButton action="{!saveAccount}" value="Save"/>
            </apex:pageBlockButtons>
        </apex:pageBlock>
    </apex:form>

</apex:page>


public class AccountController {
    
        public Account account {get;set;}
    
        public AccountController() {
            account = new Account();
        }
    
        public void saveAccount() {
            insert account;
        }
    }


*/