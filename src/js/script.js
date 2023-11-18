{
    'use strict';
    const select = {
        templateOf: {
            book: '#template-book',
        },
        listOf: {
            books: '.books-list',
            images: '.book__image',
        },
        atributes: {
            dataId: 'data-id',
        },
        class: {
            favorite: 'favorite',
        },
    };

    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    };

    const favoriteBooks = [];

    const render = function(listOfBooks){
        const booksListElement = document.querySelector(select.listOf.books);

        for(const singleBook of listOfBooks){
            const generatedHTML = templates.booksList(singleBook);
            const DOMElement = utils.createDOMFromHTML(generatedHTML);
            booksListElement.appendChild(DOMElement);
        }
    };

    const initActions = function(){
        const images = document.querySelectorAll(select.listOf.images);

        for(const image of images){
            const imageId = image.getAttribute(select.atributes.dataId);
            image.addEventListener('dblclick', function(event){
                event.preventDefault();
                if(!favoriteBooks.includes(imageId)){
                    image.classList.add(select.class.favorite);
                    favoriteBooks.push(imageId);
                } else {
                    image.classList.remove('favorite');
                    favoriteBooks.splice(0, 1);
                }
            });
        }
        //console.log('favoriteBooks', favoriteBooks);
    };
      
    
    render(dataSource.books);
    initActions();
}