markdown
Copy code
# Bitcoin Price Monitor with Email Alerts

This Node.js program continuously monitors Bitcoin's 24-hour change and sends email alerts when certain conditions are met, such as a 1% or more increase or decrease in price, or a change in trend from positive to negative or vice versa.

## Prerequisites

Before running the program, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/bitcoin-price-monitor.git
Navigate to the project directory:

bash
Copy code
cd bitcoin-price-monitor
Install the required Node.js dependencies:

bash
Copy code
npm install
Configuration
To configure the program and specify the email alerts, you need to make adjustments to the code:

Email Alert Configuration: Open the index.js file and find the following lines:

javascript
Copy code
// Customize the subject, message, and recipient email for email alerts
await sendEmailAlert(
    "Bitcoin Price Alert (Negative)",
    "Bitcoin price has decreased by 1% or more (Negative)!",
    "aagortey@gmail.com"
);
Adjust the subject, message, and recipient email as needed.

Delay Interval: You can adjust the delay interval (currently set to 1 minute) between each check in the monitorBitcoinChange function:

javascript
Copy code
// Wait for a specified time interval (e.g., 1 minute) before the next check
await new Promise(resolve => setTimeout(resolve, 60000)); // 1 minute
Modify the delay to suit your desired monitoring frequency.

Usage
Run the program with the following command:

bash
Copy code
npm start
The program will continuously monitor Bitcoin's 24-hour change and send email alerts when the specified conditions are met. You can leave it running in the background to receive alerts.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Axios - Used for making HTTP requests to the CoinGecko API.
Node.js - JavaScript runtime environment.
npm - Node Package Manager.
vbnet
Copy code

In this `README.md` file, I've provided instructions for installation, configuration, usage, and acknowledged the dependencies used in your program. You can customize it further to include additional details or explanations if needed.