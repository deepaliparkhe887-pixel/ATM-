`timescale 1ns/1ps

module Atm_tb;

    reg clk;
    reg reset;
    reg [3:0] pin;
    reg [1:0] operation;
    reg [15:0] amount;
    reg enter;

    wire pin_valid;
    wire transaction_done;
    wire insufficient_balance;
    wire [15:0] balance;

    Atm uut (
        .clk(clk),
        .reset(reset),
        .pin(pin),
        .operation(operation),
        .amount(amount),
        .enter(enter),
        .pin_valid(pin_valid),
        .transaction_done(transaction_done),
        .insufficient_balance(insufficient_balance),
        .balance(balance)
    );

    always #5 clk = ~clk;

    task press_enter;
        begin
            @(negedge clk);
            enter = 1;
            @(negedge clk);
            enter = 0;
            @(negedge clk);
        end
    endtask

    initial begin
        $dumpfile("Atm.vcd");
        $dumpvars(0, Atm_tb);

        clk = 0;
        reset = 1;
        pin = 0;
        operation = 0;
        amount = 0;
        enter = 0;

        #12;
        reset = 0;

        // Enter correct PIN
        pin = 4'd4;
        press_enter;

        $display("PIN Valid = %b", pin_valid);

        // Check balance
        operation = 2'b00;
        press_enter;

        $display("Balance = %0d", balance);

        // Withdraw 1000
        operation = 2'b01;
        amount = 16'd1000;
        press_enter;

        $display("After Withdrawal = %0d", balance);

        // Deposit 2000
        operation = 2'b10;
        amount = 16'd2000;
        press_enter;

        $display("After Deposit = %0d", balance);

        // Try to withdraw 10000
        operation = 2'b01;
        amount = 16'd10000;
        press_enter;

        $display("Insufficient Balance = %b",
                 insufficient_balance);
        $display("Final Balance = %0d", balance);

        #20;
        $finish;
    end

endmodule
