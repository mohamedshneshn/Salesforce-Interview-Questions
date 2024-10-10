/*

Validation Rules
----------------
- used to prevent invalid data entry in Salesforce like preventing users from entering invalid email addresses, phone numbers, etc.
- Validation rules are executed before the record is saved to the database.


Example1:
--------
- Create a validation rule to prevent users from entering an email address without the @ symbol.    

 Formula Syntax:
----------------
-  ISBLANK(Email) || NOT(CONTAINS(Email, '@'))

- ISBLANK(Email) : checks if the Email field is blank.
- NOT(CONTAINS(Email, '@')) : checks if the Email field contains the @ symbol.


Example2:
--------
- Create a validation rule to prevent users from entering a phone number without the correct format.(XXX) XXX-XXXX

 Formula Syntax:
----------------
-  NOT(REGEX(Phone, "\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}"))

- REGEX() : used to match a regular expression pattern.


Example3:
--------
- Create a validation rule to prevent users from entering a discount percentage greater than 50%.

 Formula Syntax:
----------------
-  Discount_Percentage__c > 50

- Discount_Percentage__c : custom field for discount percentage.


----------------------------------------------------------------------------------------------------------------------------








*/