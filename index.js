const express = require('express');

let app = express();
const port = 3000;

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCardPrice = newItemPrice + cartTotal;
  res.send(totalCardPrice.toString());
});

function funct_discount(cartTotal, isMember) {
  if (isMember) {
    return cartTotal - cartTotal * (discountPercentage / 100);
  } else {
    return cartTotal;
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(funct_discount(cartTotal, isMember).toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let cartAmount = cartTotal * (taxRate / 100);
  res.send(cartAmount.toString());
});

function funcShippingMethod(shippingMethod, distance) {
  if (shippingMethod === 'standard') {
    let deliveryDays = Math.round(distance / 50);
    return deliveryDays;
  } else if (shippingMethod === 'express') {
    let deliveryDays = Math.round(distance / 100);
    return deliveryDays;
  } else {
    return 'Invalid Method';
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseInt(req.query.distance);
  let deliveryDays = funcShippingMethod(shippingMethod, distance);
  res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
