const slides = [
    {
        title: "Marco Polo",
        description: "Strona biura podróży połączona z aplikacją umożliwiającą zarządzanie ofertą wyjazdową, zawartością strony i samym wyjazdem.",
        url: 'marcopolo.rzeszow.pl',
        code: 'github-coś-tam',
        class: 'marcopolo',
    },
    {
        title: 'Messaging',
        description: "Aplikacja w stylu twittera pozwalająca użytkownikom umieszczać na stronie wpisy, komentować wpisy innych oraz wysyłać do siebie prywatne wiadomości.",
        url: 'messaging.portcodio.pl',
        code: 'github-coś-tam',
        class: 'messaging',
    },
    {
        title: 'Album',
        description: "Online'owy album fotograficzny prezentujący zdjęcia użytkoników i pozwalający im komentować i oceniać zdjęcia innych.",
        url: 'album.portcodio.pl',
        code: 'github-coś-tam',
        class: 'album',
    },
    {
        title: 'Hairsalon',
        description: "Strona salonu fryzjerskiego połączona z aplikacją do umawiania wizyt online.",
        url: 'hairsalon.portcodio.pl',
        code: 'github-coś-tam',
        class: 'hairsalon',
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
        this.dots = [...document.querySelectorAll('.dots span')];
        this.play = document.querySelector('.play-control .play');
        this.stop = document.querySelector('.play-control .stop');

        /* control slider action */
        this.interval = setInterval(this.changeSlide.bind(this), 5000);
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
        this.linkToCode.setAttribute('href', this.slides[this.index].url);
        this.linkToProject.setAttribute('href', this.slides[this.index].code);
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
            this.interval = setInterval(this.changeSlide.bind(this), 5000);
        } else if (e.keyCode == 32) {
            if (this.playSwich) {
                console.log('test2');
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
        this.interval = setInterval(this.changeSlide.bind(this), 5000);
        $(this.play).hide();
        $(this.stop).show();
    }
};

const slider = new Slider(slides);
