let inner = 0;
let neuExample = document.getElementById("neu");

let settingsform = document.getElementById("form");
let codeOutput = document.getElementById("output-code");
let output = codeOutput.parentElement;

let codeOutputBoxShadowCSS = document.getElementById("css-box-shadow");

let neuStyleClass = document.querySelectorAll(".neu-global-style");

let boxShadowType = 0;

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

	let newlightShadow = "#" + Math.min(Math.floor(currentColorR+lightpower),255).toString(16).padStart(2,"0") +  Math.min(Math.floor(currentColorG+lightpower),255).toString(16).padStart(2,"0") +  Math.min(Math.floor(currentColorB+lightpower),255).toString(16).padStart(2,"0");
	let newdarkShadow = "#" + Math.max(Math.floor(currentColorR-darkpower),0).toString(16).padStart(2,"0") +  Math.max(Math.floor(currentColorG-darkpower),0).toString(16).padStart(2,"0") +  Math.max(Math.floor(currentColorB-darkpower),0).toString(16).padStart(2,"0");


	//inner shaddow
	if(boxShadowType == 1){
		let tmp = newlightShadow;
		newlightShadow = newdarkShadow;
		newdarkShadow = tmp;
	}


	let newBoxShadow = 	("-"+ offsetvalue + " -" + offsetvalue + " " + blurness + " " + newlightShadow + " , " + offsetvalue + " " + offsetvalue + " " + blurness + " " + newdarkShadow);
	if(boxShadowType == 0){
	}
	else if(boxShadowType == 1){
		inner = 1;
	}
	else{
		inner = 2;
	}


	
	for (var i = neuStyleClass.length - 2; i >= 0; i--) {
		if(inner == 1){
			neuStyleClass[i].style.boxShadow = newBoxShadow.replace(",","inset ,") + " inset";
		}
		else if(inner == 2){
			neuStyleClass[i].style.boxShadow = newBoxShadow + "," + newBoxShadow.replace(",","inset ,") + " inset";
			neuStyleClass[i].style.border = "2px solid " + globalColor;

		}
		else{
			neuStyleClass[i].style.boxShadow = newBoxShadow;
		}
	}
	neuStyleClass[2].style.boxShadow = newBoxShadow.replace(",","inset ,") + " inset";
	neuStyleClass[3].style.boxShadow = newBoxShadow.replace(",","inset ,") + " inset";


	blurness = blurness.slice(0,-3);
	offsetvalue = offsetvalue.slice(0,-3);


	if(inner == 0){
		var outputboxshadowstring = '<br/>\
<span class="css-value">-' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">-' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + blurness + '</span><span class="css-unit">rem</span>\
<span class="css-value"> ' + newlightShadow + '</span>,<br/>\
<span class="css-value">' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + blurness + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + newdarkShadow + '</span>;';

	}
	else if(inner == 1){
		var outputboxshadowstring = '<br/>\
<span class="css-value">-' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">-' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + blurness + '</span><span class="css-unit">rem</span>\
<span class="css-value"> ' + newlightShadow + '</span> inset,<br/>\
<span class="css-value">' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + blurness + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + newdarkShadow + '</span> inset;';

	}
	else{
		var outputboxshadowstring = '<br/>\
<span class="css-value">-' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">-' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + blurness + '</span><span class="css-unit">rem</span>\
<span class="css-value"> ' + newlightShadow + '</span>,<br/>\
<span class="css-value">' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + blurness + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + newdarkShadow + '</span>,'+'<br/>\
<span class="css-value">-' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">-' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + blurness + '</span><span class="css-unit">rem</span>\
<span class="css-value"> ' + newlightShadow + '</span> inset,<br/>\
<span class="css-value">' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + offsetvalue + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + blurness + '</span><span class="css-unit">rem </span>\
<span class="css-value">' + newdarkShadow + '</span> inset;<br/>\
<span class="css-attribute">border</span>: <span class="css-value">2</span><span class="css-unit">px</span> <span class="css-unit">solid</span> <span class="css-value">' + globalColor + '</span>;';
	}

codeOutputBoxShadowCSS.innerHTML = outputboxshadowstring;




}
onload= function(){drawBoxShadow()}

let typeInput = document.getElementById("type");

typeInput.oninput = function(e){
	let v = e.target.value;

	if( v != 2 && neu.style.border.length ){
		for (var i = neuStyleClass.length - 1; i >= 0; i--) {
			neuStyleClass[i].style.border = "none";
		}
	}
	if( v == 0 ){
		inner = 0;
	}
	else if( v == 1 ){
		inner = 1;
	}
	else{
		inner = 2;
	}

	drawBoxShadow();
}

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
