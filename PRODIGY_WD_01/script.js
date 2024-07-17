window.addEventListener('scroll' , () => {
    const navbar = document.getElementById('navbar');
    if(window.scrollY > 50 ){
        navbar.style.backgroundColor = '#695';
    }
    else{
        navbar.style.backgroundColor= '#333';
    }
});