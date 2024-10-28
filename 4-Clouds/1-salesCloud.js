/*

What is Salesforce Sales Cloud?
-------------------------------
- it is a (CRM) platform 
- used to improve the sales process of a company by:
    1- managing the opportunities through different stages
    2- managing the leads and contacts 
    3- creating reports and dashboards



What are the key objects in Sales Cloud?
----------------------------------------
- Campaigns : used to track marketing campaigns like email, social media, and events
- Leads : potential customers
- Accounts : companies or organizations
- Contacts : individuals associated with accounts
- Opportunities : potential deals
- Products : products or services offered by the company
- Price Books : pricing information for products
- Quotes : formal offers to customers
- Forecasts : sales predictions
- Reports : data analysis
- Dashboards : visual representations of data



                    ---------------------------------------------------

What is the difference between Leads and Opportunities in Sales Cloud?
-----------------------------------------------------------------------
- Leads:
    - is a person or company that has shown interest in a product or service
    - unqualified potential customers

- Opportunities:
    - are potential deals that sales reps are actively working on
    - are associated with an amount, close date, and stage
    -  Sales deals that are in progress.



How does lead conversion work in Salesforce?
-------------------------------------------
- used to convert leads into accounts, contacts, and opportunities when the lead is qualified 
- you can create a new account, contact, and opportunity from the lead record or associate the lead with an existing account, contact, or opportunity


what is the web-to-lead in Salesforce?
-------------------------------------
- is a feature that allows you to capture leads from your website and automatically create lead records in Salesforce
- Example: you can create a web-to-lead form on your website that captures visitor information and creates a new lead record in Salesforce

steps:
1- go to setup 
2- enter web-to-lead in the quick find box
3- click on web-to-lead
4- click on create web-to-lead form
5- fill in the required fields and click generate
6- copy the generated HTML code and paste it on your website


like this:
<form action="https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST">
    <input type=hidden name="oid" value="00D2w0000012gH5">
    <input type=hidden name="retURL" value="http://www.example.com/thankyou.html">
    <input type=hidden name="lead_source" value="Web">
    <input type=hidden name="first_name" value="John">
    <input type=hidden name="last_name" value="Doe">
    <input type=hidden name="email" value=" 
    <input type=hidden name="company" value="Acme Inc">
    <input type=hidden name="phone" value="555-555-5555">
    <input type=submit value="Submit">
</form>



                                ---------------------------------------------------
what is lead auto-response rules and lead assignment rules?
----------------------------------------------------------
- Lead Auto-Response Rules:
    - are used to automatically send an email response to leads when they are created or updated

- Lead Assignment Rules:
    - are used to automatically assign leads to sales reps based on predefined criteria

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
what is the lead process in Salesforce?
---------------------------------------
- the lead process is the process of managing leads from creation to conversion
- it involves capturing leads, qualifying leads, nurturing leads, and converting leads into opportunities
Ex:
1- open
2- working
3- closed-not converted
4- closed-converted

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

what is the opportunity process in Salesforce?
---------------------------------------------
- the opportunity process is the process of managing opportunities from creation to closure
- it involves creating opportunities, updating opportunities, tracking sales stages, and closing deals
Ex:
1- prospecting
2- qualification
3- proposal/price quote
4- negotiation/review
5- closed won
6- closed lost

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
what are the different types of accounts in Salesforce?
------------------------------------------------------
- Person Accounts:
    - represent individual consumers
    - have both a business and a personal side
    - used in B2C (business-to-consumer) scenarios

- Business Accounts:
    - represent companies or organizations
    - used in B2B (business-to-business) scenarios

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

what is CPQ in Salesforce?
---------------------------
- CPQ (Configure, Price, Quote) is a sales tool used to provide accurate pricing information to customers 
- it helps sales reps generate quotes and proposals quickly and accurately

ex:
- you can use CPQ to configure products, set pricing rules, and generate quotes for customers

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/