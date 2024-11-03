const nameInput = document.getElementById("nameInput");
const avatarInput = document.getElementById("avatarInput");
const commentInput = document.getElementById("commentInput");
const container = document.querySelector(".text-container");
const button = document.getElementById("btn");
const err = document.querySelector(".error");
const nameDisplayOn = document.getElementById("nameDisplayOn");
const nameDisplayOff = document.getElementById("nameDisplayOff");
const nameInputTitle = document.getElementById("nameInputTitle");

nameDisplayOff.addEventListener("change", () => {
	if (nameDisplayOff.checked) {
		nameInput.classList.add("none");
		nameInput.value = "";
		nameInputTitle.classList.add("none");
		nameDisplayOn.disabled = "true";
	} else {
		nameInput.classList.remove("none");
		nameInputTitle.classList.remove("none");
		nameDisplayOn.disabled = "false";
	}
});

nameDisplayOn.addEventListener("change", () => {
	if (nameDisplayOn.checked) {
		nameDisplayOff.disabled = "true";
	} else {
		nameDisplayOff.disabled = "false";
	}
});

const images = [
	"/assets/images/img1.png",
	"/assets/images/img2.png",
	"/assets/images/img3.png",
	"/assets/images/img4.png",
	"/assets/images/img5.png",
	"/assets/images/img6.png",
];

function randomizeImage() {
	const randomIndex = Math.floor(Math.random() * images.length);
	return images[randomIndex];
}

button.addEventListener("click", () => {
	const name = nameInput.value;
	let avatar = avatarInput.value;
	if (!avatar) {
		avatar = randomizeImage();
	}
	const comment = commentInput.value;
	if ((!name || !comment) & nameDisplayOn.checked) {
		err.style.display = "block";
		return;
	} else {
		err.style.display = "none";
	}
	if (!comment & nameDisplayOff.checked) {
		err.style.display = "block";
		return;
	} else {
		err.style.display = "none";
	}
	if (nameDisplayOff.checked) {
		const defaultName = "Username";
		const cleanedComment = checkSpam(comment);
		const commentElement = document.createElement("div");
		const date = new Date();
		const options = {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		};
		const correctedDate = date.toLocaleDateString("ru-RU", options);
		commentElement.style.border = "2px solid #8a00ff";
		commentElement.style.padding = "10px";
		commentElement.style.marginBottom = "10px";
		commentElement.innerHTML = `
	<span>${correctedDate}</span><br>
    <img src="${avatar}" alt="Аватар">
    <h3>${defaultName}</h3>
    <p>${cleanedComment}</p>
    `;
		container.appendChild(commentElement);
		nameInput.value = "";
		avatarInput.value = "";
		commentInput.value = "";
	} else {
		const correctedName = checkName(name);
		const cleanedComment = checkSpam(comment);
		const commentElement = document.createElement("div");
		const date = new Date();
		const options = {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		};
		const correctedDate = date.toLocaleDateString("ru-RU", options);
		commentElement.style.border = "2px solid #8a00ff";
		commentElement.style.padding = "10px";
		commentElement.style.marginBottom = "10px";
		commentElement.innerHTML = `
	<span>${correctedDate}</span><br>
    <img src="${avatar}" alt="Аватар">
    <h3>${correctedName}</h3>
    <p>${cleanedComment}</p>
    `;
		container.appendChild(commentElement);
		nameInput.value = "";
		avatarInput.value = "";
		commentInput.value = "";
	}
});

function checkName(name) {
	let trimmedName = name.trim();
	let lowerName = trimmedName.toLowerCase();
	let correctName = lowerName[0].toUpperCase() + lowerName.slice(1);
	return correctName;
}

function checkSpam(str) {
	let lowerStr = str.toLowerCase();
	lowerStr = lowerStr.replace(/viagra/g, "***").replace(/xxx/g, "***");
	return lowerStr;
}
