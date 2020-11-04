import refs from "./refs.js";
import imageTemplate from '../templates/imageTemplate.hbs';
import { error } from '../../node_modules/@pnotify/core'; 
import * as basicLightbox from '../../node_modules/basiclightbox';
import "../../node_modules/basiclightbox/dist/basicLightbox.min.css";
import '../../node_modules/@pnotify/core/dist/BrightTheme.css';
import "../../node_modules/@pnotify/core/dist/PNotify.css";

let count = 0;
const preloadRef=document.querySelector('#pulse-loader');

const renderFn = () => { 
    if (count === refs.pageNumber) { 
        return;
    };
     fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${refs.input.value}&page=${refs.pageNumber}&per_page=12&key=${refs.KEY}`)
        .then(res => res.json())
         .then(({ hits }) => {
             if (hits.length) {
                 refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(hits));
                 refs.pageNumber++;
             }
             else { 
                const myNotice = error({
                    title: 'No results!!!!',
                    text: "Please enter another request",
                    delay: 1200,
                });
                 count = 0;
                 return
             }
        }
     )
    
    count = refs.pageNumber;
}

refs.form.addEventListener('submit', e => { 
    e.preventDefault();
    refs.gallery.innerHTML = '';
    renderFn();
})


window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight-500) {
        renderFn();
    }
});

refs.gallery.addEventListener('click', e => {
    e.path.forEach(el => {
        if (el.className === 'gallery-item') {
            preloadRef.classList.remove('is-hidden');
            const imgBig = el.dataset.img;
            const instance = basicLightbox.create(`
                <img src=${imgBig}>`);
            setTimeout(() => {
            instance.show();
            preloadRef.classList.add('is-hidden');
            }, 700);
        };
                
    });
});