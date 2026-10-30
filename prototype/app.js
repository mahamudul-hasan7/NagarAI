/* NagarAI Prototype Logic */

const presets = {
    pothole: {
        category: "Roads & Footpaths",
        severity: "HIGH",
        confidence: "95.8%",
        ward: "Ward 15, Dhanmondi",
        desc: "রাস্তার ওপর বিশাল গর্তের সৃষ্টি হয়েছে। বৃষ্টির পানি জমে রিকশা উল্টে যাচ্ছে।",
        lat: 23.7538,
        lng: 90.3758,
        sevColor: "text-amber-400"
    },
    garbage: {
        category: "Waste Management",
        severity: "MEDIUM",
        confidence: "97.2%",
        ward: "Ward 07, Mirpur",
        desc: "প্রধান সড়কের পাশে ময়লার স্তূপ জমে তীব্র দুর্গন্ধ ছড়াচ্ছে এবং রাস্তা বন্ধ হয়ে আছে।",
        lat: 23.8069,
        lng: 90.3687,
        sevColor: "text-blue-400"
    },
    drain: {
        category: "Drainage & Sewerage",
        severity: "HIGH",
        confidence: "93.4%",
        ward: "Ward 01, Uttara",
        desc: "ড্রেনের মুখ বন্ধ থাকায় সামান্য বৃষ্টিতেই রাস্তায় হাঁটু পানি জমে যাচ্ছে।",
        lat: 23.8722,
        lng: 90.3986,
        sevColor: "text-amber-400"
    },
    wire: {
        category: "Electric & Power Hazard",
        severity: "CRITICAL",
        confidence: "98.9%",
        ward: "Ward 20, Mohakhali",
        desc: "ট্রান্সফরমারের তার ছিঁড়ে ফুটপাতে পড়ে আছে। যেকোনো সময় বড় দুর্ঘটনা ঘটতে পারে!",
        lat: 23.7776,
        lng: 90.4054,
        sevColor: "text-rose-400"
    }
};

let incidents = [
    { id: "NA-9021", type: "Pothole / Road Cavity", ward: "Ward 15", severity: "HIGH", status: "IN_PROGRESS", statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { id: "NA-9020", type: "Illegal Waste Dump", ward: "Ward 07", severity: "MEDIUM", status: "ASSIGNED", statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { id: "NA-9019", type: "Broken Streetlamp", ward: "Ward 12", severity: "LOW", status: "RESOLVED", statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { id: "NA-9018", type: "Water Pipe Leak", ward: "Ward 19", severity: "HIGH", status: "RESOLVED", statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" }
];

function renderTable() {
    const tbody = document.getElementById("incidentTableBody");
    tbody.innerHTML = incidents.map(item => `
        <tr class="hover:bg-slate-800/40 transition">
            <td class="py-3 px-3 font-mono font-medium text-emerald-400">${item.id}</td>
            <td class="py-3 px-3">${item.type}</td>
            <td class="py-3 px-3 text-slate-400">${item.ward}</td>
            <td class="py-3 px-3 font-semibold ${item.severity === 'CRITICAL' ? 'text-rose-400' : item.severity === 'HIGH' ? 'text-amber-400' : 'text-slate-300'}">${item.severity}</td>
            <td class="py-3 px-3">
                <span class="px-2 py-0.5 rounded text-[11px] font-medium border ${item.statusColor}">
                    ${item.status}
                </span>
            </td>
        </tr>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    renderTable();

    const presetSelect = document.getElementById("presetSelect");
    const descInput = document.getElementById("descInput");
    const locationText = document.getElementById("locationText");
    const submitBtn = document.getElementById("submitBtn");
    const aiResult = document.getElementById("aiResult");

    presetSelect.addEventListener("change", (e) => {
        const item = presets[e.target.value];
        if (item) {
            descInput.value = item.desc;
            locationText.innerText = `GPS: ${item.lat}° N, ${item.lng}° E (${item.ward})`;
        }
    });

    submitBtn.addEventListener("click", () => {
        const key = presetSelect.value;
        const data = presets[key];

        // Animate button
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i><span>Analyzing with NagarAI Vision...</span>`;
        submitBtn.disabled = true;

        setTimeout(() => {
            // Update AI result card
            document.getElementById("aiConfidence").innerText = `${data.confidence} Confidence`;
            document.getElementById("aiCategory").innerText = data.category;
            const sevEl = document.getElementById("aiSeverity");
            sevEl.innerText = data.severity;
            sevEl.className = `font-semibold text-sm mt-0.5 ${data.sevColor}`;

            aiResult.classList.remove("hidden");

            // Prepend new incident to table
            const newTicketNum = Math.floor(1000 + Math.random() * 9000);
            incidents.unshift({
                id: `NA-${newTicketNum}`,
                type: data.category,
                ward: data.ward.split(",")[0],
                severity: data.severity,
                status: "ASSIGNED",
                statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
            });

            renderTable();

            // Increment stat counter
            const statTotal = document.getElementById("statTotal");
            statTotal.innerText = parseInt(statTotal.innerText) + 1;

            submitBtn.innerHTML = `<i class="fa-solid fa-check"></i><span>Triage Complete & Ticket Dispatched</span>`;
            setTimeout(() => {
                submitBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i><span>Run NagarAI Instant Triage</span>`;
                submitBtn.disabled = false;
            }, 2000);

        }, 800);
    });
});
