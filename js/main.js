const slides = [
    {
        title: "Marco Polo",
        description: "Strona biura podróży połączona z aplikacją umożliwiającą zarządzanie ofertą wyjazdową, zawartością strony i samym wyjazdem.",
        url: 'https://marcopolo.rzeszow.pl',
        code: 'https://github.com/LucynaM/tour_operator',
        class: 'marcopolo',
        technologies: 'Python, Django, MySQL, JS, JQuery, Ajax, CSS3, SASS, Bootstrap, HTML',
    },
    {
        title: 'Messaging',
        description: "Aplikacja w stylu twittera pozwalająca użytkownikom umieszczać na stronie wpisy, komentować wpisy innych oraz wysyłać do siebie prywatne wiadomości.",
        url: 'http://messaging.portcodio.pl',
        code: 'https://github.com/LucynaM/twitter-like-app',
        class: 'messaging',
        technologies: 'Python, Django, MySQL, JS, CSS3, Bootstrap, HTML',
    },
    {
        title: 'Album',
        description: "Online'owy album fotograficzny prezentujący zdjęcia użytkowników i pozwalający im komentować i oceniać zdjęcia innych.",
        url: 'http://album.portcodio.pl',
        code: 'https://github.com/LucynaM/photoalbum',
        class: 'album',
        technologies: 'Python, Django, MySQL, JS, JQuery, Ajax, CSS3, SASS, Bootstrap, HTML',
    },
    {
        title: 'Hairsalon',
        description: "Strona salonu fryzjerskiego połączona z aplikacją do umawiania wizyt online.",
        url: 'http://hairsalon.portcodio.pl',
        code: 'https://github.com/LucynaM/django_hairsalon',
        class: 'hairsalon',
        technologies: 'Python, Django, MySQL, JS, JQuery, CSS3, SASS, Bootstrap, HTML',
    },
];

class Slider {
    constructor(slides) {
        this.slides = slides;
        this.index = 0;
        this.interval = null;
        this.playSwich = true;

        /* DOM elements */
        this.img = document.querySelector('header');
        this.description = document.querySelector('.about-project');
        this.linkToCode = document.querySelector('.link-to-code a');
        this.linkToProject = document.querySelector('.link-to-project a');
        this.technologies = document.querySelector('.about-tchnologies');
        this.dots = [...document.querySelectorAll('.dots span')];
        this.play = document.querySelector('.play-control .play');
        this.stop = document.querySelector('.play-control .stop');

        /* control slider action */
        this.interval = setInterval(this.changeSlide.bind(this), 10000);
        window.addEventListener('keydown', this.changeSlideOnKeyPress.bind(this));
        this.play.addEventListener('click', this.runSlider.bind(this));
        this.stop.addEventListener('click', this.stopSlider.bind(this));
        this.play.addEventListener('touch', this.runSlider.bind(this));
        this.stop.addEventListener('touch', this.stopSlider.bind(this));
        this.dots.forEach(dot => dot.addEventListener('click', this.changeSlideOnClick.bind(this)));

    }

    changeDots() {
        const oldIndex = this.dots.findIndex(dot => dot.classList.contains('active'));
        this.dots[oldIndex].classList.remove('active');
        this.dots[this.index].classList.add('active');
    }
    setNewValues() {
        this.img.style.display = 'none';
        this.img.className = this.slides[this.index].class;
        $(this.img).fadeIn();
        this.description.textContent = this.slides[this.index].description;
        this.linkToCode.setAttribute('href', this.slides[this.index].code);
        this.linkToProject.setAttribute('href', this.slides[this.index].url);
        this.technologies.textContent = `Technologie: ${this.slides[this.index].technologies}`;
    }

    changeIndex(changeValue, breakValue, newValue) {
        this.index += changeValue;
        if (this.index === breakValue) this.index = newValue;
        this.setNewValues();
    }

    changeSlide() {
        this.changeIndex(1, this.slides.length, 0);
        this.changeDots();
    }

    changeSlideOnKeyPress(e) {
        console.log("test");
        if (e.keyCode == 37 || e.keyCode == 39) {
            clearInterval(this.interval);
            if (e.keyCode == 39) {
                this.changeIndex(1, this.slides.length, 0);
            } else if (e.keyCode == 37) {
                this.changeIndex(-1, -1, this.slides.length - 1);
            }
            this.changeDots();
            this.interval = setInterval(this.changeSlide.bind(this), 10000);
        } else if (e.keyCode == 32) {
            if (this.playSwich) {
                this.stopSlider();
            } else {
                this.runSlider();
            }
        }
    }

    changeSlideOnClick(e) {
        this.index = parseInt(e.target.dataset.key);
        this.setNewValues();
        this.changeDots();
    }

    stopSlider() {
        clearInterval(this.interval);
        this.playSwich = !this.playSwich;
        $(this.stop).hide();
        $(this.play).show();
    }

    runSlider() {
        this.playSwich = !this.playSwich;
        this.changeSlide();
        this.interval = setInterval(this.changeSlide.bind(this), 10000);
        $(this.play).hide();
        $(this.stop).show();
    }
};

const slider = new Slider(slides);
