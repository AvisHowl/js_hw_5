const dateInput = document.getElementById("dateInput");
const btn = document.querySelector(".button");
const result = document.querySelector(".result");
const err = document.querySelector(".error");

btn.addEventListener("click", () => {
	if (!dateInput.value) {
		err.style.display = "block";
		return;
	} else {
		err.style.display = "none";
	}
	const birthDate = new Date(dateInput.value);
	const daysTillBirth = calcDays(birthDate) + 1;
	const correctStr = correctGrammar(daysTillBirth);
	result.textContent = `До Вашего Дня Рождения осталось: ${daysTillBirth} ${correctStr}`;
});

function calcDays(birthDate) {
	const currentDate = new Date();
	let correctBirthDate = new Date(birthDate);
	correctBirthDate.setFullYear(currentDate.getFullYear());
	if (currentDate > correctBirthDate) {
		correctBirthDate.setFullYear(currentDate.getFullYear() + 1);
	}
	const days = Math.floor(
		(correctBirthDate - currentDate) / (1000 * 60 * 60 * 24)
	);
	return days;
}

function correctGrammar(num) {
	if (num % 10 === 1) {
		return "день";
	} else if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
		return "дня";
	} else return "дней";
}
