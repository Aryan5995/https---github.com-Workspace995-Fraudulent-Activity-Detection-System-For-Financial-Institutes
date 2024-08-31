// JavaScript (script1.js)
// import { customers } from '.js/customers.js';

function toggleStatus(cardId) {
    const card = document.getElementById(cardId);
    const status = card.querySelector('.status');
    const checkbox = card.querySelector('input[type="checkbox"]');
    
    if (checkbox.checked) {
        status.classList.remove('disabled');
        status.classList.add('active');
        status.textContent = 'Active';
    } else {
        status.classList.remove('active');
        status.classList.add('disabled');
        status.textContent = 'Disabled';
    }
}

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('addFlagModalUnique');
    const btn = document.getElementById('addFlagBtnUnique');
    const span = document.getElementById('addFlagCloseUnique');

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
/*the script for index.html*/

document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("loginModal");
    var btn = document.getElementById("loginBtn");
    var span = document.getElementsByClassName("close")[0];

    var users = {
      "Aryan": "focal",
      "sheena": "focal",
      "kartik": "focal",
      "amaresh": "focal",
      "aditya": "focal",
      "manogna":"focal",
      "sonika":"focal"
    };

    btn.onclick = function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var form = document.getElementById("loginForm");
    form.onsubmit = function(event) {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        if (users[username] && users[username] === password) {
            localStorage.setItem('username', username); // Store username in local storage
            window.location.href = 'Parameters.html'; // Redirect to temp page
        } else {
            alert("Invalid username or password.");
        }
    }

    var modalForm = document.getElementById("modalLoginForm");
    modalForm.onsubmit = function(event) {
        event.preventDefault();
        var username = document.getElementById("modalUsername").value.toLowerCase();
        var password = document.getElementById("modalPassword").value;
        if (users[username] && users[username] === password) {
            localStorage.setItem('username', username); // Store username in local storage
            window.location.href = 'Parameters.html'; // Redirect to Parameters page
        } else {
            alert("Invalid username or password.");
        }
        modal.style.display = "none";
    }
  });

  /*script for risk.html*/
  function fetchCustomerDetails() {
    const customerID = document.getElementById('customerID').value.trim();
    console.log('Customer ID entered:', customerID);
    console.log('Customers array:', customers); // Check if the array is loaded correctly

    const customer = customers.find(c => c.id === customerID);
    console.log('Matching customer:', customer);

    if (customer) {
        console.log('Customer found:', customer);
        displayCustomerDetails(customer);
        sendToBackend(customer);
        document.getElementById('detailsBox').classList.add('show');
    } else {
        alert('Please enter a valid Customer ID');
        console.log('Customer not found:', customerID);
    }
}

function displayCustomerDetails(customer) {
    const detailsDiv = document.getElementById('customerDetails');
    detailsDiv.innerHTML = `
        <h3>Customer Details</h3>
        <p><b>Gross Income:</b> ${customer.grossIncome}</p>
        <p><b>Employment Status:</b> ${customer.employmentStatus}</p>
        <p><b>Credit Score:</b> ${customer.creditScore}</p>
        <p><b>Total Monthly Debt Payments:</b> ${customer.totalMonthlyDebtPayments}</p>
        <p><b>Total Monthly Income:</b> ${customer.totalMonthlyIncome}</p>
        <p><b>Debt-to-Income Ratio:</b> ${customer.debtToIncomeRatio}</p>
        <p><b>History of Defaulting Loans:</b> ${customer.historyOfDefaultingLoans}</p>
        <p><b>Criminal Activity:</b> ${customer.criminalActivity}</p>
        <p><b>Suspicious Behavior:</b> ${customer.suspiciousBehavior}</p>
        <p><b>Unverified Employment:</b> ${customer.unverifiedEmployment}</p>
        <p><b>Is Defaulter:</b> ${customer.isDefaulter}</p>
        <p><b>Frequent Address Changes:</b> ${customer.frequentAddressChanges}</p>
        <p><b>Involved in Money Laundering:</b> ${customer.involvedInMoneyLaundering}</p>
        <p><b>Using Multiple Alliances:</b> ${customer.usingMultipleAlliances}</p>
    `;
}

// async function sendToBackend(customer) {
//     const requestBody = {
//         fraudDetection: {
//             creditScore: customer.creditScore,
//             debtToIncomeRatio: customer.debtToIncomeRatio,
//             historyOfDefaultingLoans: customer.historyOfDefaultingLoans,
//             criminalActivity: customer.criminalActivity,
//             suspiciousBehaviour: customer.suspiciousBehavior,
//             detectedIdentityTheft: customer.detectedIdentityTheft || "No",
//             unverifiedEmployment: customer.unverifiedEmployment,
//             frequentAddressChanges: customer.frequentAddressChanges,
//             involvedinMoneyLaundering: customer.involvedInMoneyLaundering,
//             usingMultipleAlliances: customer.usingMultipleAlliances
//         }
//     };

