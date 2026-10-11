const correctPIN = "1234";

let balance = 5000;
let attempts = 0;
let authenticated = false;
let locked = false;
let historyItems = [];

const pinInput = document.getElementById("pin");
const amountInput = document.getElementById("amount");

const loginBtn = document.getElementById("loginBtn");
const balanceBtn = document.getElementById("balanceBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const depositBtn = document.getElementById("depositBtn");
const resetBtn = document.getElementById("resetBtn");

const balanceDisplay = document.getElementById("balance");
const statusDisplay = document.getElementById("status");

const transactionSection =
    document.getElementById("transactionSection");

const historyList = document.getElementById("history");

function updateBalance() {
    balanceDisplay.textContent =
        "₹" + balance.toLocaleString("en-IN");
}

function setStatus(message) {
    statusDisplay.textContent = message;
}

function addHistory(message) {
    historyItems.unshift(message);

    historyList.replaceChildren();

    historyItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function verifyPIN() {
    if (locked) {
        setStatus("ATM locked. Please reset the demo.");
        return;
    }

    if (authenticated) {
        setStatus("PIN already verified.");
        return;
    }

    const enteredPIN = pinInput.value;

    if (!/^\d{4}$/.test(enteredPIN)) {
        setStatus("Enter a valid 4-digit PIN.");
        return;
    }

    if (enteredPIN === correctPIN) {
        authenticated = true;

        setStatus("PIN verified. Welcome!");
        transactionSection.classList.remove("hidden");

        pinInput.disabled = true;
        loginBtn.disabled = true;
    } else {
        attempts++;
        pinInput.value = "";

        if (attempts >= 3) {
            locked = true;
            setStatus("ATM locked after 3 incorrect PIN attempts.");
            loginBtn.disabled = true;
            pinInput.disabled = true;
        } else {
            setStatus(
                `Incorrect PIN. ${3 - attempts} attempt(s) left.`
            );
        }
    }
}

function checkAccess() {
    if (!authenticated || locked) {
        setStatus("Please verify your PIN first.");
        return false;
    }

    return true;
}

function checkAmount() {
    const value = amountInput.value;

    if (value.trim() === "") {
        setStatus("Please enter an amount.");
        return null;
    }

    const amount = Number(value);

    if (!Number.isSafeInteger(amount) || amount <= 0) {
        setStatus("Enter a positive whole-number amount.");
        return null;
    }

    return amount;
}

function balanceEnquiry() {
    if (!checkAccess()) return;

    updateBalance();
    setStatus(`Available balance: ₹${balance.toLocaleString("en-IN")}`);

    addHistory(
        `Balance enquiry: ₹${balance.toLocaleString("en-IN")}`
    );
}

function withdrawMoney() {
    if (!checkAccess()) return;

    const amount = checkAmount();

    if (amount === null) return;

    if (amount > balance) {
        setStatus("Transaction failed: insufficient balance.");
        addHistory(`Failed withdrawal: ₹${amount}`);
        return;
    }

    balance -= amount;

    updateBalance();
    setStatus(`Withdrawal successful: ₹${amount}`);

    addHistory(`Withdrawn: ₹${amount}`);
    amountInput.value = "";
}

function depositMoney() {
    if (!checkAccess()) return;

    const amount = checkAmount();

    if (amount === null) return;

    if (amount > Number.MAX_SAFE_INTEGER - balance) {
        setStatus("Amount exceeds the supported limit.");
        return;
    }

    balance += amount;

    updateBalance();
    setStatus(`Deposit successful: ₹${amount}`);

    addHistory(`Deposited: ₹${amount}`);
    amountInput.value = "";
}

function resetATM() {
    balance = 5000;
    attempts = 0;
    authenticated = false;
    locked = false;
    historyItems = [];

    pinInput.value = "";
    pinInput.disabled = false;

    amountInput.value = "";

    loginBtn.disabled = false;

    transactionSection.classList.add("hidden");

    historyList.replaceChildren();

    const li = document.createElement("li");
    li.textContent = "No transactions yet";
    historyList.appendChild(li);

    updateBalance();
    setStatus("Please enter your PIN");
}

loginBtn.addEventListener("click", verifyPIN);
balanceBtn.addEventListener("click", balanceEnquiry);
withdrawBtn.addEventListener("click", withdrawMoney);
depositBtn.addEventListener("click", depositMoney);
resetBtn.addEventListener("click", resetATM);

pinInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        verifyPIN();
    }
});

amountInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        setStatus("Select Deposit or Withdraw.");
    }
});

updateBalance();
