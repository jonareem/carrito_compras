document.addEventListener("DOMContentLoaded", function (event) {

	$( "#datos, #pagos, #felicidades" ).hide();
	
	var acc = document.getElementsByClassName("accordion");
	var panel = document.getElementsByClassName('panel');
	for (var i = 0; i < acc.length; i++) {
		acc[i].onclick = function () {
			var setClasses = !this.classList.contains('active');
			setClass(acc, 'active', 'remove');
			setClass(panel, 'show', 'remove');
			if (setClasses) {
				this.classList.toggle("active");
				this.nextElementSibling.classList.toggle("show");
			}
		}
	}

	function setClass(els, className, fnName) {
		for (var i = 0; i < els.length; i++) {
			els[i].classList[fnName](className);
		}
	}
});



$(function () {

	var owner = $('#owner');
	var cardNumber = $('#cardNumber');
	var cardNumberField = $('#card-number-field');
	var CVV = $("#cvv");
	var mastercard = $("#mastercard");
	var confirmButton = $('#confirm-purchase');
	var visa = $("#visa");
	var amex = $("#amex");


	cardNumber.payform('formatCardNumber');
	CVV.payform('formatCardCVC');


	cardNumber.keyup(function () {

		amex.removeClass('transparent');
		visa.removeClass('transparent');
		mastercard.removeClass('transparent');

		if ($.payform.validateCardNumber(cardNumber.val()) == false) {
			cardNumberField.addClass('has-error');
		} else {
			cardNumberField.removeClass('has-error');
			cardNumberField.addClass('has-success');
		}

		if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
			mastercard.addClass('transparent');
			amex.addClass('transparent');
		} else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
			mastercard.addClass('transparent');
			visa.addClass('transparent');
		} else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
			amex.addClass('transparent');
			visa.addClass('transparent');
		}
	});

	confirmButton.click(function (e) {

		e.preventDefault();

		var isCardValid = $.payform.validateCardNumber(cardNumber.val());
		var isCvvValid = $.payform.validateCardCVC(CVV.val());

		if (owner.val().length < 5) {
			alert("Wrong owner name");
		} else if (!isCardValid) {
			alert("Wrong card number");
		} else if (!isCvvValid) {
			alert("Wrong CVV");
		} else {
			alert("Everything is correct");
		}
	});
});

$("#btn_carrito").on("click", function(){
	$( "#carrito" ).hide();
	$( "#datos" ).show();
 	});


$("#btn_datos").on("click", function(){
	$( "#datos" ).hide();
	$( "#pagos" ).show();
 	});

$("#btn_pagos").on("click", function(){
	$( "#pagos" ).hide();
	$( "#felicidades" ).show();
 	});
