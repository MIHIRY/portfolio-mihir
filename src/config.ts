/**
 * A project as shown on the /projects page.
 * `cover` is the path to a real screenshot in /public — leave it empty and the
 * card renders its placeholder instead, at the same dimensions.
 */
export type FeaturedProject = {
  name: string;
  description: string;
  link: string;
  tags: string[];
  cover: string;
  /**
   * "cover" (default) fills the plate and crops — right for app screenshots.
   * "contain" fits the whole image in — use for diagrams, where cropping an
   * edge would lop off part of the flow.
   */
  coverFit?: 'cover' | 'contain';
  /**
   * Tailwind aspect class for the plate, when the cover's own ratio is far from
   * the card default (e.g. a wide DAG strip). Omit to use the card's ratio.
   */
  coverRatio?: string;
  /**
   * Let the card end just under its cover instead of stretching to the grid
   * row and pinning text to the bottom. For covers far shorter than the row.
   */
  compact?: boolean;
  /**
   * Tool logos pinned to the card's bottom edge, each in an identical square
   * box. Setting these replaces the card's text `tags` row, so `name` carries
   * the alt text that row used to convey. Paths are case-sensitive on the
   * deploy host.
   */
  logos?: { src: string; name: string }[];
};

/** One card on the /skills page. */
export type SkillGroup = {
  name: string;
  blurb: string;
  /** `icon` is a path in /public; see `skillGroups` for how it changes rendering. */
  items: { label: string; icon?: string }[];
};

