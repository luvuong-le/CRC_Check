Cyclic Redundancy Check 
-----------------------------------------------------------------------------------------------------

Created With: HTML, CSS, JavaScript

Created By: Lu-Vuong Le
-----------------------------------------------------------------------------------------------------


Description
-----------------------------------------------------------------------------------------------------
Cyclic Redundancy Check refers to a method of error checking generally used in digital networks and storage devices such as disks on a computer to detect changes to data. 

The check is implemented by attaching a check value of 0’s based on the total number of the divisor - 1.

For Example: 

Message: 10010011 ← (0000)
Divisor: 10101 (Bits Appended would be 5 - 1 = 4)

The check is then done either two ways, in this program it is done through the XOR Method

EG where the bits are XORed
0 + 0 = 0
0 + 1 = 1
1 + 0 = 1
1 + 1 = 0

Repeats for each cycle and returns a CRC when the message is less than the divisor


How it works
-----------------------------------------------------------------------------------------------------
Upon the retrieval on the calculation the process is repeated by adding the response onto the initial block of data. 

If these checks do not equal to 0 or the same amount as the previous check then the data would be corrupted in which further action is taken to fix this error.

 
