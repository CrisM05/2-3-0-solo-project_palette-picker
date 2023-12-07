import './style.css'

const handlePalleteMake = (e) => {
    e.preventDefault();
};

const main = () => {
    const makePalleteButton = document.querySelector('#pallete-creator');
    makePalleteButton.addEventListener("submit", handlePalleteMake);
};

main();