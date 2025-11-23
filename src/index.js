const STOCAGEKEY = 'staff';
let changeId = null;
let idWorker = null;
let isValide;

const btnAddWorker = document.querySelector('#btn-add-worker');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#closeModel');
const btnAddExpeience = document.querySelector('#btn-add-exprience');
const expreinces = document.querySelector('#expreinces');
const btnSubmit = document.querySelector('#btn-submit');
const avatar = document.querySelector('#photoUrl');
const photoPreview = document.querySelector('#photoPreview');
const btnCancel = document.querySelector('#btn-cancel');
const divExpreince = document.querySelector('#worker-form');
const divWorkers = document.querySelector('#workers');
const body = document.querySelector('#main');
const buttonZones = document.querySelector('.images').querySelectorAll('button');
const divCartsWorkers = document.querySelector('#cartsWorkers');
const btn = divCartsWorkers.querySelector('#closeModelCarts');
const modalCarts = document.querySelector('#modalCarts');
const carts = modalCarts.querySelector('.carts');
const container = document.querySelector('.container');
const email = divExpreince.querySelector('#email');
const phone = divExpreince.querySelector('#phone');
const errorEmail = divExpreince.querySelector('#errorEmail');
const errorPhone = divExpreince.querySelector('#errorPhone');


 email.addEventListener('change', () => {
        if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            email.style.borderColor = "red";
            errorEmail.textContent = "Invalid Email.";
            isValide = false;
        } else {
            errorEmail.textContent = "";
            email.style.borderColor = "black";
            isValide = true;
        }
    })
    phone.addEventListener('change', () => {
        if (!phone.value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)) {
            phone.style.borderColor = "red";
            errorPhone.textContent = "Invalid Phone.";
            isValide = false;
        } else {
            errorPhone.textContent = "";
            phone.style.borderColor = "black";
            isValide = true;
        }
    })


btn.addEventListener('click', () => {
    modalCarts.style.display = "none";
})
 
document.addEventListener('DOMContentLoaded', () => {
    restart();
});

function restart() {
    let data = getDataFromLocalStorage();
    data.forEach(worker => {
        worker.place = "unassigned";
        worker.zone = "";
    })
    sendDataToLocalStorage(data);
    listeWorkers();
}

