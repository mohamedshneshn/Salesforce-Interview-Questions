/*

What is LWC?
--------------------------------
-  Lightning Web Components is a modern js framework developed by Salesforce to build web components on the Salesforce platform.
-  used to build reusable and responsive components for Salesforce applications.

LWC vs Aura Components
-----------------------
-  LWC is faster than Aura components because it is built on native web standards while Aura components are built on a custom framework called Aura.
- Aura components cant be used in LWC but LWC can be used in Aura components.   


How to create a LWC?
---------------------
-  Use the Salesforce CLI to create a new LWC project.
-  Create a new LWC component using the Salesforce CLI.
-  Write the HTML, JavaScript, and CSS code for the component.

what files are created when you create a LWC?
----------------------------------------------
-  .html file: contains the structure of the component.
-  .js file: contains the logic of the component like event handling, data fetching, etc.
-  .js-meta.xml file: configure the visibility of the component (record page, lightning app, etc).


what is a template in LWC?
---------------------------
-  Template is an HTML file that contains the structure of the component.

----------------------------------------------------------------------------------------------------------------------------
Data Binding in LWC
-------------------
-  used to bind data between the HTML template and JavaScript file.
- ensures that the data in the template is always in sync with the data in the JavaScript file.
- ensures that when data changes in one place, it automatically updates in the other

1- one-way data binding
------------------------
-  used to pass data from the JavaScript file to the template but not vice versa.
Example:
---------
-  html file:
   <template>
    
     <lightning-button label="Change Name" onclick={handleClick}></lightning-button>
   </template>

-  js file:
    import { LightningElement } from 'lwc';

    export default class OneWayBinding extends LightningElement {
        name = 'Salesforce Developer';

        handleClick() {
            this.name = 'Lightning Web Components';
        }
    }

 -  if you change the message in the js file, it will automatically update in the template.

2- two-way data binding (Event Handling)
----------------------------------------
-  used to pass data between the JavaScript file and the template in both directions.
-  used for input fields like text boxes, checkboxes, etc.

Example:
---------
-  html file:
    <template>
        <input type="text" value={message} onchange={handleChange}>
        <p>{message}</p>
    </template>

-  js file:
    import { LightningElement ,track} from 'lwc';
    export default class App extends LightningElement {
        message = 'Hello World';
        handleChange(event){
            this.message = event.target.value;  //update the message property with the input value
        }
    }

----------------------------------------------------------------------------------------------------------------------------

Note: properties in LWC are reactive means when the property changes, the template is automatically updated.
    : but if the property is an object or array, the default value is not reactive.
    : if the property is a primitive type like string, number, etc, the default value is reactive.

    so, to make the object or array reactive, we need to use the @track decorator.

Example:
---------
-  html file:
    <template>
    <lightning-card title="Two Way Binding With Track Decerotor" icon-name ="standard:account">
       <div class="slds-m-around_medium">
           <lightning-input label = "Enter Your Name: " value ={person.name} onchange={handleInputName}></lightning-input>
           <lightning-input label = "Enter Your Age: " value ={person.age} onchange={handleInputAge}></lightning-input>
           <p> Hello, {person.name} Your Age is , {person.age}</p>
       </div>
    </lightning-card>
  </template>


-  js file:
    import { LightningElement, track } from 'lwc';

    export default class TwoWayBindingWithTrackDecerotor extends LightningElement {
        @track person = {
            name: 'John Doe',
            age: 30
        };

        handleInputName(event) {
            this.person.name = event.target.value;
        }
        
        handleInputAge(event) {

            this.person.age = event.target.value;
        }   

    }

----------------------------------------------------------------------------------------------------------------------------
 @AuraEnabled: used to allow the method to be called from the client-side controller.
               cacheable=true: means that the result of the method is cached on the client side and can be reused
               if the same method is called again without making a new server call.

----------------------------------------------------------------------------------------------------------------------------

what is the difference between wire method and imperative method in LWC?
------------------------------------------------------------------------------
-  @wire method: used to automatically fetch data from apex method when the component loads.
     
     Example:
     --------
     html file:
        <template>
            <template if:true={accounts.data}>
                <ul>
                    <template for:each={accounts.data} for:item="account">
                        <li key={account.Id}>{account.Name}</li>
                    </template>
                </ul>
            </template>
            <template if:true={accounts.error}>
                <p>Error: {accounts.error}</p>
            </template>
        </template>

        js file:
            import { LightningElement ,wire} from 'lwc';
            import getAccountList from '@salesforce/apex/AccountController.getAccountList';
            export default class App extends LightningElement {
                @wire(getAccountList) accounts;
            }

        apex class:
            public with sharing class AccountController {
                @AuraEnabled(cacheable=true)
                public static List<Account> getAccountList() {
                    return [SELECT Id, Name FROM Account LIMIT 5];
                }
            }

-  imperative method: used to fetch data from the apex method based on user interaction or some other event.

        Example:
        --------
        html file:
            <template>
                <button onclick={handleButtonClick}>Load Accounts</button>
                <template if:true={accounts}>
                    <ul>
                        <template for:each={accounts} for:item="account">
                            <li key={account.Id}>{account.Name}</li>
                        </template>
                    </ul>
                </template>
            </template>

        js file:
            import { LightningElement } from 'lwc';
            import getAccountList from '@salesforce/apex/AccountController.getAccountList';
            export default class App extends LightningElement {
                accounts;

                handleButtonClick() {
                    getAccountList()
                        .then(result => {
                            this.accounts = result;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            }

--------------------------------------------------------------------------------------------------------------------------------
-  @api: used to make a property or method public so that it can be accessed by other components.
       : used to pass data from a parent component to a child component.
   ex:
    html file:
        <template>
            <p>{message}</p>
        </template>

    js file:
        import { LightningElement ,api} from 'lwc';
        export default class App extends LightningElement {
            @api message = 'Hello World';
        }

--------------------------------------------------------------------------------------------------------------------------------
what is LDS (Lightning Data Service)?
-------------------------------------
- LDS is a powerful framework provided by Salesforce to interact with Salesforce data without writing any server-side code because it is built on the Lightning Platform.
-  used to interact with Salesforce data without writing any server-side code.

-  LDS consists of three parts:
    1- Lightning Record Form: used to display and edit a record in a form.
    2- Lightning Record View Form: used to display a record in a read-only form.
    3- Lightning Record Edit Form: used to edit a record in a form.

  Example 1: for viewing a record
  -------------------------------

    html file:
        <template>
            <lightning-record-view-form record-id={recordId} object-api-name="Account">
                <div class="slds-box">
                    <lightning-output-field field-name="Name"></lightning-output-field>
                    <lightning-output-field field-name="Phone"></lightning-output-field>
                    <lightning-output-field field-name="Industry"></lightning-output-field>
                </div>
            </lightning-record-view-form>
        </template>

    js file:
        import { LightningElement, api } from 'lwc';
        export default class App extends LightningElement {
            @api recordId = '0012w00000Qf2WwAAJ';
        }

    Example 2: for editing a record
    -------------------------------
    html file:
        <template>
            <lightning-record-edit-form record-id={recordId} object-api-name="Account">
                <lightning-messages></lightning-messages>
                <lightning-input-field field-name="Name"></lightning-input-field>
                <lightning-input-field field-name="Phone"></lightning-input-field>
                <lightning-input-field field-name="Industry"></lightning-input-field>
                <div class="slds-m-top slds-m-bottom_medium">
                    <lightning-button variant="brand" type="submit" name="save" label="Save"></lightning-button>
                </div>
            </lightning-record-edit-form>
        </template>

    js file:
        import { LightningElement, api } from 'lwc';
        export default class App extends LightningElement {
            @api recordId = '0012w00000Qf2WwAAJ';
        }

--------------------------------------------------------------------------------------------------------------------------------
what is the difference between LDS and wire method in LWC?
-----------------------------------------------------------
LDS : no code required to interact with Salesforce data.
    : used to interact with a single record at a time.
    : used to interact with the current record.

Wire : requires code to interact with Salesforce data.
     : used to fetch multiple records at a time.
     : used to interact with any record based on the query.

--------------------------------------------------------------------------------------------------------------------------------

What are the lifecycle hooks in LWC?
-------------------------------------
- lifecycle hooks are methods that are called at different stages of a component's lifecycle.

1- constructor(): called when the component is created 
                : used to initialize the component's properties like variables, etc.

2- connectedCallback(): called when the component is inserted into the DOM.
                      : used to get data from the server, etc.

3- renderedCallback(): called after the component is inserted and rendered in the DOM.
                     : used to perform DOM manipulation, etc.
                     : executed after every render cycle.


4- disconnectedCallback(): called when the component is removed from the DOM.
                            : used to clean up resources, etc.

5- errorCallback(): called when an error occurs in the component.
                    : used to handle errors in the component.


Example:
---------
import { LightningElement } from 'lwc';
export default class App extends LightningElement {
    constructor(){
        super();           //call the parent constructor method to initialize the component
        console.log('Constructor called');
    }

    connectedCallback(){
        console.log('Connected Callback called');
    }

    renderedCallback(){
        console.log('Rendered Callback called');
    }

    disconnectedCallback(){
        console.log('Disconnected Callback called');
    }

    errorCallback(error, stack){
        console.error(error);
    }
}

Note:
-----
- we don't need to call these methods explicitly, they are called automatically by the framework at different stages of the component's lifecycle.
- these methods are useful for performing actions at different stages of the component's lifecycle .


--------------------------------------------------------------------------------------------------------------------------------

How can two components communicate in LWC?
-------------------------------------------
1- Parent to Child: using @api decorator at the child component to make the property public 

Example:
---------
-  parent component:
    html file:
        <template>
            <c-child message={message}></c-child>
        </template>

    js file:
        import { LightningElement } from 'lwc';
        export default class App extends LightningElement {
            message = 'Hello World';
        }

-  child component:
    html file:
        <template>
            <p>{message}</p>
        </template>

    js file:
        import { LightningElement, api } from 'lwc';
        export default class Child extends LightningElement {
            @api message;
        }

    
2- Child to Parent: using custom events to pass data from the child component to the parent component.
                  : create a custom event in the child component and dispatch the event to the parent component.


Example:
---------
-  parent component:
    html file:
        <template>
            <c-child-component onmyevent={handleEvent}></c-child-component>
            <p>{messageFromChild}</p>
        </template>

    js file:
        import { LightningElement } from 'lwc';

        export default class ParentComponent extends LightningElement {
            messageFromChild;

            handleEvent(event) {
                this.messageFromChild = event.detail.message;
            }
        }

-  child component:
    html file:
        <template>
               <button onclick={handleClick}>Send Message to Parent</button>
        </template>

    js file:
        import { LightningElement } from 'lwc';
        export default class Child extends LightningElement {
            handleClick(){
                const event = new CustomEvent('myevent', {    //create a custom event with the name 'message' and detail 'Hello Parent'
                    detail: 'Hello Parent'
                });
                this.dispatchEvent(event);                  //dispatch the event to the parent component
            }
        }


3- Unrelated Components: using pubsub module to communicate between unrelated components.
                        : create a pubsub module to publish and subscribe to events.

Example:
---------
-  pubsub module:
    pubsub.js:
        const events = {};

        const subscribe = (eventName, callback) => {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            events[eventName].push(callback);
        };

        const publish = (eventName, data) => {
            if (!events[eventName]) {
                return;
            }
            events[eventName].forEach(callback => {
                callback(data);
            });
        };

        export { subscribe, publish };

-  component 1:
    html file:
        <template>
            <button onclick={handleClick}>Send Message</button>
        </template>

    js file:
        import { LightningElement } from 'lwc';
        import { publish } from 'c/pubsub';
        export default class Component1 extends LightningElement {
            handleClick(){
                publish('message', 'Hello Component 2');
            }
        }

-  component 2:
    html file:
        <template>
            <p>{message}</p>
        </template>

    js file:
        import { LightningElement, track } from 'lwc';
        import { subscribe } from 'c/pubsub';
        export default class Component2 extends LightningElement {
            @track message;

            connectedCallback(){
                subscribe('message', (data) => {
                    this.message = data;
                });
            }
        }

--------------------------------------------------------------------------------------------------------------------------------

 what is LMS (Lightning Message Service)?
-----------------------------------------

-  LMS is a messaging service provided by Salesforce to communicate between components in the Lightning Web Components.
-  used to communicate between unrelated components in the Lightning Web Components.
- LMS consists of three parts:
    1- publisher component: used to send messages using publish() method. via a channel.
    2- subscriber component: used to receive messages using subscribe() method. via a channel.
    3- Channel: used to communicate between components.
              : used to send data to all subscribers of the channel.



Example:
---------
-  publisher component:
    html file:
        <template>
            <button onclick={handleClick}>Send Message</button>
        </template>

    js file:
        import { LightningElement } from 'lwc';
        import { publish, MessageContext } from 'lightning/messageService'; // import the publish method and MessageContext to get the message context
        import MESSAGE_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';   // this is the message channel
        export default class Publisher extends LightningElement {

            @wire(MessageContext)  //get the message context 
            messageContext;     //store the message context

            handleClick(){
                const message = {
                    recordId: '0012w00000Qf2WwAAJ',
                    recordData: {
                        value: 'Hello World'
                    }
                };
                publish(this.messageContext, MESSAGE_CHANNEL, message);
            }
        }

-  subscriber component:
    html file:
        <template>
            <p>{message}</p>
        </template>

    js file:
        import { LightningElement, wire, track } from 'lwc';
        import { subscribe, MessageContext } from 'lightning/messageService';
        import MESSAGE_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';
        export default class Subscriber extends LightningElement {
            @track message;

            @wire(MessageContext)
            messageContext;

            connectedCallback(){
                subscribe(this.messageContext, MESSAGE_CHANNEL, (message) => {
                    this.message = message.recordData.value;
                });
            }
        }

-  message channel:
    MyMessageChannel.messageChannel-meta.xml:
        <?xml version="1.0" encoding="UTF-8"?>
        <LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">
            <masterLabel>MyMessageChannel</masterLabel>
            <isExposed>true</isExposed>
            <description>My custom message channel</description>
            <lightningMessageFields>
                <fieldName>recordId</fieldName>
                <fieldName>recordData</fieldName>
            </lightningMessageFields>
        </LightningMessageChannel>

--------------------------------------------------------------------------------------------------------------------------------






What is slds?
--------------
-  SLDS (Salesforce Lightning Design System) is a CSS framework developed by Salesforce to build responsive and consistent user interfaces for Salesforce applications.
-  used to build responsive and consistent user interfaces for Salesforce applications.

-  SLDS consists of the following parts:
    1- CSS: used to style the components.
    2- Icons: used to add icons to the components.
    3- Design Tokens: used to customize the design of the components.
    4- Utilities: used to add utility classes to the components.


How to use SLDS in LWC?
-----------------------
-  use the SLDS classes to style the components.    

Example:
---------
-  html file:
    <template>
        <div class="slds-box slds-theme_default">
            <p class="slds-text-heading_large">Hello World</p>
        </div>
    </template>


what is the difference between SLDS and LWC?
--------------------------------------------
-  SLDS is a CSS framework used to style the components.
-  LWC is a js framework used to build web components on the Salesforce platform.





*/
