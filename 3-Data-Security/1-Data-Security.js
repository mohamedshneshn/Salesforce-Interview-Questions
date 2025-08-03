/*
what is salesforce security?
-----------------------------
- used to protect data in salesforce from unauthorized access

security levels
---------------
1-org level:
------------
- is the highest level of security
- determines who can access the org and when they can access it

how
---
- ip restrictions (allow only certain ip addresses to access the org)
- password policies (apply a strong password policy like password length, password complexity,, password lockout)
- login access policies (allow users to login only from certain locations or at certain times)

how to change the password policy?
----------------------------------
- go to setup
- enter password policies in the quick find box

how to change the login access policy for 2  groups of users one will work in the day shift and
the other will work in the night shift?
--------------------------------------------------------------------------------------------------------------
- create a custom profile for each group
- go to setup
- enter profiles in the quick find box
- click on profiles
- clone the standard user profile and create a new profile for each group
- change the login hours for each profile
- assign the profiles to the users


What is a profile?
------------------
- is a collection of settings and permissions that define what a user can do in salesforce

✅ what is a permission set?
-------------------------
- is a collection of settings and permissions that define what a user can do in salesforce
- is used to extend the permissions of a user

✅ How to create a permission set?
---------------------------------
1- create new permission set, enter the name and description
2- From object settings, select the object and set the permissions (read, create, edit, delete)
3- add assignments then select the users to assign the permission set to



what is user license?
---------------------
- is a license that determines what a user can do in salesforce
- salesforce : user can access standard objects and custom objects
- salesforce platform: user can access custom objects only
- salesforce integration user: user can access the api

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


2-object level
- determines which objects the user can access and what they can do with the objects (create, read, update, delete)


how
---
- profiles
  create a custom profile
  clone the standard platform user profile(have access to custom objects only)
  set the object permissions
  assign the profile to the user

- permission sets
    create a permission set
    new permission set
    set the object permissions
    assign the permission set to the user


note: a user can have only one profile but can have multiple permission sets
    : a user can have only one profile but can have multiple roles
    : we can chose the org level security and the object level security for a user in the same time in the profile


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3-field level
- determines which fields the user can access and what they can do with the fields (read, edit)

how

- profiles
 field level security
-select the object and click on field permissions
    
- permission sets
   

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

4-record level
- determines which records the user can access and what they can do with the records (read, edit, delete)
- ex:interviewer can access only his own reviews

how
---
1-OWD (org wide defaults)
 
 -ex: the owner of the record can make the record public read/write, public read only, private
 - note:the private access level is only the owner and the admin can access the record

 - Go to sharing settings
    - click on sharing settings
    - click on edit
    - select the object
    - select the default access level
    - click on save

2-role hierarchy
- based on the role order
ex: the manager can access the records of the employees
  : the employee can access only his own records
- the higher the role the more access the user has
- the lower the role the less access the user has

go to roles
- click on roles
- click on new role
- enter the role name
- select the parent role


3-sharing rules
- there are 2 types of sharing rules (criteria based sharing rules, owner based sharing rules)
- criteria based sharing rules : share records based on the criteria you define
- owner based sharing rules : share records based on the owner of the record
- go to sharing settings
- click on sharing settings
- click on new sharing rule
- select the object
- select the criteria
- select the access level
- click on save


4-manual sharing
- the owner of the record can share the record with other users
- use case: the owner of the record can share the record with the manager


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🟥 What is the permission set and permission set group?
---------------------------------------------------
- A permission set is an extra permission that can be assigned to a user to extend their access
  beyond what is defined in their profile.

- A permission set group is a collection of permission sets that can be assigned to users,
  the benfit of using permission set groups is that you can assign multiple permission sets to a user at once,

-------------------------------------------------------------------------------------------------------------------------------



*/