function getDataFromLocalStorage() {
    const data = localStorage.getItem(STOCAGEKEY);
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

function genretid() {
    return `s${Date.now() + Math.random().toString(36)}`
}

function attachEventsToEmplyeeActionBtns() {
    const editeBtns = document.querySelectorAll('.btn-edite-worker');
    editeBtns.forEach(item => {
        item.addEventListener('click', () => {
            idWorker = item.getAttribute('id');
            openModal(idWorker);
        })
    })
}
function openModal(id = null) {
    changeId = id;
    modal.style.display = 'flex';
    container.classList.add("blur-active");
    if (changeId) {
        const allWorkers = getDataFromLocalStorage();
        const worker = allWorkers.find(item =>
            item.id == id
        )
        divExpreince.querySelector('#worker-id').value = worker.id;
        divExpreince.querySelector('#name').value = worker.name;
        divExpreince.querySelector('#role').value = worker.role;
        divExpreince.querySelector('#photoUrl').value = worker.url;
        divExpreince.querySelector('#email').value = worker.email;
        divExpreince.querySelector('#phone').value = worker.phone;
        changePhoto()
        worker.expreinces.forEach(exp => {
            addExprience(exp)
        })
    }
}
function detailsWorker(worker) {
    container.classList.add("blur-active");
    const modalWorkerDetails = document.createElement('div');
    modalWorkerDetails.innerHTML = `<div class="fixed inset-0 flex z-50 items-center justify-center">
            <div class="bg-black rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto relative max-[480px]:border max-[480px]:border-white max-[480px]:w-[95%]">
                <button id="closeModel" class="text-white absolute  right-5 top-1"><i class="fa-solid fa-x"></i></button>
                <form id="worker-form" class="space-y-4">
                    <input type="hidden" id="worker-id" >
                    <div class="flex items-center gap-4">
                        <img id="photoPreview"
                            src="${worker.url}"
                            alt="Photo preview" class="w-20 h-20 rounded-full object-cover border-2 border-gray-300">
                    </div>
                    <div class="flex gap-2">
                        <label for="" class ="text-white">name :</label>
                        <p class ="text-white">${worker.name}</p>
                    </div>
                    <div class="flex gap-2">
                        <label for="" class ="text-white">role :</label>
                        <p class ="text-white">${worker.role}</p>
                    </div>
                    
                    <div class="flex gap-2">
                        <label for="" class ="text-white">email :</label>
                        <p class ="text-white">${worker.email}</p>
                    </div>
                    <div class="flex gap-2">
                        <label for="" class ="text-white">Phone :</label>
                        <p class ="text-white">${worker.phone}</p>
                    </div>
                    <div id="expreinces-details" class="flex flex-col gap-2">
                    
                    </div>
                </form>

            </div>
        </div>`;
    const btnCloseModalDetails = modalWorkerDetails.querySelector("#closeModel");
    btnCloseModalDetails.addEventListener('click', () => {
        container.classList.remove("blur-active");
        modalWorkerDetails.remove();
    })
    const expreincesDetails = modalWorkerDetails.querySelector("#expreinces-details");
    worker.expreinces.forEach(exp => {
        addExprience(exp, expreincesDetails)
    })
    body.append(modalWorkerDetails);
}
function closeModel() {
    container.classList.remove("blur-active");
    deleteFormExprience();
    videInputs();
    modal.style.display = 'none';
}
function videInputs() {
    divExpreince.querySelector('#worker-id').value = "";
    divExpreince.querySelector('#name').value = "";
    divExpreince.querySelector('#role').value = "";
    divExpreince.querySelector('#photoUrl').value = "";
    divExpreince.querySelector('#photoPreview').setAttribute('src', 'https://imgs.search.brave.com/IZK862jIKGBRPE7eNDkXhvPvuqDL8TNq0hHfIQs2MGg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/NzU5MjQ0OS92ZWN0/b3IvZGVmYXVsdC1h/dmF0YXItcGhvdG8t/cGxhY2Vob2xkZXIt/aWNvbi1ncmV5LXBy/b2ZpbGUtcGljdHVy/ZS1idXNpbmVzcy1t/YW4uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXlxb29zN2c5/am11ZkpoZmtiUXNr/LW1kaEtFc2loNkRp/NFdaNjZ0X2liN0k9');
    divExpreince.querySelector('#email').value = "";
    divExpreince.querySelector('#phone').value = "";
}
function saveWorker() {
    
    
    let newData = getDataFromLocalStorage();
    const id = divExpreince.querySelector('#worker-id').value;
    const name = divExpreince.querySelector('#name').value;
    const role = divExpreince.querySelector('#role').value;
    const url = divExpreince.querySelector('#photoUrl').value;
    const email = divExpreince.querySelector('#email').value;
    const phone = divExpreince.querySelector('#phone').value;

   

    const companies = expreinces.querySelectorAll(".company");
    const rolesE = expreinces.querySelectorAll(".role");
    const formDate = expreinces.querySelectorAll(".form-date");
    const toDate = expreinces.querySelectorAll(".to-date");
    const errorDate = expreinces.querySelectorAll(".errorDate");
    idWorker = newData.find(worker => worker.id == id)
    let expreincess = [];

    for (let i = 0; i < companies.length; i++) {
        if (companies[i].value == "") {
            continue;
        } else {
            if (formDate[i].value > toDate[i].value) {
                errorDate[i].textContent = "Date from must be great then date to";
                return;
            }
            expreincess.push({
                company: companies[i].value,
                role: rolesE[i].value,
                formDate: formDate[i].value,
                toDate: toDate[i].value
            });
        }
    }
    if (idWorker) {
        idWorker.name = name;
        idWorker.role = role;
        idWorker.url = url;
        idWorker.email = email;
        idWorker.phone = phone;
        idWorker.expreinces = expreincess;
    }
    else {
        let isExisit = newData.find(worker => worker.email == email)
        if (isExisit) {
            alert("this worker is already exisit");
            return
        }
        console.log(isValide);
        if (!isValide) {
            return;
        }else{
          newData.push({
            id: genretid(),
            name,
            role,
            url,
            email,
            phone,
            zone: "",
            place:"unassigned",
            expreinces: expreincess
        });
        }
    }

    sendDataToLocalStorage(newData);
    deleteFormExprience();
    closeModel();
    listeWorkers();
    videInputs();
}

function deleteFormExprience() {
    const exprienceToDelet = expreinces.querySelectorAll('.exprince');
    exprienceToDelet.forEach(item => {
        item.remove();
    })
}
function addExprience(exprience = null, place = null) {
    const div = document.createElement('div');
    if (place) {
        div.innerHTML += `<div class="exprince grid grid-cols-2 gap-2 bg-gray-300 rounded-2xl p-2">
                                        <label for="">company :</label>
                                        <p>${exprience.company}</p>
                                        <label for="">role :</label>
                                        <p>${exprience.role}</p>
                                        <label for="">form :</label>
                                        <p>${exprience.formDate}</p>
                                        <label for="">to :
                                        </label>
                                        <p>${exprience.toDate}</p>
                            </div>` ;
        place.append(div);
    } else {
        div.innerHTML += `<div class="exprince flex flex-col gap-2 bg-gray-300 rounded-2xl p-4">
                                        <label for="">company :</label>
                                        <input required value="${exprience?.company || ''}"  type="text" class="company px-3 py-2 border border-black rounded-lg 
                                        focus:outline-none focus:ring-1 focus:ring-blue-500 ">
                                        <label for="">role :</label>
                                        <input required value="${exprience?.role || ''}" type="text" class="role px-3 py-2 border border-black rounded-lg 
                                        focus:outline-none focus:ring-1 focus:ring-blue-500 ">
                                        <label for="">form :</label>
                                        <input required value="${exprience?.formDate || ''}"  class="form-date" type="date" class="px-3 py-2 border border-black rounded-lg 
                                        ">
                                        <label for="">to :
                                        </label>
                                        <input required value="${exprience?.toDate || ''}" class="to-date" type="date" class="px-3 py-2 border border-black rounded-lg 
                                        ">
                                        <p class="errorDate text-red-400"></p>
                            </div>` ;
        expreinces.append(div);
    }
}

function changePhoto() {
    const newUrl = avatar.value;
    photoPreview.setAttribute('src', newUrl);
    console.log(photoPreview.getAttribute('src'));

}
function sendDataToLocalStorage(data) {
    localStorage.setItem(STOCAGEKEY, JSON.stringify(data));
}
function listeWorkers() {
    divWorkers.querySelectorAll('div').forEach(item => {
        item.remove();
    })
    const works = getDataFromLocalStorage();
    let wokersUnassigned = works.filter(worker =>
        worker.place == "unassigned"
    )
    console.log(works);
    wokersUnassigned.forEach(worker => {
        renderWorker(worker)
    })
    attachEventsToEmplyeeActionBtns();
}
function createModel(workers, btnPlace) {
    

    modalCarts.style.display = "flex";

    if (!workers.length) {
        carts.innerHTML += `
            <div class="workerCart flex w-full justify-between p-2">
               <p class="text-2xl mx-auto text-white">don't exist any worker here</p>
            </div>
        `
    }
    console.log(workers.length);
    workers.forEach(worker => {
        carts.innerHTML += `
            <div class="workerCart flex w-full justify-between p-2 bg-[#4b5154] rounded-md">
                <div class="cartWorker flex gap-2 items-center">
                    <img class="w-16 h-16 rounded-full" src="${worker.url}">
                    <div class="leading-tight">
                        <p>${worker.name}</p>
                        <p>${worker.role}</p>
                    </div>
                </div>
                <button class="btn-add-worker-in-Zone hover:cursor-pointer" id="${worker.id}">ADD</button>
            </div>
        `
    });
    const btns = divCartsWorkers.querySelectorAll('.btn-add-worker-in-Zone');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
             
            let data = getDataFromLocalStorage();
            const worker = data.filter(worker => worker.id == btn.getAttribute('id'));
            console.log(worker);
            worker.forEach(worker => {
                worker.place = "assigned";
                worker.zone = btnPlace.getAttribute('id')
                sendDataToLocalStorage(data);
                checkRoom();
                listeWorkers();
                const contTR = btnPlace.parentElement.getElementsByClassName("cont")[0];
                contTR.innerHTML += `<div class="workerCart flex items-center justify-between p-2 bg-[#4b5154] mx-auto rounded-lg w-full max-w-[180px]">
                    <div class="cartWorker flex items-center gap-2">
                        <img class="w-10 h-10 rounded-full" src="${worker.url}">
                        <div class="leading-tight">
                            <p class="text-sm font-semibold">${worker.name}</p>
                            <p class="text-xs opacity-80">${worker.role}</p>
                        </div>
                    </div>
                    <button class="btn-delete-worker-in-Zone text-xs px-2 py-1 hover:cursor-pointer" id="${worker.id}" onclick="deleteWorker(this, '${worker.id}')">
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div> `;

                })
               
                modalCarts.style.display = "none";
                carts.querySelectorAll('div').forEach(div => {
                    div.remove();
                })
        })
          

    })
    
