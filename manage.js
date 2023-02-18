class employee {
    constructor (name, age, employeeType) {
        this.name = name
        this.age = age
        this.employeeType = employeeType
    }
    //prints basic info about an employee
    employeeInfo () {
        console.log(`${this.name} is a ${this.employeeType} employee. They are ${this.age} years old.`) 
    }

    payRoll () {
        //For salaried employees
        if (this.employeeType == "salaried"){
            //if they didn't meet their sales targets, get a flat rate
            if (this.currentSales<this.salesTarget){
                console.log(`This month's pay for ${this.name} is:
    Basic monthly salary: $${this.monthlySalary.toFixed(2)}
    Total pay: $${this.monthlySalary.toFixed(2)}
    Unfortunately you didn't meet your sales targets this time, ${this.name}.`)
            }
            //they did meet their sales target, get the 10% bonus on top
            else {
                console.log(`This month's pay for ${this.name} is:
    Basic monthly salary: $${this.monthlySalary.toFixed(2)}
    Bonus (10%): $${this.bonusWage.toFixed(2)}
    Total pay: $${this.totalPay.toFixed(2)}
    Thank you for your hard work and congratulations on meeting your targets, ${this.name}.`)
            }
        }
        //for hourly employees
        else if (this.employeeType == "hourly"){
            //if they did not meet their targets, get hours worked*hourly rate for a total
            if (this.currentSales<this.salesTarget){
                console.log(`This month's pay for ${this.name} is:
    Total pay: $${this.monthlyWage.toFixed(2)}
    You worked ${this.hoursLogged} hours, at $${this.currentSalary}p/h.
    Unfortunately you didn't meet your sales targets this time, ${this.name}.`)
            }
            //if they did meet their sales targets, get the bonus of +50% to hourly rate * hours worked
            else {
                console.log(`This month's pay for ${this.name} is:
    Total pay: $${this.bonusWage.toFixed(2)}
    That's a 50% bonus on your wages!
    You worked ${this.hoursLogged} hours, at $${this.currentSalary}p/h. 
    For meeting your targets you earned the bonus hourly rate of $${this.bonusHourlyRate}p/h.
    Thank you for your hard work and congratulations on meeting your targets, ${this.name}.`)
            }

        }
        //for the hybrid workers
        else if (this.employeeType == "hybrid"){
            //if they didn't meet their targets, get the flat monthly rate
            //plus any overtime hours above 160hrs paid at $25p/h
            if (this.currentSales<this.salesTarget){
                //uses standard OT hourly rate
                this.totalPay = Number(this.monthlyRate+this.extraHoursTotal)
                console.log(`This month's pay for ${this.name} is:
    Basic monthly salary: $${this.monthlyRate.toFixed(2)}
    You worked ${this.extraHoursWorked} extra hours at $${this.extraHourlyRate}p/h for a total of: $${this.extraHoursTotal}
    Your total pay is $${this.totalPay.toFixed(2)}
    Unfortunately you didn't meet your sales targets, ${this.name}.`)
            }
            //if they did meet their targets
            else {
                //use the bonus +20% to the hourly rate
                this.extraHoursTotal = this.extraHoursWorked*this.bonusHourlyRate
                this.totalPay = Number(this.monthlyRate + this.extraHoursTotal)
                console.log(`This month's pay for ${this.name} is:
    Basic monthly salary: $${this.monthlyRate.toFixed(2)}
    You worked ${this.extraHoursWorked} extra hours at the bonus rate of $${this.bonusHourlyRate}p/h for a total of: $${this.extraHoursTotal.toFixed(2)}
    Your total pay is: $${this.totalPay.toFixed(2)}
    Thank you for your hard work and congratulations on meeting your targets, ${this.name}.`)
            }

        }
    }

}

class salariedEmployee extends employee {
    constructor(name, age, employeeType, salesTarget, currentSales, currentSalary, hoursLogged) {
        super(name, age, employeeType);
        this.salesTarget = salesTarget;
        this.currentSales = currentSales;
        this.currentSalary = currentSalary;
        this.hoursLogged = hoursLogged;
        //annual salary made monthly
        this.monthlySalary = Number(this.currentSalary/12)
        //bonus 10% for meeting sales targets
        this.bonusWage = Number(this.monthlySalary/10)
        //total used if employee hits targets
        this.totalPay = Number(this.monthlySalary+this.bonusWage)
    }
}

class hourlyEmployee extends employee {
    constructor(name, age, employeeType, salesTarget, currentSales, currentSalary, hoursLogged) {
        super(name, age, employeeType);
        this.salesTarget = salesTarget;
        this.currentSales = currentSales;
        this.currentSalary = currentSalary;
        this.hoursLogged = hoursLogged;
        //wage is hours worked * hourly rate
        this.monthlyWage = Number(this.hoursLogged * this.currentSalary)
        //if employee meets targets this is the new hourly rate
        this.bonusHourlyRate = Number(this.currentSalary+(this.currentSalary*50/100))
        //total when using the bonus rate
        this.bonusWage = Number(this.hoursLogged*this.bonusHourlyRate)
    }
}

class hybridEmployee extends employee {
    constructor(name, age, employeeType, salesTarget, currentSales, currentSalary, hoursLogged) {
        super(name, age, employeeType);
        this.salesTarget = salesTarget;
        this.currentSales = currentSales;
        this.currentSalary = currentSalary;
        this.hoursLogged = hoursLogged;
        //constant hourly rate for overtime
        this.extraHourlyRate = 25
        //anything over 160 hours is considered overtime and will be paid on top of monthly flat salary
        //stores how many hours over 160
        this.extraHoursWorked = Number(this.hoursLogged%160)
        //adds 20% to the overtime rate if sales targets were met
        this.bonusHourlyRate = Number(this.extraHourlyRate + (this.extraHourlyRate*20/100))
        //standard monthly rate based on annual salary
        this.monthlyRate = Number(this.currentSalary/12)
        //total payout for the overtime hours
        this.extraHoursTotal = this.extraHourlyRate * this.extraHoursWorked
    }
}
//create employees with Name, Age, employeeType, monthly sales target, current successful sales, annual/hourly rate, hours worked.
let steve = new salariedEmployee("Steve", 32, "salaried", 8, 12, 25000, 189) //bonus
let cliff = new salariedEmployee("Cliff", 73, "salaried", 4, 2, 12000, 80)   //no bonus
let morgan = new hourlyEmployee("Morgan", 22, "hourly", 16, 29, 20, 181)     //bonus   
let alex = new hourlyEmployee("Alex", 28, "hourly", 15, 11, 18, 177)         //no bonus
let jack = new hybridEmployee("Jack", 31, "hybrid", 22, 21, 22000, 170)      //no bonus
let andy = new hybridEmployee("Andy", 35, "hybrid", 25, 88, 33000, 220)      //bonus

steve.employeeInfo()
steve.payRoll()
cliff.payRoll()
morgan.payRoll()
alex.payRoll()
jack.payRoll()
andy.payRoll()

