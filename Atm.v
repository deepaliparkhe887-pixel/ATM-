module Atm(
    input clk,
    input reset,
    input [3:0] pin,
    input [1:0] operation,
    input [15:0] amount,
    input enter,

    output reg pin_valid,
    output reg transaction_done,
    output reg insufficient_balance,
    output reg [15:0] balance
);

    parameter SECRET_PIN = 4'd4;

    reg [1:0] attempts;
    reg locked;
    reg enter_prev;

    always @(posedge clk or posedge reset) begin
        if (reset) begin
            balance <= 16'd5000;
            pin_valid <= 1'b0;
            transaction_done <= 1'b0;
            insufficient_balance <= 1'b0;
            attempts <= 2'd0;
            locked <= 1'b0;
            enter_prev <= 1'b0;
        end
        else begin
            enter_prev <= enter;
            transaction_done <= 1'b0;
            insufficient_balance <= 1'b0;

            if (enter && !enter_prev && !locked) begin

                if (!pin_valid) begin
                    if (pin == SECRET_PIN) begin
                        pin_valid <= 1'b1;
                        attempts <= 2'd0;
                    end
                    else begin
                        if (attempts == 2'd2) begin
                            attempts <= 2'd3;
                            locked <= 1'b1;
                        end
                        else begin
                            attempts <= attempts + 1'b1;
                        end
                    end
                end

                else begin
                    case (operation)

                        2'b00: begin
                            // Balance enquiry
                            transaction_done <= 1'b1;
                        end

                        2'b01: begin
                            // Withdraw
                            if (amount == 0) begin
                                transaction_done <= 1'b0;
                            end
                            else if (amount <= balance) begin
                                balance <= balance - amount;
                                transaction_done <= 1'b1;
                            end
                            else begin
                                insufficient_balance <= 1'b1;
                            end
                        end

                        2'b10: begin
                            // Deposit
                            if (amount != 0 &&
                                amount <= (16'hFFFF - balance)) begin
                                balance <= balance + amount;
                                transaction_done <= 1'b1;
                            end
                        end

                        default: begin
                            transaction_done <= 1'b0;
                        end

                    endcase
                end
            end
        end
    end

endmodule
