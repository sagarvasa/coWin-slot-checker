# cowin-slot-checker
APIs to check availability of COVID-19 vaccine slots for CoWin portal across India

# Steps to start and configure server
1. Download and install Node.js into your system
2. Clone/Fork the repo in your workspace
3. Go to repository & install the dependancies using `npm install`
4. Update the configuration (sms/mail credentials) in src/config/config.js file
4. Run command `npm start` to start the server

# APIs
1. Get list of states
curl --location --request GET 'http://localhost:3000/states.json'

2. Get all districts by state id
curl --location --request GET 'http://localhost:3000/districts/16.json'
Note: 16 is state_id. Replace with your input

3. Find by Pincode
curl --location --request GET 'http://localhost:3000/findByPin.json?pinCode=400002&date=2020/05/12'
Note: Date should be in YYYY/MM/DD format

4. Find by District
curl --location --request GET 'http://localhost:3000/findByDistrict.json?districtId=45&date=2020/05/12'
Note: Date should be in YYYY/MM/DD format

5. Notify & Fetch for list of Pincodes
curl --location --request POST 'http://localhost:3000/notifyForPincodes.json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "pincodes": ["560017", "560038", "560075"],
    "mobile": "9090909090",
    "date": "2020-05-12",
    "email": "sagar123@domain.com"
}'

6. Notify & Fetch for list of districts
curl --location --request POST 'http://localhost:3000/notifyForDistricts.json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "districts": ["264", "274", "294"],
    "mobile": "9090909090",
    "date": "2020-05-12",
    "email": "sagar123@domain.com"
}'


