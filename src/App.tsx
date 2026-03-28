/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Home as HomeIcon, 
  Briefcase, 
  BookOpen, 
  Mail, 
  Linkedin, 
  Github, 
  BarChart2, 
  Share2, 
  Code, 
  MapPin, 
  Send, 
  Search, 
  Terminal,
  Download,
  ChevronLeft,
  ChevronRight,
  Grid,
  Bolt,
  Trophy,
  Settings2,
  HardDrive,
  GraduationCap,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { cn } from './lib/utils';
import { PROJECTS, BLOG_POSTS, Project, BlogPost } from './types';

// --- Translations ---

const translations = {
  en: {
    nav: { home: 'Home', projects: 'Projects', blog: 'Blog', contact: 'Contact' },
    hero: {
      title: "Hi, I'm Fabio - BI & Data Analyst",
      subtitle: "Bridging the gap between data and decisions.",
      description: "I turn complex technical findings into clear, actionable and compelling narratives. I specialize in high-impact data visualization and statistical storytelling.",
      location: "Buenos Aires, Argentina"
    },
    journey: { title: "My Journey" },
    projects: {
      title: "Projects Gallery",
      subtitle: "A collection of data stories, visualizations, and technical deep-dives.",
      allProjects: "Projects Gallery",
      allProjectsDesc: "A deep dive into my professional work and personal iniciatives."
    },
    toolkit: { title: "Technical Toolkit" },
    blog: {
      title: "Data Blog & Resources",
      subtitle: "Exploring data, sharing resources, and documenting analysis steps.",
      search: "Search blog...",
      popularTags: "Popular Tags",
      newsletter: "Join the Newsletter",
      newsletterDesc: "Get the latest tutorials and resources delivered to your inbox.",
      subscribe: "Subscribe",
      noPosts: "No posts found matching your criteria.",
      allPosts: "All Posts",
      tutorials: "Tutorials",
      resources: "Resources",
      back: "Back to Blog"
    },
    contact: {
      title: "Let's connect.",
      subtitle: "Have a specific data project in mind or just want to chat about analytics? Drop me a message and I'll get back to you as soon as possible.",
      social: "Social Channels",
      form: {
        name: "Full Name",
        email: "Email Address",
        message: "Your Message",
        placeholderMessage: "How can I help with your data needs?",
        send: "Send Message"
      }
    },
    projectDetail: {
      back: "Projects Gallery",
      tools: "Tools used",
      role: "Role",
      date: "Date",
      sector: "Sector",
      challenge: "The Challenge",
      processing: "Data Processing",
      insights: "Insights",
      strategy: "Strategy Transformation",
      prev: "Previous Project",
      next: "Next Project",
      improvingInsights: "Improving Insights & Accuracy",
      tableauDashboard: "Interactive Tableau Dashboard",
      viewTableau: "View on Tableau Public",
      tableauInstruction: "Click above to explore the full interactive visualization"
    }
  },
  es: {
    nav: { home: 'Inicio', projects: 'Proyectos', blog: 'Blog', contact: 'Contacto' },
    hero: {
      title: "Hola, soy Fabio - BI & Data Analyst",
      subtitle: "Transformo datos en decisiones estratégicas.",
      description: "Transformo hallazgos técnicos complejos en narrativas claras, accionables y convincentes. Me especializo en visualización de datos de alto impacto y narración estadística.",
      location: "Buenos Aires, Argentina"
    },
    journey: { title: "Mi Trayectoria" },
    projects: {
      title: "Galería de Proyectos",
      subtitle: "Una colección de historias de datos, visualizaciones y profundizaciones técnicas.",
      allProjects: "Galería de Proyectos",
      allProjectsDesc: "Una inmersión profunda en mi trabajo profesional e iniciativas personales."
    },
    toolkit: { title: "Herramientas Técnicas" },
    blog: {
      title: "Blog de Datos y Recursos",
      subtitle: "Explorando datos, compartiendo recursos y documentando pasos de análisis.",
      search: "Buscar en el blog...",
      popularTags: "Etiquetas Populares",
      newsletter: "Únete al Boletín",
      newsletterDesc: "Recibe los últimos tutoriales y recursos en tu bandeja de entrada.",
      subscribe: "Suscribirse",
      noPosts: "No se encontraron publicaciones que coincidan con tus criterios.",
      allPosts: "Todos",
      tutorials: "Tutoriales",
      resources: "Recursos",
      back: "Volver al Blog"
    },
    contact: {
      title: "Conectemos.",
      subtitle: "¿Tienes un proyecto de datos específico en mente o simplemente quieres charlar sobre analítica? Envíame un mensaje y te responderé lo antes posible.",
      social: "Redes Sociales",
      form: {
        name: "Nombre Completo",
        email: "Correo Electrónico",
        message: "Tu Mensaje",
        placeholderMessage: "¿Cómo puedo ayudarte con tus necesidades de datos?",
        send: "Enviar Mensaje"
      }
    },
    projectDetail: {
      back: "Galería de Proyectos",
      tools: "Herramientas usadas",
      role: "Rol",
      date: "Fecha",
      sector: "Sector",
      challenge: "El Desafío",
      processing: "Procesamiento de Datos",
      insights: "Perspectivas",
      strategy: "Transformación de Estrategia",
      prev: "Proyecto Anterior",
      next: "Siguiente Proyecto",
      improvingInsights: "Mejorando Perspectivas y Precisión",
      tableauDashboard: "Tablero Interactivo de Tableau",
      viewTableau: "Ver en Tableau Public",
      tableauInstruction: "Haz clic arriba para explorar la visualización interactiva completa"
    }
  }
};

