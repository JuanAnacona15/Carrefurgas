//Importa la clase employee para el objeto que almacena los datos del empleado
import { clEmployee } from "./employee.js";
import Net from "./Calculates.js";

//Se crea el objeto empleado
let employee = new clEmployee({})
var flagValidationInputs = true

//Oculta los datos del empleado que se van a mostrar
document.querySelector('.contEmployeeData').style.display = 'none';

document.getElementById('iId').addEventListener('input', (event) => {
    let v = document.getElementById('iId').value
    if (Number(v) > 0 && Number(v) && Number.isInteger(Number(v))) {
        flagValidationInputs = true
        document.getElementById('AlertId').style.display = 'none'
    } else {
        flagValidationInputs = false
        document.getElementById('AlertId').style.display = 'block'
    }
})

document.getElementById('iSalary').addEventListener('input', (event) => {
    let v = document.getElementById('iSalary').value
    if (Number(v) >= 1000) {
        flagValidationInputs = true
        document.getElementById('AlertSalary').style.display = 'none'
    } else {
        flagValidationInputs = false
        document.getElementById('AlertSalary').style.display = 'block'
    }
})

document.getElementById('iDaysWorked').addEventListener('input', (event) => {
    ValidationRange('iDaysWorked', 'AlertDaysWork', 1, 15)
})
document.getElementById('iExtraDay').addEventListener('input', (event) => {
    ValidationRange('iExtraDay', 'AlerDayExtra', 0, 20)
})
document.getElementById('iExtraNight').addEventListener('input', (event) => {
    ValidationRange('iExtraNight', 'AlerExtraNight', 0, 30)
})
document.getElementById('iExtraDay').addEventListener('input', (event) => {
    ValidationRange('iExtraSunday', 'AlerExtraSunday', 0, 40)
})


function ValidationRange(input, alert, r1, r2) {
    let v = document.getElementById(input).value
    let a = document.getElementById(alert)
    if (Number(v) >= r1 && Number(v) <= r2) {
        flagValidationInputs = true
        a.style.display = 'none'
    } else {
        flagValidationInputs = false
        a.style.display = 'block'
    }
    console.log(typeof v)
}


document.getElementById('fSearchEmployee').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('iEmployeeSearch').value

    getEmployeeData(id).then(data => {
        if (data) {
            document.querySelector('.contEmployeeData').style.display = 'flex';

            data = Net(data, 1000)

            for (let key in data) {
                let idElement = `p${key}`
                let element = document.getElementById(idElement)
                if (element) {
                    if (element.tagName == "INPUT") {
                        element.value = data[key]
                    } else {
                        element.textContent = `${key}: ${data[key]}`
                    }
                }

            }

        } else {
            console.log('No data returned');
        }
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
})




/**
 * Evento de tipo submit que se acciona cuando se envian los datos del formulario
 * Funcion: Almacenar los valores de los inputs en dormulario en los atributos del 
 * objeto employee
 */
document.getElementById('formInputs').addEventListener('submit', function (event) {
    event.preventDefault();

    // Se extraen los valores de los inputs del formulario y se pasan como atributos al objeto employee

    employee.idemployee = document.getElementById('iId').value//!
    employee.name = document.getElementById('iName').value
    employee.ExpeditionId = document.getElementById('iExpeditionId').value
    employee.Department = document.getElementById('iDepartment').value
    employee.Municipality = document.getElementById('iMunicipality').value
    employee.District = document.getElementById('iDistrict').value
    employee.BirthDate = document.getElementById('iBirthDate').value
    employee.BloodType = document.getElementById('iBloodType').value
    employee.ZodiacSign = document.getElementById('iZodiacSign').value
    employee.EmployeeType = document.getElementById('iEmployeeType').value
    employee.Salary = document.getElementById('iSalary').value
    employee.DepartmentWork = document.getElementById('iDepartmentWork').value
    employee.Section = document.getElementById('iSection').value
    employee.Division = document.getElementById('iDivision').value
    employee.DaysWorked = document.getElementById('iDaysWorked').value
    employee.ExtraDay = document.getElementById('iExtraDay').value
    employee.ExtraNight = document.getElementById('iExtraNight').value
    employee.ExtraSunday = document.getElementById('iExtraSunday').value

    let data = employee.Data()

    for (let key in data) {
        if (data[key] == undefined || data[key] == null || flagValidationInputs == false) {
            document.getElementById('AlertForm').style.display = 'block'
        } else {
            document.getElementById('AlertForm').style.display = 'none'
            let insert = insertEmployee(employee.Data())
            if (insert) {
                document.getElementById('senMesangeSucess').style.display = 'block'
            } else {
                document.getElementById('AlertForm').style.display = 'none'
            }
        }
    }

})

async function insertEmployee(data) {
    try {
        const response = await fetch('http://localhost:3000/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Employee inserted:', result);
            return true
        } else {
            console.error('Failed to insert employee:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        return false
    }
}

async function getEmployeeData(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/get?id=${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

