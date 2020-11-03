import "./css/style.css";
import refs from "./js/refs.js";
import imageTemplate from './templates/imageTemplate.hbs';
import throttle from '../node_modules/lodash.throttle/index.js';
import * as basicLightbox from '../node_modules/basiclightbox';

import  "../node_modules/basiclightbox/dist/basicLightbox.min.css";
let count;



const renderFn = () => { 
    if (count === refs.pageNumber) { 
        return
    };
    console.log(refs.pageNumber);
      fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${refs.input.value}&page=${refs.pageNumber}&per_page=12&key=${refs.KEY}`)
        .then(res => res.json())
        .then(({ hits }) => {
            if (hits.length) {
                refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(hits));
                refs.pageNumber++;
            }
        }
    );
    count = refs.pageNumber;
}

refs.form.addEventListener('submit', e => { 
    e.preventDefault();
    refs.gallery.innerHTML = '';
    renderFn();
})


window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight - 500) {
        renderFn();
    }
});

    refs.gallery.addEventListener('click', e => {
        e.path.forEach(el => {
            if (el.className === 'gallery-item') {
                const imgBig = el.dataset.img;
                const instance = basicLightbox.create(`
                <img src=${imgBig}">`);
                instance.show();
            };
                
        });
        })
    

