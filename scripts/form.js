
const botaoAdicionar=document.querySelector(".app__button--add-task")
const form=document.querySelector(".app__form-add-task")
let tarefaAtiva=null
let liDaTarefaSelecionada= null
let lista=JSON.parse(localStorage.getItem("lista")) || []


botaoAdicionar.addEventListener("click", esconderOuAparecer)

function esconderOuAparecer(){
     form.classList.toggle("hidden")
}

function salvar(){
    localStorage.setItem("lista", JSON.stringify(lista))
}

form.addEventListener("submit", adicionarTarefa)

function criarElementoTarefa(tarefa) {
    const li = document.createElement("li")
    li.classList.add("app__section-task-list-item")


    const svg = document.createElement('svg')
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>`

    const p = document.createElement("p")
    p.classList.add("app__section-task-list-item-description")
    p.textContent = tarefa.descricao

    const botaoEditar = document.createElement("button")

    botaoEditar.classList.add("app_button-edit")

    botaoEditar.onclick = () => {
       const edicao = prompt("qual a nova tarefa?")
       if(edicao){
            tarefa.descricao= edicao
            p.textContent= edicao
            salvar()
       }
    }

    const imagemDoBotao = document.createElement("img")
    imagemDoBotao.setAttribute("src", "/imagens/edit.png")

    botaoEditar.append(imagemDoBotao)
    li.append(svg)
    li.append(p)
    li.append(botaoEditar)

    if(tarefa.completa){
         li.classList.add("app__section-task-list-item-complete")
        li.querySelector("button"). setAttribute("disabled", "disabled")
    }else{
        li.addEventListener("click", () => tarefaEmFoco(tarefa, li))
    }
    return li
}

const ul = document.querySelector(".app__section-task-list")

function adicionarTarefa(event) {
    event.preventDefault()
    const textTearea = document.querySelector(".app__form-textarea")
    const tarefas = { descricao: textTearea.value }

    lista.push(tarefas)
    salvar()
    ul.append(criarElementoTarefa(tarefas))
    textTearea.value = ""
    esconderOuAparecer()

}

lista.forEach(tarefa => {
    ul.append(criarElementoTarefa(tarefa))
})

function tarefaEmFoco(tarefa, li){
    const validacaoDeCLass= li.classList.contains("app__section-task-list-item-active")
    const emAndamento=document.querySelector(".app__section-active-task-description")
    

    document.querySelectorAll("li").forEach(item => {
        item.classList.remove("app__section-task-list-item-active")
    })

    if(!validacaoDeCLass){
         li.classList.add("app__section-task-list-item-active")
         emAndamento.innerHTML= tarefa.descricao
         liDaTarefaSelecionada= li
         tarefaAtiva=tarefa
    }else{
         li.classList.remove("app__section-task-list-item-active")
         emAndamento.textContent= ""
         liDaTarefaSelecionada= null
         tarefaAtiva= null
    }

}


document.addEventListener("tarefa finalizada", () =>{
    if(liDaTarefaSelecionada){
        liDaTarefaSelecionada.classList.remove("app__section-task-list-item-active")
        liDaTarefaSelecionada.classList.add("app__section-task-list-item-complete")
        liDaTarefaSelecionada.querySelector("button"). setAttribute("disabled", "disabled")
       tarefaAtiva.completa= true
        salvar()
    }
})

const botaoLimparObj=document.getElementById("btn-remover-concluidas")
const limparTodaAlista=document.getElementById("btn-remover-todas")

const removerTarefas= (somenteCompletas) => {
    let validacao= somenteCompletas ? "app__section-task-list-item-complete" : "app__section-task-list-item"

    document.querySelectorAll("li").forEach(elemento => {
        if(elemento.classList.contains(validacao)){
            elemento.remove()
        }
    })

    const filtroDeObjetos= somenteCompletas ? lista.filter(tarefa => !tarefa.completa): []
    lista= filtroDeObjetos

    salvar()
}

botaoLimparObj.onclick= () => removerTarefas(true)
limparTodaAlista.onclick= () => removerTarefas(false)
