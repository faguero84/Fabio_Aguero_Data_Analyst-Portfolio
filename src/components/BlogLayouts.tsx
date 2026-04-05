import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  BarChart2, 
  Database, 
  Code, 
  Zap, 
  Filter, 
  Clock, 
  Variable, 
  Search, 
  Trash2, 
  RefreshCw, 
  Type, 
  Copy, 
  AlertCircle,
  Layers,
  Cloud,
  Server,
  Monitor,
  Workflow,
  Cpu,
  Table,
  Lock,
  Calendar
} from 'lucide-react';

// --- DAX Cheat Sheet ---

export const DaxLayout = () => {
  const sections = [
    {
      title: "AGREGACIÓN BÁSICA",
      items: [
        { name: "SUM()", desc: "Suma todos los valores de una columna.", code: "Total Ventas = SUM( Ventas[Monto] )" },
        { name: "AVERAGE()", desc: "Promedio de los valores de una columna.", code: "Ticket Promedio = AVERAGE( Ventas[Monto] )" },
        { name: "MIN() / MAX()", desc: "Valor mínimo o máximo de una columna.", code: "Min Precio = MIN( Ventas[Precio] )" },
        { name: "COUNT() / COUNTROWS()", desc: "COUNT cuenta celdas no vacías. COUNTROWS cuenta filas.", code: "Num Pedidos = COUNTROWS( Ventas )" },
        { name: "DISTINCTCOUNT()", desc: "Cuenta valores únicos. Ideal para clientes únicos.", code: "Clientes Únicos = DISTINCTCOUNT( Ventas[ID_Cliente] )" },
        { name: "DIVIDE()", desc: "División segura. Evita error si el denominador es cero.", code: "Margen % = DIVIDE( [Utilidad], [Ventas] )" },
      ]
    },
    {
      title: "CALCULATE Y CONTEXTO",
      items: [
        { name: "CALCULATE()", desc: "La función más importante. Modifica el contexto de filtro.", code: "Ventas 2023 = CALCULATE( [Ventas], Anio[Anio] = 2023 )" },
        { name: "ALL()", desc: "Elimina todos los filtros. Clave para % del total.", code: "% Total = DIVIDE( [Ventas], CALCULATE( [Ventas], ALL( Ventas ) ) )" },
        { name: "ALLEXCEPT()", desc: "Elimina filtros EXCEPTO las columnas especificadas.", code: "Ventas Categ = CALCULATE( [Ventas], ALLEXCEPT( Ventas, Ventas[Categoria] ) )" },
        { name: "ALLSELECTED()", desc: "Respeta filtros de slicers pero ignora contexto visual.", code: "Ventas Slicer = CALCULATE( [Ventas], ALLSELECTED() )" },
        { name: "FILTER()", desc: "Devuelve una tabla filtrada. Para condiciones complejas.", code: "Ventas VIP = CALCULATE( [Ventas], FILTER( Clientes, [Ventas] > 1000 ) )" },
      ]
    },
    {
      title: "ITERADORES (X)",
      items: [
        { name: "SUMX()", desc: "Itera fila a fila, calcula expresión y suma.", code: "Ingreso Total = SUMX( Ventas, Ventas[Cantidad] * Ventas[Precio] )" },
        { name: "MAXX() / MINX()", desc: "Máximo/mínimo de una expresión evaluada fila a fila.", code: "Max Venta = MAXX( Ventas, [Monto] )" },
        { name: "AVERAGEX()", desc: "Promedio de una expresión calculada fila a fila.", code: "Prom Venta = AVERAGEX( Ventas, [Monto] )" },
        { name: "RANKX()", desc: "Rankea elementos según una expresión.", code: "Ranking = RANKX( ALL( Productos ), [Ventas] )" },
        { name: "TOPN()", desc: "Devuelve los N primeros registros según criterio.", code: "Top 5 = CALCULATE( [Ventas], TOPN( 5, Productos, [Ventas] ) )" },
      ]
    },
    {
      title: "TIME INTELLIGENCE",
      items: [
        { name: "DATEADD()", desc: "Desplaza un período en el tiempo. Versátil.", code: "Ventas Mes Ant = CALCULATE( [Ventas], DATEADD( Calendario[Fecha], -1, MONTH ) )" },
        { name: "SAMEPERIODLASTYEAR()", desc: "Shortcut de DATEADD -1 YEAR. Para YoY.", code: "Ventas LY = CALCULATE( [Ventas], SAMEPERIODLASTYEAR( Calendario[Fecha] ) )" },
        { name: "TOTALYTD()", desc: "Acumulado desde inicio del año.", code: "Ventas YTD = TOTALYTD( [Ventas], Calendario[Fecha] )" },
        { name: "DATESINPERIOD()", desc: "Ventana móvil de N días/meses.", code: "Prom 30d = AVERAGEX( DATESINPERIOD( Calendario[Fecha], LASTDATE( Calendario[Fecha] ), -30, DAY ), [Ventas] )" },
      ]
    }
  ];

  return (
    <div className="bg-[#08090d] text-white p-8 rounded-2xl font-manrope overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0b429]/10 blur-[100px] rounded-full -mr-32 -mt-32" />
      
      <div className="flex justify-between items-end mb-12 relative z-10">
        <div>
          <span className="text-[#f0b429] font-bebas text-2xl tracking-widest uppercase mb-2 block">Power BI · DAX</span>
          <h1 className="text-6xl font-bebas tracking-tighter leading-none">POWER BI DAX</h1>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Medidas más usadas</p>
          <p className="text-slate-400 text-xs">Sintaxis y casos de uso</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#12141a] border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-[#f0b429] font-bebas text-xl tracking-widest mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#f0b429] rounded-full" />
              {section.title}
            </h2>
            <div className="space-y-6">
              {section.items.map(item => (
                <div key={item.name} className="group">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors">{item.name}</h3>
                  </div>
                  <p className="text-slate-400 text-sm mb-2 leading-snug">{item.desc}</p>
                  <div className="bg-black/40 rounded-lg p-3 font-mono text-xs text-[#f0b429]/90 border border-white/5 group-hover:border-[#f0b429]/30 transition-all">
                    {item.code}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Tableau Ecosystem ---

export const TableauLayout = () => {
  const tools = [
    { name: "Tableau Prep Builder", role: "Visual ETL", desc: "Data cleaning, transformation, and combining sources.", icon: <RefreshCw className="w-6 h-6" /> },
    { name: "Tableau Desktop", role: "Authoring", desc: "Creating visualizations, dashboards, and exploratory analysis.", icon: <Monitor className="w-6 h-6" /> },
    { name: "Tableau Server", role: "On-Premise", desc: "Platform for publishing, sharing, and governing content.", icon: <Server className="w-6 h-6" /> },
    { name: "Tableau Cloud", role: "SaaS", desc: "Salesforce-hosted version. No infrastructure to manage.", icon: <Cloud className="w-6 h-6" /> },
    { name: "Tableau Bridge", role: "Connectivity", desc: "Agent that connects Tableau Cloud to private data sources.", icon: <Zap className="w-6 h-6" /> },
    { name: "Tableau Public", role: "Community", desc: "Free platform for sharing visualizations publicly.", icon: <Layers className="w-6 h-6" /> },
  ];

  const dataManagement = [
    { name: "Tableau Catalog", desc: "Data discovery, lineage, and impact analysis.", icon: <Search className="w-5 h-5" /> },
    { name: "Prep Conductor", desc: "Flow orchestration and scheduling for Tableau Prep.", icon: <Workflow className="w-5 h-5" /> },
    { name: "Virtual Connections", desc: "Centralized data abstraction and security layer.", icon: <Database className="w-5 h-5" /> },
  ];

  const advancedFeatures = [
    { name: "Tableau Pulse", desc: "AI-powered metrics experience for business users.", icon: <Zap className="w-5 h-5" /> },
    { name: "Einstein Discovery", desc: "Automated ML engine for predictive analytics.", icon: <Cpu className="w-5 h-5" /> },
    { name: "TabPy / Rserve", desc: "Python and R integration for advanced modeling.", icon: <Code className="w-5 h-5" /> },
    { name: "Viz Extensions", desc: "Custom chart types using D3.js or Vega-Lite.", icon: <BarChart2 className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-[#0f172a] text-slate-100 rounded-2xl overflow-hidden border border-slate-800 font-dm-sans">
      {/* Hero */}
      <header className="p-12 border-b border-slate-800 bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="relative z-10">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Tableau Stack · Architecture · Guide</span>
          <h1 className="text-5xl font-dm-serif italic mb-6 leading-tight">The Tableau ecosystem<br />explained end to end</h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            A complete guide to the tools, infrastructure flows, and architecture decisions of the Tableau stack — from Prep all the way to Cloud.
          </p>
        </div>
      </header>

      <div className="p-10 space-y-20">
        {/* Tools Grid */}
        <section>
          <h2 className="text-2xl font-dm-serif italic mb-8 flex items-center gap-3">
            <Layers className="w-6 h-6 text-primary" />
            Core Ecosystem Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, idx) => (
              <motion.div 
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl hover:bg-slate-800 transition-all group"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">{tool.icon}</div>
                <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">{tool.role}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Infrastructure Flows */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-dm-serif italic mb-10 flex items-center gap-3">
            <Workflow className="w-6 h-6 text-primary" />
            Infrastructure Flows
          </h2>
          <div className="grid grid-cols-1 gap-10">
            {[
              { label: "Classic Local Analysis", flow: ["Local DB", "Prep", "Desktop", ".twbx"] },
              { label: "Enterprise Server Deployment", flow: ["Data Warehouse", "Prep", "Desktop", "Server"] },
              { label: "Cloud Native Architecture", flow: ["Snowflake/BQ", "Desktop", "Cloud"] },
              { label: "Hybrid Cloud Connectivity", flow: ["On-Prem DB", "Bridge", "Cloud"] },
            ].map((item) => (
              <div key={item.label} className="relative">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-5">{item.label}</p>
                <div className="flex flex-wrap items-center gap-4">
                  {item.flow.map((step, sIdx) => (
                    <React.Fragment key={step}>
                      <div className="bg-slate-800 px-5 py-2.5 rounded-lg text-sm font-medium border border-slate-700 shadow-sm">
                        {step}
                      </div>
                      {sIdx < item.flow.length - 1 && (
                        <div className="flex items-center text-slate-600">
                          <Zap className="w-4 h-4" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Management & Advanced Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <h2 className="text-2xl font-dm-serif italic mb-8 flex items-center gap-3">
              <Database className="w-6 h-6 text-primary" />
              Data Management
            </h2>
            <div className="space-y-4">
              {dataManagement.map(item => (
                <div key={item.name} className="bg-slate-800/30 border border-slate-700/30 p-5 rounded-xl flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-dm-serif italic mb-8 flex items-center gap-3">
              <Cpu className="w-6 h-6 text-primary" />
              Advanced Features
            </h2>
            <div className="space-y-4">
              {advancedFeatures.map(item => (
                <div key={item.name} className="bg-slate-800/30 border border-slate-700/30 p-5 rounded-xl flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Comparison Table */}
        <section>
          <h2 className="text-2xl font-dm-serif italic mb-8">Server vs. Cloud Comparison</h2>
          <div className="overflow-x-auto border border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Feature</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tableau Server</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tableau Cloud</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { f: "Hosting", s: "On-premise / Private Cloud", c: "Salesforce Managed (SaaS)" },
                  { f: "Updates", s: "Manual (IT Admin)", c: "Automatic (Continuous)" },
                  { f: "Scalability", s: "Hardware dependent", c: "Auto-scaling" },
                  { f: "Authentication", s: "AD, SAML, Kerberos", c: "SAML, OpenID, TableauID" },
                  { f: "Maintenance", s: "High (OS, DB, Backups)", c: "Zero (Managed)" },
                ].map(row => (
                  <tr key={row.f} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-6 text-sm font-bold">{row.f}</td>
                    <td className="py-4 px-6 text-sm text-slate-400">{row.s}</td>
                    <td className="py-4 px-6 text-sm text-slate-400">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <footer className="p-8 border-t border-slate-800 bg-slate-900/30 flex justify-between items-center text-[10px] text-slate-500 tracking-widest uppercase">
        <div>Tableau Ecosystem · Architecture Guide</div>
        <div>Data Portfolio · 2026</div>
      </footer>
    </div>
  );
};

// --- LOD Expressions Cheat Sheet ---

export const LODLayout = () => {
  const syntax = [
    {
      type: "FIXED",
      color: "#e85d4a",
      glow: "rgba(232,93,74,0.15)",
      desc: "Calcula el valor usando las dimensiones especificadas, ignorando completamente las dimensiones de la visualización y los filtros de dimensión.",
      syntax: "{ FIXED [Dimensión] : AGG([Medida]) }",
      example: "{ FIXED [Customer ID] : MIN([Order Date]) }",
      behavior: "Ignora filtros de dimensión · Respeta context filters"
    },
    {
      type: "INCLUDE",
      color: "#4ac4e8",
      glow: "rgba(74,196,232,0.15)",
      desc: "Calcula usando las dimensiones de la viz más las dimensiones especificadas. Granularidad más fina que la visualización.",
      syntax: "{ INCLUDE [Dimensión] : AGG([Medida]) }",
      example: "{ INCLUDE [Order ID] : SUM([Sales]) }",
      behavior: "Granularidad mayor a la viz · Luego se reagrega"
    },
    {
      type: "EXCLUDE",
      color: "#7de87a",
      glow: "rgba(125,232,122,0.15)",
      desc: "Calcula removiendo dimensiones de la viz. Útil para totales, porcentajes y comparaciones con valores globales.",
      syntax: "{ EXCLUDE [Dimensión] : AGG([Medida]) }",
      example: "{ EXCLUDE [Region] : SUM([Sales]) }",
      behavior: "Granularidad menor a la viz · Para totales globales"
    }
  ];

  const examples = [
    {
      id: "01",
      title: "Customer Order Frequency",
      type: "FIXED",
      color: "#e85d4a",
      question: "¿Cuántos clientes hicieron 1 orden, 2 órdenes, 3 órdenes…?",
      code: "{ FIXED [Customer ID] : COUNTD([Order ID]) }",
      insight: "Convierte una medida en dimensión para poder hacer un histograma sobre ella."
    },
    {
      id: "02",
      title: "Cohort Analysis",
      type: "FIXED",
      color: "#e85d4a",
      question: "¿Los clientes más antiguos generan más ventas? Agrupa por año de primera compra.",
      code: "{ FIXED [Customer ID] : MIN([Order Date]) }",
      insight: "Aunque la viz muestra ventas anuales, FIXED calcula la fecha de primer pedido a nivel cliente."
    },
    {
      id: "04",
      title: "Percent of Total",
      type: "EXCLUDE",
      color: "#7de87a",
      question: "¿Qué % del total global representa cada país? (sin que el filtro lo arruine)",
      code: "{ EXCLUDE [Country] : SUM([Sales]) }",
      insight: "Sin EXCLUDE, al filtrar por región el % se recalcula sobre ese subconjunto, perdiendo el contexto global."
    }
  ];

  return (
    <div className="bg-[#0d0f14] text-[#e8eaf0] font-syne rounded-2xl overflow-hidden border border-[#232840]">
      {/* Hero */}
      <header className="relative p-16 border-b border-[#232840] overflow-hidden bg-gradient-to-br from-[#0d0f14] via-[#111420] to-[#0f1320]">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#e85d4a]/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-16 left-[30%] w-72 h-72 bg-[#4ac4e8]/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block font-space text-[11px] tracking-[0.3em] uppercase text-[#f5c842] border border-[#f5c842]/30 px-3 py-1 rounded-sm mb-6">
            Tableau · Data Portfolio
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-4">
            Level of <span className="text-[#e85d4a]">Detail</span><br />Expressions
          </h1>
          <p className="text-[#7880a0] text-lg max-w-xl mb-8">
            Computá agregaciones fuera del nivel de detalle de la visualización. Los LODs son uno de los features más poderosos de Tableau.
          </p>
          <div className="flex gap-3 flex-wrap">
            <span className="font-space text-xs px-4 py-1.5 rounded-full font-bold bg-[#e85d4a]/15 text-[#e85d4a] border border-[#e85d4a]/30">{"{ FIXED }"}</span>
            <span className="font-space text-xs px-4 py-1.5 rounded-full font-bold bg-[#4ac4e8]/15 text-[#4ac4e8] border border-[#4ac4e8]/30">{"{ INCLUDE }"}</span>
            <span className="font-space text-xs px-4 py-1.5 rounded-full font-bold bg-[#7de87a]/15 text-[#7de87a] border border-[#7de87a]/30">{"{ EXCLUDE }"}</span>
          </div>
        </div>
      </header>

      <div className="p-10 max-w-6xl mx-auto space-y-16">
        {/* Syntax */}
        <section>
          <p className="font-space text-[10px] tracking-[0.4em] uppercase text-[#7880a0] mb-2">Sintaxis</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 pb-3 border-b border-[#232840]">Los tres tipos de LOD</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {syntax.map(item => (
              <motion.div 
                key={item.type}
                whileHover={{ y: -5 }}
                className="bg-[#181c26] border border-[#232840] rounded-xl p-6 relative overflow-hidden group shadow-[inset_0_0_60px_rgba(0,0,0,0.2)]"
                style={{ boxShadow: `inset 0 0 60px ${item.glow}` }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.glow}` }} />
                <h3 className="font-space text-2xl font-bold mb-3" style={{ color: item.color }}>{"{ " + item.type + " }"}</h3>
                <p className="text-sm text-[#7880a0] mb-4 leading-relaxed">{item.desc}</p>
                <div className="bg-[#0a0c12] border border-[#232840] rounded-lg p-4 font-space text-[11px] space-y-2 mb-4">
                  <p className="text-[#e8eaf0]">{item.syntax}</p>
                  <p className="text-[#7880a0] italic">// Ejemplo:</p>
                  <p className="text-[#e8eaf0]">{item.example}</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-space text-[#7880a0]">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.behavior}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Order of Operations */}
        <section className="bg-[#181c26] border border-[#232840] rounded-xl p-8 overflow-x-auto">
          <h3 className="text-sm font-bold text-[#7880a0] mb-8 uppercase tracking-widest">📐 Orden de operaciones en Tableau</h3>
          <div className="flex items-center min-w-[800px] gap-0">
            <div className="flex-1 text-center p-4 bg-white/5 border border-[#232840] rounded-lg">
              <span className="text-sm font-bold block">Extract Filters</span>
            </div>
            <div className="px-2 text-[#7880a0]">→</div>
            <div className="flex-1 text-center p-4 bg-[#e85d4a]/10 border border-[#e85d4a]/30 rounded-lg text-[#e85d4a]">
              <span className="text-sm font-bold block">FIXED LODs</span>
            </div>
            <div className="px-2 text-[#7880a0]">→</div>
            <div className="flex-1 text-center p-4 bg-white/5 border border-[#232840] rounded-lg">
              <span className="text-sm font-bold block">Context Filters</span>
            </div>
            <div className="px-2 text-[#7880a0]">→</div>
            <div className="flex-1 text-center p-4 bg-white/5 border border-[#232840] rounded-lg">
              <span className="text-sm font-bold block">Dim Filters</span>
            </div>
            <div className="px-2 text-[#7880a0]">→</div>
            <div className="flex-1 text-center p-4 bg-[#4ac4e8]/10 border border-[#4ac4e8]/30 rounded-lg text-[#4ac4e8]">
              <span className="text-sm font-bold block">INC / EXC LODs</span>
            </div>
            <div className="px-2 text-[#7880a0]">→</div>
            <div className="flex-1 text-center p-4 bg-[#f5c842]/10 border border-[#f5c842]/30 rounded-lg text-[#f5c842]">
              <span className="text-sm font-bold block">Viz</span>
            </div>
          </div>
          <p className="mt-6 text-xs font-space text-[#7880a0] flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            FIXED se calcula antes de los filtros de dimensión → para que un filtro afecte a FIXED, debe ser Context Filter.
          </p>
        </section>

        {/* Examples */}
        <section>
          <p className="font-space text-[10px] tracking-[0.4em] uppercase text-[#7880a0] mb-2">Casos de uso</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 pb-3 border-b border-[#232840]">Ejemplos prácticos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {examples.map(ex => (
              <motion.div 
                key={ex.id}
                whileHover={{ y: -5 }}
                className="bg-[#181c26] border border-[#232840] rounded-xl overflow-hidden flex flex-col"
              >
                <div className="p-5 border-b border-[#232840] flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-space text-xs font-bold shrink-0 mt-1" style={{ backgroundColor: `${ex.color}20`, color: ex.color, border: `1px solid ${ex.color}40` }}>
                    {ex.id}
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] leading-tight mb-1">{ex.title}</h4>
                    <span className="font-space text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ backgroundColor: `${ex.color}20`, color: ex.color }}>
                      {ex.type}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 space-y-4">
                  <p className="text-sm text-[#7880a0] italic leading-relaxed">"{ex.question}"</p>
                  <div className="bg-[#0a0c12] border border-[#232840] rounded-lg p-4 font-space text-[11px] leading-loose">
                    {ex.code}
                  </div>
                  <p className="text-xs text-[#7880a0] pt-4 border-t border-[#232840]">
                    <strong className="text-[#e8eaf0]">Clave:</strong> {ex.insight}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Reference Table */}
        <section>
          <p className="font-space text-[10px] tracking-[0.4em] uppercase text-[#7880a0] mb-2">Referencia rápida</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 pb-3 border-b border-[#232840]">¿Cuándo usar cada LOD?</h2>
          
          <div className="bg-[#181c26] border border-[#232840] rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-4 font-space text-[10px] tracking-widest uppercase text-[#7880a0]">Expresión</th>
                  <th className="p-4 font-space text-[10px] tracking-widest uppercase text-[#7880a0]">Respeta Filtros</th>
                  <th className="p-4 font-space text-[10px] tracking-widest uppercase text-[#7880a0]">Granularidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232840]/50">
                <tr>
                  <td className="p-4 font-space text-sm text-[#e85d4a]">{"{ FIXED }"}</td>
                  <td className="p-4 text-sm text-[#e85d4a]">✗ No (ignora)</td>
                  <td className="p-4 text-sm text-[#7880a0]">Exactamente la definida</td>
                </tr>
                <tr>
                  <td className="p-4 font-space text-sm text-[#4ac4e8]">{"{ INCLUDE }"}</td>
                  <td className="p-4 text-sm text-[#7de87a]">✓ Sí</td>
                  <td className="p-4 text-sm text-[#7880a0]">Viz + dimensiones incluidas</td>
                </tr>
                <tr>
                  <td className="p-4 font-space text-sm text-[#7de87a]">{"{ EXCLUDE }"}</td>
                  <td className="p-4 text-sm text-[#7de87a]">✓ Sí</td>
                  <td className="p-4 text-sm text-[#7880a0]">Viz - dimensiones excluidas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <footer className="p-8 border-t border-[#232840] flex justify-between items-center text-[11px] text-[#7880a0]">
        <div>Basado en <strong className="text-[#e8eaf0]">Top 15 LOD Expressions</strong> · Tableau Official Blog</div>
        <div className="font-space tracking-widest uppercase">LOD EXPRESSIONS</div>
      </footer>
    </div>
  );
};

// --- Tableau Filters Cheat Sheet ---

export const FiltersLayout = () => {
  const pipeline = [
    { step: 1, name: "Extract Filters", tag: "Filtro de extracción", desc: "Limitan los datos que se incluyen en el extracto (.hyper). Se aplican una sola vez al crear o refrescar el extracto.", detail: "Solo disponible cuando se usa un Extract (no Live). Reduce el tamaño del archivo en disco y mejora la performance. Una vez aplicado, los datos excluidos no existen en el workbook.", color: "#c0392b", bg: "rgba(192, 57, 43, 0.1)" },
    { step: 2, name: "Data Source Filters", tag: "Filtro de fuente de datos", desc: "Se aplican directamente sobre la fuente de datos antes de que los datos lleguen a Tableau. Afectan todas las hojas que usan esa fuente.", detail: "Ideal para seguridad de datos (row-level security), para restringir qué datos ve un usuario en todo el workbook. No se pueden sobrescribir desde una hoja individual.", color: "#d35400", bg: "rgba(211, 84, 0, 0.1)" },
    { step: 3, name: "Context Filters", tag: "Filtro de contexto", desc: "Crean un contexto de datos reducido. Los filtros y expresiones FIXED LOD que vienen después operan sobre ese subconjunto.", detail: "Clave para que las expresiones FIXED respeten un filtro. Sin context filter, FIXED ignora los filtros de dimensión. Se identifican con ícono gris en el shelf de filtros.", color: "#1a6b3a", bg: "rgba(26, 107, 58, 0.1)" },
    { step: 4, name: "FIXED LOD Filters", tag: "Expresiones LOD fijas", desc: "Las expresiones { FIXED … } se calculan aquí, después del context pero antes de los filtros de dimensión.", detail: "Por esto, un filtro de dimensión normal NO afecta a FIXED. Para que lo afecte, el filtro debe ser Context Filter (paso 3). Esto es el error más común con LODs.", color: "#154f8a", bg: "rgba(21, 79, 138, 0.1)" },
    { step: 5, name: "Dimension Filters", tag: "Filtros de dimensión", desc: "Los filtros más comunes. Arrastrás una dimensión al Filters shelf y elegís los valores. Afectan la vista pero no afectan a FIXED LOD.", detail: "Son los filtros típicos de categorías, fechas, regiones, etc. Si necesitás que este filtro afecte a un FIXED LOD, convertilo en Context Filter haciendo clic derecho → \"Add to Context\".", color: "#6c3483", bg: "rgba(108, 52, 131, 0.1)" },
    { step: 6, name: "INCLUDE / EXCLUDE LOD Filters", tag: "Expresiones LOD relativas", desc: "Las expresiones { INCLUDE } y { EXCLUDE } se calculan aquí, respetando los filtros de dimensión del paso 5.", detail: "A diferencia de FIXED, estas expresiones sí son afectadas por los filtros de dimensión. Son más \"amigables\" con el contexto de la viz.", color: "#117a8b", bg: "rgba(17, 122, 139, 0.1)" },
    { step: 7, name: "Measure Filters", tag: "Filtros de medida", desc: "Filtran sobre valores agregados (SUM(Sales) > 10000). Se aplican después de todos los cálculos de dimensión.", detail: "Por ejemplo: \"mostrar solo los estados con ventas totales mayores a $50K\". Necesitás elegir el nivel de agregación (SUM, AVG, etc.) al configurarlos.", color: "#7d6608", bg: "rgba(125, 102, 8, 0.1)" },
    { step: 8, name: "Table Calculation Filters", tag: "Filtros de cálculo de tabla", desc: "Se aplican después de que la tabla ya fue computada. Ocultan valores de la viz sin removerlos del cálculo subyacente.", detail: "Ideal para filtrar resultados de RUNNING_SUM, RANK, PERCENTILE, etc., sin que el filtro \"rompa\" el cálculo. El dato sigue existiendo, solo se oculta visualmente.", color: "#2c3e50", bg: "rgba(44, 62, 80, 0.1)" },
  ];

  const tips = [
    { icon: <Zap className="w-5 h-5" />, title: "FIXED + Dim Filter = problema", body: "Si filtrás por dimensión y el resultado de un FIXED no cambia, es porque el FIXED se calcula antes. Solución: convertir el filtro en Context Filter.", code: "Clic derecho → \"Add to Context\"" },
    { icon: <BarChart2 className="w-5 h-5" />, title: "Top N dinámico", body: "Para un Top N que funcione correctamente al filtrar por categoría, el filtro de categoría debe ser Context Filter primero, luego el Top N filter.", code: "Orden: Context → Top N (dim filter)" },
    { icon: <Table className="w-5 h-5" />, title: "Measure vs. Table Calc Filter", body: "¿Necesitás filtrar por RANK o RUNNING_SUM sin que el cálculo cambie? Usá Table Calc Filter. El Measure Filter elimina datos del cálculo." },
    { icon: <Lock className="w-5 h-5" />, title: "Seguridad real → Data Source", body: "Los dimension filters pueden ser modificados por el usuario. Para seguridad real (que el usuario no pueda ver otros datos), usá Data Source Filters con USERNAME().", code: "[Region] = USERNAME_REGION()" },
    { icon: <Zap className="w-5 h-5" />, title: "Performance: Extract Filter", body: "Filtrar en el extracto es lo más barato en performance. Si sabés que nunca necesitás datos de más de 3 años atrás, excluílos del extracto." },
    { icon: <Calendar className="w-5 h-5" />, title: "Fechas: Relative es tu amigo", body: "Usá Relative Date Filters para dashboards que se actualizan periódicamente. \"Last 30 days\" siempre mostrará los últimos 30, sin mantenimiento manual." },
    { icon: <Workflow className="w-5 h-5" />, title: "Apply to worksheets", body: "Los Dimension Filters de un dashboard se pueden configurar para afectar una, varias, o todas las hojas. Clic derecho → Apply to Worksheets.", code: "Selected Worksheets / All using this DS" },
    { icon: <Search className="w-5 h-5" />, title: "Wildcards en Dim Filters", body: "En filtros de texto podés usar wildcards: * como comodín. Útil para filtrar nombres que contienen una palabra clave." },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-dm-sans rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
      {/* Hero */}
      <header className="bg-slate-900 dark:bg-black text-white p-12 md:p-20 relative overflow-hidden">
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-dm-serif text-[150px] md:text-[200px] text-white/5 pointer-events-none whitespace-nowrap leading-none select-none">
          FILTERS
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 border border-slate-700 px-3 py-1 rounded-sm">
              Tableau · Data Portfolio
            </span>
            <div className="h-px grow bg-slate-700"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-dm-serif italic leading-none mb-6">
            Tableau <span className="text-primary">Filters</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed font-light">
            Entendé el orden de operaciones de los filtros, sus diferencias clave y cuándo aplicar cada tipo para obtener exactamente el resultado que buscás.
          </p>
          <div className="flex gap-10 mt-10">
            <div>
              <div className="font-dm-serif text-4xl leading-none">8</div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-slate-500 mt-1">Tipos de filtro</div>
            </div>
            <div>
              <div className="font-dm-serif text-4xl leading-none">1</div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-slate-500 mt-1">Orden estricto</div>
            </div>
            <div>
              <div className="font-dm-serif text-4xl leading-none">∞</div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-slate-500 mt-1">Combinaciones</div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 md:p-16 max-w-6xl mx-auto space-y-24">
        {/* Pipeline Section */}
        <section>
          <div className="mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-2">Orden de operaciones</p>
            <h2 className="text-4xl font-dm-serif italic">El pipeline de filtros en <span className="text-slate-500 dark:text-slate-400">Tableau</span></h2>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 md:p-12 shadow-sm relative">
            <div className="font-mono text-[11px] tracking-widest uppercase text-slate-400 mb-12">
              — Se ejecutan de arriba hacia abajo. Cada filtro actúa sobre el resultado del anterior.
            </div>

            <div className="relative space-y-0">
              {/* Vertical Dotted Line */}
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-repeat-y bg-[length:1px_16px] bg-gradient-to-b from-slate-300 dark:from-slate-600 to-transparent z-0" 
                   style={{ backgroundImage: 'linear-gradient(to bottom, currentColor 50%, transparent 50%)' }} />

              {pipeline.map((item, idx) => (
                <div key={item.step} className="relative z-10 flex gap-8 py-6 group">
                  <div 
                    className="w-14 h-14 rounded-full border-2 bg-white dark:bg-slate-900 flex items-center justify-center font-dm-serif text-2xl shrink-0 transition-transform group-hover:scale-110"
                    style={{ color: item.color, borderColor: item.color }}
                  >
                    {item.step}
                  </div>
                  <div className="pt-2 flex-1">
                    <h3 className="text-xl font-bold mb-1" style={{ color: item.color }}>{item.name}</h3>
                    <span 
                      className="inline-block font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-sm border mb-3"
                      style={{ color: item.color, backgroundColor: item.bg, borderColor: item.color }}
                    >
                      {item.tag}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <div 
                      className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-xs text-slate-600 dark:text-slate-300 border-l-4 leading-relaxed"
                      style={{ borderLeftColor: item.color }}
                    >
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section>
          <div className="mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-2">Referencia rápida</p>
            <h2 className="text-4xl font-dm-serif italic">Comparativa de <span className="text-slate-500 dark:text-slate-400">todos los filtros</span></h2>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 dark:bg-black">
                    <th className="p-4 font-mono text-[9px] tracking-widest uppercase text-white">#</th>
                    <th className="p-4 font-mono text-[9px] tracking-widest uppercase text-white">Tipo de filtro</th>
                    <th className="p-4 font-mono text-[9px] tracking-widest uppercase text-white">Alcance</th>
                    <th className="p-4 font-mono text-[9px] tracking-widest uppercase text-white">Afecta FIXED LOD</th>
                    <th className="p-4 font-mono text-[9px] tracking-widest uppercase text-white">Se expone al usuario</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {pipeline.map((item) => (
                    <tr key={item.step} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <td className="p-4 font-mono text-xs" style={{ color: item.color }}>{item.step}</td>
                      <td className="p-4 text-sm font-bold">{item.name}</td>
                      <td className="p-4 text-xs text-slate-600 dark:text-slate-400">{item.step <= 2 ? "Global / Fuente" : "Hoja actual"}</td>
                      <td className="p-4 text-xs font-bold">
                        {item.step <= 3 ? (
                          <span className="text-green-600 dark:text-green-400">✓ Sí</span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">✗ No</span>
                        )}
                      </td>
                      <td className="p-4 text-xs font-bold">
                        {item.step === 5 || item.step === 7 || item.step === 8 ? (
                          <span className="text-green-600 dark:text-green-400">✓ Sí</span>
                        ) : item.step === 3 || item.step === 4 || item.step === 6 ? (
                          <span className="text-amber-600 dark:text-amber-400">⚡ Opcional</span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">✗ No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tips Grid */}
        <section>
          <div className="mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-2">Buenas prácticas</p>
            <h2 className="text-4xl font-dm-serif italic">Tips para evitar los errores <span className="text-slate-500 dark:text-slate-400">más comunes</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((tip, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="text-primary mb-4">{tip.icon}</div>
                <h4 className="font-bold text-sm mb-2">{tip.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{tip.body}</p>
                {tip.code && (
                  <div className="bg-slate-100 dark:bg-slate-900 rounded p-2 font-mono text-[10px] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700">
                    {tip.code}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="bg-slate-900 dark:bg-black text-slate-500 p-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs">
          Basado en <strong className="text-white">Tableau Desktop Documentation</strong> · Order of Operations
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase">
          Data Portfolio · Filters
        </div>
      </footer>
    </div>
  );
};
