const axios = require('axios');

// Function to check if a number is negative
function isNegative(number) {
    return number < 0;
}

// Function to send an email alert
async function sendEmailAlert(subject, message, recipientEmail) {
    try {
        const response = await axios.post("https://igot-alert.onrender.com/send-email", {
            subject,
            message,
            recipientEmail
        });
        console.log("Email alert sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending email alert:", error);
    }
}

// Function to fetch and monitor Bitcoin 24-hour change
async function monitorBitcoinChange() {
    let previousChange = 0;
    let alerted = false; // Flag to track if an alert has been sent

    while (true) {
        try {
            const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true");
            const btcData = response.data.bitcoin;

            if (btcData && btcData.usd_24h_change !== undefined) {
                const change = btcData.usd_24h_change;
                console.log(`BTC/USDT 24-hour Change: ${change}%`);

                const isNegativeChange = isNegative(change);

                if (!alerted) {
                    if (isNegativeChange && change <= -1) {
                        console.log("Bitcoin price decreased by 1% or more (Negative)!");
                        alerted = true;

                        // Send email alert
                        await sendEmailAlert(
                            "Bitcoin Price Alert (Negative)",
                            "Bitcoin price has decreased by 1% or more (Negative)!",
                            "aagortey@gmail.com"
                        );
                    } else if (!isNegativeChange && change >= 1) {
                        console.log("Bitcoin price increased by 1% or more (Positive)!");
                        alerted = true;

                        // Send email alert
                        await sendEmailAlert(
                            "Bitcoin Price Alert (Positive)",
                            "Bitcoin price has increased by 1% or more (Positive)!",
                            "aagortey@gmail.com"
                        );
                    }
                }

                if (isNegativeChange !== isNegative(previousChange)) {
                    if (isNegativeChange) {
                        console.log("Change in trend detected (Negative)!" + btcData);
                    } else {
                        console.log("Change in trend detected (Positive)!" + btcData);
                    }

                    // Send email alert for trend change
                    await sendEmailAlert(
                        "Bitcoin Trend Change Alert",
                        `Change in trend detected: Bitcoin price has turned ${(isNegativeChange ? 'Negative' : 'Positive')}`,
                        "aagortey@gmail.com"
                    );

                    alerted = false; // Reset the alert flag
                }

                previousChange = change;
            } else {
                console.log("Data not found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            console.log("Error fetching data.");
        }

        // Wait for a specified time interval (e.g., 1 minute) before the next check
        await new Promise(resolve => setTimeout(resolve, 60000)); // 1 minute
    }
}

// Start monitoring Bitcoin price changes
monitorBitcoinChange();