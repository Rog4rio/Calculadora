'use strict'

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]'); // Com o querySelectorAll ele pode pegar todos os seletores CSS. Nessa semântica estou dizendo para selecionar o id que é igual a 'tecla', e para achar parte do nome de um atributo é só utilizar essa semântica [id*=tecla].
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true; // Um novo número.
let operador;
let numeroAnterior;


const operacaoPendente = () =>  operador != undefined; //Verificar se o operador é diferente de vazio.


const calcular = () => {
    if(operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.')); // Para saber o número atual que está no display.
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`); // Função 'eval' para diminuir as linhas de código para pegar as operações matemáticas.
        atualizarDisplay(resultado);
        // if(operador === '+') { // Forma de pegar os simbolos matemáticos através de condições.
        //     atualizarDisplay(numeroAnterior + numeroAtual);
        // }else if(operador === '-'){
        //     atualizarDisplay(numeroAnterior - numeroAtual);
        // }else if(operador === '*'){
        //     atualizarDisplay(numeroAnterior * numeroAtual);
        // }else if(operador === '/'){
        //     atualizarDisplay(numeroAnterior / numeroAtual);
        // }
    }
}

const atualizarDisplay = (texto) => {
    if(novoNumero) {
        display.textContent = texto.toLocaleString('BR'); // E quando é um novo número, ele substitui.
        novoNumero = false; // Não é um novo número quando entra no display, portanto não é mais um novoNumero.
    }else{
        display.textContent += texto.toLocaleString('BR'); // O display recebe o texto referente a tecla clicada na calculadora. Quando não for novoNumero ele concatena, quando clica em um número que não está no display ele concatena.
    }
}


const inserirNumero = (evento) => { //Recebendo o evento do eventListener na const.
    atualizarDisplay(evento.target.textContent); //Utilizar esse método fica mais fácil para se preocupar com a atualização do display, onde ficará preocupado com outros detalhes do display. Passa-se o evento e o alvo que cliquei e que apareça o texto que está dentro das teclas.
    // display.textContent = evento.target.textContent; // O display recebe como conteúdo dentro dele o evento disparado. E pega o conteúdo do alvo clicado.
}


numeros.forEach(numero =>
    numero.addEventListener('click', inserirNumero) // Pega um número dentro do array e adicionar o evento 'click' para cada número, para cada um dos 10 números. Evento foi inserido em cada uma das teclas.
);


const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular();
        novoNumero = true; // Vai criar um novoNumero.
        operador = evento.target.textContent; // Armazena o operador, e pega o evento click que manda para a função selecionarOperador qual operador foi clicado.
        numeroAnterior = parseFloat(display.textContent.replace(',','.')); // Armazena o número anterior que está no display.
    }
}

operadores.forEach(operador =>
    operador.addEventListener('click', selecionarOperador)
);

const ativarIgual = () => { // A função que ativa o sinal de igualdade, e quando selecionada anula os outros sinais matemáticos.
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => {
    display.textContent = ''; //Pegar o display e deixar ele vazio.
}

document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => { // Para zerar toda a calculadora.
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1); // Para remover o último número, utiliza-se o método slice que é de arrays.

document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1); // Vai pegar o número e inverter o sinal.
}

document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1; // IndexOf vai verificar se o sinal de decimal existe.
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,')
        }
    }
}

document.getElementById('decimal').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorAdicionar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal',
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1; // Verificar se a tecla existe no array.
    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click(); // Mapear a tecla que foi pressionada e acionar o evento de click.
}

document.addEventListener('keydown', mapearTeclado);

