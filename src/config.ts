export const siteConfig = {
  name: "Mihir Yanamandra",
  title: "Data Science Student at Stony Brook University",
  description: "Portfolio website of Mihir Yanamandra",
  accentColor: "#1d4ed8",
  social: {
    email: "mihiryanamandra10@gmail.com",
    universityEmail: "mihir.yanamandra@stonybrook.edu",
    linkedin: "https://www.linkedin.com/in/mihir-yanamandra-60358021b",
    twitter: "",
    github: "https://github.com/MIHIRY",
  },
  aboutMe:
    "I'm a Data Science graduate student at Stony Brook University focused on building scalable, intelligent systems that transform data into real-world impact. My experience spans machine learning, statistics, SQL, and data engineering, with a focus on designing end-to-end solutions from predictive models to production-ready data workflows. I'm driven by complex problem-solving, analytical rigor, and building systems that are both technically robust and practically valuable.",
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
  projects: [
    {
      name: "RideOps AI",
      description:
        "NYC Taxi Demand Intelligence Platform — forecasts Yellow Taxi demand at zone and hourly level using 85.6M trip records. Features anomaly detection, congestion pricing impact analysis, and an AI-powered analyst agent built with Claude Sonnet, DuckDB, dbt, and Streamlit.",
      link: "https://github.com/MIHIRY/Rideops-AI",
      skills: ["Python", "DuckDB", "dbt", "XGBoost", "Streamlit", "Claude API"],
    },
    {
      name: "Adaptive Query Ranker – SQL Performance Optimization",
      description:
        "Tree-aware transformer model that ranks database query execution plans to predict which plan executes faster. Uses LoRA for parameter-efficient fine-tuning on 35K+ query plan variants across 134 schemas, with cross-schema generalization for realistic evaluation.",
      link: "https://github.com/MIHIRY/Cross-Plan",
      skills: ["Python", "PyTorch", "Transformers", "LoRA", "SQL"],
    },
    {
      name: "RAGFlow: Enhancing Research Paper Comprehension",
      description:
        "Placeholder description — details coming soon.",
      link: "#",
      skills: ["Python", "LLM", "RAG"],
    },
    {
      name: "ContextType: Adaptive Keyboard System",
      description:
        "Intelligent keyboard interface that provides context-aware text suggestions using LLM technology. Detects writing context (programming, email, chat) and delivers real-time next-word predictions with performance metrics tracking and optimized API call strategies.",
      link: "https://github.com/MIHIRY/HCI-",
      skills: ["React", "TypeScript", "Node.js", "Express.js", "Groq API", "Tailwind CSS"],
    },
    {
      name: "Large-Scale Frequent Itemsets",
      description:
        "Parallel association rule mining using Apriori, PCY, and SON algorithms with MPI across 10 processes on HPC clusters. Discovers frequently co-purchased product patterns in grocery transaction data using a two-phase map-reduce approach.",
      link: "https://github.com/MIHIRY/Large-Scale-Frequent-Items",
      skills: ["Python", "MPI", "HPC", "Apriori", "Data Mining"],
    },
    {
      name: "Terrorism Risk Forecasting",
      description:
        "Analyzed global terrorism incidents from 1970–2017 using the Global Terrorism Database. Built predictive models with ANOVA, logistic regression, random forest, and time series forecasting (ETS) in R, with SMOTE for imbalanced data and PCA clustering to identify terrorist group behavior profiles.",
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
        "Implements neural networks for Part-of-Speech (POS) tagging and Bigram Language Models to enhance NLP tasks. Explores feature engineering, pretrained embeddings, and deep learning architectures (LSTMs, BiLSTMs, GRUs) for improved tagging accuracy.",
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
      title: "Data Engineer Intern",
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
      title: "Data Engineer Intern",
      dateRange: "Sept 2023 – March 2024",
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
      degree: "Master of Science in Data Science",
      dateRange: "Aug 2024 – Jun 2026",
      achievements: [
        "GPA: 3.84/4.0",
        "Relevant Coursework: Probability, Data Analysis, Natural Language Processing (NLP), Large Language Models, Statistical Learning and Computing (R Language)",
      ],
    },
    {
      school: "Gandhi Institute of Technology and Management (GITAM) — Visakhapatnam, India",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      dateRange: "Jun 2019 – Jul 2023",
      achievements: [
        "GPA: 3.43",
      ],
    },
  ],
  certifications: [
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