//     try {
//         const response = await fetch('https://odiz8tbz45.execute-api.us-east-2.amazonaws.com/DecisionModelFraudDetection/detection-id', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestBody)
//         });

//         if (!response.ok) {
//             throw new Error(`Network response was not ok: ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log('Response data:', data);
//         const riskLevel = data.response.fraudDetection.riskLevel;
//         displayRiskIndicator(riskLevel);
//     } catch (error) {
//         console.error('Error:', error);
//         alert(`Error: ${error.message}`);
//     }
// }

// function displayRiskIndicator(riskLevel) {
//     let riskClass = '';
//     let riskMeterWidth = 0;
//     let loanStatus = '';

//     if (riskLevel.includes('High Risk')) {
//         riskClass = 'high-risk';
//         riskMeterWidth = 100;
//         loanStatus = 'Deny Loan';
//     } else if (riskLevel.includes('Medium Risk')) {
//         riskClass = 'medium-risk';
//         riskMeterWidth = 50;
//         loanStatus = 'Further Evaluation Needed';
//     } else {
//         riskClass = 'no-risk';
//         riskMeterWidth = 10;
//         loanStatus = 'Accept Loan';
//     }

//     document.getElementById('riskLevelText').innerText = riskLevel;
//     document.getElementById('riskLevelBox').className = `risk-box risk-level-box ${riskClass}`;
//     document.getElementById('riskMeter').style.width = `${riskMeterWidth}%`;
//     document.getElementById('riskMeter').className = `risk-meter ${riskClass}`;
//     document.getElementById('loanStatusText').innerText = loanStatus;
// }
async function sendToBackend(customer) {
    const requestBody = {
        fraudDetection: {
            creditScore: customer.creditScore,
            debtToIncomeRatio: Number(customer.debtToIncomeRatio),
            historyOfDefaultingLoans: customer.historyOfDefaultingLoans,
            criminalActivity: customer.criminalActivity,
            suspiciousBehaviour: customer.suspiciousBehavior,
            detectedIdentityTheft: customer.detectedIdentityTheft || "No",
            unverifiedEmployment: customer.unverifiedEmployment,
            frequentAddressChanges: customer.frequentAddressChanges,
            involvedinMoneyLaundering: customer.involvedInMoneyLaundering,
            usingMultipleAlliances: customer.usingMultipleAlliances
        }
    };

    try {
        const response = await fetch('https://odiz8tbz45.execute-api.us-east-2.amazonaws.com/DecisionModelFraudDetection/detection-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Full response data:', data); // Log the full response

        // Access the riskLevel from the response
        if (data && data.response && data.response.fraudDetection) {
            const riskLevel = data.response.fraudDetection.riskLevel;
            displayRiskIndicator(riskLevel);
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    }
}

function displayRiskIndicator(riskLevel) {
    let riskClass = '';
    let riskMeterWidth = 0;
    let loanStatus = '';

    if (riskLevel.includes('High Risk')) {
        riskClass = 'high-risk';
        riskMeterWidth = 100;
        loanStatus = 'Deny';
    } else if (riskLevel.includes('Medium Risk')) {
        riskClass = 'medium-risk';
        riskMeterWidth = 50;
        loanStatus = 'Further Evaluation Needed';
    } else {
        riskClass = 'low-risk';
        riskMeterWidth = 10;
        loanStatus = 'Accept';
    }

    document.getElementById('riskLevelText').innerText = riskLevel;
    document.getElementById('riskLevelBox').className = `risk-box risk-level-box ${riskClass}`;
    document.getElementById('riskMeter').style.width = `${riskMeterWidth}%`;
    document.getElementById('riskMeter').className = `risk-meter ${riskClass}`;
    document.getElementById('loanStatusText').innerText = loanStatus;
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateRiskButton = document.getElementById('calculateRiskButton');
    const userProfileName = document.getElementById('userProfileName');
    
    // Ensure the button and userProfileName elements are found
    if (calculateRiskButton) {
        calculateRiskButton.onclick = fetchCustomerDetails;
    }

    if (userProfileName) {
        const username = localStorage.getItem('username');
        if (username) {
            userProfileName.textContent = username;
        } else {
            window.location.href = 'index.html';
        }
    }
});


  
    /*script for Parameters.html*/
    document.addEventListener('DOMContentLoaded', (event) => {
        const addFlagBtn = document.getElementById('addFlagBtnUnique');
        const addFlagModal = document.getElementById('addFlagModalUnique');
        const addFlagClose = document.getElementById('addFlagCloseUnique');

        addFlagBtn.addEventListener('click', () => {
            addFlagModal.style.display = 'block';
        });

        addFlagClose.addEventListener('click', () => {
            addFlagModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == addFlagModal) {
                addFlagModal.style.display = 'none';
            }
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
        const username = localStorage.getItem('username'); // Retrieve the username from local storage
        if (username) {
          document.getElementById('userProfileName').textContent = username;
        } else {
          window.location.href = 'index.html'; // Redirect to login if no username is found
        }
      });