checkRoom();
}

function deleteWorker(btn, workerId) {
    
    const cart = btn.parentElement;
    let data = getDataFromLocalStorage();
    const worker = data.find(w => w.id == workerId);
    if (worker) {
        worker.place = "unassigned";
        worker.zone = "";
    }
    sendDataToLocalStorage(data);
    checkRoom();
    cart.remove();
    listeWorkers();
}
function checkRoom() {
    const divImages = document.querySelector('.images');
    const divs = Array.from(divImages.querySelectorAll('div'));
    const divA = divImages.querySelectorAll('.a');
    const data = getDataFromLocalStorage();

    
    divA.forEach(div => {
        if(!div.classList.contains("Conference") && !div.classList.contains("staff"))
            div.classList.add("empty");
        });
  
        data.forEach(worker => {
            const zoneDiv = divs.find(div => div.classList.contains(worker.zone));
            if (zoneDiv) {
                zoneDiv.classList.remove("empty");
            }
     })
}

function checkRole(role, btn) {
    const workers = getDataFromLocalStorage();
    let workersFind;
    switch (role) {
        case 'staff':
            workersFind = workers.filter(worker => worker.place != "assigned");
            createModel(workersFind, btn);
            break;
        case 'server':
            workersFind = workers.filter(worker => (worker.role == "Techniciens IT" || worker.role == "Manager" || worker.role == "Nettoyage") && worker.place != "assigned");
            createModel(workersFind, btn);
            break;
        case 'Reception':
            workersFind = workers.filter(worker => (worker.role == role || worker.role == "Manager" || worker.role == "Nettoyage") && worker.place != "assigned");
            console.log(workersFind);
            createModel(workersFind, btn);
            break;
        case 'security':
            workersFind = workers.filter(worker => (worker.role == role || worker.role == "Manager" || worker.role == "Nettoyage") && worker.place != "assigned");
            createModel(workersFind, btn);
            break;
        case 'archive':
            workersFind = workers.filter(worker => (worker.role != "Nettoyage") && worker.place != "assigned");
            createModel(workersFind, btn);
            break;
        case 'Conference':
            workersFind = workers.filter(worker => worker.place != "assigned");
            createModel(workersFind, btn);
            break;
        default:
            break;
    }
}

