// Mock SaaS Data
const data = {
    mrr: 125000,
    churnRate: 4.2,
    expansionRevenue: 18000,
    healthScore: 82,
    monthlyRevenue: [90000, 95000, 100000, 110000, 120000, 125000],
    renewals: [
        { name: "Acme Corp", date: "March 3, 2026" },
        { name: "BrightTech", date: "March 8, 2026" },
        { name: "North Digital", date: "March 15, 2026" }
    ]
};

// Populate Metrics
document.getElementById("mrr").textContent = "$" + data.mrr.toLocaleString();
document.getElementById("churn").textContent = data.churnRate + "%";
document.getElementById("expansion").textContent = "$" + data.expansionRevenue.toLocaleString();
document.getElementById("health").textContent = data.healthScore + "/100";

// Revenue Chart
const ctx = document.getElementById("revenueChart").getContext("2d");

new Chart(ctx, {
    type: "line",
    data: {
        labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [{
            label: "Monthly Revenue",
            data: data.monthlyRevenue,
            borderColor: "#4CAF50",
            fill: false,
            tension: 0.1
        }]
    }
});

// Upcoming Renewals
const renewalList = document.getElementById("renewalList");

data.renewals.forEach(customer => {
    const li = document.createElement("li");
    li.textContent = `${customer.name} - Renewal: ${customer.date}`;
    renewalList.appendChild(li);
});
