const disp = (obj) => console.log(obj);

// window.localStorage.clear();

// function
function removeTask(content) {
	// Remove element:
	const computedStyleAfter = window.getComputedStyle(content, ":after");
	const pseudoWidthAfter =
		parseInt(computedStyleAfter.width ?? 0) +
		parseInt(computedStyleAfter.paddingLeft ?? 0) +
		parseInt(computedStyleAfter.paddingRight ?? 0);

	// Add a click event listener to the input element
	content.addEventListener("click", (e) => {
		// Check if the click occurred on the pseudo-element :after
		if (
			e.offsetX >= content.offsetWidth - pseudoWidthAfter - 11 &&
			e.offsetX <= content.offsetWidth - 10
		) {
			content.remove();
			window.localStorage.setItem("taskList", tasks.innerHTML);
		}

		if (
			window.localStorage.getItem("taskList") === null ||
			window.localStorage.getItem("taskList") === ""
		) {
            window.localStorage.clear();
		}
	});
}

function finishTask(content) {
	// add event at finish task  element:
	const computedStyleBefore = window.getComputedStyle(content, ":before");
	const pseudoWidthBefore = parseInt(computedStyleBefore.width ?? 0);

	// Add a click event listener to the input element
	content.addEventListener("click", (e) => {
		// Check if the click occurred on the pseudo-element :after
		if (
			e.offsetX >= pseudoWidthBefore - 5 &&
			e.offsetX <= pseudoWidthBefore + 6
		) {
			content.classList.toggle("finish");
			window.localStorage.setItem("taskList", tasks.innerHTML);
		}
	});
}

let input_task = document.querySelector(".input");
let input_submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

// focus on an input text box when a webpage reloads:
window.onload = function () {
	input_task.focus();
	tasks.innerHTML = window.localStorage.getItem("taskList");
	let contents = document.querySelectorAll(".tasks div");
	if (contents.length > 0) {
		for (let i = 0; i < contents.length; i++) {
			removeTask(contents[i]);
			finishTask(contents[i]);
		}
	}
};

// Add Task
input_submit.addEventListener("click", function (e) {
	if (input_task.value !== "") {
		let content = document.createElement("div");
		content.setAttribute("class", "content");
		content.style.cssText = "display:block;";
		content.textContent = input_task.value;
		tasks.appendChild(content);

		// local Storage
		window.localStorage.setItem("taskList", tasks.innerHTML);

		// Remove input text
		if ((input_task.value = "")) {
			// focus on an input text box
			input_task.focus();
		} else {
			// focus on an input text box
			input_task.focus();
		}

		// event Remove Task
		removeTask(content);

		// event finish Task
		finishTask(content);
	}
});


// event Delete All Tasks
let delAll = document.querySelector(".del-all");
delAll.addEventListener("click", function (e) {
	window.localStorage.clear();
	tasks.innerHTML = window.localStorage.getItem("taskList");
});
