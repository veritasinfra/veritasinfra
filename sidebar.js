// sidebar.js – VERITAS CI global right-side nav

document.addEventListener("DOMContentLoaded", () => {
  // ---- 1. Define pages (filenames must match repo exactly) ----
  const pages = [
    { name: "Landing / Overview", file: "index.html" },
    { name: "Demo Hub", file: "veritas-demo-hub.html" },
    { name: "Business Dashboard", file: "dashboard.html" },
    { name: "Payroll Batch Simulator", file: "payroll_batch_sim.html" },
    { name: "Audit Explorer", file: "audit_explorer.html" },
    { name: "Compliance Center", file: "compliance_center.html" },
    { name: "NFT Credit Line", file: "veritas-nft-credit-line-borrowing-v2.html" },
    { name: "RWA Tokenization Sim", file: "rwa_tokenization_sim.html" },
    { name: "SEC Audit Log Export", file: "sec_audit_log_exp.html" },
    { name: "NFT CC Viewer", file: "NFTCCviewer.html" },
    { name: "Entity Registration Flow", file: "veritas-entity-registration-flow.html" },
    { name: "Legal Wrapper Demo", file: "veritas_legal_wrapper_demo.html" },
    { name: "Compliance Report", file: "veritas-compliance-report.html" },
    { name: "DAO Governance Vote", file: "veritas-dao-governance-vote-demo.html" },
    { name: "VWP v1", file: "vwp_v1.html" },
    { name: "FAQ", file: "FAQ.html" },
    { name: "FinCEN Briefing", file: "veritas-fincen-briefing.html" },
    { name: "FINRA Briefing", file: "veritas-finra-briefing.html" },
    { name: "IRS Briefing", file: "veritas-irs-briefing.html" }
    // When you rename / fix veritasworkflow_demo, add it here:
    // { name: "Workflow Demo", file: "veritasworkflow_demo.html" }
  ];

  // ---- 2. Determine current page ----
  let currentPage = window.location.pathname.split("/").pop();
  if (!currentPage || currentPage === "") {
    currentPage = "index.html";
  }

  // ---- 3. Build wrapper container ----
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <!-- Desktop right-side nav -->
    <div class="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40">
      <nav class="card-veritas rounded-2xl px-3 py-3 border border-cyan-400/50 bg-slate-950/90 backdrop-blur-lg shadow-xl">
        <div class="text-[0.65rem] uppercase tracking-[0.24em] text-emerald-300/80 text-right mb-2">
          VERITAS CI
        </div>
        <ul id="veritas-sidebar-links-desktop" class="flex flex-col gap-1 max-h-[70vh] overflow-y-auto pr-1"></ul>
      </nav>
    </div>

    <!-- Mobile toggle button (top-right) -->
    <div class="fixed top-4 right-4 z-50 lg:hidden">
      <button
        id="veritas-sidebar-toggle"
        class="rounded-full px-3 py-2 text-xs font-semibold border border-cyan-300/70 bg-slate-900/80 text-cyan-100 shadow-lg backdrop-blur hover:bg-slate-800/80 active:scale-95 transition"
        aria-label="Open VERITAS navigation"
      >
        MENU
      </button>
    </div>

    <!-- Mobile slide-in panel (from right) -->
    <div
      id="veritas-sidebar-mobile"
      class="fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-slate-950/95 border-l border-cyan-400/40 shadow-2xl transform translate-x-full transition-transform duration-200 ease-out z-40 lg:hidden"
    >
      <div class="flex items-center justify-between px-4 pt-4 pb-2 border-b border-slate-800/80">
        <div class="text-[0.65rem] uppercase tracking-[0.24em] text-emerald-300/80">
          VERITAS CI
        </div>
        <button
          id="veritas-sidebar-close"
          class="text-xs text-slate-300 px-2 py-1 rounded-full border border-slate-600/80 hover:bg-slate-800/80 active:scale-95 transition"
        >
          Close
        </button>
      </div>
      <div class="px-3 py-3">
        <ul id="veritas-sidebar-links-mobile" class="flex flex-col gap-1 max-h-[80vh] overflow-y-auto"></ul>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  const desktopList = wrapper.querySelector("#veritas-sidebar-links-desktop");
  const mobileList = wrapper.querySelector("#veritas-sidebar-links-mobile");

  function createLinkItem(page, isDesktop) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = page.file;

    const baseClasses =
      "group flex items-center gap-2 text-[0.7rem] px-2 py-1 rounded-full transition";
    const desktopAlign = isDesktop ? "justify-end" : "justify-start";
    a.className =
      baseClasses +
      " " +
      desktopAlign +
      " text-slate-300/80 hover:text-emerald-300 hover:bg-slate-800/70";

    const indicator = document.createElement("span");
    indicator.className =
      "w-1.5 h-5 rounded-full bg-transparent group-hover:bg-emerald-400/80";

    const label = document.createElement("span");
    label.textContent = page.name;

    if (isDesktop) {
      a.appendChild(label);
      a.appendChild(indicator);
    } else {
      a.appendChild(indicator);
      a.appendChild(label);
    }

    if (page.file === currentPage) {
      a.classList.add("text-emerald-300");
      a.classList.add("bg-slate-900/80");
      indicator.classList.add("bg-emerald-400/90");
    }

    li.appendChild(a);
    return li;
  }

  // ---- 4. Populate both navs ----
  pages.forEach((p) => {
    if (desktopList) desktopList.appendChild(createLinkItem(p, true));
    if (mobileList) mobileList.appendChild(createLinkItem(p, false));
  });

  // ---- 5. Mobile toggle wiring ----
  const mobilePanel = wrapper.querySelector("#veritas-sidebar-mobile");
  const toggleBtn = wrapper.querySelector("#veritas-sidebar-toggle");
  const closeBtn = wrapper.querySelector("#veritas-sidebar-close");

  function openMobile() {
    mobilePanel.classList.remove("translate-x-full");
  }
  function closeMobile() {
    mobilePanel.classList.add("translate-x-full");
  }

  if (toggleBtn) toggleBtn.addEventListener("click", openMobile);
  if (closeBtn) closeBtn.addEventListener("click", closeMobile);

  if (mobileList) {
    mobileList.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a" || e.target.closest("a")) {
        closeMobile();
      }
    });
  }
});
