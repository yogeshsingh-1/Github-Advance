# Github repo
http://github.com/sequelize/umzug

# Install Packages:

npm install --save-dev sequelize-cli

- initialize sequelize migration and sedders folde : npx sequelize-cli init

project/
├── config/
│ └── config.json
├── migrations/
├── models/
└── seeders/

- create a migration file
  npx sequelize-cli migration:generate --name 1
  
