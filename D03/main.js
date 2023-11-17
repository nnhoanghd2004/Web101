let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');

let sum = document.getElementById('Sum');
let minus = document.getElementById('Minus');
let mutiply = document.getElementById('Mutiply');
let divide = document.getElementById('Divide');

let result = document.getElementsByClassName('result');

sum.onclick = function () {
	if (input1 && input2) {
		result[0].innerHTML = parseInt(input1.value) + parseInt(input2.value);
	} else console.assert('You need enter number');
};

minus.onclick = function () {
	result[0].innerHTML = parseInt(input1.value) - parseInt(input2.value);
};
mutiply.onclick = function () {
	result[0].innerHTML = parseInt(input1.value) * parseInt(input2.value);
};
divide.onclick = function () {
	result[0].innerHTML = parseInt(input1.value) / parseInt(input2.value);
};
// <!-- <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="style.css">
//     <title>Document</title>
// </head>

// <body>
//     <div class="backgr">
//         <div class="container">
//             <input class="container-input" id="input1" type="text">
//             <input class="container-input" id="input2" type="text">
//             <div class="ope">
//                 <button class="ope-btn" id="Sum">Sum</button>
//                 <button class="ope-btn" id="Minus">Minus</button>
//                 <button class="ope-btn" id="Mutiply">Mutiply</button>
//                 <button class="ope-btn" id="Divide">Divide</button>
//             </div>
//             <div class="result">0</div>

//         </div>

//     </div>

//     <script src="main.js"> </script>
// </body>

// </html> --></meta>
