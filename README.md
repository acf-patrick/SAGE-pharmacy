# SAGE Pharmacy

[![build](https://github.com/acf-patrick/SAGE-pharmacy/actions/workflows/deploy.yaml/badge.svg)](https://github.com/acf-patrick/SAGE-pharmacy/actions/workflows/deploy.yaml)

SAGE web application for pharmacy management.

## Features ✨

This application manages :

<ul>
    <li><a href="#inventory">inventory</a></li>
    <li><a href="#purchase">purchase</a></li>
    <li><a href="#commands">orders</a></li>
    <li><a href="#providers">providers</a></li>
</ul>

<img src="./assets/UML.png" alt="UML" />
<p align="center"><em>ERD for database</em></p>

<h3 id="inventory">📦 Inventory</h3>
Stock/inventory page covers mostly CRUD operation. User can Create/Read/Update/Delete medicine entities from database.

<h3 id="purchase">🛒 Purchase</h3>
Purchase page displays suggestion based on futures stock and real stock found in database.

Table also displays a **select box** in case there are multiple matching between medicine from local invetory and medicine from provider.

<h3 id="commands">📝 Orders</h3>

The common-way to generate commands/orders is using the _purchase page_. From purchase page, quantity to order for each medicines are computed beforehand. That way, one has a wider overview about the command because we have to take in count that certain providers have certain prerequisites about the orders, either by __quantity__ or __pricing__.

Orders have several status, displayed as _Kanban_ for simplicity.

<img src="./assets/orders.png" alt="orders" />
<p align="center"><em>Orders list</em></p>

- __ORDERED__ is the initial status of an order
- __PENDING__ means that provider has been notified and they are processing the request. One can send mail directly from the app to notify the provider.
- __RECEIVED__ means that items have been delivered. User can attach evidence (scan image or PDF) file to order.
- _terminal stage_ :
    - __AVOIR__ means that some items include issue. (Wrong quantity, expired items, etc...)
    - __FINISHED__ means that order has been succefully fulfilled.
- __ARCHIVED__ means that order has been succefully fulfilled but datas might be used later.

<h3 id="providers">🏭 Providers</h3>
User can Create/Read/Update/Delete providers from database. Provider's medicine catalogue can be imported as CSV/XLSX file from the provider page. 

Since we can not know each provider's catalogue file pattern, file has to follow some specific pattern in order to be deserialized.

Medicine in inventory and medicine from provider correspondance also has too be done by the user since we can not rely on medicine/item names. If we could, a simple _regex_ matching would have been sufficient.

<h3 id="providers">🧾 Dedicated page for bills</h3>

_Archive_ page displays list of archived orders with receipt/bill/evidence attached to them.

## Preview 🚧
[Preview](http://3.19.232.21/) of the application is hosted on an __EC2 instance__.  Credentials :
- username : admin
- password : free

## TODOS 📝
- [ ] features for client interaction
- [ ] features for cashing
- [ ] personnel management

## Technologies used 🛠️
<div align="center">
    <img width="64" height="64" src="./assets/react.svg" alt="react-icon" />
    <img width="64" height="64" src="./assets/nestjs.svg" alt="nestjs-icon" />
    <img width="64" height="64" src="./assets/rust.png" alt="rust-icon" />
    <img width="64" height="64" src="./assets/prisma.svg" alt="prisma-icon" />
    <img width="64" height="64" src="./assets/aws-ec2.svg" alt="aws-ec2-icon" />
    <img width="64" height="64" src="./assets/docker.svg" alt="docker-icon" />
    <img width="64" height="64" src="./assets/gh-workflow.png" alt="github-action-icon" />
</div>

<hr />

> Made with ❤️