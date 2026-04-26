/* 🔐 LOGIN SIMPLE */
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadPatients();
  } else {
    document.getElementById("error").textContent = "Accès refusé ❌";
  }
}

/* 🚪 LOGOUT */
function logout() {
  location.reload();
}

/* 📦 STORAGE */
let patients = JSON.parse(localStorage.getItem("patients")) || [];

/* ➕ AJOUT */
function addPatient() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const status = document.getElementById("status").value;

  if (!name || !age) return;

  patients.push({ name, age, status });
  localStorage.setItem("patients", JSON.stringify(patients));

  loadPatients();
}

/* 📋 AFFICHAGE */
function loadPatients() {
  const list = document.getElementById("patientList");
  list.innerHTML = "";

  patients.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} (${p.age}) - ${p.status}`;
    list.appendChild(li);
  });

  updateChart();
}

/* 📊 STATS */
function updateChart() {
  const stats = {
    "En traitement": 0,
    "Guéri": 0,
    "Décédé": 0
  };

  patients.forEach(p => stats[p.status]++);

  const ctx = document.getElementById("chart");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(stats),
      datasets: [{
        data: Object.values(stats),
        backgroundColor: ["blue", "green", "red"]
      }]
    }
  });
}
