const mainContent = document.querySelector('main');
// ======= Pobranie parametrów z URL =======

const params = new URLSearchParams(window.location.search);

// ======= Pobranie zapytania z URL =======

const query = params.get('zapytanie');

if (query) {
    document.getElementById("wyszukiwarka-textbox").value = query;

    initBookList(query);


}

// ========== Pobranie filtru z URL =======

const filter = params.get('filter');
const subfilter = params.get('subfilter');

if (subfilter) {
    const heading = document.createElement('h1');
    heading.textContent = `Szczegóły dla: "${subfilter}"`;
    mainContent.prepend(heading);

    initDetailedList(filter, subfilter);
}
else if (filter) {
    const heading = document.createElement('h1');
    heading.textContent = `Wybrano filtr: "${filter}"`;
    mainContent.prepend(heading);
    initFilterList(filter);
}

async function getBooksByTitle(fragment)
{
    const allBooks = await getBooks();
    const cleared_fragment = fragment.toLowerCase().trim();
    
    return allBooks.filter(book => {
        const element_title = book.title.toLowerCase();
        return element_title.includes(cleared_fragment)
    });
}

async function getFilterCategoriesJSON(filter)
{
    switch(filter)
    {
        case "gatunki":
            const genres = await getGenres();
            return genres;
        case "epoki":
            const epochs = await getEpochs();
            return epochs;
        case "rodzaje":
            const kinds = await getKinds();
            return kinds;
        case "motywy":
            const themes = await getThemes();
            return themes;
    }
}

function browserElementHTMLString(img, title, author) {
    return `
        <img src="${img}"></img>
        <div class="bookInfo">
            <h1 class="autor">${author}</h1>
            <h2 class="tytul">${title}</h3>
        </div>
    `;
}

function filterHTMLString(name) {
    return `
        <p class="filterName unselectable">${name}</p>
    `;
}

async function initBookList(titleName)
{
    const filtersJSON = await getBooksByTitle(titleName);
    const browserList = document.getElementById("browserList");
    filtersJSON.forEach(item => {
        const filterElement = document.createElement("div");
        filterElement.classList.add("browserElement");
        filterElement.innerHTML = browserElementHTMLString(item.simple_thumb, item.title, item.author);

        filterElement.dataset.href = item.href;
        filterElement.addEventListener('click', () => {
            window.location.href = `./ksiazka.html?tytul=${item.slug}`;
        });
        browserList.appendChild(filterElement);
    });
}

async function initDetailedList(filter, subfilter) {
    const detailedJSON = await getBooksByChosenFilter(filter, subfilter);
    console.log(detailedJSON);
    const browserList = document.getElementById("browserList");
    
    browserList.innerHTML = ""; 

    detailedJSON.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("browserElement", "finalItem");
        itemElement.innerHTML = browserElementHTMLString(item.simple_thumb, item.title, item.author);
        itemElement.addEventListener('click', () => {
            //TODO: strony konkretnych ksiazek
        });
        
        browserList.appendChild(itemElement);
    });
}

async function getBooksByChosenFilter(filter, subfilter)
{
    const allBooks = await getBooks();
    const cleared_subfilter = subfilter.toLowerCase().trim();
    
    return allBooks.filter(book => {
        let element_filter;
        switch(filter)
        {
            case "gatunki":
                element_filter = book.genre.toLowerCase();
                break;
            case "epoki":
                element_filter = book.epoch.toLowerCase();
                break;
            case "rodzaje":
                element_filter = book.kind.toLowerCase();
                break;
        }
        return element_filter == cleared_subfilter;
    });
}
