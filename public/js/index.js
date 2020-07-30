(function () {
    /* globals vars */
    const globals = {
        offset: 0,
        pageLimit: 3,
        totalCards: 0,
        selectedCardType: 'A',
        maxCards: 100,
    }
    /* globals vars end */

    /* utils */

    const renderCard = function (cardsLen, cardsType, offset) {
        let s = ''
        let limitExceed = 0;
        for (let i = offset; i <= cardsLen; i++) {
            if (limitExceed >= globals.pageLimit) break;
            s += `<div class="card"><span class="number">${i}</span>Item ${cardsType}${i}</div>`
            limitExceed++
        }
        return s
    }

    const onPaginationUpdate = function () {
        return globals.offset * globals.pageLimit + 1
    }

    /* utils end */


    /* dom handlers */

    /* dom selectors */

    const sidebarContainer = document.querySelector('.sidebar')
    const cardsContainer = document.querySelector('.cards')

    const dropdown = document.querySelector('.dropdown')

    const optionBtn = document.querySelector('.option')
    const quantityField = document.querySelector('#quantity')
    const selectItemInput = document.querySelector('#selectedItem')

    const prevBtn = document.querySelector('.pagination .prev')
    const nextBtn = document.querySelector('.pagination .next')

    /* dom selectors end */

    //dropdown 
    optionBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        dropdown.setAttribute('style', 'left:' + sidebarContainer.getBoundingClientRect().width + 'px')
        if (dropdown.classList.contains('show')) dropdown.classList.remove('show')
        else dropdown.classList.add('show')
    })

    selectItemInput.value = globals.selectedCardType

    document.querySelector('body').addEventListener('click', (e) => {
        if (e.target && e.target.classList && !e.target.classList.contains('dropdown')
            && !e.target.classList.contains('select-control')) dropdown.classList.remove('show')
    })

    // quantity input 
    quantityField.addEventListener('input', e => {
        globals.offset = 0
        const { value } = e.target
        if (value > 0 && value <= globals.maxCards) {
            globals.totalCards = value
            cardsContainer.innerHTML = renderCard(globals.totalCards, globals.selectedCardType, 1)
        } else {
            cardsContainer.innerHTML = '<div class="card errorMsg">Invalid Value</div>'
        }
    })

    // select item type 
    selectItemInput.addEventListener('change', e => {
        globals.offset = 0
        const { value } = e.target
        if (value) {
            globals.selectedCardType = value
            cardsContainer.innerHTML = renderCard(globals.totalCards, value, 1)
        } else {
            cardsContainer.innerHTML = '<div class="card errorMsg">No Selected Type</div>'
        }

    })

    // pagination handlers
    prevBtn.addEventListener('click', e => {
        globals.offset--
        if (globals.offset < 0 || globals.totalCards <= 3) return globals.offset = 0
        const pos = onPaginationUpdate()
        cardsContainer.innerHTML = renderCard(globals.totalCards, globals.selectedCardType, pos)
    })

    nextBtn.addEventListener('click', e => {
        if (globals.totalCards <= 3) return globals.offset = 0
        globals.offset++
        const pos = onPaginationUpdate()
        if (pos > globals.totalCards) return globals.offset--;
        cardsContainer.innerHTML = renderCard(globals.totalCards, globals.selectedCardType, pos)
    })

    /* dom handlers  end */

})()