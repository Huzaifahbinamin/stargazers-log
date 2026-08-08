const statusMessage = document.querySelector("#status-message");
const list = document.querySelector("#starred");

async function loadStarredRepos() {
  try {
    statusMessage.textContent = "Loading starred repositories...";
    statusMessage.className = "status";

    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(
        `Unable to load events.json: ${response.status} ${response.statusText}`,
      );
    }

    const events = await response.json();
    if (!Array.isArray(events)) {
      throw new Error(
        "Invalid data format: expected an array of starred repositories.",
      );
    }

    renderStarredRepos(events);
  } catch (error) {
    renderError(
      error.message ||
        "An unexpected error occurred while loading starred repositories.",
    );
  }
}

function renderStarredRepos(events) {
  list.innerHTML = "";

  if (events.length === 0) {
    statusMessage.textContent = "No starred repositories found.";
    return;
  }

  statusMessage.textContent = "";

  events.forEach((event) => {
    const name = event.name || "Unknown repository";
    const starred = event.starred || "Unknown date";

    const item = document.createElement("li");
    item.textContent = `${name} - starred ${starred}`;
    list.appendChild(item);
  });
}

function renderError(message) {
  list.innerHTML = "";
  statusMessage.textContent = message;
  statusMessage.className = "status error";
}

loadStarredRepos();
