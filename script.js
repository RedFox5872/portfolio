// --- Mock Customer-Level Data ---
const customers = [
    { name: "Acme Corp", usage: 85, supportTickets: 2, paymentScore: 90, renewal: "March 3, 2026" },
    { name: "BrightTech", usage: 60, supportTickets: 6, paymentScore: 75, renewal: "March 8, 2026" },
    { name: "North Digital", usage: 45, supportTickets: 8, paymentScore: 65, renewal: "March 15, 2026" }
];

// --- SaaS Financial Metrics ---
const financials = {
    mrr: 125000,
    churnRate: 4.2,
    expansionRevenue: 18000,
    monthlyRevenue: [90000, 95000, 100000, 110000, 120000, 125000]
};

// --- Health Score Formula ---
function calculateHealth(usage, supportTickets, paymentScore) {
    let score = (usage * 0.5) + (paymentScore * 0.3) - (supportTickets * 2);
    return Math.max(Math.min(Math.round(score), 100), 0);
}

// --- Populate Financial Metrics ---
document.getElementById("mrr").textContent =
    "$" + financials.mrr.toLocaleString();

document.getElementById("churn").textContent =
    financials.churnRate + "%";

document.getElementById("expansion").textContent =
    "$" + financials.expansionRevenue.toLocaleString();

// --- Revenue Chart ---
const ctx = document.getElementById("revenueChart").getContext("2d");

new Chart(ctx, {
    type: "line",
    data: {
        labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [{
            label: "Monthly Revenue",
            data: financials.monthlyRevenue,
            borderColor: "#4CAF50",
            fill: false,
            tension: 0.2
        }]
    }
});

// --- Calculate Overall Health ---
let totalHealth = 0;

customers.forEach(customer => {
    customer.health = calculateHealth(
        customer.usage,
        customer.supportTickets,
        customer.paymentScore
    );
    totalHealth += customer.health;
});

const averageHealth = Math.round(totalHealth / customers.length);

const healthElement = document.getElementById("health");
healthElement.textContent = averageHealth + "/100";

// --- Color Indicator ---
if (averageHealth < 60) {
    healthElement.style.color = "red";
} else if (averageHealth < 75) {
    healthElement.style.color = "orange";
} else {
    healthElement.style.color = "green";
}

// --- Upcoming Renewals with Risk Label ---
const renewalList = document.getElementById("renewalList");

customers.forEach(customer => {
    const li = document.createElement("li");

    let riskLabel = "";
    if (customer.health < 60) {
        riskLabel = "🔴 High Risk";
    } else if (customer.health < 75) {
        riskLabel = "🟡 Moderate Risk";
    } else {
        riskLabel = "🟢 Healthy";
    }

    li.textContent = `${customer.name} - Renewal: ${customer.renewal} - ${riskLabel}`;
    renewalList.appendChild(li);
});
