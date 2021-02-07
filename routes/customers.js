const express = require("express");
const router = express.Router();

const {Customers,Val} = require("../models/customer")


router.get("/", async (req, res) => {
  const customers = await Customers.find().sort({ name: 1 });

  res.send(customers);
});


router.get("/id", async (req, res) => {
  const customer = await Customers.findById();
  if (!customer) return res.status(404).send("user not found");

  res.send(customer);
});


router.post("/", async (req, res) => {
  const { error } = Val(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  customer = new Customers({
    name: req.body.name,
    tele: req.body.tele,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.send(customer);
});


router.put("/:id", async (req, res) => {
  const { error } = Val(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  customer = await Customers.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        tele: req.body.tele,
        isGold: req.body.isGold,
      },
    },
    {
      new: true,
    }
  );
  
  if (!customer) return res.status(404).send(" customer is not found ");

  customer = await customer.save();
  res.send(customer);
});


router.delete("/id", async (req, res) => {
  const customer = await Customers.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send("user not found");

  res.send(customer);
});

module.exports = router;
