export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  tools: string[];
  role: string;
  date: string;
  sector: string;
  challenge: string;
  processing: string;
  insights: string;
  metrics: {
    label: string;
    value: string;
    subtext: string;
    primary?: boolean;
  }[];
  codeSnippet?: string;
  tableauUrl?: string;
  videos?: {
    url: string;
    title: string;
    description?: string;
  }[];
  gallery?: {
    url: string;
    description?: string;
  }[];
  es?: {
    title: string;
    description: string;
    fullDescription: string;
    role: string;
    sector: string;
    challenge: string;
    processing: string;
    insights: string;
    metrics: {
      label: string;
      value: string;
      subtext: string;
    }[];
    videos?: {
      title: string;
      description?: string;
    }[];
    gallery?: {
      description?: string;
    }[];
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'Post' | 'Resources';
  tags: string[];
  layout?: 'dax' | 'python' | 'tableau' | 'lod' | 'filters';
}

export const PROJECTS: Project[] = [
  {
    id: 'energy-solar',
    title: 'Home Energy & Solar Insights',
    description: 'A comprehensive analysis of residential energy dynamics, focused on monitoring household consumption patterns and maximizing financial returns from solar investments through data-driven intelligence.',
    fullDescription: 'A comprehensive analysis of residential energy dynamics, focused on monitoring household consumption patterns and maximizing financial returns from solar investments through data-driven intelligence.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000',
    tags: ['Tableau', 'SQL', 'Excel'],
    tools: ['Tableau', 'SQL', 'Excel'],
    role: 'BI Analyst',
    date: '2024',
    sector: 'Renewable Energy',
    challenge: 'Modern homes are becoming complex micro-grids. The challenge was identifying specific efficiency opportunities within granular residential data. Most homeowners lack visibility into how their daily habits misalign with solar peak production hours, leading to wasted clean energy and higher utility bills.',
    processing: 'The project involved merging residential smart meter data (1 hour intervals summary) with solar inverter logs. with Excel for extraction and SQL for financial modeling.',
    insights: 'The final analysis revealed that shifting only 30% of energy-intensive tasks to daylight hours could substantially reduce reliance on peak-rate grid electricity—or even enable full energy self-sufficiency with the addition of battery storage. The Tableau dashboard now functions as a monitoring tool to track and identify monthly cost-saving opportunities.',
    metrics: [
      { label: 'Potential Savings', value: '25%', subtext: 'Reduced annual utility expenditure through load shifting strategies.' },
      { label: 'Solar ROI', value: '4.5 years', subtext: 'Payback period achieved by maximizing self-consumption vs. grid export.', primary: true }
    ],
    tableauUrl: 'https://public.tableau.com/views/ResidentialSolarSystem/Main?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    es: {
      title: 'Energía Hogareña y Perspectivas Solares',
      description: 'Analizando patrones de consumo de energía residencial para optimizar la colocación de paneles solares y el ROI.',
      fullDescription: 'Un análisis exhaustivo de la dinámica de la energía residencial, centrado en el seguimiento de los patrones de consumo doméstico y la maximización de los rendimientos financieros de las inversiones solares a través de la inteligencia basada en datos.',
      role: 'Analista de BI',
      sector: 'Energía Renovable',
      challenge: 'Los hogares modernos se están convirtiendo en micro-redes complejas. El desafío fue identificar oportunidades de eficiencia específicas dentro de los datos residenciales granulares. La mayoría de los propietarios carecen de visibilidad sobre cómo sus hábitos diarios no se alinean con las horas de máxima producción solar, lo que lleva a un desperdicio de energía limpia y facturas de servicios públicos más altas.',
      processing: 'El proyecto consistió en fusionar datos de medidores inteligentes residenciales (resumen de intervalos de 1 hora) con registros de inversores solares. Con Excel para la extracción y SQL para el modelado financiero.',
      insights: 'El análisis final reveló que cambiar solo el 30% de las tareas de alto consumo de energía a las horas del día podría reducir sustancialmente la dependencia de la electricidad de la red en horas pico, o incluso permitir la autosuficiencia energética total con la adición de almacenamiento en batería. El tablero de Tableau ahora funciona como una herramienta de monitoreo para rastrear e identificar oportunidades mensuales de ahorro de costos.',
      metrics: [
        { label: 'Ahorros Potenciales', value: '25%', subtext: 'Reducción del gasto anual en servicios públicos mediante estrategias de cambio de carga.' },
        { label: 'ROI Solar', value: '4.5 años', subtext: 'Período de recuperación logrado maximizando el autoconsumo frente a la exportación a la red.' }
      ]
    }
  },
  {
    id: 'TRF Analytics',
    title: 'Logistic Operation Performance',
    description: 'An end-to-end analysis of operations for a multi-industry logistics operator, using realistic simulated data. Identifying operational inefficiencies, predicting deviations, and proposing concrete actions.',
    fullDescription: 'An end-to-end analysis of operations for a multi-industry logistics operator, using realistic simulated data. Identifying operational inefficiencies, predicting deviations, and proposing concrete actions.',
    image: 'https://images.unsplash.com/photo-1565891741441-64926e441838?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Python', 'SQL', 'Excel', 'Power BI'],
    tools: ['Python', 'SQLite', 'Excel', 'Power BI'],
    role: 'BI Analyst',
    date: '2026',
    sector: 'Logistic',
    challenge: 'Design an end-to-end analytical pipeline for a multi-sector logistics operator, identifying operational inefficiencies, delivery deviation patterns, and improvement opportunities in carrier performance.',
      processing: 'Dataset generation with Python (Faker + pandas), storage in SQLite, analytical queries with SQL (JOINs, CASE WHEN, subqueries), anomaly detection using Z-score in Python, dynamic tables in Excel with conditional formatting, and visualization in Power BI with DAX measures, Slicers and custom tooltips. Additional interactive dashboard built with Streamlit + Plotly.',
    insights: 'Pharmaceutical sector concentrates the highest revenue but the lowest OTD (54%) and 22 critical incidents. Ruta Pampeana leads in deviations with a group Z-score of 1.30. December shows the operational peak with highest volume and cancellation rate. TransNorte SA is the only carrier in the optimal zone with 70.1% OTD.',
    metrics: [
        { label: 'OTD', value: '61.9 %', subtext: 'Orders shipped on time.'},
        { label: 'Mean Deviation', value: '0.47 d', subtext: 'Avg. delivery delay (days)', primary: true}
    ],
    es: {
      title: 'Análisis de Performance Operativa',
      description: 'Un análisis de principio a fin de operaciones de un operador logístico multi-rubro, con datos simulados realistas. El objetivo es detectar ineficiencias operativas, predecir desvíos y proponer acciones concretas.',
      fullDescription: 'Un análisis de principio a fin de operaciones de un operador logístico multi-rubro, con datos simulados realistas. El objetivo es detectar ineficiencias operativas, predecir desvíos y proponer acciones concretas.',
      role: 'Analista de BI',
      sector: 'Logística',
      challenge:  'Diseñar un pipeline analítico end-to-end para un operador logístico multi-rubro, identificando ineficiencias operativas, patrones de desvío en entregas y oportunidades de mejora en la performance de transportistas.',
      processing: 'Generación del dataset con Python (Faker + pandas), almacenamiento en SQLite, consultas analíticas con SQL (JOINs, CASE WHEN, subqueries), detección de anomalías con Z-score en Python, tablas dinámicas en Excel con formato condicional, y visualización en Power BI con medidas DAX, Slicers y tooltips personalizados. Dashboard interactivo adicional con Streamlit + Plotly.',
      insights: 'Farmacéutica concentra el mayor revenue pero el OTD más bajo (54%) y 22 incidentes críticos. Ruta Pampeana lidera los desvíos con Z-score grupal de 1.30. Diciembre registra el pico operativo con mayor volumen y tasa de cancelación. TransNorte SA es el único transportista en zona óptima con 70.1% de OTD.',
      metrics: [
        { label: 'OTD', value: '61.9 %', subtext: 'Porcentaje de órdenes entregadas en tiempo.'},
        { label: 'Desvío Promedio', value: '0.47 d', subtext: 'Promedio de dias de demora.'}
      ],
      videos: [
        {
          title: 'Power BI Dashboard Demo',
          description: 'Navegación detallada del dashboard de Power BI mostrando métricas clave de logística.'
        },
        {
          title: 'Python Dashboard Demo',
          description: 'Dashboard interactivo construido con Streamlit y Plotly para detección avanzada de anomalías.'
        }
      ],
      gallery: [
        { description: 'Análisis de performance de transportistas.' },
        { description: 'Resultados de detección de anomalías mediante Z-score.' },
        { description: 'Análisis de ingresos y OTD por rubro.' },
        { description: 'Tendencias mensuales de volumen y cancelaciones.' },
        { description: 'Mapa de calor de desvíos en entregas.' },
        { description: 'Vista general del dashboard de resumen.' }
      ]
    },
    videos: [
      {
        url: '/assets/projects/trf/PowerBI_Dashboard_Video.mp4',
        title: 'Power BI Dashboard Demo',
        description: 'Detailed navigation of the Power BI dashboard showing key logistics metrics.'
      },
      {
        url: '/assets/projects/trf/Python_Dashboard_Video.mp4',
        title: 'Python Dashboard Demo',
        description: 'Interactive dashboard built with Streamlit and Plotly for advanced anomaly detection.'
      }
    ],
    gallery: [
      { url: '/assets/projects/trf/grafico_01_transportistas.png', description: 'Carrier performance analysis.' },
      { url: '/assets/projects/trf/grafico_02_zscore.png', description: 'Z-score anomaly detection results.' },
      { url: '/assets/projects/trf/grafico_03_rubros.png', description: 'Sector-wise revenue and OTD analysis.' },
      { url: '/assets/projects/trf/grafico_04_tendencia_mensual.png', description: 'Monthly volume and cancellation trends.' },
      { url: '/assets/projects/trf/grafico_05_heatmap.png', description: 'Heatmap of delivery deviations.' },
      { url: '/assets/projects/trf/grafico_06_dashboard_resumen.png', description: 'Summary dashboard overview.' }
    ]
  },
  {
    id: 'real-estate',
    title: 'Real Estate Analytics',
    description: 'End-to-end data pipeline for real estate business intelligence: transforming transactional data into actionable analytical dashboards.',
    fullDescription: 'End-to-end data pipeline for real estate business intelligence: transforming transactional data into actionable analytical dashboards.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000',
    tags: ['Python', 'DuckDB', 'dbt', 'Prefect', 'Tableau'],
    tools: ['Python', 'DuckDB', 'dbt', 'Prefect', 'Tableau'],
    role: 'BI Data Analyst',
    date: '2021 → 2025',
    sector: 'Real Estate / PropTech',
    challenge: 'In a volatile market, traditional comparative market analysis (CMA) often fails to capture non-linear relationships between property characteristics and final sale prices. The goal was to build an engine that could ingest thousands of data points to provide an objective baseline for smarter strategies. Build a scalable analytics architecture to centralize valuable data from the transactional system, transform it into reliable information, and deliver it quickly and efficiently to support decision-making.',
    processing: 'Synthesized datasets with specific property characteristics. The pipeline involved transforming raw data into high-dimensional model inputs. Evolution toward a modern end-to-end data pipeline built on an industry-standard stack, implemented using open-source tools.',
    insights: 'By integrating these insights into investment strategies, it is possible to define precise property valuation and identify undervalued assets with high growth potential before they reached peak market visibility.',
    metrics: [
      { label: 'Rental vs Sale Avg. closing time', value: '3.2x faster', subtext: 'Efficiency improvement in market analysis.' },
      { label: 'Processed listings', value: '+1.000.000', subtext: 'Total data points handled by the pipeline.', primary: true }
    ],
    codeSnippet: `-- dbt model — marts/fact_publicaciones.sql
CASE operation_type
    WHEN 'Venta'             THEN ROUND(precio * 0.03, 2)
    WHEN 'Alquiler'          THEN ROUND(precio * 0.10, 2)
    WHEN 'Alquiler temporal' THEN ROUND(precio * 0.15, 2)
END AS ingreso_comision,

DATE_DIFF('day', fecha_alta, fecha_baja) AS dias_publicacion,

CASE
    WHEN superficie_total > 0 THEN ROUND(precio / superficie_total, 2)
END AS precio_por_m2`,
    tableauUrl: 'https://public.tableau.com/app/profile/fabio2874/viz/DashboardRemax_17727426979740/Principal',
    es: {
      title: 'Analítica Inmobiliaria',
      description: 'Pipeline de datos de extremo a extremo para inteligencia de negocios inmobiliarios: transformando datos transaccionales en tableros analíticos accionables.',
      fullDescription: 'Pipeline de datos de extremo a extremo para inteligencia de negocios inmobiliarios: transformando datos transaccionales en tableros analíticos accionables.',
      role: 'Analista de Datos BI',
      sector: 'Inmobiliario / PropTech',
      challenge: 'En un mercado volátil, el análisis de mercado comparativo (CMA) tradicional a menudo no logra capturar las relaciones no lineales entre las características de la propiedad y los precios finales de venta. El objetivo era construir un motor que pudiera ingerir miles de puntos de datos para proporcionar una línea base objetiva para estrategias más inteligentes. Construir una arquitectura analítica escalable para centralizar datos valiosos del sistema transaccional, transformarlos en información confiable y entregarla de manera rápida y eficiente para apoyar la toma de decisiones.',
      processing: 'Conjuntos de datos sintetizados con características de propiedad específicas. El pipeline implicó transformar datos brutos en entradas de modelo de alta dimensión. Evolución hacia un pipeline de datos moderno de extremo a extremo construido sobre un stack estándar de la industria, implementado utilizando herramientas de código abierto.',
      insights: 'Al integrar estos conocimientos en las estrategias de inversión, es posible definir una valoración precisa de la propiedad e identificar activos infravalorados con alto potencial de crecimiento antes de que alcancen su máxima visibilidad en el mercado.',
      metrics: [
        { label: 'Tiempo promedio de cierre Alquiler vs Venta', value: '3.2x más rápido', subtext: 'Mejora de eficiencia en el análisis de mercado.' },
        { label: 'Propiedades procesadas', value: '+1.000.000', subtext: 'Puntos de datos totales manejados por el pipeline.' }
      ]
    }
  },
  {
    id: 'world-cup',
    title: 'FIFA World Cup 2022 Analysis',
    description: 'A deep dive into tournament dynamics, uncovering trends in match statistics and competitive patterns through data visualization.',
    fullDescription: 'A deep dive into tournament dynamics, uncovering trends in match statistics and competitive patterns through data visualization.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000',
    tags: ['Tableau', 'Excel', 'SQL'],
    tools: ['Tableau', 'Excel', 'SQL'],
    role: 'BI Data Analyst',
    date: '2022',
    sector: 'Sports/ Tournament Insights',
    challenge: 'The primary challenge was to distill over dense statistical data into meaningful narratives. In a tournament defined by high-stakes upsets and tactical evolutions this aim to explain the underlying competitive patterns.',
    processing: 'Data was aggregated from multiple feeds. Exploratory Data Analysis (EDA) focused on cleansing match event logs, normalizing tracking data, and calculating custom metrics.',
    insights: 'The analysis revealed that clinical finishing outweighed raw possession. Teams that prioritized rapid transitions and high-value shot creation consistently outperformed those with high volume but low-quality attempts. Spain dominated the ball at 75.8% yet was eliminated in the Round of 16, while Argentina won the championship with 57.4% — prioritizing efficiency over control.',
    metrics: [
      { label: 'Champion\'s avg. possession — Argentina', value: '57.4%', subtext: 'Prioritizing efficiency over control.' },
      { label: 'Possession gap - most vs least dominant teams', value: '+24pts', subtext: 'Difference between extreme tactical approaches.', primary: true }
    ],
    tableauUrl: 'https://public.tableau.com/views/WC2022_16853689263590/Cover?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    es: {
      title: 'Análisis de la Copa Mundial de la FIFA 2022',
      description: 'Una inmersión profunda en la dinámica del torneo, descubriendo tendencias en las estadísticas de los partidos y patrones competitivos a través de la visualización de datos.',
      fullDescription: 'Una inmersión profunda en la dinámica del torneo, descubriendo tendencias en las estadísticas de los partidos y patrones competitivos a través de la visualización de datos.',
      role: 'Analista de Datos BI',
      sector: 'Deportes / Perspectivas del Torneo',
      challenge: 'El desafío principal fue destilar datos estadísticos densos en narrativas significativas. En un torneo definido por sorpresas de alto riesgo y evoluciones tácticas, esto busca explicar los patrones competitivos subyacentes.',
      processing: 'Los datos se agregaron de múltiples fuentes. El Análisis Exploratorio de Datos (EDA) se centró en la limpieza de los registros de eventos de los partidos, la normalización de los datos de seguimiento y el cálculo de métricas personalizadas.',
      insights: 'El análisis reveló que la finalización clínica superó a la posesión bruta. Los equipos que priorizaron las transiciones rápidas y la creación de tiros de alto valor superaron consistentemente a aquellos con un alto volumen pero intentos de baja calidad. España dominó el balón con un 75.8% pero fue eliminada en octavos de final, mientras que Argentina ganó el campeonato con un 57.4%, priorizando la eficiencia sobre el control.',
      metrics: [
        { label: 'Posesión promedio del campeón — Argentina', value: '57.4%', subtext: 'Priorizando la eficiencia sobre el control.' },
        { label: 'Brecha de posesión - equipos más vs menos dominantes', value: '+24pts', subtext: 'Diferencia entre enfoques tácticos extremos.' }
      ]
    }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'tableau-filters-cheat-sheet',
    title: 'Tableau Filters',
    excerpt: 'Entendé el orden de operaciones de los filtros, sus diferencias clave y cuándo aplicar cada tipo para obtener exactamente el resultado que buscás.',
    content: ``,
    date: 'April 5, 2026',
    category: 'Post',
    tags: ['Tableau', 'Filters', 'Cheat Sheet'],
    layout: 'filters'
  },
  {
    id: 'tableau-ecosystem',
    title: 'The Tableau ecosystem explained end to end',
    excerpt: 'A complete guide to the tools, infrastructure flows, and architecture decisions of the Tableau stack — from Prep all the way to Cloud.',
    content: `
### The ecosystem tools
- **Tableau Prep Builder**: Visual ETL — data cleaning, transformation, and combining sources.
- **Tableau Desktop**: Creating visualizations, dashboards, and exploratory analysis.
- **Tableau Server**: On-premise platform for publishing, sharing, and governing content.
- **Tableau Cloud**: Salesforce-hosted SaaS version. No infrastructure to manage.
- **Tableau Bridge**: Agent that connects Tableau Cloud to local or private data sources.
- **Tableau Public**: Free platform for sharing vizs publicly. Ideal for portfolios.

### Infrastructure flows
1. **Classic local analysis**: Local DB -> Prep -> Desktop -> .twbx.
2. **Publishing to Tableau Server**: DW -> Prep -> Desktop -> Server.
3. **Tableau Cloud with cloud data**: Snowflake/BQ -> Desktop -> Cloud.
4. **Tableau Cloud + Bridge**: Local DB -> Bridge -> Cloud.

### Tableau Data Management
Enterprise add-on that layers governance, traceability, and centralized data management.
- **Tableau Catalog**: Data discovery and lineage.
- **Prep Conductor**: Flow orchestration.
- **Virtual Connections**: Centralized data abstraction.

### Advanced features
- **Tableau Pulse**: AI-powered metrics experience.
- **Einstein Discovery**: Automated ML engine.
- **TabPy / Rserve**: Python and R integration for advanced analytics.
- **Viz Extensions**: Custom chart types (D3.js, Vega-Lite).
    `,
    date: 'April 4, 2026',
    category: 'Post',
    tags: ['Tableau', 'BI', 'Architecture'],
    layout: 'tableau'
  },
  {
    id: 'dax-cheat-sheet',
    title: 'Power BI DAX',
    excerpt: 'Medidas más usadas en Power BI — con sintaxis y casos de uso.',
    content: ``,
    date: 'April 4, 2026',
    category: 'Resources',
    tags: ['Power BI', 'DAX', 'Cheat Sheet'],
    layout: 'dax'
  },
  {
    id: 'tableau-lod-cheat-sheet',
    title: 'Tableau LOD Expressions',
    excerpt: 'Computá agregaciones fuera del nivel de detalle de la visualización. Los LODs son uno de los features más poderosos de Tableau.',
    content: ``,
    date: 'April 5, 2026',
    category: 'Resources',
    tags: ['Tableau', 'LOD', 'Cheat Sheet'],
    layout: 'lod'
  }
];
