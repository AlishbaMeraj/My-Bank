#! /usr/bin/env node



import inquirer from "inquirer"

// Bank Account interface
interface BankAccount {
    accountNumber : number;
    balance: number;
    withdraw(amount: number): void
    deposite(amount: number): void
    checkBalance(): void
}

// Bank Account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }

    // Debit money 
    withdraw(amount: number): void {
        if(this.balance >= amount){
           this.balance -= amount;
           console.log(`withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }else {
            console.log("Insufficient balance.");
        }
    }

    // credit money
    deposite(amount: number): void {
        if(amount > 100){
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }this.balance += amount;
        console.log(`Deposite of $${amount} successful. Remaining balance: $${this.balance}`)
    }
    // check balance
    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
    }
}



// customer class 
class customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string,  lastName: string, gender: string,  age: number, mobileNumber: number, account: BankAccount,)
    {
        this.firstName = firstName;
        this.lastName =lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

// create bank accounts
const accounts: BankAccount[] = [
    new BankAccount (1101, 300),
    new BankAccount (1102, 500),
    new BankAccount (1103, 1000),
    new BankAccount (1104, 2000),
    new BankAccount (1106, 3000),
];

// create customers
const customers: customer[] = [
    new customer ("Alishba", "Meraj", "Female", 9, 3043456776, accounts[0]),
    new customer ("Anas", "Malik", "Male", 22, 3163456776, accounts[1]),
    new customer ("Ayesha", "Khan", "Female", 17, 3433456776, accounts[2]),
    new customer ("Sehar", "Hayat", "Female", 14, 3333456776, accounts[3]),
    new customer ("Wahaj", "Ali", "Male", 27, 3123456776, accounts[4]),
]


// function to interact with bank account

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "AccountNumber",
            message: "enter your Account Number:",
            type: "number",
        })
        const customer = customers.find(customer =>customer.account.accountNumber === accountNumberInput.AccountNumber);

        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}\n`);
            const ans = await inquirer.prompt([{
                name: "Select",
                message: "select an operation",
                type: "list",
                choices:  [
                    "Withdraw",
                    "Check Balance",
                    "deposite",
                    "Exit",
                  ]
            }]);
            switch(ans.Select){
                case "deposite":
                    const depositeAmount = await inquirer.prompt({
                        name: "amount",
                        message: "Enter your Deposite Amount:",
                        type: "number",
                    })
                    customer.account.deposite(depositeAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        message: "Enter your Withdraw Amount:",
                        type: "number",
                    })
                    customer.account.withdraw(WithdrawAmount.amount);
                    break;
                case "Exit":
                    console.log("Exiting bank program....");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            } 
        }else {
            console.log("Invalid account number. Please try again.");
        }
    }while(true)
    
};

service()

    