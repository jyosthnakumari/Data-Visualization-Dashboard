// script.js

let data = [];

// Function to add data dynamically
function addData() {
    const category = document.getElementById("category").value;
    const value = parseFloat(document.getElementById("value").value);

    if (category && !isNaN(value)) {
        data.push({ category, value });
        updateTable();
        updateBarChart();
        updatePieChart();
    } else {
        alert("Please enter valid data.");
    }
}

// Function to update data table
function updateTable() {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // Clear previous data

    data.forEach(item => {
        const row = `<tr>
            <td>${item.category}</td>
            <td>${item.value}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to update bar chart
function updateBarChart() {
    const barChart = document.getElementById("barChart");
    barChart.innerHTML = ""; // Clear previous data

    const maxValue = Math.max(...data.map(d => d.value), 100); // Normalize to 100
    data.forEach(item => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${(item.value / maxValue) * 100}%`;
        bar.innerText = item.value;
        barChart.appendChild(bar);
    });
}

// Function to update pie chart
function updatePieChart() {
    const pieChart = document.getElementById("pieChart");
    pieChart.innerHTML = ""; // Clear previous data

    let total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;

    data.forEach(item => {
        let slice = document.createElement("div");
        slice.classList.add("pieSlice");
        let sliceAngle = (item.value / total) * 360;

        // Rotate and set color
        slice.style.transform = `rotate(${startAngle}deg)`;
        slice.style.background = getRandomColor();
        startAngle += sliceAngle;

        pieChart.appendChild(slice);
    });
}

// Function to generate random colors
function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}
