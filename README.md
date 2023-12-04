# creditcard-js

Credit card checking in JavaScript for unit testing practice.

## Exercise: normalize()

Write a function
- __with failing tests first__
- that strips non-digits
- from a string or an array
- returns a single string

| Input value | Return value
| --- | ---
| `"4111 1111 1111 1111"` | `"4111111111111111"`
| `"5555-5555-5555-4444"` | `"5555555555554444"`
| `["3400", "123456", "78905"]` | `"340012345678905"`
| `"6011111111111117"` | `"6011111111111117"`

## Exercise: luhn10()

Write the tests for a function
- that takes a credit card number as a string or an array
- returns `true` if the checksum is valid
- otherwise, returns `false`
- _Don't bother writing the function_

Valid
- "4567-8901-2345-6783"
- "5555-5555-5555-4444"

Invalid
- "4111 1111 1111 1110"


## Luhn algorithm

The [Luhn algorithm](http://en.wikipedia.org/wiki/Luhn_algorithm) works by
adding the digits starting with the 2nd to last digit and moving left (towards
the first digit). Double the value of the 2nd to last and then every 2nd digit
from there on. If the doubled value is greater than 9, add those digits. The
check digit will be the digit that when added makes the resulting sum a multiple
of 10.

For example, if the card number is 4567-8901-2345-6783:

    8 x 2 -> 16 -> 7
    7 x 1       -> 7
    6 x 2 -> 12 -> 3
    5 x 1       -> 5
    4 x 2       -> 8
    3 x 1       -> 3
    2 x 2       -> 4
    1 x 1       -> 1
    0 x 2       -> 0
    9 x 1       -> 9
    8 x 2 -> 16 -> 7
    7 x 1       -> 7
    6 x 2 -> 12 -> 3
    5 x 1       -> 5
    4 x 2       -> 8

The resulting sum is 7+7+3+5+8+3+4+1+0+9+7+7+3+5+8=77. The next multiple of 10
is 80, so the check digit is 80-77=3. So the check digit on the card number
4567-8901-2345-6783 is valid.

Another example, popular test card number 4111-1111-1111-1111 is also valid:

    1 x 2 -> 2
    1 x 1 -> 1
    1 x 2 -> 2
    1 x 1 -> 1
    1 x 2 -> 2
    1 x 1 -> 1
    1 x 2 -> 2
    1 x 1 -> 1
    1 x 2 -> 2
    1 x 1 -> 1
    1 x 2 -> 2
    1 x 1 -> 1
    1 x 2 -> 2
    1 x 1 -> 1
    4 x 2 -> 8
            --
            29

So the check digit is 1.

## Credit card issuers

- Visa: begin with a 4, can be 13 or 16 digits long
- Mastercard: begin with a 50, 51, 52, 53, 54, or 55, must be 16 digits long
- American Express: begin with a 34 or 37, must be 15 digits long
- Discover Card: begin with 6011 or 65, must be 16 digits long
- Other cards will be 12-19 digits long.

There are more complete description of [credit card
number](http://en.wikipedia.org/wiki/Bank_card_number) formats, but these rules
will be sufficient for the exercise.
