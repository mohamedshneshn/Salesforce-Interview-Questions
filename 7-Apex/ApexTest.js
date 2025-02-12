/*

What is the apext test class?
------------------------------
- used to test the functionality of the Apex code.
- ensures that the code works as expected.
- should cover at least 75% of the code.

key points:
-----------
- Test classes & methods should be annotated with @isTest.
- Test methods should be private static void.
- Test.startTest() and Test.stopTest()
  * used to reset the governor limits before and after DML operations to avoid hitting the limits.

- System.assert(condition, message)
    *  for Boolean checks.
    * Verifying if the record is inserted or not.
    * if the condition is false, the test will fail and the message will be displayed.
    * example:  integer x = 5;
             System.assert(x == 5, 'x should be equal to 5');  pass
             System.assert(x == 10, 'x should be equal to 10'); fail

- System.assertEquals(expected, actual, message)
    * for value comparisons.
    * Verifying the number of inserted records.
    * example:  integer x = 5;
             System.assertEquals(5, x, 'x should be equal to 5');  pass
             System.assertEquals(10, x, 'x should be equal to 10'); fail


- System.assertNotEquals(expected, actual, message)


Steps to create a test class:
-----------------------------
1- Create Test Data: Create test data that will be used in the test methods.
2- Call the Method: Call the method that needs to be tested.
3- Query the Data: Query the data to verify the results.
4- Assert the Results: Use System.assert or System.assertEquals to verify the results.

*/
