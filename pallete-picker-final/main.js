import { addPallete, getPalletes, initPalletes, removePallete } from './local-storage';
import './style.css';
import {v4 as uuidv4} from 'uuid';

const handlePalleteMake = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.colors = [data['color-1'],data['color-2'],data['color-3']];
    for(let i = 1; i<=3;i++) {
        delete data[`color-${i}`];
    }
    data.uuid = uuidv4();
    console.log(data);
    document.querySelector('#generated-palletes').appendChild(makePallete(data));
    addPallete(data);
    e.target.reset();
    // const getRandomRGB = () => {
    //     return Math.floor(Math.random() * ())
    // }
    document.querySelectorAll("form input[type='color']").forEach((input) => {
        input.value = "rgb()"
    })
};

const makePallete = ({title,uuid,colors,temperature}) => {
    const forcedContainer = document.createElement('div');
    const container = document.createElement('div');
    forcedContainer.appendChild(container);
    forcedContainer.className = 'pallete-holders';
    container.className = "pallete";
    container.dataset.uuid = uuid;

    const header = document.createElement('h2');
    header.innerText = title;
    container.appendChild(header);

    colors.forEach(color => {
        const colorWrap = document.createElement('div');
        colorWrap.style.backgroundColor = color;
        colorWrap.className = 'color-wrap';
        const white = document.createElement('span');
        white.innerText = "Text ";
        const black = document.createElement("span");
        black.innerText = "Example";
        colorWrap.append(white,black);
        const copyButton = document.createElement('button');
        copyButton.innerText = `Copy \n ${color}`;
        copyButton.addEventListener('click', (e) => {
            if(!navigator.clipboard) {
                return;
            }
            try {
                const text = e.target.innerText;
                navigator.clipboard.writeText(text.replace(/Copy/,''));
                e.target.innerText = "Copied Hex!"
                setTimeout(() => {
                    e.target.innerText = `Copy \n ${color}`;
                },1000 );
            } catch (e) {
                console.log(`ERROR COPYING: ${e}`)
            }
        })
        const wrapper = document.createElement('div');
        wrapper.append(colorWrap,copyButton);
        wrapper.className = "pallete-color";
        container.appendChild(wrapper);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete Pallete";
    container.appendChild(deleteButton);
    deleteButton.addEventListener('click', (e) => {
        removePallete(uuid);
        document.querySelector(`[data-uuid='${uuid}']`).parentElement.remove();
    });

    const footer = document.createElement('div');
    footer.classList.add("foot",temperature.toLowerCase());
    footer.innerHTML = temperature;
    forcedContainer.appendChild(footer);
    return forcedContainer;
};

const placePalletes = () => {
    getPalletes().forEach((pallete) => {
        document.querySelector("#generated-palletes").appendChild(makePallete(pallete));
    })
}

const main = () => {
    
    const makePalleteButton = document.querySelector('#pallete-creator');
    makePalleteButton.addEventListener("submit", handlePalleteMake);
    
    placePalletes();
    
};

if ( !getPalletes() || getPalletes().length < 1) initPalletes();

main();