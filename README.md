🏦 ATM Transaction System

📌 Project Overview

The ATM Transaction System is a simple digital banking project developed using Verilog HDL, Icarus Verilog, GTKWave, HTML, CSS, and JavaScript.

This project demonstrates basic ATM operations such as PIN verification, balance enquiry, cash withdrawal, and money deposit through a user-friendly web interface.

🎯 Objectives

- To implement basic ATM operations.
- To verify a user's PIN.
- To check the available account balance.
- To perform deposit and withdrawal operations.
- To display an insufficient balance message.
- To simulate the digital logic using Verilog HDL.

✨ Features

- 🔐 PIN Verification
- 💰 Balance Enquiry
- 💵 Cash Withdrawal
- 💳 Money Deposit
- ❌ Incorrect PIN Detection
- 🚫 ATM Lockout After Three Incorrect PIN Attempts
- 📊 Transaction History
- 🔄 Reset System
- 💻 User-Friendly Web Interface

🛠️ Technologies Used

- Verilog HDL
- Icarus Verilog
- GTKWave
- HTML
- CSS
- JavaScript

📂 Project Structure

ATM-Transaction-System/
│
├── Atm.v
├── Atm_tb.v
├── index.html
├── style.css
├── script.js
└── README.md

🔑 Demo Login Details

- Default PIN: 1234
- Initial Balance: ₹5,000

Note: The PIN and balance are for demonstration purposes only.

⚙️ How to Run the Project

1. Run the Web Interface

1. Download or clone this repository.
2. Open the project folder.
3. Open "index.html" in a web browser.
4. Enter the demo PIN: "1234".
5. Click VERIFY PIN.
6. Select Balance Enquiry, Withdraw, or Deposit.

2. Run the Verilog Simulation

Install Icarus Verilog on your computer.

Compile the Verilog files:

iverilog -o Atm_sim Atm.v Atm_tb.v

Run the simulation:

vvp Atm_sim

3. View the Waveform

The testbench generates a waveform file named "Atm.vcd".

Open it using GTKWave:

gtkwave Atm.vcd

Add the required signals to view the simulation waveform.

🧪 Test Cases

Test Case| Expected Result
Correct PIN| Access granted
Incorrect PIN| Error message
Balance Enquiry| Displays available balance
Valid Withdrawal| Balance decreases
Withdrawal Above Balance| Insufficient balance message
Valid Deposit| Balance increases
Three Incorrect PIN Attempts| ATM lockout
Reset System| Demo returns to initial state

📚 Learning Outcomes

- Understanding Verilog modules and testbenches.
- Learning basic digital system simulation.
- Using Icarus Verilog to compile and run Verilog code.
- Viewing signal waveforms using GTKWave.
- Creating a web interface using HTML, CSS, and JavaScript.
- Understanding basic ATM transaction logic.

⚠️ Limitations

This project is intended for educational purposes only. The web interface and Verilog simulation run independently and are not directly connected. The displayed PIN and account balance are not suitable for real banking use.

🏁 Conclusion

The ATM Transaction System demonstrates the fundamental operations of an ATM through a simple web interface and a Verilog-based simulation. It provides a practical introduction to digital logic design and basic web development.

---

Project Name: ATM Transaction System
Project Type: Academic Mini Project
Domain: Digital Logic Design and Web Development