// --- Components ---

const Navbar = ({ activeTab, setActiveTab, isDarkMode, toggleDarkMode, lang, setLang }: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  isDarkMode: boolean,
  toggleDarkMode: () => void,
  lang: 'en' | 'es',
  setLang: (l: 'en' | 'es') => void
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const navItems = [
    { id: 'home', label: t.home, icon: HomeIcon },
    { id: 'projects', label: t.projects, icon: Briefcase },
    { id: 'blog', label: t.blog, icon: BookOpen },
    { id: 'contact', label: t.contact, icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex h-16 items-center justify-between">
        <div className="flex items-center gap-3 text-primary cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            <Database className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight uppercase text-slate-900 dark:text-white">Fabio.Data</h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "text-sm font-semibold transition-colors relative py-1",
                activeTab === item.id 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-slate-600 dark:text-slate-400 hover:text-primary"
              )}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 ml-4">
            <button 
              onClick={() => setLang('en')} 
              className={cn("transition-colors", lang === 'en' ? "text-primary" : "hover:text-primary")}
            >
              EN
            </button>
            <span>/</span>
            <button 
              onClick={() => setLang('es')} 
              className={cn("transition-colors", lang === 'es' ? "text-primary" : "hover:text-primary")}
            >
              ES
            </button>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "text-left text-lg font-bold py-2",
                    activeTab === item.id ? "text-primary" : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
  <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-900">
    <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col gap-1 items-center md:items-start">
        <div className="flex items-center gap-2 text-primary">
          <Database className="h-4 w-4" />
          <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">Fabio.Data</span>
        </div>
        <p className="text-xs text-slate-400">© 2024 Portfolio. Unified Data Storytelling.</p>
      </div>
      <div className="flex gap-8 text-sm font-medium text-slate-500">
        <a href="https://www.linkedin.com/in/fabio-aguero/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
        <a href="https://github.com/faguero84" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
        <a href="https://public.tableau.com/app/profile/fabio2874/vizzes" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Tableau Public</a>
      </div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Built with precision.</p>
    </div>
  </footer>
);

// --- Views ---

