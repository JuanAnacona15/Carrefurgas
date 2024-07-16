function Devegadsalary(employee) {
  return employee.daysworked * (employee.salary / 30)
}

function ExtraDayValue(employee) {
  const D = employee.departmentwork;
  const S = employee.section;
  const Di = employee.division;
  const vh = employee.salary / 240;

  if (D == 1 || D == 2) {
    return vh * 0.25
  } else if (D == 3) {
    if (S == 1 || S == 2 || S == 3) {
      return vh * 0.25
    } else if (S == 4 || S == 5 || S == 6) {
      return vh * 0.3
    } else if (S == 7 || S == 8 || S == 9) {
      return vh * 0.35
    } else if (S == 10 || S == 11 || S == 12) {
      return vh * 0.4
    } else if (S == 13 || S == 14 || S == 15) {
      return vh * 0.45
    } else if (S == 16 || S == 17 || S == 18) {
      return vh * 0.5
    } else if (S == 19 || S == 20 || S == 21) {
      return vh * 0.55
    } else if (S == 22 || S == 23 || S == 24) {
      return vh * 0.6
    } else if (S == 25 || S == 26 || S == 27) {
      return vh * 0.65
    } else if (S == 28) {
      switch (Di) {
        case 1:
          return vh * 0.7;
        case 2:
          return vh * 0.7015;
        case 3:
          return vh * 0.703;
        case 4:
          return vh * 0.7045;
        default: return 0;
      }
    } else if (S == 29 || S == 30) {
      return vh * 0.75
    } else {
      return 0;
    }
  } else if (D == 4 || D == 5) {
    return vh * 0.8
  } else if (D == 6 || D == 7) {
    return vh * 0.85
  } else if (D == 8) {
    return vh * 0.9
  } else {
    return 0;
  }
}

function Pension(employee, smlv) {
  const s = employee.salary
  const sm = smlv
  if (s >= sm && s < sm * 2) {
    return s * 0.0258;
  } else if (s >= sm * 2 && s < sm * 4) {
    return s * 0.0358;
  } else if (s >= sm * 4 && s < sm * 6) {
    return s * 0.0458;
  } else if (s >= sm * 6 && s < sm * 8) {
    return s * 0.0558;
  } else if (s >= sm * 8 && s < sm * 10) {
    return s * 0.0658;
  } else if (s >= sm * 10) {
    return s * 0.0758;
  } else {
    return 0;
  }
}

function Health(employee, smlv) {
  const s = employee.salary
  const sm = smlv
  if (s >= sm && s < sm * 2) {
    return s * 0.0155;
  } else if (s >= sm * 2 && s < sm * 4) {
    return s * 0.0268;
  } else if (s >= sm * 4 && s < sm * 6) {
    return s * 0.0315
  } else if (s >= sm * 6 && s < sm * 8) {
    return s * 0.0438
  } else if (s >= sm * 8 && s < sm * 10) {
    return s * 0.05125
  } else if (s >= sm * 10) {
    return s * 0.0768
  } else {
    return 0;
  }
}

function AgePremium(employee) {
  let birthdate = new Date(employee.birthdate)
  let date = new Date()
  let a = date.getFullYear() - birthdate.getFullYear();
  let month = date.getMonth() - birthdate.getMonth();
  if (month < 0 || (month === 0 && date.getDate() < birthdate.getDate())) {
    a--;
  }

  const q = employee.salary / 2
  if (a >= 18 && a < 30) {
    return q * 0.01
  } else if (a >= 30 && a < 40) {
    return q * 0.015
  } else if (a >= 40 && a < 50) {
    return q * 0.02
  } else if (a >= 60 && a < 70) {
    return q * 0.025
  } else {
    return 0;
  }
}

function FeedPremium(employee, smlv) {
  const s = employee.salary
  const sm = smlv
  if (s >= sm && s < sm * 2) {
    return s * 0.0333;
  } else if (s >= sm * 2 && s < sm * 4) {
    return s * 0.0444;
  } else if (s >= sm * 4 && s < sm * 6) {
    return s * 0.0555;
  } else if (s >= sm * 6 && s < sm * 8) {
    return s * 0.0666
  } else {
    return 0;
  }
}

function ProductionPremium(employee) {
  const q = employee.salary / 2

  if (employee.departamentwork == 3 && employee.section == 22) {
    return q * 0.056
  } else {
    return 0;
  }
}

function Transport(employee, smlv) {
  const s = employee.salary
  const sm = smlv
  if (s >= sm && s < sm * 2) {
    return sm * 0.12
  } else {
    return 0;
  }
}

export default function Net(employee, smlv) {
  employee.devegadsalary = Devegadsalary(employee)
  employee.totalextrahours = ExtraDayValue(employee) * (employee.extraday + employee.extranight + employee.extrasunday)
  employee.pension = Pension(employee, smlv)
  employee.health = Health(employee, smlv)
  employee.agepremium = AgePremium(employee)
  employee.feedpremium = FeedPremium(employee, smlv)
  employee.productionpremium = ProductionPremium(employee)
  employee.transport = Transport(employee, smlv)
  employee.net = employee.devegadsalary + employee.totalextrahours + employee.agepremium + employee.feedpremium + employee.productionpremium + employee.transport
  employee.net -= employee.pension + employee.health

  return employee
}