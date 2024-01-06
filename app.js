const form = document.getElementById("myForm");
const imgInput = document.querySelector(".img");
const fileInput = document.getElementById("imgInput");
const userName = document.getElementById("name");
const ingredeance = document.getElementById("ingredeants");
const recipe = document.getElementById("recipe");
const submitBtn = document.querySelector(".submit");
const userInfo = document.getElementById("data");
const modal = document.getElementById("userForm");
const modalTitle = document.querySelector("#userForm .modal-title");
const newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];

let isEdit = false, editId;
showInfo();

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "Fill the Form";
    isEdit = false;
    imgInput.src = "./image/Profile Icon.webp";
    form.reset();
});

fileInput.addEventListener('change', function () {
    if (fileInput.files[0].size < 1000000) {  // 1MB = 1000000
        const fileReader = new FileReader();

        fileReader.onload = function (e) {
            const imgUrl = e.target.result;
            imgInput.src = imgUrl;
        };

        fileReader.readAsDataURL(fileInput.files[0]);
    } else {
        alert("This file is too large!");
    }
});

function showInfo() {
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove());
    getData.forEach((element, index) => {
        const createElement = `<tr class="employeeDetails">
        <td>${index + 1}</td>
        <tr class="employeeDetails"><td style="background-color: white; color: black; border: none;"><h1>${element.employeeName}</h1></td></tr>
        <tr class="employeeDetails"><td><h1>${element.employeeIngredeants}</h1></td></tr>
        <tr class="employeeDetails"><td><h1>${element.employeeRecipe}</h1></td></tr>
        <tr class="employeeDetails"><td><img src="${element.picture}" alt="" ></td></tr> 
        <tr class="employeeDetails"> <td>
            <button class="btn btn-success" onclick="readInfo('${element.employeeName}', '${element.employeeIngredeants}','${element.employeeRecipe}','${element.picture}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
            <button class="btn btn-primary" onclick="editInfo(${index}, '${element.employeeName}', '${element.employeeIngredeants}','${element.employeeRecipe}','${element.picture}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
        </td>
    </tr >
    <tr class="employeeDetails">
    <td></td></tr>
    <tr class="employeeDetails">
    <td></td></tr></tr>`;
    
        userInfo.innerHTML += createElement;
    });
}


function readInfo(pic, name, ingredeance, recipe) {
    document.querySelector('#showName').value = name;
    document.querySelector('#showIngredeance').value = ingredeance;
    document.querySelector('#showRecipeDetails').value = recipe;
    document.querySelector('.showImg').src = pic;
}

function editInfo(index, names, ingredeanceValue, recipeValue, pic) {
    isEdit = true;
    editId = index;
    userName.value = names;
    ingredeance.value = ingredeanceValue;
    recipe.value = recipeValue;
    imgInput.src = pic;

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update The Form";
}


function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const information = {
        employeeName: userName.value,
        employeeIngredeants:ingredeance.value,
        employeeRecipe:recipe.value,
        
        picture: imgInput.src || "./image/Profile Icon.webp",

    };

    if (!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Fill The Form";

    showInfo();

    form.reset();

    imgInput.src = "./image/Profile Icon.webp";

    // Close the modal
    // modal.style.display = "none";
    // document.querySelector(".modal-backdrop").remove();
});
