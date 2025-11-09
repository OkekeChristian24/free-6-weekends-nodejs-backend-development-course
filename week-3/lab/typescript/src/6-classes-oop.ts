/*
There are three main visibility modifiers in TypeScript.
public - (default) allows access to the class member from anywhere.
private - only allows access to the class member from within the class.
protected - allows access to the class member from itself and any classes that inherit it.

- Extend: Classes can extend each other through the extends keyword. A class can only extend one other class.
- Implement: Interfaces can be used to define the type a class must follow through the implements keyword.
- Override: Classes can override a base class method through the override keyword.
*/

// === Interface ===
interface Workable {
    work(): void;
}

// === Base Class ===
class Employee implements Workable {
    // === Properties with Access Modifiers ===
    public name: string; // Accessible anywhere
    protected department: string; // Accessible in subclasses
    private salary: number; // Accessible only inside this class

    // === Constructor ===
    constructor(name: string, department: string, salary: number) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    // === Method from Interface ===
    public work(): void {
        console.log(
            `${this.name} is working in ${this.department} department.`
        );
    }

    // === Public method using private data ===
    public showSalary(): void {
        console.log(`${this.name}'s salary is $${this.salary}`);
    }

    // === Method to be overridden ===
    public getRole(): string {
        return "Employee";
    }
}

// === Subclass that Extends Employee ===
class Manager extends Employee {
    public teamSize: number;

    constructor(
        name: string,
        department: string,
        salary: number,
        teamSize: number
    ) {
        super(name, department, salary); // Call base class constructor
        this.teamSize = teamSize;
    }

    // === Override parent method ===
    public override getRole(): string {
        return "Manager";
    }

    // === Additional method specific to Manager ===
    public manageTeam(): void {
        // Can access protected property from parent
        console.log(
            `${this.name} manages ${this.teamSize} people in ${this.department} department.`
        );
    }
}

// === Another Class Implementing the Interface ===
class Intern implements Workable {
    public name: string;
    public duration: number;

    constructor(name: string, duration: number) {
        this.name = name;
        this.duration = duration;
    }

    // Must implement work() because of the interface
    public work(): void {
        console.log(`${this.name} is interning for ${this.duration} months.`);
    }
}

// === Usage ===
const emp = new Employee("Alice", "Engineering", 4000);
emp.work();
emp.showSalary();
console.log(emp.getRole());

const mgr = new Manager("Bob", "Engineering", 7000, 5);
mgr.work();
mgr.manageTeam();
console.log(mgr.getRole());

const intern = new Intern("Charlie", 3);
intern.work();
