// Define the instruments with their properties
const instruments = [
    { Instrument: 1, weight: 3, volume: 2, value: 10 }, // Instrument 1
    { Instrument: 2, weight: 4, volume: 3, value: 15 }, // Instrument 2
    { Instrument: 3, weight: 2, volume: 1, value: 8  }, // Instrument 3
    { Instrument: 4, weight: 5, volume: 4, value: 20 }  // Instrument 4
];

// Set constraints for weight and volume
const maxWeight = 10; 
const maxVolume = 7;

// Function to check if a given combination of instruments meets the constraints
function check(combination, maxWeight, maxVolume) {
    const totalWeight = combination.reduce((sum, inst) => sum + inst.weight, 0);
    const totalVolume = combination.reduce((sum, inst) => sum + inst.volume, 0);
    return totalWeight <= maxWeight && totalVolume <= maxVolume; // returns true if within limits
}

// Function to calculate the total scientific value of a combination
function calculateValue(combination) {
    return combination.reduce((sum, inst) => sum + inst.value, 0);
}

// Recursive function to generate all possible combinations of instruments
function AllCombinations(instruments, index = 0, currentSubset = [], allCombinations = []) {
    if (index === instruments.length) { // Base case: if end of array is reached
        allCombinations.push([...currentSubset]); // Add the current subset to the list of all combinations
        return;
    }

    // Include the current instrument and recurse
    currentSubset.push(instruments[index]);
    AllCombinations(instruments, index + 1, currentSubset, allCombinations);

    // Backtrack: exclude the current instrument and recurse
    currentSubset.pop();
    AllCombinations(instruments, index + 1, currentSubset, allCombinations);

    return allCombinations; // Return all generated combinations
}

// Main function to find the best combination of instruments within constraints
function rightCombination() {
    const allCombinations = AllCombinations(instruments); // Generate all combinations
    let bestValue = 0; // Variable to store the maximum value found
    let bestCombination = []; // Variable to store the best combination of instruments

    for (let combination of allCombinations) { // Loop through all combinations
        if (check(combination, maxWeight, maxVolume)) { // Check if the combination is valid under constraints
            const currentValue = calculateValue(combination); // Calculate its value
            if (currentValue > bestValue) { // If its value is higher than what we have found so far
                bestValue = currentValue; // Update the best value
                bestCombination = combination; // Update the best combination
            }
        }
    }

    return { bestCombination, bestValue }; // Return the best combination and its value
}

// Execute the function and store the result
const { bestCombination, bestValue } = rightCombination();

// Output the results
console.log("Selected Instruments:", "\n", bestCombination);
console.log("Total Weight:", bestCombination.reduce((sum, pre) => sum + pre.weight, 0));
console.log("Total Volume:", bestCombination.reduce((sum, pre) => sum + pre.volume, 0));
console.log("Total Scientific Value:", bestValue);
