// Using $in
productColllection
  .find(
    { id: { $in: [7, 8] } },
    {
      projection: {
        _id: 0,
        id: 1,
        title: 1,
      },
    },
  )
  .limit(5);
console.log(await productData.toArray());

// Using $nin
productColllection.find({ price: { $nin: [15.99, 695] } });
//  Using $eq
productColllection.find({ price: { $eq: 695 } });

// Using $ne
productColllection.find({ price: { $ne: 695 } });

// Using $gt
productColllection.find({ price: { $gt: 200 } });

// Logical Operation

// $and Operator
productColllection.find({
  $and: [{ price: { $gt: 20 } }, { id: { $lt: 17 } }],
});
productColllection.find({
  $and: [{ price: { $lt: 200 } }, { price: { $gt: 5 } }],
});

// $or Operator

productColllection.find({ $or: [{ price: { $eq: 20 } }, { id: { $eq: 5 } }] });
