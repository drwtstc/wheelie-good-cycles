require('dotenv').config();
require('./config/database');

const Element = require('./models/element');
const Product = require('./models/product');
const Service = require('./models/service');

(async function() {

  await Element.deleteMany({});
  const elements = await Element.create([
    {name: 'Products', sortOrder: 10},
    {name: 'Services', sortOrder: 20},
  ]);

  await Product.deleteMany({});
  const products = await Product.create([
    {name: 'Helmet', color: 'black', year:'2022', discipline:'', brand:'Lazer', model:'', department:'Womens', element: elements[0], price: 74.95},
    {name: 'Lock', color: 'orange', year:'2021', discipline:'', brand:'Kryptonite', model:'', department:'', element: elements[0], price: 59.95},
    {name: 'Lights', color: 'black', year:'2022', discipline:'', brand:'Knog', model:'', department:'', element: elements[0], price: 39.95},
    {name: 'Chain', color: 'chrome', year:'2023', discipline:'', brand:'KHS', model:'', department:'', element: elements[0], price: 10.95},
    {name: 'Inner Tube', color: 'black', year:'2022', discipline:'', brand:'Michelin', model:'', department:'', element: elements[0], price: 5.95},
    {name: 'Road Bike', color: 'red', year:'2023', discipline:'Road', brand:'Cannondale', model:'Supersix', department:'Mens', element: elements[0], price: 9499.95},
  ]);

  await Service.deleteMany({});
  const services = await Service.create([
    {name: 'Assebmly', emoji: '🚴‍♀️', element: elements[1], price: 149.95},
    {name: 'Tune Up', emoji: '🚴‍♀️', element: elements[1], price: 74.95},
    {name: 'Flat Tire', emoji:'🚴‍♀️',  element: elements[1], price: 9.95},
  ]);

  console.log(products, services)

  process.exit();

})();