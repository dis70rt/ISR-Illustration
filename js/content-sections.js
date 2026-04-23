// content-sections.js — injects case study, economics, and references into the page

export function injectContentSections() {
  const target = document.getElementById('content-continuation');
  if (!target) return;

  target.innerHTML = `

    <!-- ══ CASE STUDY ══ -->
    <section class="content-section" id="case-study">
      <h2>Case study: salt mining in Austria</h2>
      <p>Austria has been mining salt for about 7,000 years. The Salzkammergut region, which literally translates to "salt estate," grew wealthy on the stuff long before anyone thought to write the history down. Today the country still produces around 1.2 million tonnes of high purity evaporated salt each year, almost entirely through solution mining. One company, Salinen Austria AG, handles the entire operation.</p>

      <h3>Active mining sites</h3>
      <p>Extraction is concentrated at three sites in the Salzkammergut:</p>
      <ul>
        <li><strong>Altaussee</strong> produces roughly 400,000 tonnes per year, making it Austria's largest active mine. It runs large scale brine extraction alongside some traditional rock salt operations.</li>
        <li><strong>Hallstatt</strong> is home to the oldest known salt mine in the world. Modern operations use borehole probes reaching depths of about 120 metres.</li>
        <li><strong>Bad Ischl</strong> is the third production site feeding into the central processing network.</li>
      </ul>

      <h3>The borehole probe method</h3>
      <p>Extraction in the Austrian Alps uses what the locals call "wet mining," technically the borehole probe method. It was developed specifically for the Haselgebirge Formation, a messy geological mixture of salt, clay, mud, and gypsum. You cannot dry mine this stuff because you would bring up mostly dirt.</p>
      <p>The process works like this: a borehole is drilled into the salt deposit, sometimes reaching 400 metres deep. High pressure fresh water is injected through the borehole, dissolving the salt at the ceiling of an underground cavern. The resulting saturated brine (approximately 26% NaCl by weight) sinks to the bottom and is pumped back to the surface. Insoluble residues like clay and gypsum settle at the bottom of the cavern naturally.</p>

      <button class="expand-btn" id="btn-expand-casestudy" onclick="toggleExpand('casestudy-detail')">Show full production process</button>

      <div class="expandable" id="casestudy-detail">
        <h3>The brine pipeline</h3>
        <p>Austria operates the oldest active pipeline in the world, originally built in 1595. It spans roughly 60 kilometres, connecting the mines at Hallstatt, Altaussee, and Bad Ischl to the central saltworks at Ebensee. The original version used wooden pipes. The modern replacement does the same job with considerably less maintenance.</p>
        <p>At the Ebensee saltworks, raw brine goes through a two stage purification process (the Schweizerhalle Process) to strip out magnesium and calcium impurities. After that, vacuum evaporation crystallizes the salt to 99.9% NaCl purity.</p>

        <h3>Environmental management</h3>
        <p>The switch from dry mining to solution mining happened partly for safety and partly for environmental reasons. Subsidence is monitored continuously to prevent cavern collapse, which was a real problem in older salt districts. Excessive saltwater release into local waterways is tightly controlled because it can cause permanent layering (ectogenic meromixis) in nearby lakes like Lake Hallstatt.</p>
        <p>Salinen Austria AG compresses processing residues such as magnesium hydroxide and limestone, then pumps them back into abandoned caverns. This maintains geological stability and keeps the waste out of surface environments.</p>

        <h3>Hydrogen storage research</h3>
        <p>Depleted salt caverns are being studied for underground hydrogen storage (UHS). Salt caverns are attractive for this purpose because they are impermeable and chemically inert. Austria aims for 1 GW of electrolysis capacity by 2030, and existing Salzkammergut caverns are being assessed for conversion from natural gas storage to pure hydrogen storage. Research at Montanuniversität Leoben focuses on the self healing property of salt (viscoplastic creep), which lets these underground voids remain structurally sound over decades.</p>
      </div>
    </section>

    <!-- ══ ECONOMICS ══ -->
    <section class="content-section" id="economics">
      <h2>Mining economics</h2>
      <p>The economics of solution mining and conventional room and pillar mining are fundamentally different businesses. One is capital light but energy heavy. The other is capital heavy but energy cheap. Knowing when each method makes sense comes down to geology, depth, available workforce, and local energy prices.</p>

      <h3>When to use which method</h3>
      <div class="econ-grid">
        <div class="econ-card">
          <h4>Solution mining works best when:</h4>
          <ul>
            <li>The deposit sits deeper than about 1,000 metres</li>
            <li>The target mineral dissolves readily (salt, potash)</li>
            <li>You want to minimize underground labor</li>
            <li>Environmental regulations are strict</li>
          </ul>
        </div>
        <div class="econ-card">
          <h4>Conventional mining works best when:</h4>
          <ul>
            <li>The deposit is shallow and accessible</li>
            <li>You need very high production volumes</li>
            <li>The ore is hard rock that will not dissolve</li>
            <li>Water supply is limited or unavailable</li>
          </ul>
        </div>
      </div>

      <h3>Real world comparison</h3>
      <div class="econ-grid">
        <div class="econ-card">
          <h4>Compass Minerals, Goderich Mine (Ontario)</h4>
          <p>The largest underground salt mine in the world, 1,800 feet beneath Lake Huron. Uses room and pillar method with continuous mining machines cutting through pure rock salt veins. It operates like a subterranean city with heavy machinery, explosives, conveyor belts, and a large underground workforce.</p>
        </div>
        <div class="econ-card">
          <h4>Salinen Austria (Austrian Alps)</h4>
          <p>Salt mixed with clay, mud, and gypsum in the Haselgebirge formation. Dry mining would bring up mostly dirt. Instead, fresh water is pumped down through boreholes. Water dissolves only the salt, leaving the rock matrix underground. The heavy brine comes back to the surface and goes through vacuum evaporation to produce pure salt crystals.</p>
        </div>
      </div>

      <h3>CAPEX vs OPEX</h3>
      <p><strong>Capital expenditure:</strong> Dry mining has a massive upfront cost. Sinking a reinforced shaft, installing ventilation and hoisting systems, buying tunneling equipment: hundreds of millions of dollars, years before any product ships. Solution mining skips the underground infrastructure. Drilling wells and laying pipeline is far cheaper. But you need an advanced surface processing plant with thermal evaporators and centrifuges, so the CAPEX burden shifts rather than disappears.</p>
      <p><strong>Operating expenditure:</strong> Dry mining costs are dominated by labor, safety protocols, and machinery maintenance. Energy cost per tonne is low because you are physically breaking and moving rock. Solution mining is the opposite: almost zero underground labor, minimal maintenance, but enormous thermal energy costs. Boiling off millions of gallons of water to crystallize salt requires a lot of natural gas or electricity. Profitability of a solution mine is directly tied to local energy pricing.</p>

      <h3>Product margins</h3>
      <p>This is the real differentiator. Dry mining produces rock salt at roughly 95% purity. It is a bulk commodity sold for road de icing and basic industrial use. High volume, low margin. Solution mining produces vacuum salt at 99.9% purity. That commands premium pricing for food grade table salt, pharmaceutical grade salt for medical IVs, and high purity chemical feedstocks.</p>

      <h3>Formula comparison</h3>
      <table class="formula-table">
        <thead>
          <tr><th>Parameter</th><th>Solution mining</th><th>Room &amp; pillar</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Core extraction</td>
            <td>\\(m = \\rho \\times V \\times C\\)<br>\\(V = Q_{in} \\times t \\times E_{dissolution}\\)</td>
            <td>\\(e = 1 - \\frac{w_p \\cdot l_p}{(w_p + w_r)(l_p + w_r)}\\)<br>\\(\\sigma_p = \\frac{\\sigma_v}{1 - e}\\)</td>
          </tr>
          <tr>
            <td>Production rate (P)</td>
            <td>\\(P = Q \\times C\\)</td>
            <td>\\(P = A_e \\times h \\times \\rho \\times E_f\\)</td>
          </tr>
          <tr>
            <td>CAPEX</td>
            <td>\\(C_{drill} + C_{pump} + C_{surface} + C_{pipeline}\\)</td>
            <td>\\(C_{dev} + C_{equip} + C_{vent} + C_{convey} + C_{surface}\\)</td>
          </tr>
          <tr>
            <td>OPEX</td>
            <td>\\(Power + Water + Labor + Maintenance\\)</td>
            <td>\\(Labor + Consumables + Power + Maintenance\\)</td>
          </tr>
          <tr>
            <td>Revenue</td>
            <td>\\(Production \\times MarketPrice\\)</td>
            <td>\\(Production \\times Grade \\times Recovery \\times MarketPrice\\)</td>
          </tr>
          <tr>
            <td>NPV</td>
            <td colspan="2">\\(NPV = \\sum_{t=1}^{n} \\frac{CashFlow_t}{(1+r)^t} - CAPEX\\)</td>
          </tr>
        </tbody>
      </table>

      <h3>Economic data for Upper Austria</h3>
      <p>The salt extraction sector in Austria has an estimated market size of about €20.8 million as of 2026, with projected annual revenue growth of roughly 3.5%. While total salt exports are a tiny fraction of merchandise exports (around 0.004%), the mining industry as a whole generates about 25% of Austria's total revenue. Salt related tourism at Hallstatt and Altaussee creates additional indirect value through local services.</p>
    </section>

    <!-- ══ REFERENCES ══ -->
    <section class="content-section" id="references">
      <h2>References</h2>
      <ul class="ref-list">
        <li>[1] Salinen Austria AG, "Salt production and brine extraction." <a href="https://www.salinen.com" target="_blank">salinen.com</a></li>
        <li>[2] Serra Salt Machinery, "Salt production through solution mining." <a href="https://www.serrasalt.com" target="_blank">serrasalt.com</a></li>
        <li>[3] Montanuniversität Leoben, "Comprehensive characterization of rock salt from the Haselgebirge." <a href="https://www.unileoben.ac.at" target="_blank">unileoben.ac.at</a></li>
        <li>[4] ResearchGate, "Ectogenic meromixis of Lake Hallstättersee." <a href="https://www.researchgate.net" target="_blank">researchgate.net</a></li>
        <li>[5] ResearchGate, "Prehistoric salt mining in Hallstatt, Austria." <a href="https://www.researchgate.net" target="_blank">researchgate.net</a></li>
        <li>[6] Millennial Potash, "A proven solution mining method." <a href="https://millennialpotash.com/project" target="_blank">millennialpotash.com</a></li>
        <li>[7] LTW Intralogistics, "Salt production in Austria." <a href="https://www.ltw.at" target="_blank">ltw.at</a></li>
        <li>[8] Wiley Online Library, "Underground hydrogen storage in salt caverns." <a href="https://onlinelibrary.wiley.com" target="_blank">wiley.com</a></li>
        <li>[9] ScienceDirect, "Levelised cost of hydrogen from salt cavern storage." <a href="https://www.sciencedirect.com" target="_blank">sciencedirect.com</a></li>
        <li>[10] AZoMining, "Salt industry economic data." <a href="https://www.azomining.com" target="_blank">azomining.com</a></li>
        <li>[11] CPHI Online, "Salinen Austria AG industry profile." <a href="https://www.cphi-online.com" target="_blank">cphi-online.com</a></li>
      </ul>
    </section>
  `;

  // Re-trigger MathJax on injected content
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise();
  }
}

// Toggle expandable sections
window.toggleExpand = function(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('open');
  const btn = document.getElementById('btn-expand-casestudy');
  if (btn) {
    btn.textContent = el.classList.contains('open') ? 'Hide details' : 'Show full production process';
  }
};
