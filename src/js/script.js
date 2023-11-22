{
    'use strict';

    const select = {
        templateOf: {
            book: '#template-book',
        },
        listOf: {
            books: '.books-list',
            images: 'book__image',
            ratings: '.book__rating__fill',
        },
        atributes: {
            dataId: 'data-id',
        },
        class: {
            favorite: 'favorite',
            hidden: 'hidden',
        },
        filters: '.filters',
    };

    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    };

    const favoriteBooks = [];
    const filters = [];

    class BooksList {
        constructor(){
            const thisApp = this;

            thisApp.initData();
            thisApp.getElements();
            thisApp.render(this.data);
            thisApp.initActions();
        }

        getElements(){
            const thisApp = this;

            thisApp.dom = {
                booksList: document.querySelector(select.listOf.books),
                filtersList: document.querySelector(select.filters),
            };
        }

        render(listOfBooks){
            const thisApp = this;

            for(const singleBook of listOfBooks){
                const ratingBgc = thisApp.determineRatingBgc(singleBook.rating);
                const ratingWidth = thisApp.determineRatingWidth(singleBook.rating);
                const generatedHTML = templates.booksList(singleBook);
                const DOMElement = utils.createDOMFromHTML(generatedHTML);
                thisApp.dom.booksList.appendChild(DOMElement);
    
                const ratingFill = DOMElement.querySelector(select.listOf.ratings);
                ratingFill.style.width = ratingWidth;
                ratingFill.style.background = ratingBgc;
            }
        }

        

        initActions(){
            const thisApp = this;

            

            thisApp.dom.booksList.addEventListener('dblclick', function(event){
                event.preventDefault();
                const clickedBook = event.target.offsetParent;
    
                if (clickedBook.classList.contains(select.listOf.images)){
                    const bookId = clickedBook.getAttribute(select.atributes.dataId);
                    
                    if (favoriteBooks.includes(bookId)){
                        clickedBook.classList.remove(select.class.favorite);
                        favoriteBooks.splice(0, 1);
                        //favoriteBooks.pop(bookId);
                    } else {
                        clickedBook.classList.add(select.class.favorite);
                        favoriteBooks.push(bookId);
                    }
                }
            });
    
            thisApp.dom.filtersList.addEventListener('click', function(event){
                const filterClicked = event.target.tagName == 'INPUT' &&
                                        event.target.name == 'filter' &&
                                        event.target.type == 'checkbox';
    
                if(filterClicked){
                    if (event.target.checked){
                        filters.push(event.target.value);
                    } else {
                        const indexToRemove = filters.indexOf(event.target.value);
                        filters.splice(indexToRemove, 1);
                    }
                }
                app.filterBooks();
            });
        }

        filterBooks(){
            const thisApp = this;

            for(const singleBook of thisApp.data){
                let shouldBeHidden = false;
    
                for(const singleFilter of filters){
                    if(!singleBook.details[singleFilter]){
                        shouldBeHidden = true;
                    }
                }
    
                const bookToHide = document.querySelector('.book__image[data-id="' + singleBook.id + '"]'); 
                if (shouldBeHidden) {
                    bookToHide.classList.add(select.class.hidden); 
                } else {
                    bookToHide.classList.remove(select.class.hidden); 
                }
            }
    
        }

        determineRatingBgc(rating){
            
            if (rating < 6) {
                return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
            } else if (rating < 8) {
                return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
            } else if (rating < 9) {
                return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            } else {
                return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
            }
        }
    
        determineRatingWidth(rating){
            return (rating * 10 + '%');
        }

        initData(){
            const thisApp = this;

            thisApp.data = dataSource.books;
        }
    }
    
    const app = new BooksList();
}

/*const favoriteBooks = [];
const filters = [];

const render = function(listOfBooks){
    const booksListElement = document.querySelector(select.listOf.books);

    for(const singleBook of listOfBooks){
        const ratingBgc = determineRatingBgc(singleBook.rating);
        const ratingWidth = determineRatingWidth(singleBook.rating);
        const generatedHTML = templates.booksList(singleBook);
        const DOMElement = utils.createDOMFromHTML(generatedHTML);
        booksListElement.appendChild(DOMElement);

        const ratingFill = DOMElement.querySelector(select.listOf.ratings);
        ratingFill.style.width = ratingWidth;
        ratingFill.style.background = ratingBgc;
    }
};

const initActions = function(){

    const booksList = document.querySelector(select.listOf.books);
    const filterList = document.querySelector(select.filters);

    booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedBook = event.target.offsetParent;

        if (clickedBook.classList.contains(select.listOf.images)) {
            const bookId = clickedBook.getAttribute(select.atributes.dataId);
            
            if (favoriteBooks.includes(bookId)){
                clickedBook.classList.remove(select.class.favorite);
                favoriteBooks.splice(0, 1);
                //favoriteBooks.pop(bookId);
            } else {
                clickedBook.classList.add(select.class.favorite);
                favoriteBooks.push(bookId);
            }
        }
    });

    filterList.addEventListener('click', function(event){
        const filterClicked = event.target.tagName == 'INPUT' &&
                                event.target.name == 'filter' &&
                                event.target.type == 'checkbox';

        if(filterClicked){
            if (event.target.checked){
                filters.push(event.target.value);
            } else {
                const indexToRemove = filters.indexOf(event.target.value);
                filters.splice(indexToRemove, 1);
            }
        }
        filterBooks();
    });
};

const filterBooks = function(){
    for(const singleBook of dataSource.books){
        let shouldBeHidden = false;

        for(const singleFilter of filters){
            if(!singleBook.details[singleFilter]){
                shouldBeHidden = true;
            }
        }

        const bookToHide = document.querySelector('.book__image[data-id="' + singleBook.id + '"]'); 
        if (shouldBeHidden) {
            bookToHide.classList.add(select.class.hidden); 
        } else {
            bookToHide.classList.remove(select.class.hidden); 
        }
    }

};

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

const determineRatingBgc = function(rating){
    if (rating < 6) {
        return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating < 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating < 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
};

const determineRatingWidth = function(rating){
    return (rating * 10 + '%');
};
    
determineRatingBgc();
render(dataSource.books);
initActions();
*/