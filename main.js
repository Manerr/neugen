
let inner = 0;

let neuExample = document.getElementById("neu");

let settingsform = document.getElementById("form");
let codeOutput = document.getElementById("output-code");
let output = codeOutput.parentElement;

let codeOutputBoxShadowCSS = document.getElementById("css-box-shadow");

let neuStyleClass = document.querySelectorAll(".neu-global-style");

let softness = 1;
let globalColor = "#e3e3e6";

function drawBoxShadow(){
	let color = colorInput.value;
	document.body.style.background = color;
	globalColor = color;

	output.style.boxShadow = "0 0 0 .2rem "+globalColor+", -1.3rem -1.3rem 0 -1rem #040833, 1.3rem 1.3rem 0 -1rem #040833"

	document.getElementById("css-background-output").innerText = color;


	let currentColor = globalColor.slice(1);
	let currentColorR = parseInt(currentColor.slice(0,2),16);
	let currentColorG = parseInt(currentColor.slice(2,4),16);
	let currentColorB = parseInt(currentColor.slice(4,6),16);

	let intensity = intensityInput.value * 3;
	let blurness = blurnessInput.value + "rem";
	let offsetvalue = offset.value + "rem";

	let lightpower = 16 * intensity;
	let darkpower = 88 * intensity;
	// let midpower = Math.floor((7 * intensity) ** 1.3 - 15);


	//We'll then make the mid shadow darker
	// let midColor = "#" + Math.min(Math.floor(currentColorR-midpower),255).toString(16) +  Math.min(Math.floor(currentColorG-midpower),255).toString(16) +  Math.min(Math.floor(currentColorB-midpower),255).toString(16);


	let newlightShadow = "#" + Math.min(Math.floor(currentColorR+lightpower),255).toString(16) +  Math.min(Math.floor(currentColorG+lightpower),255).toString(16) +  Math.min(Math.floor(currentColorB+lightpower),255).toString(16);
	
	let newdarkShadow = "#" + Math.max(Math.floor(currentColorR-darkpower),0).toString(16).padStart(2,"0") +  Math.max(Math.floor(currentColorG-darkpower),0).toString(16).padStart(2,"0") +  Math.max(Math.floor(currentColorB-darkpower),0).toString(16).padStart(2,"0");



	let newBoxShadow = 	("-"+ offsetvalue + " -" + offsetvalue + " " + blurness + " " + newlightShadow + " , " + offsetvalue + " " + offsetvalue + " " + blurness + " " + newdarkShadow);

	// console.log(newBoxShadow);

	
	for (var i = neuStyleClass.length - 2; i >= 0; i--) {
		if(inner){
			neuStyleClass[i].style.boxShadow = newBoxShadow.replace(",","inset ,") + " inset";
		}
		else{
			neuStyleClass[i].style.boxShadow = newBoxShadow;
		}
	}
	neuStyleClass[2].style.boxShadow = newBoxShadow.replace(",","inset ,") + " inset";


	blurness = blurness.slice(0,-3);
	console.log(blurness);
	offsetvalue = offsetvalue.slice(0,-3);

	let outputboxshadowstring = '<span id="css-box-shadow"><br/>\
<span class="css-value">-' + offsetvalue + '</span><span class="css-unit">rem</span>\
<span class="css-value">-' + offsetvalue + '</span><span class="css-unit">rem</span>\
<span class="css-value">' + blurness + '</span><span class="css-unit">rem</span>\
<span class="css-value"> ' + newlightShadow + '</span>,<br/>\
<span class="css-value">' + offsetvalue + '</span><span class="css-unit">rem</span>\
<span class="css-value">' + offsetvalue + '</span><span class="css-unit">rem</span>\
<span class="css-value">' + blurness + '</span><span class="css-unit">rem</span>\
<span class="css-value">' + newdarkShadow + '</span>;\
</span>';

codeOutputBoxShadowCSS.innerHTML = outputboxshadowstring;




}
onload= function(){drawBoxShadow()}

let intensityInput = document.getElementById("intensity");

let colorInput = document.getElementById("color");
colorInput.value = globalColor;
colorInput.oninput = function(e){
	drawBoxShadow();
}

let radiusInput = document.getElementById("radius");
radiusInput.oninput = function(e){
	let radius = radiusInput.value + "%";
	neu.style.borderRadius = radius;
	document.getElementById("css-border-radius").innerText = radius;

}

let blurnessInput = document.getElementById("blur");
let offsetInput = document.getElementById("offset");


settingsform.oninput = drawBoxShadow;



let copiersvg = document.querySelector("#copy svg");
let copiedMessage = document.getElementById("copied-message");
let copier = document.getElementById('copy');
copier.onclick = function(e){

	navigator.clipboard.writeText(codeOutput.innerText);
	copiedMessage.style.display = "inline-block";
	copiersvg.style.fill = "#7f9";
	setTimeout(function(){copiersvg.style.fill = "#fff";copiedMessage.style.display = "none";},150);

}




