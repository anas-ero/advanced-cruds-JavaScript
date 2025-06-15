let employees =  JSON.parse(localStorage.getItem("employes")) || []

// call of the id
let tableBody = document.getElementById("table-body");
// lorsque on actualise la page
window.onload = () => {
    currentList = employees
    afficher()
}

// values of the form
const nom = document.getElementById("nom")
const poste = document.getElementById("poste")
const departement = document.getElementById("departement")
const salaire = document.getElementById("salaire")

var page = 1;
var itemsPerPage = 5;

function afficher(filterdList = employees){
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filterdList.slice(start, end); //start = 0, end = 3→ slice(0, 3) → [A, B, C]

    
    const row = pageItems.map((e, i) => {
    const index = (page - 1) * itemsPerPage + i;
    return `
    <tr>
        <td>${e.nom}</td>
        <td>${e.poste}</td>
        <td>${e.departement}</td>
        <td>${e.salaire} $</td>
        <td>
            <button class="btn btn-danger text-light" onclick="del(${e.id})" >Supprimer</button>
        </td>
    </tr>
    `

    }).join("");



    tableBody.innerHTML = row
    const totalPages = Math.ceil(currentList.length / itemsPerPage);
    pageInfo.innerHTML = `${page} of ${totalPages}`
    
}

function nextBtn() {
    const totalPages = Math.ceil(currentList.length / itemsPerPage);
    if (page < totalPages) {
        page++;
        const pageInfo = document.getElementById("page-info")
        pageInfo.innerHTML = `${page} of ${totalPages}`
        afficher(); // or afficher(employeesFiltrés) if i filtre
    }
}


function prevBtn() {
    const totalPages = Math.ceil(currentList.length / itemsPerPage);
    if (page > 1) {
        page--;
        const pageInfo = document.getElementById("page-info")
        pageInfo.innerHTML = `${page} of ${totalPages}`
        afficher();
    }
}


function ajouter(){
    const nomV = nom.value.trim()
    const posteV = poste.value.trim()
    const depV = departement.value.trim()
    const salaireV = salaire.value.trim()
    let employe = []
    employe = {
        id: Date.now(),
        nom:nomV,
        poste:posteV,
        departement:depV,
        salaire:salaireV
    }

    employees.push(employe)
    page = Math.ceil(employees.length /itemsPerPage)
    afficher()

    localStorage.setItem("employes", JSON.stringify(employees))
}


let rechercherInput = document.getElementById("rechercherInput")
let currentList = employees
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const pageInfo = document.getElementById("page-info")

function filter() {
    let searchedValue = rechercherInput.value.toLowerCase()
    
    currentList = employees.filter(e => 
    e.nom.toLowerCase().includes(searchedValue) ||
    e.poste.toLowerCase().includes(searchedValue) ||
    e.departement.toLowerCase().includes(searchedValue) )
    page = 1

    if (searchedValue !== "") {
        prev.style.display = "none";
        next.style.display = "none";
        pageInfo.style.display = "none";
    }
    else{
        prev.style.display = "inline";
        next.style.display = "inline";
        pageInfo.style.display = "inline";
    }

    afficher(currentList)
}

function del(id) {
    const confirmation = confirm("r you sure ?")
    if (confirmation) {
        employees = employees.filter(e => e.id !== id)
        localStorage.setItem("employes", JSON.stringify(employees))
        afficher()

    }
}
// e.id !== id means to copy the array and replace it with a new one without that id


function delAll() {
    const confirmation = confirm("r you sure ?")
    const all = document.getElementById("all")
    if (confirmation) {
    employees.splice(0, employees.length)
    localStorage.setItem("employes", JSON.stringify(employees))
    afficher()
    }
}
