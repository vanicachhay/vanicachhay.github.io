// Problem 1: Create JSON for each employee
const employees = [
    {
        firstName: "Sam",
        department: "Tech",
        designation: "Manager",
        salary: 40000,
        raiseEligible: true
    },
    {
        firstName: "Mary",
        department: "Finance",
        designation: "Trainee",
        salary: 18500,
        raiseEligible: true
    },
    {
        firstName: "Bill",
        department: "HR",
        designation: "Executive",
        salary: 21200,
        raiseEligible: false
    }
];

document.getElementById("solution").innerHTML += "<h2>Employees:</h2>" + JSON.stringify(employees);

// Problem 2: Create JSON for the company
const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
};

document.getElementById("solution").innerHTML += "<h2>Company:</h2>" + JSON.stringify(company);

// Problem 3: Add a new employee to the company
const newEmployee = {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false
};

company.employees.push(newEmployee);

document.getElementById("solution").innerHTML += "<h2>Company after adding new employee:</h2>" + JSON.stringify(company);

// Problem 4: Calculate total salary for all company employees
let totalSalary = 0;
for (const employee of company.employees) {
    totalSalary += employee.salary;
}
document.getElementById("solution").innerHTML += "<h2>Total salary for all company employees:</h2>" + totalSalary;

// Problem 5: Give raise to eligible employees and update their eligibility
function giveRaise(company) {
    for (const employee of company.employees) {
        if (employee.raiseEligible) {
            employee.salary *= 1.1; // Increase salary by 10%
            employee.raiseEligible = false; // Set raise eligibility to false
        }
    }
}

giveRaise(company);
document.getElementById("solution").innerHTML += "<h2>Company after giving raise:</h2>" + JSON.stringify(company);

// Problem 6: Update employee WFH status
const employeesWorkingFromHome = ['Anna', 'Sam'];
for (const employee of company.employees) {
    employee.wfh = employeesWorkingFromHome.includes(employee.firstName);
}

document.getElementById("solution").innerHTML += "<h2>Company after updating WFH status:</h2>" + JSON.stringify(company);

