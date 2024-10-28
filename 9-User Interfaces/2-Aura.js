/*

What is lightning component?
--------------------------------
- is a part of the Salesforce lightning framework, used to build responsive web applications for mobile and desktop devices.
- Lightning components are reusable units of code that can be used to build applications in Salesforce.

- types of lightning components:
    1- Aura Components: 
        - based on the Aura framework, and are used to build custom user interfaces in Salesforce.
    
    2- Lightning Web Components:
        - based on the web standards technology,(HTML, CSS, JavaScript), and are used to build custom user interfaces in Salesforce.




How do you communicate between aura components?
----------------------------------------------

- There are several ways to communicate between aura components in Salesforce:

    1- using attributes: 
             to pass data from parent to child components or from child to parent components.

    Example:
    // parentComponent.cmp
    <aura:component>
        <aura:attribute name="message" type="String" default="Hello from parent component"/>
        <c:childComponent message="{!v.message}"/>
    </aura:component>

    // childComponent.cmp
    <aura:component>
        <aura:attribute name="message" type="String"/>
        <lightning:formattedText value="{!v.message}"/>
    </aura:component>


    2- Component Events:
        - used to communicate between parent and child components.(related components)
        - Example: a parent component can fire an event that is handled by a child component.

        Example:
        // event.cmp
        <aura:event type="COMPONENT" description="Sample component event">     // define an event and the type of event
            <aura:attribute name="message" type="String"/>                    // define an attribute for the event which will be passed to the event handler
        </aura:event>

        // parentComponent.cmp
        <aura:component>
            <aura:handler name="sampleEvent" event="c:sampleEvent" action="{!c.handleEvent}"/>  // define an event handler for the event 
            <c:childComponent/>
        </aura:component>

        // parentComponentController.js
        ({
            handleEvent : function(component, event, helper) {
                var message = event.getParam("message");  // get the attribute value from the event
                console.log("Message received: " + message);
            }
        })

        // childComponent.cmp
        <aura:component>
            <aura:registerEvent name="exampleEvent" type="c:ExampleEvent" />  // register an event in the child component
            <lightning:button label="Fire Event" onclick="{!c.fireEvent}"/>   // button to fire the event

        </aura:component>


        // childComponentController.js
        ({
            fireEvent : function(component, event, helper) {
                var message = "Hello from child component";
                var event = component.getEvent("exampleEvent");  // get the event
                event.setParams({"message" : message});          // set the attribute value for the event
                event.fire();                                    // fire the event
            }
        })
            








    3- Application Events:
        - used to communicate between components across the application.(unrelated components)
        - Example: a component can fire an event that is handled by another component in a different part of the application.

        




*/