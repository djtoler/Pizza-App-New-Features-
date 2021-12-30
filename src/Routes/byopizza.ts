import express from "express";
const byopizza = express.Router();
import Pizza from "../Models/pizza";

class PizzaOrder implements Pizza {
    size: any[];
    toppings: any[];
    gluten: string;
    specialInstructions: string;
    constructor(size: any[], toppings: any[], gluten: string, specialInstructions: string) {
        this.size = size;
        this.toppings = toppings;
        this.gluten = gluten;
        this.specialInstructions = specialInstructions
    }
}

byopizza.get('/', (req, res) => {
    res.render('byopizza')
});

// -------------------------------------------POST ROUTE FOR ORDERING CUSTOM PIZZA--------------------------------------------------------
// Set up a post route for users to build their own pizza, get a total price and get an order confirmation 
// page on form submission.
byopizza.post('/', (req, res) => {

    //Set a counter for the total cost of a pizza, starting at 0.
    let totalPriceCounter = 0;
    let sliceSize;
    let toppingsCount;
    let freeDelivery = "";

    // Declare & assign a variable to empty array. This will store the results of the manipulated toppings 
    // values that were selected on the form. Later will get looped through & listed out on confirmation page.
    let sliceToppingsArray:any = [];
    
    // Make a new Pizza object & set its properties to the access points on the form.
    let newPizza: Pizza = req.body;
    console.log(req.body);
    
    newPizza.size = req.body.size;
    newPizza.toppings = req.body.toppings;
    newPizza.gluten = req.body.gluten;
    newPizza.specialInstructions = req.body.comment;

    // Declare & assign variables to the Pizza object properties to manipulate later with string methods,
    // array methods and handlebars 
    let pizzaToppings = newPizza.toppings;
    let pizzaSize = newPizza.size;
    let glutenFree = newPizza.gluten;
    let specialInstructions = newPizza.specialInstructions;

    // Extract the price of a pizza and add it to the totalPriceCounter, extract the size. Call 
    // function in following conditional statement
    const getPizzaPriceAndSize = () => {
        let splitSizePrice = pizzaSize.split(",", 1)
        totalPriceCounter += parseInt(splitSizePrice);
        sliceSize = pizzaSize.slice(3);
};

    // A single toppings box checked will return a string so I'll use string methods to extract values. If more than 
    // 1 is selected it will return an array and I'll loop througgh it and use same string methods.
    if (typeof pizzaToppings == "string") {
        getPizzaPriceAndSize();
        toppingsCount = 1;
        let splitPrice = pizzaToppings.split(",", 1);
        totalPriceCounter = totalPriceCounter + parseInt(splitPrice[0]);
        let sliceToppings = pizzaToppings.slice(3);
        sliceToppingsArray.push(sliceToppings);
        
    } else {
        getPizzaPriceAndSize();
        toppingsCount = pizzaToppings.length;
        // The form checkboxes will return an array of values from the value attributes of the selected toppings.
        // I'll access and itterate through the array of toppings values using a for loop.
        for (let i = 0; i < pizzaToppings.length; i++) {
            // Declare a variable to store the price portion of each toppings value.
            // Extract it using the string.split() method
            // Add the price to the totalPriceCounter variable
            let splitPrice = pizzaToppings[i].split(",", 1);
            totalPriceCounter = totalPriceCounter + parseInt(splitPrice[0]);

            // Declare a variable to store the topping portion of the toppings value
            // Extract it using the string.slice() method.
            // Push it to the empty array that was made on line 33. Use it later 
            // to loop through & list the toppings on the confirmation page
            let sliceToppings = pizzaToppings[i].slice(3);
            sliceToppingsArray.push(sliceToppings);
        };
    };

    // If gluten free checkbox is not checked, display No on the confirmation page, if checked, add $2.00
    if (!glutenFree) {
        glutenFree = "No";
    } else {totalPriceCounter += 2;};

    // Reassign freeDelivery to message if total price is more than $15
    if (totalPriceCounter >= 15) {
        freeDelivery = `Because your order meets the $15.00 minimum, you get FREE DELIVERY`;
    };

    // Format the total price of a pizza with double decimal points. 
    const newDecimalNumber = totalPriceCounter.toFixed(2);

    // Set up handlebars for order confirmation variables & show byoPizzaCon page on form submission
    res.render('byoPizzaCon', {
        pizzaToppings: sliceToppingsArray,
        pizzaPirce: newDecimalNumber,
        specialInstructions: specialInstructions,
        glutenChoice: glutenFree,
        pizzaSize: sliceSize,
        freeDelivery,
        toppingsCount
        });
});

export default byopizza;

