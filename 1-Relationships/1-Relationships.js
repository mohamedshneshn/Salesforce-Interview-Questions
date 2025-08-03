/*




1-Why we need  relationships in salesforce?
-------------------------------------------
 - in salesforce we store data in multiple objects not in one object.
        - to make it more organized and easy to access and manage.
        - to avoid data redundancy.= to avoid duplicate data.

 -So, we need to create relationships between objects to link them together.


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 2-what are the types of relationships in salesforce?
-----------------------------------------------------

 ⬜1- Lookup Relationship.
    Description: A flexible relationship where one object references another without a strict dependency between them.
                 The child object can exist independently of the parent.

    Example: Account and Contact. One account can have many contacts, but if the account is deleted, the contacts remain.

    Key Features: - No inheritance of security or sharing rules from the parent.
                  - Supports one-to-many relationships.

                          --------------------------------------------
                          --------------------------------------------

 ⬜2- Master-Detail Relationship.

    Description: A relationship with strict dependency between parent and child objects. If the parent is deleted,
                 the child records are also deleted.

    Example: Project and Project Task. If a project is deleted, all related project tasks are deleted.

    Key Features:- Child inherits security and sharing rules from the parent.
                 - Allows creation of roll-up summary fields on the parent to calculate aggregate values (e.g., sum, min, max, average)
                  based on related child records.
                -  If the parent is deleted, the child records are also deleted.
                -  It is a one-to-many relationship.
    


    - Note:  -Most of  standard objects in salesforce are related to each other using Lookup relationships.
              ex:    - account -> contact  (lookup relationship)
                     - account -> opportunity (lookup relationship)
                     - contact -> opportunity (lookup relationship)
                     - contact -> case (lookup relationship)

                     - opportunity -> opportunity line item (master-detail relationship)

             - Each object in salesforce can have up to 2 master-detail relationships and up to 25 lookup relationships.
             - Standard objects in salesforce can't be the detail object in a master-detail relationship.

                          --------------------------------------------
                          --------------------------------------------


 ⬜3- Many-to-Many Relationship.

    Description: This relationship is created using a junction object, which allows each record from one object to be related
                 to multiple records in another object and vice versa.

    Example: Product and Campaign. One campaign can include multiple products, and one product can be part of multiple campaigns.

    Key Features: Requires two Master-Detail relationships to create the junction object.

   

                          --------------------------------------------
                          --------------------------------------------

4- Hierarchical Relationship.

    Description: A special relationship available only on the User object. It creates a hierarchy between users,
                 such as assigning a manager to each user.

    Example: User and Manager relationship, often used for approvals or reporting structures.

    Key Features: Helps manage approval processes and reporting hierarchies.


                          --------------------------------------------
                          --------------------------------------------

5- Self-Relationship.

     Description:  is a lookup relationship where an object references itself, allowing hierarchical structures
                  within the same object.

     Example: Account object can have a parent account field, where a parent company is related to small companies.

     Key Features: Allows the creation of hierarchical relationships within a single object without the need for a separate object.


                          --------------------------------------------
                          --------------------------------------------

6- External Lookup Relationship.

     Description: Used to connect a Salesforce object to an external object that resides outside Salesforce (such as an external database).
                  The relationship is established using the External ID of the parent record.
                  
     Example: A Salesforce Order object can reference customer data in an external system through an external lookup.

     Key Features: Links Salesforce data to external systems without importing the external data into Salesforce.

                          --------------------------------------------
                          --------------------------------------------

7- Indirect Lookup Relationship.
    - Link external objects to standard or custom objects in Salesforce using a matching field  like customer number or email address.


                          --------------------------------------------
                          --------------------------------------------








*/
