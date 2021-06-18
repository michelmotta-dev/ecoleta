
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const ufSelect = document.querySelector("select[name=uf]")
    const ufValue = event.target.value
    const hiddenState = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex
    console.log(event.target.options[indexOfSelectedState].text)
    hiddenState.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

        citySelect.innerHTML = "<option value=>Selecione a cidade</option>"
        citySelect.disabled = true

        fetch(url)
        .then( res => res.json() )
        .then( cities => {

            for( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}

document.querySelector("select[name=uf]")
        .addEventListener("change", getCities)


// itens de coleta

// estrutura de repeticao para pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li") 

// o cara que ouve o clique
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

// array que guarda os itens selecionados
let selectedItems = []

// funcao para pegar o ID do item selecionado 
function handleSelectedItem (event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    


    // veririfica se há itens selecionados e pega eles
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // retorna true ou false
        return itemFound
    })
    
    // tira a selecao do item que já estava selecionado

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }     // adiciona o item a selecao
        else {
            selectedItems.push(itemId)
    }
    // adiciona o item selecionado no hidden
    collectedItems.value = selectedItems

}


