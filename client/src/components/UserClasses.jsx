export class Person {
    constructor(person_ID, Fname, Mname, Lname, Phone, Email){
        this.person_ID = person_ID;
        this.Fname = Fname;
        this.Mname = Mname;
        this.Lname = Lname;
        this.Phone = Phone;
        this.Email = Email;
    }

    get name() {
        return this.Fname + this.Lname;
    }
}

export class Student extends Person {
    constructor(person_ID, Fname, Mname, Lname, Phone, Email) {
        super(person_ID, Fname, Mname, Lname, Phone, Email);
        this.role = "Student";
    }
}

export class Admin extends Person {
    constructor(person_ID, Fname, Mname, Lname, Phone, Email) {
        super(person_ID, Fname, Mname, Lname, Phone, Email);
        this.role = "Admin";
    }
}

export class Professor extends Person {
    constructor(person_ID, Fname, Mname, Lname, Phone, Email) {
        super(person_ID, Fname, Mname, Lname, Phone, Email);
        this.role = "Professor";
    }
}