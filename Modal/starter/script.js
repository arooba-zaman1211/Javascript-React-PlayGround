'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnclose = document.querySelector('.close-modal');
const btnshow = document.querySelectorAll('.show-modal');

const open = function () {
	console.log('button clicked');
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
}

const close = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
}

for (let i = 0; i < btnshow.length; i++)
	btnshow[i].addEventListener('click', open)


btnclose.addEventListener('click', close);
overlay.addEventListener('click', close);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape') {
		if (!modal.classList.contains('hidden')) {
			close();
		}
	}
});
