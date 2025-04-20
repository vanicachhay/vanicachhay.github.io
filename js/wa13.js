//problem 1
const originalEmployees = [
    {firstName:"sam" , department:"tech" , designation:"manager" , salary: 40000 , raiseEligible: true },
    {firstName: "mary" , department: "finance" , designation: "trainee" , salary: 18500, raiseEligible: true },
    {firstName: "bill" , department: "HR" , designation: "executive" , salary: 21200, raiseEligible: false }
];
console.log("problem 1", JSON.parse(JSON.stringify(originalEmployees)));

//problem 2
const company = {
    companyName: "tech stars",
    website: "www.techstars.site",
    employees: JSON.parse(JSON.stringify(originalEmployees))
};
console.log("problem 2" , company);


//problem 3
const newEmployee = { firstName: "anna", department: "tech", designation: "executive", salary: 25600, raiseEligible: false };
company.employees.push(newEmployee);
console.log("problem 3", company);

//problem 4
let totalSalary = 0;
for (let emp of company.employees) {
    totalSalary += emp.salary;
}
console.log("problem 4", totalSalary);

//problem 5
function giveRaise(employees) {
    for (let emp of employees) {
      if (emp.raiseEligible) {
        emp.salary = emp.salary * 1.10;
        emp.raiseEligible = false ; 
        }
    }
}
giveRaise(company.employees);
console.log("problem 5" , company);

//problem 6
const wfhEmployees = ["anna", "sam"];
for (let emp of company.employees) {
  emp.wfh = wfhEmployees.includes(emp.firstName);
}
console.log("problem 6", company);