export const siteConfig = {
  name: "Mihir Yanamandra",
  title: "Data Science Student at Stony Brook University",
  description: "Portfolio website of Mihir Yanamandra",
  // Hue 210 — the deep end of the same family as the /projects sky tokens
  // (hue ~205). Was #1d4ed8 (hue 224), which read as an unrelated blue.
  accentColor: "#1569BC",
  /**
   * Per-route <title> and meta description. Set client-side on navigation, so
   * they reach users and Google (which renders JS) but NOT link-preview
   * crawlers, which only read the static index.html.
   */
  pageMeta: {
    home: {
      title: "Mihir Yanamandra: Data professional",
      description:
        "Data engineer building scalable platforms in Python, SQL, PySpark, Databricks, Snowflake and dbt. ETL/ELT pipelines and dimensional models over 30M+ record datasets.",
    },
    projects: {
      title: "Mihir Yanamandra's work!",
      description:
        "Data engineering projects: lakehouses on Iceberg and Microsoft Fabric, streaming telemetry with Kafka and Spark, dbt-modelled warehouses, and demand forecasting at scale.",
    },
    skills: {
      title: "Skills — Mihir Yanamandra",
      description:
        "The toolkit behind the work: Python, SQL and PySpark through Airflow, dbt, Snowflake and Databricks, plus the computer-science and data-science fundamentals underneath them.",
    },
    notFound: {
      title: "Page not found — Mihir Yanamandra",
      description: "That page does not exist. Head back to the portfolio or the projects page.",
    },
  },
  /** Square face crop of `portrait` for the header avatar. */
  avatar: "/avatar.jpg",
  /** Portrait for the /projects page. Falls back to the placeholder plate if missing. */
  portrait: "/portrait.jpg",
  social: {
    email: "mihiryanamandra10@gmail.com",
    universityEmail: "mihir.yanamandra@stonybrook.edu",
    linkedin: "https://www.linkedin.com/in/mihir-yanamandra-60358021b",
    calendar: "https://calendar.app.google/RQcvC6Kf1yH2BBE79",
    twitter: "",
    github: "https://github.com/MIHIRY",
    kaggle: "https://www.kaggle.com/mihiryanamandra",
  },
  aboutMe: "Data Engineer with 3+ years building scalable data platforms in Python, SQL, PySpark, AWS, Databricks, Snowflake, and dbt. I design ETL/ELT pipelines and dimensional models that handle 30M+ record datasets. Track record: 40% performance improvements, 90% API cost reduction, and metrics layers that enable self-service analytics. Currently learning Microsoft Fabric for lakehouse solutions.",
  skills: [
    "Python",
    "SQL",
    "PySpark",
    "Machine Learning",
    "Statistics",
    "Pandas",
    "Scikit-learn",
    "Airflow",
    "dbt",
    "Snowflake",
    "PostgreSQL",
    "Databricks",
    "Docker",
    "Git",
    "FastAPI",
    "MongoDB",
    "MySQL",
    "DuckDB",
    "TensorFlow",
    "Microsoft Fabric",
    "Power BI",
    "Tableau",
    "Streamlit",
    "R",
    "Java",
    "NumPy",
    "MLflow",
    "Excel",
    "Jupyter",
    "GitHub",
  ],
  /** Tech strip on the /projects page. Curated and ordered — not the same set as `skills`. */
  dataStack: [
    "Azure",
    "Microsoft Fabric",
    "AWS",
    "Databricks",
    "dbt",
    "Snowflake",
    "PySpark",
    "Airflow",
    "AWS Glue",
    "Amazon S3",
    "Redshift",
    "AWS Lambda",
    "Hadoop",
    "Power BI",
  ],
  /**
   * The /skills page. Each group is one card.
   *
   * An item may carry an `icon` (a path in /public). A card renders as a grid
   * of logo tiles only when *every* item in it has one, and as text pills
   * otherwise — so a group is never half logos and half labels. Fill in the
   * icons for a group and it flips to tiles on its own, no layout change.
   */
  skillGroups: [
    {
      name: "Languages",
      blurb: "The two languages the work is actually written in.",
      items: [{ label: "Python", icon: "/logo-python.png" }, { label: "SQL", icon: "/logo-sql.png" }],
    },
    {
      name: "Data Processing at Scale",
      blurb: "Distributed compute for datasets that outgrow a single machine.",
      items: [{ label: "Apache Spark", icon: "/logo-spark.png" }, { label: "Databricks", icon: "/logo-databricks.png" }, { label: "Hadoop", icon: "/logo-hadoop.png" }],
    },
    {
      name: "Orchestration & Transformation",
      blurb: "Scheduling, modelling and quality-gating the flow from raw data to marts.",
      items: [
        { label: "Airflow", icon: "/logo-airflow.png" },
        { label: "dbt", icon: "/logo-dbt.png" },
        { label: "Great Expectations", icon: "/logo-great-expectations.png" },
      ],
    },
    {
      name: "Warehouses & Lakehouses",
      blurb: "Where modelled data lands and gets queried.",
      items: [
        { label: "Snowflake", icon: "/logo-snowflake.png" },
        { label: "DuckDB", icon: "/logo-duckdb.png" },
        { label: "Apache Iceberg", icon: "/logo-iceberg.png" },
        { label: "Trino", icon: "/logo-trino.png" },
        { label: "Microsoft Fabric", icon: "/logo-microsoft-fabric.png" },
      ],
    },
    {
      name: "Cloud & Deployment",
      blurb: "Running and shipping platforms on managed infrastructure.",
      items: [
        { label: "AWS", icon: "/logo-aws.png" },
        { label: "Azure", icon: "/logo-azure.png" },
        { label: "Docker", icon: "/logo-docker.png" },
      ],
    },
    {
      name: "Databases",
      blurb: "Transactional and document stores behind the applications.",
      items: [{ label: "PostgreSQL", icon: "/logo-postgres.png" }, { label: "MySQL", icon: "/logo-mysql.png" }, { label: "MongoDB", icon: "/logo-mongo.png" }],
    },
    {
      name: "Machine Learning",
      blurb: "Training, tracking and evaluating models on production data.",
      items: [
        { label: "Scikit-learn" }, { label: "TensorFlow" }, { label: "PyTorch" },
        { label: "XGBoost" }, { label: "MLflow" },
      ],
    },
    {
      name: "LLMs & Applied AI",
      blurb: "Retrieval, fine-tuning and agent work on top of foundation models.",
      items: [
        { label: "RAG" }, { label: "LoRA" }, { label: "Transformers" },
        { label: "Claude API" }, { label: "Groq API" }, { label: "AI Agents" },
      ],
    },
    {
      name: "Analytics & Visualisation",
      blurb: "Turning modelled data into something a stakeholder can read.",
      items: [
        { label: "Power BI", icon: "/logo-power-bi.png" }, { label: "Tableau", icon: "/logo-tableau.png" }, { label: "Streamlit", icon: "/logo-streamlit.png" }, { label: "Excel", icon: "/logo-excel.png" },
      ],
    },
    {
      name: "Version Control & Collaboration",
      blurb: "Managing code and working with others on it.",
      items: [{ label: "Git", icon: "/logo-git.png" }, { label: "GitHub", icon: "/logo-github.png" }],
    },
    {
      name: "Computer Science Concepts",
      blurb: "The fundamentals underneath the tools.",
      items: [
        { label: "Data Structures & Algorithms" }, { label: "Object-Oriented Programming" },
        { label: "Operating Systems" }, { label: "DBMS" }, { label: "Computer Networks" },
        { label: "System Design" }, { label: "Distributed Systems" }, { label: "HPC / MPI" },
      ],
    },
    {
      name: "Data Science Concepts",
      blurb: "The statistical and modelling ideas the work rests on.",
      items: [
        { label: "Statistics" }, { label: "Hypothesis Testing" }, { label: "Regression" },
        { label: "Time Series" }, { label: "Dimensional Modelling" }, { label: "Feature Engineering" },
        { label: "PCA" }, { label: "Data Mining" }, { label: "Forecasting" }, { label: "Risk Modeling" },
      ],
    },
    {
      name: "Personal Development",
      blurb: "How I work with people, and keep getting better at it.",
      items: [
        { label: "Communication" }, { label: "Problem Solving" }, { label: "Ownership" },
        { label: "Collaboration" }, { label: "Leadership" }, { label: "Time Management" },
      ],
    },
  ] satisfies SkillGroup[],
  /**
   * Verifiable credentials for the /projects page card. Kept separate from
   * `certifications` below, which the home page renders with issuer/date/
   * description — fields a credential URL alone does not supply.
   */
  credentials: [
    {
      name: "The Rise of the AI Data Engineer Boot Camp",
      link: "https://learn.dataexpert.io/certification/mihiryanamandra89421/the-rise-of-the-ai-data-engineer-boot-camp-8b5975",
    },
    {
      name: "Google Advanced Data Analytics Professional Certificate",
      link: "https://www.credly.com/badges/93c20b6e-eff1-402a-bd27-cdc0f2bea81c/public_url",
    },
  ],
  /**
   * Reading list on the /projects page. Save covers to /public and point
   * `cover` at them; an empty string renders the placeholder plate instead.
   * The takeaways are drafts — rewrite them in your own words.
   */
  reading: [
    // `link` points at your own write-up for each book — the card only becomes
    // clickable once a url is set, so no dead links in the meantime.
    {
      title: "AI Engineering",
      author: "Chip Huyen",
      takeaway: "The hard part of AI isn’t making it work once. It’s knowing whether it works reliably.",
      cover: "/book-ai-engineering.jpg",
      link: "",
    },
    {
      title: "Fundamentals of Data Engineering",
      author: "Joe Reis & Matt Housley",
      takeaway: "Great data engineering is invisible: when the foundation is strong, everything built on top of it simply works.",
      cover: "/book-fundamentals-de.jpg",
      link: "",
    },
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      takeaway: "A system isn’t truly well-designed when everything works; it’s well-designed when things fail and the system still works.",
      cover: "/book-ddia.jpg",
      link: "",
    },
  ],
  /** The four projects headlining the /projects page. */
  featuredProjects: [
    {
      name: "NYC Taxi Demand Platform",
      description:
        "Forecasts Yellow Taxi demand by zone and hour across 85.6M trip records. Surfaces anomalies and measures the impact of congestion pricing.",
      link: "https://github.com/MIHIRY/Rideops-AI",
      tags: ["DuckDB", "dbt", "XGBoost"],
      cover: "/nyc-taxi-demand.jpg",
    },
    {
      name: "Finance Data Engineering Pipeline",
      description:
        "A Microsoft Fabric lakehouse turning 6.3M PaySim transactions into fraud analytics. PySpark lands raw CSV in Bronze Delta tables, then dbt models staging through to a governed star schema. A parameter-driven pipeline runs full or watermarked loads behind all 52 dbt tests.",
      link: "https://github.com/MIHIRY/microsoft-fabric-finance-lakehouse",
      tags: ["Microsoft Fabric", "Lakehouse", "SQL"],
      cover: "/finance-lakehouse.jpg",
      coverFit: "contain",
    },
    {
      name: "Drive Telemetry Lakehouse",
      description:
        "Turns Backblaze drive telemetry into live failure analytics — Kafka events streamed by Spark into Iceberg tables, modeled with dbt-trino.",
      link: "https://github.com/MIHIRY/Drive-Telemetry-Lakehouse",
      tags: ["PySpark", "Iceberg", "Airflow"],
      cover: "/drive-telemetry.jpg",
      coverFit: "contain",
    },
    {
      name: "Vehicle Telemetry Pipeline",
      description:
        "A production-style ELT pipeline that ingests, validates and quarantines connected-car events, then shapes them into fleet-monitoring marts.",
      link: "https://github.com/MIHIRY/-VEHICLE-TELEMETRY-PIPELINE",
      tags: ["Airflow", "Snowflake", "dbt"],
      cover: "/vehicle-telemetry.png",
      // Source is only 538x277; "cover" would upscale ~1.4x and go soft.
      coverFit: "contain",
    },
  ] satisfies FeaturedProject[],
  /** Placeholders — same shape, so swapping in real data needs no layout change. */
  upcomingProjects: [
    {
      name: "RAGFlow",
      description:
        "Advanced RAG system for research paper comprehension, using vector embeddings and semantic search to query and summarize academic papers.",
      link: "https://github.com/MIHIRY/RagFlow",
      tags: ["Python", "LLM", "RAG"],
      cover: "/rag-pipeline.png",
      // Source is 1233x297 (4.15); a 4/1 plate fits it with ~4% letterbox.
      coverFit: "contain",
      coverRatio: "aspect-[2/1] lg:aspect-[4/1]",
      compact: true,
    },
    {
      name: "Terrorism Risk Forecasting",
      description:
        "Airflow-orchestrated ELT: GTD and UN data land as Parquet, pass quality gates, then load a DuckDB star schema modeled staging-to-marts with dbt.",
      link: "https://github.com/MIHIRY/Terrorism-Risk-Forecasting-using-R",
      tags: ["DuckDB", "dbt", "Airflow"],
      // 1143x708 (1.61) against a 16/10 plate — "cover" crops ~3px, so it fills.
      cover: "/terrorism-risk.jpg",
      // Cover is far shorter than the row, so the default bottom-pinned text
      // left an 85px gap under it. Sit the text just below the image instead.
      compact: true,
      // Fills the slack that `compact` moves to the card's foot, and replaces
      // the text tags row that named the same three tools.
      logos: [
        { src: "/logo-duckdb.png", name: "DuckDB" },
        { src: "/logo-dbt.png", name: "dbt" },
        { src: "/logo-airflow.png", name: "Airflow" },
      ],
    },
    {
      name: "AI Project Copilot",
      description:
        "AI project discovery on Databricks. Spark ingests GitHub, EXA and OpenAlex; RAG search plus an agent-run roadmap.",
      link: "https://github.com/MIHIRY/databricks-ai-project-copilot-capstone",
      tags: ["Databricks", "Spark", "RAG"],
      // 1200x630 (1.9) logo on white. "contain" (never crop a logo) on a
      // matching 19/10 plate, so no blue band frames the white artwork.
      cover: "/ai-copilot.webp",
      coverFit: "contain",
      coverRatio: "aspect-[19/10]",
    },
    {
      name: "Adaptive Query Ranker",
      description:
        "Tree-aware transformer that ranks SQL execution plans to predict the faster one, LoRA-tuned on 35K plan variants across 134 schemas.",
      link: "https://github.com/MIHIRY/Cross-Plan",
      tags: ["PyTorch", "LoRA", "SQL"],
      // 1421x636 (2.23) — a 9/4 plate fits the 4-stage flow with ~1% letterbox.
      cover: "/cross-plan.jpg",
      coverFit: "contain",
      coverRatio: "aspect-[2/1] lg:aspect-[9/4]",
    },
    {
      // Rendered in the tile the Databricks card vacated, not in the map's
      // own run of cells — see ProjectsPage.
      name: "Music Intelligence Platform",
      description:
        "Music intelligence platform processing over 141M listens for trends, retention, discovery, loyalty, and recommendations.",
      // No repo yet, so the card stays unclickable rather than carry a dead link.
      link: "",
      tags: ["Docker", "Apache Airflow", "Python"],
      // 2172x724 is exactly 3.0, so a 3/1 plate fits it edge to edge with no
      // letterbox at all — the image meets both sides of the card.
      cover: "/spotify.png",
      coverRatio: "aspect-[3/1]",
      compact: true,
    },
] satisfies FeaturedProject[],
  projects: [
{
      name: "Drive Telemetry Lakehouse",
      description:
        "End-to-end data engineering platform turning Backblaze hard-drive SMART data into live failure analytics. Daily telemetry replayed as Avro/Kafka events, streamed by Spark into Bronze Iceberg tables, refined to Silver, modeled into six Gold marts with dbt-trino. Airflow orchestrates medallion flow, Great Expectations gates quality, Trino serves lakehouse via shared REST catalog, Streamlit dashboard visualizes fleet reliability. Fully containerized; 500,582 events processed with 0 duplicates, 11/11 quality checks passing.",
      link: "https://github.com/MIHIRY/Drive-Telemetry-Lakehouse",
      skills: ["PySpark", "Apache Iceberg", "Kafka", "dbt", "Trino", "Airflow", "Great Expectations", "Streamlit", "Docker", "PostgreSQL"],
    },
{
      name: "VEHICLE-TELEMETRY-PIPELINE",
      description:
        "A production-style vehicle telemetry ELT pipeline that ingests, validates, quarantines, and transforms connected-car event data into analytics-ready marts for fleet monitoring and insight.",
      link: "https://github.com/MIHIRY/-VEHICLE-TELEMETRY-PIPELINE",
      skills: ["Python", "SQL", "dbt", "Airflow", "Snowflake", "DuckDB", "Docker", "ETL/ELT", "Data Quality", "Parquet"],
    },
{
      name: "FinanceIQ: AI-First Finance Analytics Platform",
      description:
        "AI-first finance analytics on Snowflake over real SEC EDGAR filings for 24 public SaaS companies — dbt-modeled, deterministic AI agent, Streamlit UI, CI.",

      link: "https://github.com/MIHIRY/FinanceIQ-AgentOS",
      skills: ["Python", "LLM", "AI Agents", "Finance", "Data Analytics"],
    },
{
      name: "RideOps AI",
      description:
        "NYC Taxi Demand Intelligence Platform — forecasts Yellow Taxi demand at zone and hourly level using 85.6M trip records. Features anomaly detection, congestion pricing impact analysis, and AI-powered demand insights.",
      link: "https://github.com/MIHIRY/Rideops-AI",
      skills: ["Python", "DuckDB", "dbt", "XGBoost", "Streamlit", "Claude API"],
    },
{
      name: "LendingClub Credit Risk Analytics",
      description:
        "End-to-end credit risk pipeline on 837K LendingClub loans with calibrated XGBoost model (ROC-AUC 0.688). Implements cost-based approval policy saving $9.6M vs baseline with interactive Streamlit dashboard.",
      link: "https://github.com/MIHIRY/lendingclub-credit-risk-analytics",
      skills: ["Python", "XGBoost", "Streamlit", "Machine Learning", "Risk Modeling", "Jupyter"],
    },
{
      name: "PC SKU Demand Forecasting",
      description:
        "Demand forecasting system for personal computer SKUs leveraging statistical and machine learning approaches to predict inventory requirements and optimize stock allocation.",
      link: "https://github.com/MIHIRY/-pc-sku-demand-forecasting",
      skills: ["Python", "Machine Learning", "Forecasting", "Time Series", "Jupyter"],
    },
{
      name: "Large-Scale Frequent Itemsets",
      description:
        "Parallel association rule mining using Apriori, PCY, and SON algorithms with MPI across 10 processes on HPC clusters. Discovers frequently co-purchased product patterns in grocery transactions.",
      link: "https://github.com/MIHIRY/Large-Scale-Frequent-Items",
      skills: ["Python", "MPI", "HPC", "Apriori", "Data Mining"],
    },
{
      name: "Adaptive Query Ranker – SQL Performance Optimization",
      description:
        "Tree-aware transformer model that ranks database query execution plans to predict which plan executes faster. Uses LoRA for parameter-efficient fine-tuning on 35K+ query plan variants across 134 schemas.",
      link: "https://github.com/MIHIRY/Cross-Plan",
      skills: ["Python", "PyTorch", "Transformers", "LoRA", "SQL"],
    },
{
      name: "RAGFlow: Enhancing Research Paper Comprehension",
      description:
        "Advanced RAG system for research paper comprehension using vector embeddings and semantic search to enable intelligent querying and summarization of academic papers.",
      link: "https://github.com/MIHIRY/RagFlow",
      skills: ["Python", "LLM", "RAG"],
    },
{
      name: "Terrorism Risk Forecasting",
      description:
        "Analyzed global terrorism incidents from 1970–2017 using the Global Terrorism Database. Built predictive models with ANOVA, logistic regression, random forest, and time series forecasting.",
      link: "https://github.com/MIHIRY/Terrorism-Risk-Forecasting-using-R",
      skills: ["R", "Statistical Modeling", "Time Series", "Random Forest", "PCA"],
    },
{
      name: "Hate Speech Detection Using Different Models",
      description:
        "Hate speech detection system using a dataset of over 10,000 entries. Implemented and compared multiple models, including Logistic Regression, SVM, Random Forest, and BERT.",
      link: "https://github.com/MIHIRY/Hate-Speech-Recognition",
      skills: ["Python", "NLTK", "Pandas", "Machine Learning", "Deep Learning"],
    },
{
      name: "Neural Networks for POS Tagging & Bigram Language Modeling",
      description:
        "Implements neural networks for Part-of-Speech (POS) tagging and Bigram Language Models to enhance NLP tasks. Explores feature engineering, pretrained embeddings, and deep learning architectures.",
      link: "https://github.com/MIHIRY/Neural-Networks-for-POS-Tagging-Bigram-Language-Modeling/tree/Publication-Certificate",
      skills: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    },
{
      name: "Word Embeddings Analysis",
      description:
        "This project uses statistical methods such as co-occurrence counting, TF-IDF, and PMI to explore various distributional semantics techniques for analyzing word representations.",
      link: "https://github.com/MIHIRY/Natural-Language-Processing---Word-Embeddings-Analysis",
      skills: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    },
{
      name: "ContextType: Adaptive Keyboard System",
      description:
        "Intelligent keyboard interface that provides context-aware text suggestions using LLM technology. Detects writing context (programming, email, chat) and delivers real-time next-word predictions.",
      link: "https://github.com/MIHIRY/HCI-",
      skills: ["React", "TypeScript", "Node.js", "Express.js", "Groq API", "Tailwind CSS"],
    }
  ],
  experience: [
    {
      company: "TechTorch",
      title: "Data Intern",
      dateRange: "June 2025 – August 2025",
      bullets: [
        "Architected scalable CRM data pipelines processing 1M+ records with strict data quality controls.",
        "Built low-latency entity search using vector embeddings and semantic indexing (<100 ms lookup).",
        "Designed LLM-powered entity resolution with multi-stage validation and similarity scoring.",
        "Developed AI-driven merge recommendation pipelines with optimized feature engineering.",
        "Improved system throughput and reduced LLM token costs by ~60% through intelligent pre-filtering and performance tuning.",
      ],
    },
    {
      company: "Apexon – Healthcare Project",
      title: "Data Engineer",
      dateRange: "May 2024 – July 2024",
      bullets: [
        "Engineered distributed ETL pipelines (PySpark, Delta) to process high-volume EHR and ICU datasets.",
        "Optimized storage models and query performance for scalable healthcare analytics workloads.",
        "Delivered feature-engineered datasets for predictive healthcare modeling.",
        "Applied statistical validation and anomaly detection to ensure model-grade data integrity.",
        "Built SQL-based analytical layers enabling clinical reporting and insight generation.",
      ],
    },
    {
      company: "DBQ Technologies (Client: Bankhaus Scheich)",
      title: "Data Engineer",
      dateRange: "June 2023 - March 2024",
      bullets: [
        "Developed automated ingestion pipelines integrating multi-source financial trading data.",
        "Designed optimized relational schemas for scalable and performant transaction processing.",
        "Implemented ML-based anomaly detection and time-series forecasting for trading oversight.",
        "Applied statistical modeling to identify risk signals and trading pattern deviations.",
        "Delivered real-time analytical dashboards for liquidity and performance monitoring.",
      ],
    },
    {
      company: "University Housing",
      title: "Resident Assistant (RA)",
      dateRange: "May 2025 – June 2026",
      bullets: [
        "Led operations for a 200+ resident community with structured escalation and governance workflows.",
        "Designed systematic communication and incident-tracking processes to improve operational efficiency.",
        "Applied data-driven feedback analysis to optimize engagement and retention strategies.",
        "Resolved high-sensitivity conflicts through structured decision-making and stakeholder alignment.",
        "Demonstrated leadership, ownership, and cross-functional coordination in a high-responsibility environment.",
      ],
    },
  ],
  education: [
    {
      school: "Stony Brook University — Stony Brook, NY",
      /** Compact form for the /projects education card. */
      shortName: "Stony Brook University",
      degree: "Master of Science in Data Science",
      dateRange: "Aug 2024 – Jun 2026",
      achievements: [
        "GPA: 3.84/4.0",
        "Relevant Coursework: Probability, Data Analysis, Natural Language Processing (NLP), Large Language Models, Statistical Learning and Computing (R Language)",
      ],
    },
    {
      school: "Gandhi Institute of Technology and Management (GITAM) — Visakhaputnam, India",
      shortName: "GITAM University",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      dateRange: "Jun 2019 – Jul 2023",
      achievements: [
        "GPA: 3.43",
      ],
    },
  ],
  certifications: [
    {
      title: "The Rise of the AI Data Engineer Boot Camp",
      issuer: "DataExpert.io — Zach Wilson",
      date: "2026",
      description: "Applying AI and large language models to modern data engineering practice",
    },
    {
      title: "Machine Learning Specialization",
      issuer: "Coursera - Stanford University",
      date: "2023",
      description: "Comprehensive training in machine learning algorithms and their applications",
    },
    {
      title: "Deep Learning Specialization",
      issuer: "Coursera - DeepLearning.AI",
      date: "2023",
      description: "Advanced study of neural networks and deep learning architectures",
    },
    {
      title: "Data Science Professional Certificate",
      issuer: "IBM",
      date: "2022",
      description: "Professional certification in data science methodologies and tools",
    },
    {
      title: "Python for Data Science",
      issuer: "DataCamp",
      date: "2022",
      description: "Mastery in Python programming for data analysis and visualization",
    },
  ],
  publications: [
    {
      title: "A Study of Hate Speech Detection Using Different Models",
      venue: "2nd International Conference on Data Science and Artificial Intelligence (ICDSAI)",
      link: "https://link.springer.com/chapter/10.1007/978-3-031-51167-7_9",
    },
    {
      title: "Study of Various Routing and their Security Challenges in Vehicular Ad Hoc Networks",
      venue: "3rd International Conference on Intelligent Systems and Sustainable Computing",
      link: "https://link.springer.com/chapter/10.1007/978-981-97-8355-7_34",
    },
  ],
  blogs: [
    {
      title: "Knowledge Graph for Financial Chat Bot",
      description:
        "An exploration of implementing knowledge graphs to enhance the capabilities of financial chatbots, improving context understanding and response accuracy.",
      link: "#",
    },
    {
      title: "What Makes Good In-Context Examples for GPT-3? (KNN)",
      description:
        "Analysis of effective in-context learning examples for GPT-3 using K-nearest neighbors approach to understand and optimize prompt engineering.",
      link: "#",
    },
    {
      title: "REST: Retrieval-Based Speculating Decoding",
      description:
        "Deep dive into REST methodology for improving text generation through retrieval-based speculative decoding techniques.",
      link: "#",
    },
  ],
};