function attachEventsToZonesActionBtns() {
    buttonZones.forEach(btn => {
        btn.addEventListener('click', () => {
            checkRole(btn.getAttribute('id'), btn)
        })
    })
}

function renderWorker(worker) {
    const divWorker = document.createElement('div');
    divWorker.innerHTML = `
    <div class="flex w-full justify-between p-2 bg-[#23282e] rounded-md ">
                        <div class="cartWorker flex gap-2 items-center">
                            <img class="w-16 h-16 rounded-full"
                                src="${worker.url}">
                            <div>
                                <p class="text-white text-xl">${worker.name}</p>
                                <p class="">${worker.role}</p>
                            </div>
                        </div>
                        <button class="btn-edite-worker" id=${worker.id}><i class="fa-solid fa-pen text-white"></i></button>
                    </div>`

    divWorker.querySelector(".cartWorker").addEventListener('click', () => {
        detailsWorker(worker);
    })
    divWorkers.append(divWorker);
}

function initialisation() {
   checkRoom();
    
    attachEventsToZonesActionBtns();
    avatar.addEventListener('input', changePhoto);
    btnCancel.addEventListener('click', closeModel);
    closeModal.addEventListener('click', closeModel);
    btnAddWorker.addEventListener('click', () => {
        openModal()
    });

    btnAddExpeience.addEventListener('click', (e) => {
        e.preventDefault();
        addExprience()
    });

    divExpreince.addEventListener('submit', (e) => {
        e.preventDefault();
        saveWorker();
    })
    btn.addEventListener('click', () => {
        divCartsWorkers.querySelectorAll('.workerCart').forEach(div => div.remove());
        modalCarts.style.display = "none";
    });
    listeWorkers() 
}

initialisation(); 