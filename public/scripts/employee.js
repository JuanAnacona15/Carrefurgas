export class clEmployee {
  constructor(employee) {
    //Input Data
    this._employee = {}

    this._employee.idemployee = employee.idemployee;
    this._employee.name = employee.name;
    this._employee.ExpeditionId = employee.ExpeditionId;
    this._employee.Department = employee.Department;
    this._employee.Municipality = employee.Municipality;
    this._employee.District = employee.District;
    this._employee.BirthDate = employee.BirthDate;
    this._employee.BloodType = employee.BloodType;
    this._employee.ZodiacSign = employee.ZodiacSign;
    this._employee.EmployeeType = employee.EmployeeType;
    this._employee.Salary = employee.Salary;
    this._employee.DepartmentWork = employee.DepartmentWork;
    this._employee.Section = employee.Section;
    this._employee.Division = employee.Division;
    this._employee.DaysWorked = employee.DaysWorked;
    this._employee.ExtraDay = employee.ExtraDay;
    this._employee.ExtraNight = employee.ExtraNight;
    this._employee.ExtraSunday = employee.ExtraSunday;
  }

  get idemployee() {
    return this._employee.idemployee;
  }

  set idemployee(value) {
    this._employee.idemployee = value;
  }

  get name() {
    return this._employee.name;
  }

  set name(value) {
    this._employee.name = value;
  }

  get ExpeditionId() {
    return this._employee.ExpeditionId;
  }

  set ExpeditionId(value) {
    this._employee.ExpeditionId = value;
  }

  get Department() {
    return this._employee.Department;
  }

  set Department(value) {
    this._employee.Department = value;
  }
  // Getter y Setter para Municipality
  get Municipality() {
    return this._employee.Municipality;
  }

  set Municipality(value) {
    this._employee.Municipality = value;
  }

  // Getter y Setter para District
  get District() {
    return this._employee.District;
  }

  set District(value) {
    this._employee.District = value;
  }

  // Getter y Setter para BirthDate
  get BirthDate() {
    return this._employee.BirthDate;
  }

  set BirthDate(value) {
    this._employee.BirthDate = value;
  }

  // Getter y Setter para BloodType
  get BloodType() {
    return this._employee.BloodType;
  }

  set BloodType(value) {
    this._employee.BloodType = value;
  }

  // Getter y Setter para ZodiacSign
  get ZodiacSign() {
    return this._employee.ZodiacSign;
  }

  set ZodiacSign(value) {
    this._employee.ZodiacSign = value;
  }

  // Getter y Setter para EmployeeType
  get EmployeeType() {
    return this._employee.EmployeeType;
  }

  set EmployeeType(value) {
    this._employee.EmployeeType = value;
  }

  // Getter y Setter para Salary
  get Salary() {
    return this._employee.Salary;
  }

  set Salary(value) {
    this._employee.Salary = value;
  }

  // Getter y Setter para DepartmentWork
  get DepartmentWork() {
    return this._employee.DepartmentWork;
  }

  set DepartmentWork(value) {
    this._employee.DepartmentWork = value;
  }

  // Getter y Setter para Secction
  get Section() {
    return this._employee.Section;
  }

  set Section(value) {
    this._employee.Section = value;
  }

  // Getter y Setter para Division
  get Division() {
    return this._employee.Division;
  }

  set Division(value) {
    this._employee.Division = value;
  }

  // Getter y Setter para DaysWorked
  get DaysWorked() {
    return this._employee.DaysWorked;
  }

  set DaysWorked(value) {
    this._employee.DaysWorked = value;
  }

  // Getter y Setter para ExtrDay
  get ExtraDay() {
    return this._employee.ExtraDay;
  }

  set ExtraDay(value) {
    this._employee.ExtraDay = value;
  }

  // Getter y Setter para ExtrNight
  get ExtraNight() {
    return this._employee.ExtraNight;
  }

  set ExtraNight(value) {
    this._employee.ExtraNight = value;
  }

  // Getter y Setter para ExtrSunday
  get ExtraSunday() {
    return this._employee.ExtraSunday;
  }

  set ExtraSunday(value) {
    this._employee.ExtraSunday = value;
  }

  Data() {
    return this._employee
  }
}
