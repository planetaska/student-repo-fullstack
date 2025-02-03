/** Exercise 01 - Coins **/

// Add your function here 
function calculateChange(amount) {
  // Exit early if the amount is out of bound
  if (amount <= 0) return `$${amount} ==> Error: amount must be greater than $0.00`;
  if (amount > 100) return `$${amount} ==> Error: amount must be less than or equal to $100.00`;

  // Convert amount to cents for easier calculation
  const cents = Math.round(amount * 100);

  // Define coin values in cents
  const coins = {
    dollar: 100,
    quarter: 25,
    dime: 10,
    nickel: 5,
    penny: 1
  };

  const result = {};
  let remainingCents = cents;

  // Iterate through each coin type to calculate the quantity needed
  for (const [coin, value] of Object.entries(coins)) {
    if (remainingCents >= value) {
      const numCoins = Math.floor(remainingCents / value);
      remainingCents = remainingCents % value;
      result[coin] = numCoins;
    }
  }

  // Filtering out coins with value 0 and formatting the output
  const formattedOutput = Object.entries(result)
    .filter(([_, quantity]) => quantity > 0)
    .map(([coin, quantity]) => {
      const coinName = coin === 'penny' && quantity > 1 ? 'pennies' : `${coin}${quantity > 1 ? 's' : ''}`;
      return `${quantity} ${coinName}`;
    })
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
