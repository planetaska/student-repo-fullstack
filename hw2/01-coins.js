/** Exercise 01 - Coins **/

// Add your function here 
function calculateChange(amount) {
  // Exit early if the amount is out of bound
  if (amount <= 0) return `$${amount} ==> Error: must be a positive amount`;
  if (amount > 100) return `$${amount} ==> Error: the number is too large`;

  // Declare coins and their values
  const coins = {
    dollar: 1,
    quarter: 0.25,
    dime: 0.1,
    nickel: 0.05,
    penny: 0.01
  };

  const result = {};

  let remainingAmount = amount;

  // Iterate through each coin type to calculate the quantity needed
  for (const [coin, value] of Object.entries(coins)) {
    result[coin] = Math.floor(remainingAmount / value);
    // Avoid floating-point precision issues
    remainingAmount = (remainingAmount % value).toFixed(2);
  }


  // Filtering out coins with value 0 and formatting the output
  const formattedOutput = Object.entries(result)
    .filter(([_, quantity]) => quantity > 0)
    .map(([coin, quantity]) => `${quantity} ${coin}${quantity > 1 ? 's' : ''}`)
    .join(', ');

  return `$${amount} ==> ${formattedOutput}`;
}


// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(1.41));
// $1.41 ==> 1 dollar, 1 quarter, 1 dime, 1 nickel, 1 penny
console.log(calculateChange(0.99));
// $0.99 ==> 3 quarters, 2 dimes, 4 pennies
console.log(calculateChange(2.00));
// $2.00 ==> 2 dollars
console.log(calculateChange(0));
// $0 ==> Error: the number is too large
console.log(calculateChange(0.04));
// $0.04 ==> 4 pennies
console.log(calculateChange(100));
// $100 ==> 100 dollars
