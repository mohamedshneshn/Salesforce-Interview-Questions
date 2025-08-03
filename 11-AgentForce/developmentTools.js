/*

how to create salesforce org in vscode?
-----------------------------------
- Open VS Code and install the Salesforce Extension Pack.
- Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on Mac

🟥 what are different org types in salesforce?
------------------------------------------------
1- Developer Org
   - A free Salesforce org for developers to build and test applications.
   - It has limited storage and features compared to other org types.
   - Ideal for learning and experimenting with Salesforce features.

2- Sandbox Org
   - A copy of your production org used for development and testing without affecting production data.
   - It allows you to test changes in a safe environment before deploying them to production.

3- Scratch Org
   - A temporary Salesforce org created for development and testing purposes.
   - It is part of Salesforce DX and can be easily created and deleted.
   
4- Production Org

   - The live Salesforce org where your business operations are conducted.
   - It contains all your production data and configurations.

🟥 Salesforce Development Tools
----------------------------
- Salesforce provides a set of development tools to help developers build and deploy applications on the Salesforce platform.

🟥 1- Changesets
------------------
- Changesets are a way to deploy metadata changes between between connected Salesforce orgs (e.g., sandbox to production).
- Limitations include:
  - No Search/filtering in componet list.
  - No version control.
  - No rollback option.
  - only works between connected orgs (e.g., sandbox to production).

Note: dev orgs are not connected to production orgs, so changesets cannot be used to deploy changes from a dev org to production.

🟥 🟥 what is sanbox?
---------------------
- A sandbox is a copy of your production org that you can use for development and testing without affecting your production data.

types of sandboxes:
- Developer Sandbox: A copy of your production org with a limited amount of data and metadata.
- Developer Pro Sandbox: A larger version of the Developer Sandbox with more storage for data and metadata.
- Partial Copy Sandbox: A copy of your production org with a subset of data and metadata.
- Full Sandbox: A complete copy of your production org, including all data and metadata.


🟥 🟥 what is metadata?
----------------------
- Metadata is data that describes the structure and setup of your Salesforce org,
  like the name of the fields, objects, and relationships between them,apex classes, triggers, flows, etc.
- It does not include the actual data stored in your org, such as records in objects.
  
🟥 2-SFDX
----------
- Salesforce DX (Developer Experience) is a set of tools and features that enable developers to build and manage Salesforce applications using modern development practices.
- It includes a command-line interface (CLI) for managing Salesforce projects, version control integration,
  and support for source-driven development.
- SFDX allows developers to create and manage scratch orgs, which are temporary Salesforce environments for development and testing.
- It also supports continuous integration and deployment (CI/CD) processes, making it easier to collaborate on projects and automate deployments.


🟥 3- Copado
--------------
- is a development tool where you can mange and delpoy your Salesforce applications.
- allows you to track changes over differnt orgs
- UI tool no need to write commands
- is managed package that can be installed in your Salesforce org.

what is the credentials for copado?
// - Copado credentials are the same as your Salesforce org credentials, as it is a managed package installed in your Salesforce org.
- You can log in to Copado using your Salesforce username and password, and it will automatically connect to your Salesforce org.
- Copado also supports Single Sign-On (SSO) for easier access to the tool.
- It provides a user-friendly interface for managing your Salesforce development process, including version control, deployment, and collaboration features.


what are the environment types in copado?
------------------------------------------
Enironment : represents a specific Salesforce org or instance where you can develop, test, and deploy your applications.

- Copado supports different environment types to manage your Salesforce development process effectively.
- The main environment types in Copado are:
1- Development Environment:
   - Used for individual developers to work on their changes and features.
   - Allows developers to create and test their code before merging it into the main branch.    
2- Staging Environment:
   - A pre-production environment where changes are tested before being deployed to production.
   - It allows for final testing and validation of changes in a controlled environment.
3- Production Environment:
   - The live Salesforce org where your business operations are conducted.
   - It contains all your production data and configurations.
4- Sandbox Environment:
   - A copy of your production org used for development and testing without affecting production data.
   - It allows you to test changes in a safe environment before deploying them to production.
5- Scratch Environment:
   - A temporary Salesforce org created for development and testing purposes.
   - It is part of Salesforce DX and can be easily created and deleted.
- Each environment type serves a specific purpose in the development process, allowing for better organization and management


what is user story in copado?
-----------------------------
- is the smallest unit of work in Copado that represents a specific feature or change to be implemented in your Salesforce application.
- used as a container object to track and manage changes in your Salesforce org.

what is pipeline in copado?
-----------------------------
- A pipeline in Copado is a sequence of stages that represent the flow of changes from development to production.
- It allows you to define the steps and processes involved in deploying changes to your Salesforce org.








*/