const HomeView = ({ onProjectClick, lang }: { onProjectClick: (p: Project) => void, lang: 'en' | 'es' }) => {
  const t = translations[lang];
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mt-12 md:mt-24 items-center max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative h-[300px] w-[300px] lg:h-[360px] lg:w-[360px] shrink-0 overflow-hidden rounded-full border-[12px] border-slate-50 dark:border-slate-800/50 shadow-sm">
            <img 
              src="/profile.jpg" 
              alt="Fabio" 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <div className="space-y-2">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              {t.hero.title}
            </h2>
            <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-tight">
              {t.hero.subtitle}
            </h3>
          </div>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto md:mx-0">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-8">
            <div className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-2 text-slate-700 dark:text-slate-300">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider">{t.hero.location}</span>
            </div>
            <a href="https://www.linkedin.com/in/fabio-aguero/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-primary/10 transition-colors">
              <Linkedin className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider">LinkedIn</span>
            </a>
            <a href="https://public.tableau.com/app/profile/fabio2874/vizzes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-primary/10 transition-colors">
              <BarChart2 className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider">Tableau</span>
            </a>
            <a href="https://github.com/faguero84" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-primary/10 transition-colors">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider">GitHub</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Journey Section */}
      <section id="journey">
        <div className="mb-16 flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight">{t.journey.title}</h2>
          <div className="h-px grow bg-slate-100 dark:bg-slate-800"></div>
        </div>
        <div className="relative timeline-line mx-auto max-w-5xl px-4">
          {[
            { year: '2016 - Present', title: 'BI & Data Analyst', desc: lang === 'en' ? 'Developing end-to-end BI solutions for top-tier clients including Bagó, Garrahan, Itaú, Cordial y Electrolux. Focused on dashboarding, data storytelling, and automated reporting systems.' : 'Desarrollo de soluciones de BI para clientes de primer nivel, incluidos Bagó, Garrahan, Itaú, Cordial y Electrolux. Enfocado en tableros, narración de datos y sistemas de informes automatizados.', icon: BarChart2, active: true },
            { year: '2012 - 2016', title: 'IT Systems & Infrastucture Administrator', desc: lang === 'en' ? 'Overseeing infrastructure operations and ensuring system reliability while optimizing IT workflows for organizational efficiency.' : 'Supervisión de las operaciones de infraestructura y garantía de la confiabilidad del sistema mientras se optimizan los flujos de trabajo de TI para la eficiencia organizacional.', icon: Settings2 },
            { year: '2011 - 2012', title: 'Data Warehouse Systems Analyst', desc: lang === 'en' ? 'Data Warehouse operations and data processing focused on quality control, and large-volume data management. Big Data, Teradata, SFTP, SQL DB2, Mainframe' : 'Operaciones de Data Warehouse y procesamiento de datos con foco en control de calidad y gestión de grandes volúmenes de información. Big Data, Teradata, SFTP, SQL DB2, Mainframe.', icon: HardDrive },
            { year: '2009 - 2011', title: 'System Analyst', desc: lang === 'en' ? 'Graduated as a System Analyst, Information Technology' : 'Graduado como Analista de Sistemas, Tecnologías de la Información', icon: GraduationCap },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative mb-12 flex w-full items-center justify-between group"
            >
              <div className={cn("order-1 w-5/12", idx % 2 === 0 ? "text-right pr-8" : "order-2 text-left pl-8")}>
                <span className={cn("text-sm font-bold uppercase tracking-widest", item.active ? "text-primary" : "text-slate-400")}>{item.year}</span>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
              <div className="z-10 order-1 flex h-12 w-12 items-center justify-center rounded-full shadow-lg ring-8 ring-white dark:ring-background-dark transition-transform group-hover:scale-110 absolute left-1/2 -translate-x-1/2">
                <div className={cn(
                  "flex h-full w-full items-center justify-center rounded-full",
                  item.active ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
              </div>
              <div className={cn("order-1 w-5/12", idx % 2 === 0 ? "order-2" : "")}></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Gallery */}
      <section id="projects">
        <div className="mb-10 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tight">{t.projects.title}</h2>
            <div className="h-px grow bg-slate-100 dark:bg-slate-800"></div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">{t.projects.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => {
            const pTitle = lang === 'es' && project.es ? project.es.title : project.title;
            const pDesc = lang === 'es' && project.es ? project.es.description : project.description;
            
            return (
              <motion.div 
                key={project.id}
                whileHover={{ y: -8 }}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                onClick={() => onProjectClick(project)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={pTitle} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{pTitle}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{pDesc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="rounded bg-slate-50 dark:bg-slate-800 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Technical Toolkit */}
      <section>
        <div className="mb-10 flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight">{t.toolkit.title}</h2>
          <div className="h-px grow bg-slate-100 dark:bg-slate-800"></div>
        </div>
        <div className="flex flex-wrap gap-3">
          {['SQL', 'Tableau', 'Microstrategy', 'Power BI', 'Advanced Excel', 'Python', 'Teradata', 'Docker', 'Git'].map(skill => (
            <span key={skill} className="px-5 py-3 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 font-semibold shadow-sm hover:border-primary transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

const BlogView = ({ lang }: { lang: 'en' | 'es' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const t = translations[lang].blog;

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All Posts' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPost) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl py-12"
      >
        <button 
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary mb-8 transition-colors uppercase tracking-widest"
        >
          <ChevronLeft className="h-4 w-4" />
          {t.back}
        </button>
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest mb-4">
          <span className={cn(
            "px-2 py-1 rounded",
            selectedPost.category === 'Tutorial' ? "text-primary bg-primary/10" : "text-amber-500 bg-amber-500/10"
          )}>{selectedPost.category}</span>
          <span className="text-slate-400 dark:text-slate-500">{selectedPost.date}</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-8 leading-tight">{selectedPost.title}</h1>
        <div className="markdown-body dark:text-slate-300">
          <Markdown>{selectedPost.content}</Markdown>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 py-12 lg:flex-row">
      <div className="flex-1 space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{t.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">{t.subtitle}</p>
        </div>

        <div className="border-b border-slate-200 dark:border-slate-800">
          <div className="flex gap-8">
            {['All Posts', 'Tutorials', 'Resources'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "pb-3 text-sm font-bold transition-all relative",
                  activeCategory === cat ? "text-slate-900 dark:text-white border-b-2 border-primary" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                )}
              >
                {cat === 'All Posts' ? t.allPosts : cat === 'Tutorials' ? t.tutorials : t.resources}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredPosts.map(post => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-10 first:pt-0 group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                  <span className={cn(
                    "px-2 py-1 rounded",
                    post.category === 'Tutorial' ? "text-primary bg-primary/10" : "text-amber-500 bg-amber-500/10"
                  )}>{post.category}</span>
                  <span className="text-slate-400 dark:text-slate-500">{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
              </div>
            </motion.article>
          ))}
          {filteredPosts.length === 0 && (
            <div className="py-20 text-center text-slate-500">{t.noPosts}</div>
          )}
        </div>
      </div>

      <aside className="w-full lg:w-80 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{t.search}</h4>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-primary transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <input 
              type="text" 
              placeholder={t.search} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-slate-200"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{t.popularTags}</h4>
          <div className="flex flex-wrap gap-2">
            {['Pandas', 'Data Viz', 'SQL', 'Python', 'Statistics'].map(tag => (
              <button key={tag} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-primary/20 hover:text-primary transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-primary/5 p-6 border border-primary/10">
          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{t.newsletter}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{t.newsletterDesc}</p>
          <button className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
            {t.subscribe}
          </button>
        </div>
      </aside>
    </div>
  );
};

const ContactView = ({ lang }: { lang: 'en' | 'es' }) => {
  const t = translations[lang].contact;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start py-12 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-slate-900 dark:text-white text-5xl font-black leading-tight tracking-tight">{t.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-md">
            {t.subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-6 pt-4">
          <p className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-widest">{t.social}</p>
          <div className="flex flex-col gap-4">
            <a href="https://www.linkedin.com/in/fabio-aguero/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
              <Share2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">LinkedIn</span>
            </a>
            <a href="https://public.tableau.com/app/profile/fabio2874/vizzes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
              <BarChart2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Tableau Public</span>
            </a>
            <a href="https://github.com/faguero84" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group">
              <Code className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">GitHub</span>
            </a>
          </div>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800"
      >
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">{t.form.name}</label>
            <input 
              type="text" 
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent p-4 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">{t.form.email}</label>
            <input 
              type="email" 
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent p-4 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">{t.form.message}</label>
            <textarea 
              rows={5} 
              required
              placeholder={t.form.placeholderMessage}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent p-4 transition-all resize-none"
            />
          </div>
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {status === 'loading' ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              <>
                <span>{t.form.send}</span>
                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          {status === 'success' && (
            <p className="text-green-500 text-sm font-bold text-center">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-sm font-bold text-center">Failed to send message. Please try again.</p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

const ProjectDetailView = ({ project, onBack, onProjectClick, lang }: { project: Project, onBack: () => void, onProjectClick: (p: Project) => void, lang: 'en' | 'es' }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  const t = translations[lang].projectDetail;
  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const prevProject = PROJECTS[currentIndex - 1] || PROJECTS[PROJECTS.length - 1];
  const nextProject = PROJECTS[currentIndex + 1] || PROJECTS[0];

  const projectData = lang === 'es' && project.es ? {
    title: project.es.title,
    description: project.es.description,
    fullDescription: project.es.fullDescription,
    role: project.es.role,
    sector: project.es.sector,
    challenge: project.es.challenge,
    processing: project.es.processing,
    insights: project.es.insights,
    metrics: project.es.metrics
  } : {
    title: project.title,
    description: project.description,
    fullDescription: project.fullDescription,
    role: project.role,
    sector: project.sector,
    challenge: project.challenge,
    processing: project.processing,
    insights: project.insights,
    metrics: project.metrics
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto w-full max-w-5xl py-12 lg:py-20"
    >
      <section className="mb-16">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary mb-8 transition-colors uppercase tracking-widest"
        >
          <ChevronLeft className="h-4 w-4" />
          {t.back}
        </button>
        <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white mb-6">
          {projectData.title}
        </h1>
        <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 max-w-3xl mb-10">
          {projectData.fullDescription}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.tools}</p>
            <p className="font-bold">{project.tools.join(', ')}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.role}</p>
            <p className="font-bold">{projectData.role}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.date}</p>
            <p className="font-bold">{project.date}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.sector}</p>
            <p className="font-bold">{projectData.sector}</p>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <div className="relative w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-tighter">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Visualization Analysis
            </span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
            </div>
          </div>
          <div className="aspect-[16/9] w-full flex items-center justify-center p-4">
            <img 
              src={project.image} 
              alt={projectData.title} 
              className="h-full w-full object-cover rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <div className="space-y-32">
        <section className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary sticky top-24">{t.challenge}</h2>
          </div>
          <div className="lg:col-span-8">
            <h3 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{t.improvingInsights}</h3>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {projectData.challenge}
            </p>
          </div>
        </section>

        <section className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary sticky top-24">{t.processing}</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-8">
              {projectData.processing}
            </p>
            {project.codeSnippet && (
              <div className="mb-10">
                <pre className="bg-slate-900 text-slate-100 p-6 rounded-xl overflow-x-auto text-sm font-mono">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            )}
            {project.tableauUrl ? (
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col items-center gap-6">
                  <div className="flex items-center gap-3 text-primary">
                    <BarChart2 className="h-8 w-8" />
                    <span className="text-xl font-bold">{t.tableauDashboard}</span>
                  </div>
                  <a 
                    href={project.tableauUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    {t.viewTableau}
                    <Share2 className="h-4 w-4" />
                  </a>
                  <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {t.tableauInstruction}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=800" 
                  alt="Workflow" 
                  className="w-full h-auto rounded-lg shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <p className="mt-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Workflow: Feature selection and normalization pipeline</p>
              </div>
            )}
          </div>
        </section>

        <section className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary sticky top-24">{t.insights}</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {projectData.metrics.map((metric, idx) => (
                <div key={idx} className={cn(
                  "p-8 rounded-2xl border",
                  (project.metrics[idx]?.primary) 
                    ? "bg-primary text-white border-primary" 
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                )}>
                  <p className={cn("text-xs font-bold uppercase tracking-widest mb-2", (project.metrics[idx]?.primary) ? "text-white/70" : "text-slate-400")}>
                    {metric.label}
                  </p>
                  <span className={cn("text-5xl font-black", (project.metrics[idx]?.primary) ? "text-white" : "text-slate-900 dark:text-white")}>
                    {metric.value}
                  </span>
                  <p className={cn("mt-3 text-sm font-medium", (project.metrics[idx]?.primary) ? "text-white/80" : "text-slate-500")}>
                    {metric.subtext}
                  </p>
                </div>
              ))}
            </div>
            <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{t.strategy}</h4>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {projectData.insights}
            </p>
          </div>
        </section>
      </div>

      <section className="mt-32 pt-12 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <button 
            onClick={() => onProjectClick(prevProject)}
            className="group flex flex-col items-start gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.prev}</span>
            <span className="flex items-center gap-2 text-xl font-bold group-hover:text-primary transition-colors text-slate-900 dark:text-white">
              <ChevronLeft className="h-5 w-5" />
              {prevProject.title}
            </span>
          </button>
          <button 
            onClick={onBack}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all"
          >
            <Grid className="h-5 w-5" />
          </button>
          <button 
            onClick={() => onProjectClick(nextProject)}
            className="group flex flex-col items-end gap-2 text-right"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.next}</span>
            <span className="flex items-center gap-2 text-xl font-bold group-hover:text-primary transition-colors text-slate-900 dark:text-white">
              {nextProject.title}
              <ChevronRight className="h-5 w-5" />
            </span>
          </button>
        </div>
      </section>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [lang, setLang] = useState<'en' | 'es'>('en');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Google Analytics Page View Tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const pagePath = activeTab === 'project-detail' && selectedProject 
        ? `/projects/${selectedProject.id}` 
        : `/${activeTab}`;
      
      (window as any).gtag('config', 'G-7NB9TV6KRG', {
        page_path: pagePath,
      });
    }
  }, [activeTab, selectedProject]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const t = translations[lang];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('project-detail');
  };

  const renderContent = () => {
    if (activeTab === 'project-detail' && selectedProject) {
      return <ProjectDetailView project={selectedProject} onBack={() => setActiveTab('projects')} onProjectClick={handleProjectClick} lang={lang} />;
    }

    switch (activeTab) {
      case 'home':
        return <HomeView onProjectClick={handleProjectClick} lang={lang} />;
      case 'projects':
        return (
          <div className="py-12">
            <div className="mb-10 flex flex-col gap-2">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{t.projects.allProjects}</h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg">{t.projects.allProjectsDesc}</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => {
                const pTitle = lang === 'es' && project.es ? project.es.title : project.title;
                const pDesc = lang === 'es' && project.es ? project.es.description : project.description;

                return (
                  <motion.div 
                    key={project.id}
                    whileHover={{ y: -8 }}
                    className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={pTitle} 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{pTitle}</h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{pDesc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="rounded bg-slate-50 dark:bg-slate-800 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      case 'blog':
        return <BlogView lang={lang} />;
      case 'contact':
        return <ContactView lang={lang} />;
      default:
        return <HomeView onProjectClick={handleProjectClick} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        lang={lang}
        setLang={setLang}
      />
      <main className="flex-1 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
