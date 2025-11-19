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
const STOCAGEKEY = 'staff';
let changeId = null;
avatar.addEventListener('input', changePhoto);
btnCancel.addEventListener('click', closeModel);
btnAddWorker.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModel);

btnAddExpeience.addEventListener('click', (e) => {
    e.preventDefault();
    addExprience()
});

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    saveWorker(e);
})
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
function addEventListenerToBtns(){
     const editeBtns = document.querySelectorAll('.btn-edite-worker');
        editeBtns.forEach(item => {
            item.addEventListener('click', ()=>{
                
                 idWorker = item.getAttribute('id');
                 openModal(idWorker);
            })
        })
}
function openModal(id = null) {
    changeId = id;
    modal.style.display = 'flex'; 
    if(changeId ){
        const allWorkers = getDataFromLocalStorage();
        const worker = allWorkers.find(item =>
            item.id == id
        )
         divExpreince.querySelector('#name').value = worker.name;
         divExpreince.querySelector('#role').value = worker.role;
         divExpreince.querySelector('#photoUrl').value = worker.url;
         divExpreince.querySelector('#email').value = worker.email;
         divExpreince.querySelector('#phone').value = worker.phone;
         changePhoto()
         worker.expreinces.forEach(exp =>{
            addExprience(exp)
         })
        
    }

     
    
    
}
function closeModel() {
    deleteFormExprience();
    modal.style.display = 'none';
}
function saveWorker(workerId = null) {
    const newData = getDataFromLocalStorage();
   
    const name = divExpreince.querySelector('#name').value;
    const role = divExpreince.querySelector('#role').value;
    const url = divExpreince.querySelector('#photoUrl').value;
    const email = divExpreince.querySelector('#email').value;
    const phone = divExpreince.querySelector('#phone').value;
    const company = expreinces.querySelectorAll(".company");
    const roleE = expreinces.querySelectorAll(".role")
    const formDate = expreinces.querySelectorAll(".form-date");
    const toDate = expreinces.querySelectorAll(".to-date");
    let expp = [];
    if (newData.name === name && newData.email === email && newData.phone === phone) {
        alert("this worker already existe!");
        return;
    }
    let len = company.length;
    for (let i = 0; i < len; i++) {
        let makeObj = {
            'company': company[i].value,
            'role': roleE[i].value,
            'formDate': formDate[i].value,
            'toDate': toDate[i].value
        }
        expp.push(makeObj);
    }

    const infosWorker = {
        'id': genretid(),
        'name': name,
        'role': role,
        'url': url,
        'email': email,
        'phone': phone,
        'expreinces': expp
    }
     if(workerId){
        const editeWorker = newData.filter(worker =>{
            workerId == worker.id
        } 
            
        )
    editeWorker.n
        
    }
    sendDataToLocalStorage(infosWorker);
    deleteFormExprience();
    closeModel();
    listeWorkers();
}
function deleteFormExprience() {
    const exprienceToDelet = expreinces.querySelectorAll('.exprince');
    exprienceToDelet.forEach(item => {
        item.remove();
    })
}
function addExprience(exprience = null) {
    const div = document.createElement('div');
    div.innerHTML += `<div class="exprince flex flex-col gap-2 bg-gray-300 rounded-2xl p-4">
                                        <label for="">company :</label>
                                        <input value="${exprience?.company || ''}"  type="text" class="company px-3 py-2 border border-gray-300 rounded-lg 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <label for="">role :</label>
                                        <input value="${exprience?.role || ''}" type="text" class="role px-3 py-2 border border-gray-300 rounded-lg 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <label for="">form :</label>
                                        <input value="${exprience?.formDate || ''}"  class="form-date" type="date" class="px-3 py-2 border border-gray-300 rounded-lg 
                                        ">
                                        <label for="">to :
                                        </label>
                                        <input value="${exprience?.toDate || ''}" class="to-date" type="date" class="px-3 py-2 border border-gray-300 rounded-lg 
                                        ">
                            </div>` ;
    expreinces.appendChild(div);
}
function changePhoto() {
    const newUrl = avatar.value;
    photoPreview.setAttribute('src', newUrl);
    console.log(photoPreview.getAttribute('src'));

}
function sendDataToLocalStorage(data) {
    const oldData = getDataFromLocalStorage();
    console.log(data);
    oldData.push(data);
    console.log(oldData);
    localStorage.setItem(STOCAGEKEY, JSON.stringify(oldData));
}
function listeWorkers() {
    divWorkers.querySelectorAll('div').forEach(item => {
        item.remove();
    })
    const works = getDataFromLocalStorage();
    console.log(works);
    works.forEach(worker => {
        renderWorker(worker)
    })
    addEventListenerToBtns();
}
function renderWorker(worker) {
    
    const divWorker = document.createElement('div');
    divWorker.innerHTML = `
    <div class="flex w-full justify-between p-2 bg-amber-400 ">
                        <div class="flex gap-2 items-center">
                            <img class="w-16 h-16 rounded-full"
                                src="${worker.url}">
                            <div>
                                <p>${worker.name}</p>
                                <p>${worker.role}</p>
                            </div>
                        </div>
                        <button class="btn-edite-worker" id=${worker.id}><i class="fa-solid fa-pen"></i></button>
                    </div>`
    divWorkers.append(divWorker);
}
listeWorkers()